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
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ErrorComponent from '../../../components/ErrorComponent';
import { SimpleFilter } from '../../../contexts/FilterSettings';
import { SelectedLicense } from '../../../contexts/SelectedLicenseContext';
import { toDutchDate } from '../../../helpers/date-helpers';
import { toDutchMoney } from '../../../helpers/format-money';
import {
  useApp_GetCursusSessiesQuery,
  useApp_GetListsQuery,
  useApp_GetMyQuery,
} from '../../../__generated__/graphql';
import {
  OpLocatieListFilterModal,
  OpLocatieFilters,
} from './OpLocatieListFilterModal';

const OpLocatieList: React.FC = () => {
  const { search } = useLocation();
  const { license } = SelectedLicense.useContainer();
  const { filterSettings, setFilterSettings } = SimpleFilter.useContainer();

  const [searchText, setSearchText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const {
    loading: loadingMy,
    error: myError,
    data: myData,
  } = useApp_GetMyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const postcodeCijfers =
    filterSettings.postcode && filterSettings.postcode.match(/^\d{4}/)
      ? +filterSettings.postcode.substring(0, 4)
      : undefined;

  const { loading, error, data, refetch } = useApp_GetCursusSessiesQuery({
    variables: {
      input: {
        isOnlineCourse: false,
        themeId: filterSettings.themaId,
        competenceId: filterSettings.competentieId,
        knowledgeAreaId: filterSettings.sectorId,
        from: filterSettings.datumVanaf,
        to: filterSettings.datumTot,
        distanceRadius: filterSettings.afstand,
        zipcodeNumbers: postcodeCijfers,
        isWebinar: false,
      },
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const { error: errorLists, data: dataLists } = useApp_GetListsQuery({
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    const userPostcode = myData?.my?.Persoon.Contactgegevens.Postcode;
    if (filterSettings.postcode === '') {
      setFilterSettings({
        ...filterSettings,
        postcode: userPostcode ?? '',
      });
    }
  }, [myData, filterSettings, setFilterSettings]);

  if (error || errorLists) {
    console.log('#DH# my errors', error, myError);
    return <ErrorComponent error={error} />;
  }
  if (myError) {
    console.log('#DH# my errors', error, myError);
    return <ErrorComponent error={myError} />;
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await refetch();
    } catch (error) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  const opLocatie = data?.CursusSessies;

  const handleSetFilterValues = (values: OpLocatieFilters) => {
    setFilterSettings({
      competentieId: values.competentieId,
      sectorId: values.sectorId,
      themaId: values.themaId,
      datumVanaf: values.datumVanaf,
      datumTot: values.datumTot,
      dateSet: new Date(),
      afstand: values.afstand,
      postcode: values.postcode,
    });
  };

  const checkFilterSettings = (): string => {
    let themaFilter = '';
    if (filterSettings.themaId !== 0) {
      themaFilter =
        `Thema: ${
          dataLists?.Themas.find((t) => t.ThemaID === filterSettings.themaId)
            ?.Naam
        }` ?? '';
    }
    let competentieFilter = '';
    if (filterSettings.competentieId !== 0) {
      competentieFilter =
        `Bijeenkomsttype: ${
          dataLists?.Competenties.find(
            (c) => c.CompetentieID === filterSettings.competentieId,
          )?.Naam
        }` ?? '';
    }
    let sectorFilter = '';
    if (filterSettings.sectorId !== 0) {
      sectorFilter =
        `Sector: ${
          dataLists?.Kennisgebieden.find(
            (k) => k.KennisgebiedID === filterSettings.sectorId,
          )?.Naam
        }` ?? '';
    }
    let afstand = '';
    if (filterSettings.afstand !== 0) {
      afstand = `Afstand: ${filterSettings.afstand} km`;
    }
    const dateFilters = `${toDutchDate(
      filterSettings.datumVanaf,
    )} - ${toDutchDate(filterSettings.datumTot)}`;
    const res = [
      themaFilter,
      competentieFilter,
      sectorFilter,
      afstand,
      dateFilters,
    ]
      .filter((x) => x !== '')
      .join(', ');
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
            <div style={{ fontSize: '80%' }}>Bijeenkomsten op locatie</div>
            <div
              style={{
                fontSize: '60%',
                fontWeight: 'normal',
                marginTop: '5px',
              }}
            >
              {opLocatie && opLocatie?.length > 0
                ? `${opLocatie?.length} gevonden`
                : ''}
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSearchbar
          placeholder="Zoek op titel, aanbieder of plaats"
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

        {opLocatie?.length === 0 && (
          <IonListHeader>
            <div className="mt-2">
              <div style={{ fontSize: '80%' }}>
                Er zijn geen bijeenkomsten op locatie gevonden.
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

        {opLocatie && opLocatie?.length > 0 && (
          <IonList>
            {opLocatie
              ?.filter((c) => {
                if (searchText === '') {
                  return true;
                }
                if (
                  c.Title.toLowerCase().includes(searchText) ||
                  c.LocationAddress?.City?.toLowerCase().includes(searchText) ||
                  c.Organizer?.toLowerCase().includes(searchText)
                ) {
                  return true;
                }
                return false;
              })
              .map((c) => {
                return (
                  <IonItem
                    key={`${c.CourseCode}${c.Date}${c.StartTime}`}
                    routerLink={`/op-locatie/${c.CourseId}${search}`}
                  >
                    <IonLabel className="ion-text-wrap">
                      <h2>{c.Title.replace('&amp;', '&')}</h2>
                      <p>
                        {c.Organizer} | {c.LocationAddress?.City}
                      </p>
                      <h3>
                        {toDutchDate(c.Date)} {c.StartTime}
                        {' - '}
                        {c.EndTime}
                        {' | '}
                        {toDutchMoney(c.Price, { euroPrefix: true })}
                      </h3>
                    </IonLabel>
                  </IonItem>
                );
              })}
          </IonList>
        )}
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        swipeToClose={true}
        onDidDismiss={() => setShowFilterModal(false)}
      >
        <OpLocatieListFilterModal
          dismissModal={() => {
            setShowFilterModal(false);
          }}
          onFilter={handleSetFilterValues}
        />
      </IonModal>
      {(loading || loadingMy) && (
        <IonLoading
          isOpen={true}
          message={'Even geduld aub, gegevens worden opgehaald'}
          duration={0}
        />
      )}
    </IonPage>
  );
};

export default OpLocatieList;
