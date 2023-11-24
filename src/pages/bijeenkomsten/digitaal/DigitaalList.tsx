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
import ErrorComponent from '../../../components/ErrorComponent';
import { SimpleFilter } from '../../../contexts/FilterSettings';
import { SelectedLicense } from '../../../contexts/SelectedLicenseContext';
import { toDutchMoney } from '../../../helpers/format-money';
import {
  useApp_GetListsQuery,
  useApp_GetSearchSpecialtiesQuery,
} from '../../../__generated__/graphql';
import {
  DigitaalFilters,
  DigitaalListFilterModal,
} from './DigitaalListFilterModal';

const DigitaalList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const { license } = SelectedLicense.useContainer();
  const { filterSettings, setFilterSettings } = SimpleFilter.useContainer();

  const [showFilterModal, setShowFilterModal] = useState(false);

  const { loading, error, data, refetch } = useApp_GetSearchSpecialtiesQuery({
    variables: {
      input: {
        themeId: filterSettings.themaId,
        knowledgeAreaId: filterSettings.sectorId,
        isOnlineCourse: true,
      },
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const { error: errorLists, data: dataLists } = useApp_GetListsQuery({
    fetchPolicy: 'cache-first',
  });

  if (error || errorLists) {
    return <ErrorComponent error={error} />;
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await refetch();
    } catch (error) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  const digitaleBijeenkomsten = data?.SearchSpecialties;

  const handleSetFilterValues = (values: DigitaalFilters) => {
    console.log('filterSettings   %o', filterSettings);

    setFilterSettings({
      ...filterSettings,
      sectorId: values.sectorId,
      themaId: values.themaId,
    });
  };

  const checkFilterSettings = (): string => {
    let themaFilter = '';
    if (filterSettings.themaId !== 0) {
      themaFilter =
        `Thema: ${dataLists?.Themas.find(
          (t) => t.ThemaID === filterSettings.themaId,
        )?.Naam}` ?? '';
    }

    let sectorFilter = '';
    if (filterSettings.sectorId !== 0) {
      sectorFilter =
        `Sector: ${dataLists?.Kennisgebieden.find(
          (k) => k.KennisgebiedID === filterSettings.sectorId,
        )?.Naam}` ?? '';
    }

    const res = [themaFilter, sectorFilter].filter((x) => x !== '').join(', ');
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
            <div style={{ fontSize: '80%' }}>Digitale bijeenkomsten</div>
            <div
              style={{
                fontSize: '60%',
                fontWeight: 'normal',
                marginTop: '5px',
              }}
            >
              {digitaleBijeenkomsten && digitaleBijeenkomsten?.length > 0
                ? `${digitaleBijeenkomsten?.length} gevonden`
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
          placeholder="Zoek op titel of plaats"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value?.toLowerCase()!)}
        ></IonSearchbar>

        <IonListHeader>
          <IonLabel onClick={() => setShowFilterModal(true)}>
            <div className="text-sm">
              Licentie: {license?.Certificaat?.Naam}
            </div>
            <div>
              Filter:{' '}
              <span style={{ fontSize: '70%', fontWeight: 'normal' }}>
                {checkFilterSettings()}
              </span>
            </div>
          </IonLabel>
        </IonListHeader>

        {digitaleBijeenkomsten?.length === 0 && (
          <IonListHeader>
            <div className="mt-2">
              <div style={{ fontSize: '80%' }}>
                Er zijn geen digitale bijeenkomsten gevonden.
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
        {digitaleBijeenkomsten && digitaleBijeenkomsten?.length > 0 && (
          <IonList>
            {digitaleBijeenkomsten
              ?.filter((c) => {
                if (searchText === '') {
                  return true;
                }
                if (c.Title.toLowerCase().includes(searchText)) {
                  return true;
                }
                return false;
              })
              .map((c) => {
                return (
                  <IonItem
                    key={c.SpecialtyId}
                    routerLink={`/digitale-bijeenkomsten/${c.SpecialtyId}`}
                  >
                    <IonLabel className="ion-text-wrap">
                      <h2>{c.Title.replace('&amp;', '&')}</h2>

                      <p>{c.Organizer}</p>
                      <h3>{toDutchMoney(c.Price, { euroPrefix: true })}</h3>
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
        <DigitaalListFilterModal
          dismissModal={() => {
            setShowFilterModal(false);
          }}
          onFilter={handleSetFilterValues}
        />
      </IonModal>
      <IonLoading
        isOpen={loading}
        message={'Even geduld aub, gegevens worden opgehaald'}
        duration={0}
      />
    </IonPage>
  );
};

export default DigitaalList;
