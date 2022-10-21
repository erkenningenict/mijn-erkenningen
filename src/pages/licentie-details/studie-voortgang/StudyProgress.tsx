import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonBackButton,
  IonIcon,
  IonLoading,
} from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import ErrorComponent from '../../../components/ErrorComponent';
import { SimpleFilter } from '../../../contexts/FilterSettings';
import { toDutchDate } from '../../../helpers/date-helpers';
import {
  CertificeringStatusEnum,
  useApp_GetStudyProgressByLicenseIdQuery,
} from '../../../__generated__/graphql';
import './StudyProgress.css';

const StudyProgress: React.FC = () => {
  const { filterSettings, setFilterSettings } = SimpleFilter.useContainer();
  const { certificeringId } = useParams<{ certificeringId: string }>();
  const { loading, error, data } = useApp_GetStudyProgressByLicenseIdQuery({
    variables: {
      certificeringId: +certificeringId,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: certificeringId === null || typeof certificeringId === 'undefined',
  });

  const history = useHistory();

  if (error) {
    console.log('#DH# StudyProgress error');
    return <ErrorComponent error={error} />;
  }

  const participationPoints =
    data?.getStudyProgressByLicenseId?.ParticipationPoints || [];
  const required: { themeId: number; themeName: string; done: boolean }[] = [];
  const optional: {
    themes: { themeId: number; themeName: string }[];
    themeName: string;
    done: boolean;
  }[] = [];
  let optionalDone = 0;
  const availableThemes: { themeId: number; themeName: string }[] = [];
  const doneThemes: string[] = [];
  data?.getStudyProgressByLicenseId?.Studieresultaten?.forEach(
    (studieresultaat) => {
      doneThemes.push(
        studieresultaat?.Cursus.Vak.ThemaNaam || 'Onbekend thema',
      );
    },
  );
  participationPoints.forEach((participationPoint) => {
    // Check all required points
    if (participationPoint!.RequiredPoints >= 1) {
      let requiredDone: number = participationPoint!.CountedPoints;
      let requiredTodo: number =
        participationPoint!.RequiredPoints - participationPoint!.CountedPoints;
      if (requiredTodo < 0) {
        requiredTodo = 0;
      }
      for (
        let requiredParticipation = 0;
        requiredParticipation < participationPoint!.RequiredPoints;
        requiredParticipation++
      ) {
        let done = false;
        if (requiredDone > 0) {
          done = true;
        }
        required.push({
          themeId: participationPoint!.ThemaId,
          themeName: `${participationPoint!.ThemaNaam} (verplicht)`,
          done: done,
        });
        requiredDone = requiredDone - 1;
        if (doneThemes.indexOf(participationPoint!.ThemaNaam) > -1) {
          doneThemes.splice(
            doneThemes.indexOf(participationPoint!.ThemaNaam),
            1,
          );
        }
      }
      if (
        participationPoint!.CountedPoints - participationPoint!.RequiredPoints >
        0
      ) {
        // Required point is done as optional theme
        optionalDone +=
          participationPoint!.CountedPoints -
          participationPoint!.RequiredPoints;
      }
      if (
        participationPoint!.ThemaNaam !== 'KBA' &&
        participationPoint!.ThemaNaam !== 'KBA-GB'
      ) {
        availableThemes.push({
          themeId: participationPoint!.ThemaId,
          themeName: participationPoint!.ThemaNaam,
        });
      }
    } else {
      optionalDone += participationPoint!.CountedPoints;

      availableThemes.push({
        themeId: participationPoint!.ThemaId,
        themeName: participationPoint!.ThemaNaam,
      });
    }
  });
  if (availableThemes.length === 0) {
    participationPoints.forEach((participationPoint) => {
      availableThemes.push({
        themeId: participationPoint!.ThemaId,
        themeName: participationPoint!.ThemaNaam,
      });
    });
  }
  for (
    let index = 0;
    index <
    (data?.getStudyProgressByLicenseId?.RequiredPoints || 0) - required.length;
    index++
  ) {
    let isDone = false;

    if (optionalDone > 0) {
      isDone = true;
      optionalDone -= 1;
    }
    const themeName = doneThemes[index];
    optional.push({
      themes: availableThemes,
      themeName: !!themeName
        ? themeName
        : `Thema naar keuze:${availableThemes
            .map((theme) => theme.themeName)
            .join(' of ')}`,
      done: isDone,
    });
  }
  const url = '/bijeenkomsten/op-locatie';

  const blocks = (
    <div className="block-container">
      {required.map((requiredBlock, index) => (
        <div
          className={`block ${requiredBlock.done ? 'green' : 'orange'}`}
          key={index}
        >
          {requiredBlock.done ? (
            <button disabled={true} className="done">
              {requiredBlock.themeName}
            </button>
          ) : (
            <button
              onClick={() => {
                setFilterSettings({
                  ...filterSettings,
                  themaId: requiredBlock.themeId,
                });
                const fullUrl = `${url}?certificeringId=${data?.getStudyProgressByLicenseId?.Certificering?.CertificeringID}`;
                history.push(fullUrl);
              }}
            >
              <div className="buttonIcon">
                <span>{requiredBlock.themeName}</span>
                <IonIcon
                  slot="icon-only"
                  ios={chevronForward}
                  md={chevronForward}
                ></IonIcon>
              </div>
            </button>
          )}
        </div>
      ))}
      {optional.map((optionalBlock, index) => (
        <div
          className={`${optionalBlock.done ? 'block' : 'optionalBlock'} ${
            optionalBlock.done ? 'green' : 'orange'
          }`}
          key={index}
        >
          {optionalBlock.done ? (
            <button disabled>{optionalBlock.themeName}</button>
          ) : (
            <div>
              Thema naar keuze:{' '}
              {optionalBlock.themes.map(
                (
                  theme: { themeId: number; themeName: string },
                  index: number,
                ) => {
                  return (
                    <div key={index} className="flexCenter">
                      <button
                        onClick={() => {
                          setFilterSettings({
                            ...filterSettings,
                            themaId: theme.themeId,
                          });
                          const fullUrl = `${url}?certificeringId=${data?.getStudyProgressByLicenseId?.Certificering?.CertificeringID}`;
                          history.push(fullUrl);
                        }}
                      >
                        <div className="buttonIcon">
                          <span>{theme.themeName}</span>
                          <IonIcon
                            slot="icon-only"
                            ios={chevronForward}
                            md={chevronForward}
                          ></IonIcon>
                        </div>
                      </button>{' '}
                      {index !== optionalBlock.themes.length - 1 && (
                        <div>of</div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const ParticipationDetails = ({
    certificeringId,
  }: {
    certificeringId: number;
  }) => {
    return (
      <div>
        <p>
          Kijk bij{' '}
          <a href={`/mijn-licenties/${certificeringId}/bijeenkomsten`}>
            Bijeenkomsten
          </a>{' '}
          welke bijeenkomsten van u geregistreerd zijn.
        </p>
      </div>
    );
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
              data?.getStudyProgressByLicenseId?.Certificering?.Certificaat
                ?.Code
            }
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Studievoortgang</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Tot{' '}
            {data?.getStudyProgressByLicenseId?.Certificering?.Status ===
              CertificeringStatusEnum.Verlopen &&
            data?.getStudyProgressByLicenseId?.Certificering
              ?.UitstelVerleend === true &&
            new Date(
              data?.getStudyProgressByLicenseId?.Certificering?.UitstelTot,
            ) > new Date()
              ? toDutchDate(
                  data?.getStudyProgressByLicenseId?.Certificering?.UitstelTot,
                )
              : toDutchDate(
                  data?.getStudyProgressByLicenseId?.Certificering?.EindDatum,
                )}{' '}
            heeft u de tijd om uw licentie{' '}
            {
              data?.getStudyProgressByLicenseId?.Certificering?.Certificaat
                ?.Naam
            }{' '}
            te verlengen. U volgt daarvoor minimaal{' '}
            <strong>{data?.getStudyProgressByLicenseId?.RequiredPoints}</strong>{' '}
            bijeenkomsten.
            {data?.getStudyProgressByLicenseId?.RequiredPointsTodo === 0 ? (
              <p>
                <strong>
                  Alles groen? Gefeliciteerd! U ontvangt/heeft een
                  verlengingslicentie.
                </strong>
              </p>
            ) : (
              <p>
                Oranje betekent dat u nog een bijeenkomst over dit thema moet
                volgen.
              </p>
            )}
            {(data?.getStudyProgressByLicenseId?.Studieresultaten?.length ||
              0) > 0 ? (
              <ParticipationDetails
                certificeringId={
                  data?.getStudyProgressByLicenseId.Certificering
                    .CertificeringID!
                }
              />
            ) : (
              <p>
                U heeft nog geen bijeenkomsten gevolgd of deze zijn nog niet
                geregistreerd.
              </p>
            )}
            <p>Neem bij twijfel contact op met uw kennisaanbieder.</p>
          </IonCardContent>
        </IonCard>

        {blocks}
      </IonContent>
      {loading && (
        <IonLoading
          isOpen={true}
          message={'Even geduld aub, gegevens worden opgehaald'}
          duration={0}
        />
      )}
    </IonPage>
  );
};

export default StudyProgress;
