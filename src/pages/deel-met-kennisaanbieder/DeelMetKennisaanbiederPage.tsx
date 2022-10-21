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
  IonNote,
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
import { ViewFilterKennisaanbieder } from '../../contexts/FilterSettingsDeelMetKennisaanbieder';
import { ViewFilterOptionsEnum } from '../../enums/enums';
import {
  useApp_VakgroepenQuery,
  useApp_GetPersoonVakgroepenQuery,
} from '../../__generated__/graphql';
import {
  DeelMetKennisaanbiederFilters,
  DeelMetKennisaanbiederFilterModal,
} from './DeelMetKennisaanbiederListFilterModal';

const DeelMetKennisaanbiederPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const { filterSettings, setFilterSettings } =
    ViewFilterKennisaanbieder.useContainer();

  const [showFilterModal, setShowFilterModal] = useState(false);

  const {
    loading: personListLoading,
    error: personListError,
    data: personListData,
    refetch: personListRefetch,
  } = useApp_GetPersoonVakgroepenQuery({
    variables: {},
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const {
    loading: handelshuisVestigingenLoading,
    error: handelshuisVestigingenError,
    data: dataVakgroepen,
  } = useApp_VakgroepenQuery({
    fetchPolicy: 'cache-first',
  });
  const persoonVakgroepen = personListData?.GetPersoonVakgroepenForPersoonId;

  if (personListError) {
    return <ErrorComponent error={personListError} />;
  }
  if (handelshuisVestigingenError) {
    return <ErrorComponent error={handelshuisVestigingenError} />;
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await personListRefetch();
    } catch (error) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  const handleSetFilterValues = (values: DeelMetKennisaanbiederFilters) => {
    setFilterSettings({
      ...filterSettings,
      viewFilterOption: values.viewFilter,
    });
  };

  const checkFilterSettings = (): string => {
    const res = [filterSettings.viewFilterOption].join(', ');
    return res === '' ? 'Geen filter van toepassing' : res;
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
            <div style={{ fontSize: '80%' }}>
              Deel met aanbieder ({dataVakgroepen?.Vakgroepen.length})
            </div>
            <div
              style={{
                fontSize: '60%',
                fontWeight: 'normal',
                marginTop: '5px',
              }}
            >
              {persoonVakgroepen && persoonVakgroepen?.length > 0
                ? `met ${persoonVakgroepen?.length} gedeeld`
                : ''}
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <>
          <IonSearchbar
            placeholder="Zoek op naam of plaats"
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value?.toLowerCase()!)}
          ></IonSearchbar>
          <IonListHeader>
            <IonLabel onClick={() => setShowFilterModal(true)}>
              Filter:{' '}
              <span style={{ fontSize: '80%', fontWeight: 'normal' }}>
                {checkFilterSettings()}
              </span>
            </IonLabel>
          </IonListHeader>

          {persoonVakgroepen?.length === 0 &&
            filterSettings.viewFilterOption ===
              ViewFilterOptionsEnum.sharedOnly && (
              <>
                <IonListHeader>
                  <IonLabel>U heeft uw gegevens nog niet gedeeld</IonLabel>
                </IonListHeader>
                <IonList>
                  <IonItem>
                    <IonLabel className="ion-text-wrap">
                      Deel uw gegevens door uit de lijst te kiezen uit de
                      kennisaanbieders
                    </IonLabel>
                  </IonItem>
                </IonList>
              </>
            )}

          <IonList>
            {dataVakgroepen?.Vakgroepen?.filter((hv) => {
              const persoonVakgroepRecord = persoonVakgroepen?.find(
                (phv) => phv.VakgroepID === hv.VakgroepID,
              );
              const matchOnNameAndCity =
                hv.Naam.toLowerCase().includes(searchText) ||
                hv.Contactgegevens.Woonplaats.toLowerCase().includes(
                  searchText,
                );
              switch (filterSettings.viewFilterOption) {
                case ViewFilterOptionsEnum.all:
                  if (searchText === '') {
                    return true;
                  }
                  if (matchOnNameAndCity) {
                    return true;
                  }
                  return false;

                case ViewFilterOptionsEnum.sharedOnly:
                  if (searchText === '') {
                    return persoonVakgroepRecord;
                  }
                  if (matchOnNameAndCity && persoonVakgroepRecord) {
                    return true;
                  }
                  return false;
                case ViewFilterOptionsEnum.notShared:
                  if (searchText === '') {
                    return !persoonVakgroepRecord;
                  }
                  if (matchOnNameAndCity && !persoonVakgroepRecord) {
                    return true;
                  }
                  return false;
                default:
                  return false;
              }
            }).map((hv) => {
              const persoonVakgroepRecord = persoonVakgroepen?.find(
                (phv) => phv.VakgroepID === hv.VakgroepID,
              );
              return (
                <IonItem
                  key={hv.VakgroepID}
                  routerLink={`/deel-met-kennisaanbieder/${hv.VakgroepID}/${persoonVakgroepRecord?.PersoonVakgroepID}`}
                >
                  <IonLabel className="ion-text-wrap">
                    <h2>{hv.Naam.replace('&amp;', '&')}</h2>
                    <p>{hv.Contactgegevens.Woonplaats}</p>
                  </IonLabel>

                  {persoonVakgroepRecord ? (
                    <IonNote color="primary" slot="end">
                      Gedeeld
                    </IonNote>
                  ) : null}
                </IonItem>
              );
            })}
          </IonList>

          {filterSettings.viewFilterOption ===
            ViewFilterOptionsEnum.sharedOnly && (
            <IonButton
              expand="block"
              style={{ margin: 14 }}
              type="button"
              onClick={() =>
                setFilterSettings({
                  viewFilterOption: ViewFilterOptionsEnum.all,
                })
              }
            >
              Toon alle kennisaanbieders
            </IonButton>
          )}
        </>
      </IonContent>
      <IonModal
        isOpen={showFilterModal}
        swipeToClose={true}
        onDidDismiss={() => setShowFilterModal(false)}
      >
        <DeelMetKennisaanbiederFilterModal
          dismissModal={() => {
            setShowFilterModal(false);
          }}
          onFilter={handleSetFilterValues}
        />
      </IonModal>
      {(handelshuisVestigingenLoading || personListLoading) && (
        <IonLoading
          isOpen={true}
          message={'Even geduld aub, gegevens worden opgehaald'}
          duration={0}
        />
      )}
    </IonPage>
  );
};

export default DeelMetKennisaanbiederPage;
