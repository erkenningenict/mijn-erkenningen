import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonLoading,
} from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import ErrorComponent from '../../components/ErrorComponent';

export interface Attributes {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  archivedDate?: any;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface StrapiObject {
  data: Data[];
  meta: Meta;
}

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<StrapiObject | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // filter on archivedDate is null and sort descending on updatedAt (last edited item at the top)
      const response = await fetch(
        `${process.env.REACT_APP_ERKENNINGEN_CONTENT_API_URL}/news-items?filters[archivedDate][$null]=true&sort[0]=updatedAt%3Adesc`,
      );
      const data = await response.json();
      if (data.error) {
        setHasError(true);
      } else {
        setHasError(false);
      }
      setNewsItems(data);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetcher = async () => {
      await fetchData();
    };
    fetcher();
  }, [fetchData]);

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await fetchData();
    } catch (error) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nieuws</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            <IonLabel>Nieuws</IonLabel>
          </IonListHeader>
          {hasError && (
            <IonItem>
              <IonLabel className="ion-text-wrap">
                Kon nieuws niet ophalen. Probeer het later opnieuw.
              </IonLabel>
            </IonItem>
          )}
          {newsItems?.data?.map((item) => (
            <IonItem key={item.id} routerLink={`/nieuws-item/${item.id}`}>
              <IonLabel className="ion-text-wrap">
                {item.attributes.title}
              </IonLabel>
            </IonItem>
          ))}
          {newsItems?.data?.length === 0 && (
            <IonItem>
              <IonLabel className="ion-text-wrap">
                Er is momenteel geen nieuws.
              </IonLabel>
            </IonItem>
          )}
        </IonList>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
      {isLoading && (
        <IonLoading
          isOpen={true}
          message={'Even geduld aub, gegevens worden opgehaald'}
          duration={0}
        />
      )}
    </IonPage>
  );
};

export default NewsPage;
