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
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react';
import React, { useState } from 'react';
import ErrorComponent from '../../components/ErrorComponent';
import {
  FilterSettingsRegistreerDeelnemerCursussen,
  SimpleFilterSettingsRegistreerDeelnemerCursussen,
} from '../../contexts/FilterSettingsRegistreerDeelnemerCursussen';
import { toDutchDate, toDutchTime } from '../../helpers/date-helpers';
import { useApp_GetCursusSessiesForHoogleraarQuery } from '../../__generated__/graphql';
import { CursussenListFilter } from './CursussenListFilterModal';

const CursussenListPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const { filterSettings, setFilterSettings } =
    SimpleFilterSettingsRegistreerDeelnemerCursussen.useContainer();

  const [showFilterModal, setShowFilterModal] = useState(false);

  const {
    loading: loadingCursusSessies,
    error: errorCursusSessies,
    data: dataCursusSessies,
    refetch: refetchCursusSessies,
  } = useApp_GetCursusSessiesForHoogleraarQuery({
    variables: {
      input: {
        from: filterSettings.datumVanaf,
        to: filterSettings.datumTot,
      },
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  if (errorCursusSessies) {
    return <ErrorComponent error={errorCursusSessies} />;
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await refetchCursusSessies();
    } catch (error) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  const cursusSessies = dataCursusSessies?.GetCursusSessiesForHoogleraar;

  const handleSetFilterValues = (
    values: FilterSettingsRegistreerDeelnemerCursussen,
  ) => {
    setFilterSettings(values);
    refetchCursusSessies();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilterModal(true)}>
              Filter
            </IonButton>
          </IonButtons>
          <IonTitle>
            <div style={{ fontSize: '80%' }}>Selecteer bijeenkomst</div>
            <div
              style={{
                fontSize: '60%',
                fontWeight: 'normal',
                marginTop: '5px',
              }}
            >
              {cursusSessies && cursusSessies?.length > 0
                ? `${cursusSessies?.length} gevonden`
                : ''}
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonSearchbar
          placeholder="Zoek op titel of code"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value?.toLowerCase()!)}
        ></IonSearchbar>

        {cursusSessies?.length === 0 && (
          <IonListHeader>
            <div className="mt-2">
              <div style={{ fontSize: '80%' }}>
                Er zijn geen bijeenkomsten gevonden.
              </div>
              <div
                style={{
                  fontSize: '70%',
                  fontWeight: 'normal',
                  marginTop: '10px',
                }}
              >
                Controleer de filter instellingen.
              </div>
            </div>
          </IonListHeader>
        )}
        {cursusSessies && cursusSessies?.length > 0 && (
          <IonList>
            <IonListHeader>
              <IonLabel>Bijeenkomsten</IonLabel>
            </IonListHeader>
            {cursusSessies
              ?.filter((c) => {
                if (searchText === '') {
                  return true;
                }
                if (
                  c.Cursus?.Titel?.toLowerCase().includes(searchText) ||
                  c.Cursus?.CursusCode?.includes(searchText)
                ) {
                  return true;
                }
                return false;
              })
              .map((c) => {
                return (
                  <IonItem
                    key={c.SessieID}
                    routerLink={`/registreer-deelnemers/cursus/${c.Cursus?.CursusID}`}
                  >
                    <IonLabel className="ion-text-wrap">
                      <h2>{c.Cursus?.Titel?.replace('&amp;', '&')}</h2>
                      <p style={{ margin: '10px 0', fontWeight: 'bold' }}>
                        {toDutchDate(c.DatumBegintijd, { includeTime: true })} -{' '}
                        {toDutchTime(c.DatumEindtijd)}
                      </p>
                      <p>
                        {c.Cursus?.CursusCode}
                        {c.Cursus?.IsBesloten && (
                          <span> - Besloten bijeenkomst</span>
                        )}
                      </p>
                      <p style={{ margin: '10px 0' }}>
                        {c.Lokatie?.Naam}{' '}
                        {c.Lokatie?.Naam !== 'Webinar' &&
                          c.Lokatie?.Naam !== 'Online cursus' &&
                          ' | '}
                        {c.Lokatie?.Contactgegevens.Woonplaats}
                      </p>
                    </IonLabel>
                  </IonItem>
                );
              })}
          </IonList>
        )}
      </IonContent>
      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      >
        <CursussenListFilter
          dismissModal={() => {
            setShowFilterModal(false);
          }}
          onFilter={handleSetFilterValues}
        />
      </IonModal>
      <IonLoading
        isOpen={loadingCursusSessies}
        message={'Even geduld aub, gegevens worden opgehaald'}
        duration={0}
      />
    </IonPage>
  );
};

export default CursussenListPage;
