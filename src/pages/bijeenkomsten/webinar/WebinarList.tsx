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
import { toDutchDate } from '../../../helpers/date-helpers';
import { toDutchMoney } from '../../../helpers/format-money';
import {
  useApp_GetCursusSessiesQuery,
  useApp_GetListsQuery,
} from '../../../__generated__/graphql';
import {
  WebinarFilters,
  WebinarListFilterModal,
} from './WebinarListFilterModal';

const WebinarList: React.FC = () => {
  const { filterSettings, setFilterSettings } = SimpleFilter.useContainer();
  const { license } = SelectedLicense.useContainer();

  const [searchText, setSearchText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { loading, error, data, refetch } = useApp_GetCursusSessiesQuery({
    variables: {
      input: {
        isOnlineCourse: false,
        themeId: filterSettings.themaId,
        competenceId: filterSettings.competentieId,
        knowledgeAreaId: filterSettings.sectorId,
        from: filterSettings.datumVanaf,
        to: filterSettings.datumTot,
        isWebinar: true,
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

  const webinars = data?.CursusSessies;

  const handleSetFilterValues = (values: WebinarFilters) => {
    setFilterSettings({
      competentieId: values.competentieId,
      sectorId: values.sectorId,
      themaId: values.themaId,
      datumVanaf: values.datumVanaf,
      datumTot: values.datumTot,
      dateSet: new Date(),
      afstand: filterSettings.afstand,
      postcode: filterSettings.postcode,
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
    let competentieFilter = '';
    if (filterSettings.competentieId !== 0) {
      competentieFilter =
        `Bijeenkomsttype: ${dataLists?.Competenties.find(
          (c) => c.CompetentieID === filterSettings.competentieId,
        )?.Naam}` ?? '';
    }
    let sectorFilter = '';
    if (filterSettings.sectorId !== 0) {
      sectorFilter =
        `Sector: ${dataLists?.Kennisgebieden.find(
          (k) => k.KennisgebiedID === filterSettings.sectorId,
        )?.Naam}` ?? '';
    }
    const dateFilters = `${toDutchDate(
      filterSettings.datumVanaf,
    )} - ${toDutchDate(filterSettings.datumTot)}`;
    const res = [themaFilter, competentieFilter, sectorFilter, dateFilters]
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
            <div style={{ fontSize: '80%' }}>Webinars</div>
            <div
              style={{
                fontSize: '60%',
                fontWeight: 'normal',
                marginTop: '5px',
              }}
            >
              {webinars && webinars?.length > 0
                ? `${webinars?.length} gevonden`
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
          placeholder="Zoek op titel of aanbieder"
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

        {webinars?.length === 0 && (
          <IonListHeader>
            <div className="mt-2">
              <div style={{ fontSize: '80%' }}>
                Er zijn geen webinars gevonden.
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

        {webinars && webinars?.length > 0 && (
          <IonList>
            {webinars
              ?.filter((c) => {
                if (searchText === '') {
                  return true;
                }
                if (
                  c.Title.toLowerCase().includes(searchText) ||
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
                    routerLink={`/webinar/${c.CourseId}`}
                  >
                    <IonLabel className="ion-text-wrap">
                      <h2>{c.Title.replace('&amp;', '&')}</h2>
                      <p>{c.Organizer}</p>
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
      </IonContent>
      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      >
        <WebinarListFilterModal
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

export default WebinarList;
