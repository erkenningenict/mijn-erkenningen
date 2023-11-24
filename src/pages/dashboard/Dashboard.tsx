import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonLoading,
} from '@ionic/react';
import React from 'react';
import { RefresherEventDetail } from '@ionic/core';
import { useApp_GetMyQuery } from '../../__generated__/graphql';
import ErrorComponent from '../../components/ErrorComponent';
import GeldigeLicentiesPage from './geldige-licenties/GeldigeLicenties';
import { ApplicationRolesEnum } from '../../enums/enums';
import AankomendeBijeenkomsten from './hoogleraar/AankomendeBijeenkomsten';

const DashboardPage: React.FC = () => {
  const { loading, error, data, refetch } = useApp_GetMyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await refetch();
    } catch (err) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading
          isOpen={loading}
          message={'Even geduld aub, gegevens worden opgehaald'}
          duration={0}
        />
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {data?.my?.Roles?.find(
          (r) =>
            r === ApplicationRolesEnum.Hoogleraar ||
            r === ApplicationRolesEnum.Aanwezigheidsregistratie,
        ) && <AankomendeBijeenkomsten />}

        {data?.my?.Roles?.find((r) => r === ApplicationRolesEnum.Student) &&
          data?.my?.Certificeringen &&
          data?.my?.Certificeringen.length > 0 && (
            <GeldigeLicentiesPage
              certificeringen={data?.my?.Certificeringen}
            ></GeldigeLicentiesPage>
          )}
      </IonContent>
    </IonPage>
  );
};
export default DashboardPage;
