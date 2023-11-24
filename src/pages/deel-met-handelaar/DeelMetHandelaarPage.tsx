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
import { ViewFilterHandelaar } from '../../contexts/FilterSettingsDeelMetHandelaar';
import { ViewFilterOptionsEnum } from '../../enums/enums';
import {
  useApp_GetHandelshuisVestigingenQuery,
  useApp_GetPersoonHandelshuisVestigingenQuery,
} from '../../__generated__/graphql';
import {
  DeelMetKennisaanbiederFilters,
  DeelMetHandelaarFilterModal,
} from './DeelMetHandelaarListFilterModal';

const DeelMetHandelaarPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const { filterSettings, setFilterSettings } =
    ViewFilterHandelaar.useContainer();

  const [showFilterModal, setShowFilterModal] = useState(false);

  const {
    loading: personListLoading,
    error: personListError,
    data: personListData,
    refetch: personListRefetch,
  } = useApp_GetPersoonHandelshuisVestigingenQuery({
    variables: {},
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const {
    loading: handelshuisVestigingenLoading,
    error: handelshuisVestigingenError,
    data: dataHandelshuisVestigingen,
  } = useApp_GetHandelshuisVestigingenQuery({
    fetchPolicy: 'cache-first',
  });
  const persoonHandelshuisVestigingen =
    personListData?.GetPersoonHandelshuisvestigingenForPersoonId;

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
              Deel met handelaar (
              {dataHandelshuisVestigingen?.GetHandelshuisVestigingen.length})
            </div>
            <div
              style={{
                fontSize: '60%',
                fontWeight: 'normal',
                marginTop: '5px',
              }}
            >
              {persoonHandelshuisVestigingen &&
              persoonHandelshuisVestigingen?.length > 0
                ? `met ${persoonHandelshuisVestigingen?.length} gedeeld`
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

          {persoonHandelshuisVestigingen?.length === 0 &&
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
                      handelaren
                    </IonLabel>
                  </IonItem>
                </IonList>
              </>
            )}

          <IonList>
            {dataHandelshuisVestigingen?.GetHandelshuisVestigingen?.filter(
              (hv) => {
                const persoonHandelshuisRecord =
                  persoonHandelshuisVestigingen?.find(
                    (phv) =>
                      phv.HandelshuisVestigingID === hv.HandelshuisVestigingID,
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
                      return persoonHandelshuisRecord;
                    }
                    if (matchOnNameAndCity && persoonHandelshuisRecord) {
                      return true;
                    }
                    return false;
                  case ViewFilterOptionsEnum.notShared:
                    if (searchText === '') {
                      return !persoonHandelshuisRecord;
                    }
                    if (matchOnNameAndCity && !persoonHandelshuisRecord) {
                      return true;
                    }
                    return false;
                  default:
                    return false;
                }
              },
            ).map((hv) => {
              const persoonHandelshuisRecord =
                persoonHandelshuisVestigingen?.find(
                  (phv) =>
                    phv.HandelshuisVestigingID === hv.HandelshuisVestigingID,
                );
              return (
                <IonItem
                  key={hv.HandelshuisVestigingID}
                  routerLink={`/deel-met-handelaar/${hv.HandelshuisVestigingID}/${persoonHandelshuisRecord?.PersoonHandelshuisVestigingID}`}
                >
                  <IonLabel className="ion-text-wrap">
                    <h2>{hv.Naam.replace('&amp;', '&')}</h2>
                    <p>{hv.Contactgegevens.Woonplaats}</p>
                  </IonLabel>

                  {persoonHandelshuisRecord ? (
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
              Toon alle handelaren
            </IonButton>
          )}
        </>
      </IonContent>
      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      >
        <DeelMetHandelaarFilterModal
          dismissModal={() => {
            setShowFilterModal(false);
          }}
          onFilter={handleSetFilterValues}
        />
      </IonModal>
      <IonLoading
        isOpen={handelshuisVestigingenLoading || personListLoading}
        message={'Even geduld aub, gegevens worden opgehaald'}
        duration={0}
      />
    </IonPage>
  );
};

export default DeelMetHandelaarPage;
