import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonModal,
  IonListHeader,
} from '@ionic/react';
import { add, qrCode, card, personOutline } from 'ionicons/icons';
// import { RegistreerDeelnemerByQRModal } from './RegistreerDeelnemerByQRModal';
import { RegistreerDeelnemerByManualModal } from './RegistreerDeelnemerByManualModal';
import { RegistreerDeelnemerByCardModal } from './RegistreerDeelnemerByCardModal';

import React, { useState } from 'react';
import { useParams } from 'react-router';

import ErrorComponent from '../../../components/ErrorComponent';
import {
  CursusDeelnameStatusEnum,
  useApp_GetCursusDeelnemersQuery,
  useApp_GetCursusInfoForHoogleraarQuery,
} from '../../../__generated__/graphql';
import { toDutchDate } from '../../../helpers/date-helpers';
import { isSameDay } from 'date-fns';

const DeelnemersListPage: React.FC = () => {
  const { cursusId } = useParams<{ cursusId: string }>();
  const [searchText, setSearchText] = useState('');

  // const [
  //   showRegistreerDeelnemerByQRModal,
  //   setShowRegistreerDeelnemerByQRModal,
  // ] = useState<boolean>(false);

  const [ShowRegistreerDeelnemerByManual, setShowRegistreerDeelnemerByManual] =
    useState<boolean>(false);

  const [
    showRegistreerDeelnemerByCardModal,
    setShowRegistreerDeelnemerByCardModal,
  ] = useState<boolean>(false);

  const {
    loading: loadingDeelnemers,
    error: errorDeelnemers,
    data: dataDeelnemers,
    refetch: refetchDeelnemers,
  } = useApp_GetCursusDeelnemersQuery({
    variables: {
      input: { CursusID: +cursusId },
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const {
    loading: loadingCursusDetails,
    error: errorCursusDetails,
    data: cursusDetails,
  } = useApp_GetCursusInfoForHoogleraarQuery({
    variables: {
      input: {
        cursusId: +cursusId,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: !!0,
  });

  if (errorDeelnemers) {
    return <ErrorComponent error={errorDeelnemers} />;
  }
  if (errorCursusDetails) {
    return <ErrorComponent error={errorCursusDetails} />;
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await refetchDeelnemers();
    } catch (error) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  const eersteSessie = cursusDetails?.GetCursusInfoForHoogleraar?.Sessies?.[0];
  const cursusIsVandaag = isSameDay(
    new Date(eersteSessie?.DatumBegintijd),
    new Date(),
  );

  const aanwezigeDeelnemers = dataDeelnemers?.GetCursusDeelnemers?.filter(
    (d) => d.Status === CursusDeelnameStatusEnum.Aanwezig,
  );

  const aangemeldeDeelnemers = dataDeelnemers?.GetCursusDeelnemers?.filter(
    (d) => d.Status === CursusDeelnameStatusEnum.Aangemeld,
  );

  const overigeDeelnemers =
    dataDeelnemers?.GetCursusDeelnemers?.filter(
      (d) =>
        d.Status !== CursusDeelnameStatusEnum.Aangemeld &&
        d.Status !== CursusDeelnameStatusEnum.Aanwezig &&
        d.Status !== CursusDeelnameStatusEnum.Afgemeld,
    ) || [];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/registreer-deelnemers"></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <div style={{ fontSize: '80%' }}>Deelnemersoverzicht</div>
            <div
              style={{
                fontSize: '60%',
                fontWeight: 'normal',
                marginTop: '5px',
              }}
            >
              {aanwezigeDeelnemers && aanwezigeDeelnemers?.length > 0
                ? `${aanwezigeDeelnemers?.length} aanwezig`
                : ''}
              {aangemeldeDeelnemers && aangemeldeDeelnemers?.length > 0
                ? ` / ${aangemeldeDeelnemers?.length} aangemeld`
                : ''}
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {!loadingDeelnemers && !loadingCursusDetails && (
        <IonContent>
          <IonSearchbar
            placeholder="Filter op naam"
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value?.toLowerCase()!)}
          ></IonSearchbar>

          {!cursusIsVandaag && overigeDeelnemers?.length === 0 && (
            <IonList>
              <IonItem>
                <IonLabel className="ion-text-wrap" color="danger">
                  Aanwezig melden is alleen mogelijk op de dag van de
                  bijeenkomst.
                </IonLabel>
              </IonItem>
            </IonList>
          )}

          {overigeDeelnemers && overigeDeelnemers?.length > 0 && (
            <>
              <IonList>
                <IonListHeader>
                  <IonLabel>Betaalde of voorlopig gemelde deelnemers</IonLabel>
                </IonListHeader>
                <IonItem>
                  <IonLabel color="danger" className="ion-text-wrap">
                    Aanwezig melden of aanwezigheid bewerken is niet mogelijk
                    omdat deelnemers de status 'voorlopig' of 'betaald' hebben.
                    Ga naar de site voor meer opties.
                  </IonLabel>
                </IonItem>
                {overigeDeelnemers
                  ?.filter((c) => {
                    if (searchText === '') {
                      return true;
                    }
                    if (
                      c.Persoon?.SortableFullName?.toLowerCase().includes(
                        searchText,
                      )
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((c) => {
                    return (
                      <IonItem key={c.CursusDeelnameID}>
                        <IonLabel className="ion-text-wrap">
                          <h2>
                            {c.Persoon?.SortableFullName?.replace('&amp;', '&')}
                          </h2>
                          <span>{toDutchDate(c.Persoon?.Geboortedatum)}</span>
                          <p>Status: {c.Status}</p>
                        </IonLabel>
                      </IonItem>
                    );
                  })}
              </IonList>
            </>
          )}

          {overigeDeelnemers?.length === 0 && (
            <>
              <IonList>
                <IonListHeader>
                  <IonLabel>Aanwezig</IonLabel>
                </IonListHeader>
                {aanwezigeDeelnemers && aanwezigeDeelnemers.length === 0 && (
                  <IonItem>
                    <IonLabel className="ion-text-wrap">
                      Er zijn geen aanwezige deelnemers.
                    </IonLabel>
                  </IonItem>
                )}
                {aanwezigeDeelnemers && aanwezigeDeelnemers?.length > 0 && (
                  <>
                    {aanwezigeDeelnemers
                      ?.filter((c) => {
                        if (searchText === '') {
                          return true;
                        }
                        if (
                          c.Persoon?.SortableFullName?.toLowerCase().includes(
                            searchText,
                          )
                        ) {
                          return true;
                        }
                        return false;
                      })
                      .map((c) => {
                        return (
                          <IonItem
                            key={c.CursusDeelnameID}
                            routerLink={`/registreer-deelnemers/cursus/${cursusId}/deelnemer/${c.Persoon?.PersoonID}`}
                          >
                            <IonLabel className="ion-text-wrap">
                              <h2>
                                {c.Persoon?.SortableFullName?.replace(
                                  '&amp;',
                                  '&',
                                )}
                              </h2>
                              <span>
                                {toDutchDate(c.Persoon?.Geboortedatum)}
                              </span>
                            </IonLabel>
                          </IonItem>
                        );
                      })}
                  </>
                )}
              </IonList>

              <IonListHeader>
                <IonLabel>Verwachte deelnemers</IonLabel>
              </IonListHeader>
              <IonList>
                {aangemeldeDeelnemers && aangemeldeDeelnemers.length === 0 && (
                  <IonItem>
                    <IonLabel className="ion-text-wrap">
                      Er zijn geen verwachte deelnemers.
                    </IonLabel>
                  </IonItem>
                )}

                {aangemeldeDeelnemers && aangemeldeDeelnemers?.length > 0 && (
                  <>
                    {aangemeldeDeelnemers
                      ?.filter((c) => {
                        if (searchText === '') {
                          return true;
                        }
                        if (
                          c.Persoon?.SortableFullName?.toLowerCase().includes(
                            searchText,
                          )
                        ) {
                          return true;
                        }
                        return false;
                      })
                      .map((c) => {
                        return (
                          <IonItem
                            key={c.CursusDeelnameID}
                            routerLink={`/registreer-deelnemers/cursus/${cursusId}/deelnemer/${c.Persoon?.PersoonID}`}
                          >
                            <IonLabel className="ion-text-wrap">
                              <h2>
                                {c.Persoon?.SortableFullName?.replace(
                                  '&amp;',
                                  '&',
                                )}
                              </h2>
                              <span>
                                {toDutchDate(c.Persoon?.Geboortedatum)}
                              </span>
                            </IonLabel>
                          </IonItem>
                        );
                      })}
                  </>
                )}
              </IonList>
            </>
          )}

          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          {/* Deelnemer toevoegen */}
          {cursusIsVandaag && overigeDeelnemers.length === 0 && (
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton>
                <IonIcon icon={add} />
              </IonFabButton>
              <IonFabList side="top">
                <IonFabButton
                  onClick={() => setShowRegistreerDeelnemerByManual(true)}
                >
                  <IonIcon icon={personOutline} />
                </IonFabButton>
                <IonFabButton
                  onClick={() => setShowRegistreerDeelnemerByCardModal(true)}
                >
                  <IonIcon icon={card} />
                </IonFabButton>
                {/* <IonFabButton
                  onClick={() => setShowRegistreerDeelnemerByQRModal(true)}
                >
                  <IonIcon icon={qrCode} />
                </IonFabButton> */}
              </IonFabList>
            </IonFab>
          )}

          {/* <IonModal
            isOpen={showRegistreerDeelnemerByQRModal}
            onDidDismiss={() => setShowRegistreerDeelnemerByQRModal(false)}
          >
            <RegistreerDeelnemerByQRModal
              dismissModal={() => {
                setShowRegistreerDeelnemerByQRModal(false);
              }}
            />
          </IonModal> */}

          <IonModal
            isOpen={ShowRegistreerDeelnemerByManual}
            onDidDismiss={() => setShowRegistreerDeelnemerByManual(false)}
          >
            <RegistreerDeelnemerByManualModal
              dismissModal={(event: any) => {
                console.log(
                  'dismissModal RegistreerDeelnemerByManualInput',
                  event,
                );
                setShowRegistreerDeelnemerByManual(false);
              }}
            />
          </IonModal>

          <IonModal
            isOpen={showRegistreerDeelnemerByCardModal}
            onDidDismiss={() => setShowRegistreerDeelnemerByCardModal(false)}
          >
            <RegistreerDeelnemerByCardModal
              dismissModal={() => {
                setShowRegistreerDeelnemerByCardModal(false);
              }}
            />
          </IonModal>
        </IonContent>
      )}
      <IonLoading
        isOpen={loadingDeelnemers || loadingCursusDetails}
        message={'Even geduld aub, gegevens worden opgehaald'}
        duration={0}
      />
    </IonPage>
  );
};

export default DeelnemersListPage;
