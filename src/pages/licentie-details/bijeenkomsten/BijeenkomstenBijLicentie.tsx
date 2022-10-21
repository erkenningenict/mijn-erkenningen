import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonBackButton,
  IonList,
  IonListHeader,
  IonItem,
  IonButton,
  IonLoading,
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
  IonLabel,
  IonItemDivider,
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ErrorComponent from '../../../components/ErrorComponent';
import {
  relativeTimeFormatter,
  toDutchDate,
} from '../../../helpers/date-helpers';
import { isLicenseExpired } from '../../../helpers/license-helper';
import {
  Certificering,
  CertificeringStatusEnum,
  CursusFieldsFragment,
  StudieresultatenFieldsOnStudyProgressFragment,
  useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery,
  useApp_GetStudyProgressByLicenseIdQuery,
} from '../../../__generated__/graphql';
import './BijeenkomstenBijLicentie.css';

const BijeenkomstenBijLicentie: React.FC = () => {
  const { certificeringId } = useParams<{ certificeringId: string }>();

  const { loading, error, data, refetch } =
    useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery({
      variables: {
        certificeringId: +certificeringId,
      },
      fetchPolicy: 'cache-and-network',
      skip: certificeringId === null || typeof certificeringId === 'undefined',
    });

  const {
    loading: studyProgressLoading,
    error: studyProgressError,
    data: studyProgressData,
    refetch: refetchStudyProgress,
  } = useApp_GetStudyProgressByLicenseIdQuery({
    variables: {
      certificeringId: +certificeringId,
    },
    fetchPolicy: 'cache-and-network',
    skip: certificeringId === null || typeof certificeringId === 'undefined',
  });

  if (error || studyProgressError) {
    console.log('#DH# error', error);
    return <ErrorComponent error={error} />;
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await refetch();
      await refetchStudyProgress();
    } catch (err) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  const firstSessie = (
    studyProgress: StudieresultatenFieldsOnStudyProgressFragment,
  ) => {
    if (
      studyProgress.Cursus &&
      studyProgress.Cursus.Sessies &&
      studyProgress.Cursus.Sessies[0]
    ) {
      return studyProgress.Cursus.Sessies[0];
    }
  };
  const firstSessieFromCursusdeelname = (
    studyProgress: CursusFieldsFragment,
  ) => {
    if (studyProgress && studyProgress.Sessies && studyProgress.Sessies[0]) {
      return studyProgress.Sessies[0];
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            Licentie{' '}
            {
              studyProgressData?.getStudyProgressByLicenseId?.Certificering
                ?.Certificaat?.Code
            }
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {(studyProgressData?.getStudyProgressByLicenseId?.Certificering
          ?.Status === CertificeringStatusEnum.Geldig ||
          (studyProgressData?.getStudyProgressByLicenseId?.Certificering &&
            !isLicenseExpired(
              studyProgressData?.getStudyProgressByLicenseId
                ?.Certificering as Certificering,
            ) &&
            studyProgressData?.getStudyProgressByLicenseId?.Certificering
              ?.Status !== CertificeringStatusEnum.Ingetrokken)) && (
          <>
            <IonListHeader>
              <IonLabel>Aankomende bijeenkomsten</IonLabel>
            </IonListHeader>

            <IonList>
              {data?.my?.AangemeldeCursusDeelnamesPerCertificeringId?.length ===
                0 && (
                <>
                  <div className="nothingFollowed">
                    <h6>Er staan geen bijeenkomsten gepland</h6>

                    <p style={{ marginBottom: '10px' }}>
                      Volg een bijeenkomst om uw licentie te verlengen.
                    </p>

                    <IonButton expand="block" routerLink="/bijeenkomsten">
                      Zoek een bijeenkomst
                    </IonButton>
                  </div>
                </>
              )}
              {data?.my?.AangemeldeCursusDeelnamesPerCertificeringId?.map(
                (c, index) => {
                  return (
                    <IonItem
                      key={index}
                      routerLink={`/mijn-licenties/${studyProgressData?.getStudyProgressByLicenseId?.Certificering?.CertificeringID}/bijeenkomsten/${c.Cursus.CursusID}/aangemelde-bijeenkomst-details`}
                    >
                      <div>
                        <h6>{c.Cursus.Titel}</h6>
                        <p>
                          {toDutchDate(
                            firstSessieFromCursusdeelname(c.Cursus)
                              ?.DatumBegintijd,
                          )}{' '}
                          (
                          {relativeTimeFormatter(
                            firstSessieFromCursusdeelname(c.Cursus)
                              ?.DatumBegintijd,
                          )}
                          )
                        </p>
                        <p>
                          <strong>Thema:</strong> {c.Cursus.Vak.ThemaNaam}
                        </p>
                        <p style={{ marginBottom: '10px' }}>
                          <strong>Competentie:</strong>{' '}
                          {c.Cursus.Vak.CompetentieNaam}
                        </p>
                        <p>{c.Cursus.CursusCode}</p>
                      </div>
                    </IonItem>
                  );
                },
              )}
            </IonList>
          </>
        )}

        <IonListHeader>
          <IonLabel>Gevolgde bijeenkomsten</IonLabel>
        </IonListHeader>
        {studyProgressData?.getStudyProgressByLicenseId?.Studieresultaten
          ?.length === 0 && (
          <div className="ion-padding">
            <h6>U heeft nog geen bijeenkomsten gevolgd</h6>
            <p>Mogelijk moet de kennisaanbieder uw deelname nog registreren.</p>
          </div>
        )}
        <IonList>
          {studyProgressData?.getStudyProgressByLicenseId?.Studieresultaten?.map(
            (s, index) => {
              return (
                <IonItem
                  key={index}
                  routerLink={`/mijn-licenties/${studyProgressData?.getStudyProgressByLicenseId?.Certificering?.CertificeringID}/bijeenkomsten/${s.Cursus.CursusID}/gevolgde-bijeenkomst-details`}
                >
                  <div>
                    <h6>{s.Cursus.Titel}</h6>
                    <p>{toDutchDate(firstSessie(s)?.DatumBegintijd)} </p>
                    <p>
                      <strong>Status:</strong> {s.Cursus?.Status}
                    </p>
                    <p>
                      <strong>Thema:</strong> {s.Cursus.Vak.ThemaNaam}
                    </p>
                    <p style={{ marginBottom: '10px' }}>
                      <strong>Competentie:</strong>{' '}
                      {s.Cursus.Vak.CompetentieNaam}
                    </p>
                    <p style={{ marginBottom: '10px' }}>
                      Code: {s.Cursus.CursusCode}
                    </p>
                  </div>
                </IonItem>
              );
            },
          )}
          <IonItemDivider>
            <IonLabel className="ion-text-wrap">
              Is de status <strong>Voorlopig</strong>? Dan moet de
              kennisaanbieder de registratie nog betalen aan Bureau Erkenningen.
              <br /> Is de status <strong>Aangemeld</strong>? Dan staat uw
              deelname nog niet geregistreerd, mogelijk omdat de bijeenkomst nog
              moet plaatsvinden.
              <br />
              Neem bij twijfel contact op met uw kennisaanbieder.
            </IonLabel>
          </IonItemDivider>
        </IonList>
      </IonContent>
      {loading ||
        (studyProgressLoading && (
          <IonLoading
            isOpen={true}
            message={'Even geduld aub, gegevens worden opgehaald'}
            duration={0}
          />
        ))}
    </IonPage>
  );
};

export default BijeenkomstenBijLicentie;
