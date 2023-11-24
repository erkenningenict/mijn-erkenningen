import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import React from 'react';

const InvoicesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Facturen</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Facturen</IonCardTitle>
            <IonCardSubtitle>Mijn facturen</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Welkom{' '}
              {/* {`${user?.Initials} ${
                user && user.Insertion?.length > 0 ? `${user?.Insertion}` : '' */}
              {/* } ${user?.LastName}`} */}
            </p>
            <IonButton routerLink="/over"> Over</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default InvoicesPage;
