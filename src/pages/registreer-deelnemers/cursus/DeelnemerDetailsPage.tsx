import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonLabel,
  IonList,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLoading,
  IonBackButton,
  IonListHeader,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useToast } from '../../../components/Toast';
import { IsOffline } from '../../../contexts/OfflineContext';
import { client } from '../../../AppWrapper';
import { checkAuthenticationError } from '../../../helpers/error-helper';
import React, { useState, useEffect } from 'react';
import LicenseValidityBadge from '../../../components/LicenseValidityBadge';

import ErrorComponent from '../../../components/ErrorComponent';
import {
  toDutchDate,
  relativeTimeFormatter,
} from '../../../helpers/date-helpers';
import {
  Certificering,
  CursusDeelnameStatusEnum,
  useApp_GetCursusDeelnemerQuery,
  useApp_RegisterForCourseByHoogleraarMutation,
  useApp_UnregisterForCourseByHoogleraarMutation,
} from '../../../__generated__/graphql';
import { ViewFilterDeelnemer } from '../../../contexts/SearchSettingsRegistreerDeelnemer';

const DeelnemerDetailsPage: React.FC = () => {
  const { offline } = IsOffline.useContainer();
  const Toast = useToast();
  const history = useHistory();
  const [selectedLicenseId, setSelectedLicenseId] = useState<number>(0);
  const { setFilterSettings } = ViewFilterDeelnemer.useContainer();

  const { persoonId, cursusId, pasNummer } =
    useParams<{ persoonId: string; cursusId: string; pasNummer: string }>();

  const { loading, error, data } = useApp_GetCursusDeelnemerQuery({
    variables: {
      input: {
        PersoonID: +persoonId,
        CursusID: +cursusId,
        PasNummer: pasNummer,
      },
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const isPasnummerGevonden =
    pasNummer && data && data?.GetCursusDeelnemer ? true : false;

  // Store CursusDeelnameID
  const CursusDeelnameID =
    data?.GetCursusDeelnemer?.CursusDeelname &&
    data?.GetCursusDeelnemer?.CursusDeelname[0] &&
    data?.GetCursusDeelnemer?.CursusDeelname[0].CursusDeelnameID;

  // Store registration status
  const isDeelnemerGeregistreerd =
    data?.GetCursusDeelnemer?.CursusDeelname &&
    data?.GetCursusDeelnemer?.CursusDeelname.length > 0 &&
    ['Geregistreerd', 'Aanwezig', 'Betaald'].includes(
      data?.GetCursusDeelnemer.CursusDeelname[0].Status,
    )
      ? true
      : false;

  // Set select license for data
  useEffect(() => {
    if (
      isDeelnemerGeregistreerd ||
      data?.GetCursusDeelnemer?.Certificeringen?.length === 1
    ) {
      setSelectedLicenseId(
        data?.GetCursusDeelnemer?.Certificeringen &&
          data?.GetCursusDeelnemer?.Certificeringen.length > 0
          ? data?.GetCursusDeelnemer?.Certificeringen[0].CertificeringID
          : 0,
      );
    }
  }, [isDeelnemerGeregistreerd, data?.GetCursusDeelnemer?.Certificeringen]);

  const [
    registerForCourseByHoogleraar,
    {
      loading: loadingRegisterForCourseByHoogleraar,
      error: errorRegisterForCourseByHoogleraar,
    },
  ] = useApp_RegisterForCourseByHoogleraarMutation();

  const [
    unregisterForCourseByHoogleraar,
    {
      loading: loadingUnregisterForCourseByHoogleraar,
      error: errorUnregisterForCourseByHoogleraar,
    },
  ] = useApp_UnregisterForCourseByHoogleraarMutation();

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (errorRegisterForCourseByHoogleraar) {
    console.log('#DH# error', errorRegisterForCourseByHoogleraar);
    return <ErrorComponent error={errorRegisterForCourseByHoogleraar} />;
  }

  if (errorUnregisterForCourseByHoogleraar) {
    console.log('#DH# error', errorUnregisterForCourseByHoogleraar);
    return <ErrorComponent error={errorUnregisterForCourseByHoogleraar} />;
  }

  const refreshParentQuery = async () => {
    console.log('refetchQueries');
    await client.refetchQueries({
      include: ['App_GetCursusDeelnemers'],
    });
  };

  const handleRegisterForCourseByHoogleraar = async () => {
    try {
      const res = await registerForCourseByHoogleraar({
        variables: {
          input: {
            persoonId: +persoonId,
            courseId: +cursusId,
            licenseId: selectedLicenseId ?? 0,
          },
        },
      });

      if (res.data?.registerForCourseByHoogleraar.success) {
        // deelnemer registered correctly so refresh list
        await refreshParentQuery();

        // and reset filtersetting for next search
        setFilterSettings({
          geboortejaar: '',
          naam: '',
          pasnummer: '',
          postcode: '',
        });
        Toast.success(`Gegevens bijgewerkt`);

        history.push(`/registreer-deelnemers/cursus/${cursusId}/deelnemers`, {
          direction: 'back',
        });
      } else {
        Toast.warning(
          res.data?.registerForCourseByHoogleraar?.message ||
            'Kan deze licentie niet aanmelden',
        );
      }
    } catch (err: any) {
      console.log('#DH# err?', err);
      if (!checkAuthenticationError(err)) {
        Toast.error(`Fout bij aanpassen registratie.`);
      }
    }
  };

  const handleUnregisterForCourseByHoogleraar = async () => {
    try {
      const res = await unregisterForCourseByHoogleraar({
        variables: {
          input: {
            CursusDeelnameID: CursusDeelnameID ?? 0,
          },
        },
      });
      if (res.data?.unregisterForCourseByHoogleraar.success) {
        await refreshParentQuery();

        Toast.success(`Gegevens bijgewerkt`);
        history.push(`/registreer-deelnemers/cursus/${cursusId}/deelnemers`, {
          direction: 'back',
        });
      } else {
        Toast.error(
          `Afmelden mislukt: ${res.data?.unregisterForCourseByHoogleraar?.message}`,
        );
      }
    } catch (err: any) {
      console.log('#DH# err?', err);

      if (!checkAuthenticationError(err)) {
        Toast.error(`Onverwachte fout bij afmelden.`);
      }
    }
  };

  const cursusDeelnemer = data?.GetCursusDeelnemer;
  const deelnameStatus =
    cursusDeelnemer?.CursusDeelname &&
    cursusDeelnemer.CursusDeelname[0] &&
    cursusDeelnemer?.CursusDeelname[0].Status;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            {!loading && isDeelnemerGeregistreerd && (
              <IonBackButton
                defaultHref={`/registreer-deelnemers/cursus/${cursusId}/deelnemers`}
              ></IonBackButton>
            )}
            {!loading && !isDeelnemerGeregistreerd && (
              <IonButton
                routerLink={`/registreer-deelnemers/cursus/${cursusId}/deelnemers`}
                routerDirection="back"
              >
                Annuleren
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>Deelnemer</IonTitle>
        </IonToolbar>
      </IonHeader>
      {pasNummer && !isPasnummerGevonden && (
        <IonContent>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              Er is geen aan te melden deelnemer gevonden met het ingevoerde
              pasnummer.
              <div
                style={{
                  fontSize: '70%',
                  fontWeight: 'normal',
                  marginTop: '10px',
                }}
              >
                Voer opnieuw in.
              </div>
            </IonLabel>
          </IonItem>
        </IonContent>
      )}
      <IonContent>
        <>
          {!cursusDeelnemer && !loading && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Deelnemer gegevens</IonCardTitle>
                <IonCardSubtitle></IonCardSubtitle>
                <p>De deelnemers gegevens zijn niet gevonden.</p>
              </IonCardHeader>
            </IonCard>
          )}
          {cursusDeelnemer && (
            <>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{cursusDeelnemer?.FullName}</IonCardTitle>
                  <IonCardSubtitle>
                    Persoon ID: {cursusDeelnemer?.PersoonID}
                  </IonCardSubtitle>
                  <div>
                    Geboortedatum: {toDutchDate(cursusDeelnemer?.Geboortedatum)}
                  </div>
                  <div>Geslacht: {cursusDeelnemer?.Geslacht}</div>
                </IonCardHeader>

                <IonCardContent>
                  <IonLabel
                    color={
                      deelnameStatus === CursusDeelnameStatusEnum.Aanwezig
                        ? 'success'
                        : deelnameStatus === CursusDeelnameStatusEnum.Aangemeld
                        ? 'tertiary'
                        : ''
                    }
                  >
                    <strong>Status:</strong>&nbsp;
                    {deelnameStatus || (
                      <>
                        Nog niet aanwezig gemeld.
                        <div style={{ marginTop: '10px' }}>
                          Meld de deelnemer aanwezig met de licentie waarvoor
                          men studiepunten wil behalen.
                        </div>
                      </>
                    )}
                    {deelnameStatus === CursusDeelnameStatusEnum.Aangemeld ? (
                      <>
                        {' '}
                        - nog niet aanwezig gemeld
                        <div style={{ marginTop: '10px' }}>
                          Meld de deelnemer aanwezig met de licentie waarvoor
                          men studiepunten wil behalen.
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </IonLabel>
                  <IonLabel>
                    {cursusDeelnemer &&
                      cursusDeelnemer.Certificeringen &&
                      cursusDeelnemer.Certificeringen.length === 0 && (
                        <p>Aanmelden kan alleen voor een geldige licentie.</p>
                      )}
                  </IonLabel>
                </IonCardContent>
              </IonCard>
              <IonList>
                <IonListHeader>
                  <IonLabel>
                    {isDeelnemerGeregistreerd && (
                      <strong>Licentie bij aanmelding:</strong>
                    )}
                    {!isDeelnemerGeregistreerd && (
                      <span>
                        Selecteer licentie
                        <span
                          style={{
                            display: 'block',
                            fontSize: 'small',
                            fontWeight: 'lighter',
                            marginTop: '5px',
                          }}
                        >
                          Alleen relevante licenties worden getoond
                        </span>
                      </span>
                    )}
                  </IonLabel>
                </IonListHeader>
                <IonRadioGroup
                  value={selectedLicenseId}
                  onIonChange={(e) => setSelectedLicenseId(e.detail.value)}
                >
                  {cursusDeelnemer?.Certificeringen?.length === 0 && (
                    <div className="ion-padding">
                      <h6>Er zijn geen actieve licenties gevonden</h6>
                    </div>
                  )}
                  {cursusDeelnemer?.Certificeringen?.filter((p) => {
                    return (
                      !isDeelnemerGeregistreerd ||
                      p.CertificeringID === selectedLicenseId
                    );
                  }).map((p) => {
                    const showExpiredOrRelativeDate =
                      new Date(p.EindDatum) < new Date()
                        ? 'verlopen'
                        : relativeTimeFormatter(p.EindDatum);
                    return (
                      <IonItem key={p.CertificeringID}>
                        <IonLabel className="ion-text-wrap">
                          <h2>{p.Certificaat?.Naam}</h2>
                          <h3>
                            {p.NummerWeergave}{' '}
                            <LicenseValidityBadge
                              license={p as unknown as Certificering}
                            />
                          </h3>
                          <p>
                            Geldig van {toDutchDate(p.BeginDatum)} tot{' '}
                            {toDutchDate(p.EindDatum)}
                            {` (${showExpiredOrRelativeDate})`}
                          </p>
                          <p style={{ color: 'red' }}>
                            {p.UitstelVerleend
                              ? ` U heeft uitstel gekregen tot ${toDutchDate(
                                  p.UitstelTot,
                                )}`
                              : ''}
                          </p>
                        </IonLabel>

                        <IonRadio slot="end" value={p.CertificeringID} />
                      </IonItem>
                    );
                  })}
                </IonRadioGroup>
              </IonList>
              <div className="ion-padding">
                {!isDeelnemerGeregistreerd && (
                  <IonButton
                    expand="block"
                    type="submit"
                    color="success"
                    disabled={
                      offline ||
                      loadingRegisterForCourseByHoogleraar ||
                      selectedLicenseId === 0
                    }
                    onClick={handleRegisterForCourseByHoogleraar}
                  >
                    {selectedLicenseId === 0
                      ? 'Kies eerst licentie'
                      : 'Deelnemer aanwezig melden'}
                  </IonButton>
                )}
                {isDeelnemerGeregistreerd && (
                  <IonButton
                    expand="block"
                    type="submit"
                    color="danger"
                    disabled={offline || loadingUnregisterForCourseByHoogleraar}
                    onClick={handleUnregisterForCourseByHoogleraar}
                  >
                    Deelnemer verwijderen uit bijeenkomst
                  </IonButton>
                )}
              </div>
            </>
          )}
          {(loading ||
            loadingRegisterForCourseByHoogleraar ||
            loadingUnregisterForCourseByHoogleraar) && (
            <IonLoading
              isOpen={true}
              message={'Even geduld aub, gegevens worden opgehaald'}
              duration={0}
            />
          )}
        </>
      </IonContent>
    </IonPage>
  );
};

export default DeelnemerDetailsPage;
