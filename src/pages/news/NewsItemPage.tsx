import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonLoading,
} from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import './NewsItemPage.css';
import { toDutchDate } from '../../helpers/date-helpers';

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

export interface Meta {}

export interface StrapiObject {
  data: Data;
  meta: Meta;
}

const NewsItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<StrapiObject | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_ERKENNINGEN_CONTENT_API_URL}/news-items/${id}`,
      );
      const data = await response.json();
      if (data.error) {
        setHasError(true);
      } else {
        setHasError(false);
      }
      setNewsItem(data);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const fetcher = async () => {
      await fetchData();
    };
    fetcher();
  }, [fetchData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/nieuws"></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nieuws bericht</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {newsItem && !hasError && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{newsItem.data?.attributes.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ReactMarkdown
                components={{
                  a: ({ node, children, ...props }) => {
                    if (props.href?.includes('http')) {
                      props.target = '_blank';
                      props.rel = 'noopener noreferrer';
                    }
                    return <a {...props}>{children}</a>;
                  },
                }}
              >
                {newsItem.data?.attributes.content}
              </ReactMarkdown>
              <p>
                <i>
                  Laatst bijgewerkt:{' '}
                  {toDutchDate(newsItem.data.attributes.updatedAt)}
                </i>
              </p>
            </IonCardContent>
          </IonCard>
        )}
        {hasError && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Fout opgetreden</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Bij het ophalen van het nieuwsbericht is een fout opgetreden.
              Probeer het later opnieuw.
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
      <IonLoading
        isOpen={isLoading}
        message={'Even geduld aub, gegevens worden opgehaald'}
        duration={0}
      />
    </IonPage>
  );
};

export default NewsItemPage;
