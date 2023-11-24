import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonNote,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import ErrorComponent from '../../../components/ErrorComponent';
import {
  CursusDeelnameStatusEnum,
  useApp_SearchCursusDeelnemersQuery,
} from '../../../__generated__/graphql';
import { ViewFilterDeelnemer } from '../../../contexts/SearchSettingsRegistreerDeelnemer';
import { toDutchDate } from '../../../helpers/date-helpers';

interface RegistreerDeelnemersResultListProps {
  dismissModal: (closeParent: boolean) => void;
}

export const RegistreerDeelnemersResultListModal: React.FC<
  RegistreerDeelnemersResultListProps
> = ({ dismissModal }) => {
  const { filterSettings } = ViewFilterDeelnemer.useContainer();

  const { cursusId } = useParams<{ cursusId: string }>();
  const [filterText, setFilterText] = useState('');

  const {
    loading: loadingCursusDeelnemers,
    error: errorCursusDeelnemers,
    data: dataCursusDeelnemers,
    refetch: refetchDeelnemers,
  } = useApp_SearchCursusDeelnemersQuery({
    variables: {
      input: {
        CursusID: parseInt(cursusId),
        naam: filterSettings.naam,
        postcode: filterSettings.postcode,
        geboortejaar: filterSettings.geboortejaar,
        pasnummer: filterSettings.pasnummer,
      },
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const deelnemers = dataCursusDeelnemers?.SearchCursusDeelnemers;

  useEffect(() => {
    if (deelnemers && deelnemers?.length === 1) {
      dismissModal(true);
    }
  }, [deelnemers, cursusId, dismissModal]);

  if (errorCursusDeelnemers) {
    return <ErrorComponent error={errorCursusDeelnemers} />;
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await refetchDeelnemers();
    } catch (error) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  return (
    <IonPage>
      {deelnemers && deelnemers?.length === 1 && (
        <Redirect
          push
          to={`/registreer-deelnemers/cursus/${cursusId}/deelnemer/${deelnemers[0].PersoonID}`}
        />
      )}
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => dismissModal(false)}>Annuleren</IonButton>
          </IonButtons>
          <IonTitle>
            <div style={{ fontSize: '80%' }}>Zoekresultaten</div>
            <div
              style={{
                fontSize: '60%',
                fontWeight: 'normal',
                marginTop: '5px',
              }}
            >
              {deelnemers && deelnemers?.length > 0
                ? `${deelnemers?.length} gevonden`
                : '0 deelnemers gevonden'}
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonSearchbar
          placeholder="Filter op naam"
          value={filterText}
          onIonChange={(e) => setFilterText(e.detail.value?.toLowerCase()!)}
        ></IonSearchbar>

        {deelnemers && deelnemers?.length === 0 && (
          <IonListHeader>
            <div className="mt-2">
              <div style={{ fontSize: '80%' }}>
                Er zijn geen personen gevonden.
              </div>
              <div
                style={{
                  fontSize: '70%',
                  fontWeight: 'normal',
                  marginTop: '10px',
                }}
              >
                Controleer de zoek instellingen.
              </div>
            </div>
          </IonListHeader>
        )}

        {deelnemers && deelnemers?.length > 0 && (
          <IonList>
            {deelnemers
              ?.filter((c) => {
                if (filterText === '') {
                  return true;
                }
                if (c.SortableFullName?.toLowerCase().includes(filterText)) {
                  return true;
                }
                return false;
              })
              .map((c) => {
                return (
                  <IonItem
                    key={c.PersoonID}
                    routerLink={`/registreer-deelnemers/cursus/${cursusId}/deelnemer/${c.PersoonID}`}
                    onClick={() => dismissModal(true)}
                  >
                    {c.CursusDeelname &&
                      c.CursusDeelname[0] &&
                      c.CursusDeelname[0].CursusDeelnameID &&
                      c.CursusDeelname[0].Status ===
                        CursusDeelnameStatusEnum.Aanwezig && (
                        <IonNote slot="start">
                          <div
                            style={{
                              background: 'green',
                              color: 'white',
                              padding: '6px',
                              borderRadius: '5px',
                              display: 'inline-block',
                              fontSize: '11px',
                              textTransform: 'uppercase',
                            }}
                          >
                            {'aanwezig'}
                          </div>
                        </IonNote>
                      )}
                    {c.CursusDeelname &&
                      c.CursusDeelname[0] &&
                      c.CursusDeelname[0].CursusDeelnameID &&
                      c.CursusDeelname[0].Status ===
                        CursusDeelnameStatusEnum.Aangemeld && (
                        <IonNote slot="start">
                          <div
                            style={{
                              background: 'yellow',
                              color: '#000',
                              padding: '6px',
                              borderRadius: '5px',
                              display: 'inline-block',
                              fontSize: '11px',
                              textTransform: 'uppercase',
                            }}
                          >
                            {'aangemeld'}
                          </div>
                        </IonNote>
                      )}
                    <IonLabel className="ion-text-wrap">
                      <h2>{c.SortableFullName?.replace('&amp;', '&')} </h2>{' '}
                      Geboortedatum: {toDutchDate(c.Geboortedatum)}
                    </IonLabel>
                  </IonItem>
                );
              })}
          </IonList>
        )}
      </IonContent>

      <IonLoading
        isOpen={loadingCursusDeelnemers}
        message={'Even geduld aub, gegevens worden opgehaald'}
        duration={0}
      />
    </IonPage>
  );
};

export default RegistreerDeelnemersResultListModal;
