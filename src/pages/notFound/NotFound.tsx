import React from 'react';
import {
  IonCard,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonPage,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router';
import { IsOffline } from '../../contexts/OfflineContext';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { offline } = IsOffline.useContainer();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Niet gevonden</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Niet gevonden</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Oeps, waar u naar toe wilde gaan is niet gevonden:{' '}
              {location.pathname}. Controleer de pagina waar u naar toe wilde
              gaan.
            </p>
            <IonButton onClick={() => history.replace('/home')}>
              Ga naar home
            </IonButton>
            {!offline && (
              <IonButton onClick={() => window.location.reload()}>
                Probeer het opnieuw
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
