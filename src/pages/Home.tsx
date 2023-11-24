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
  IonButton,
} from '@ionic/react';
import React from 'react';
import './Home.css';
import { getAuthState } from '../helpers/authState';

const HomePage: React.FC = () => {
  const authContext = getAuthState();
  const unAuthContent =
    'Log in om uw gegevens te kunnen zien en om bijeenkomsten te zoeken en aan te melden en meer.';
  const studentContent =
    'Bekijk uw licenties en zoek bijeenkomsten om u voor aan te melden.';
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <img
              style={{ borderRadius: '5px' }}
              className="logo"
              alt="Logo Bureau Erkenningen"
              src="assets/BE-logo.svg"
            />
            <IonCardTitle style={{ fontSize: '20px' }}>
              Bureau Erkenningen app
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              {!authContext?.isAuthenticated
                ? unAuthContent
                : authContext?.roles?.includes('Student')
                ? studentContent
                : 'Log in om uw gegevens te kunnen bekijken.'}
            </p>
          </IonCardContent>
        </IonCard>

        {!authContext?.isAuthenticated ? (
          <section>
            <IonButton expand="block" routerLink="/inloggen">
              Ga naar inloggen
            </IonButton>
          </section>
        ) : (
          <section>
            <IonButton expand="block" routerLink="/dashboard">
              Ga naar uw dashboard
            </IonButton>
          </section>
        )}

        {/* <IonList lines="none">
          <IonListHeader>
            <IonLabel>Resources</IonLabel>
          </IonListHeader>
          <IonItem href="https://ionicframework.com/docs/" target="_blank">
            <IonIcon slot="start" color="medium" icon={book} />
            <IonLabel>Ionic Documentation</IonLabel>
          </IonItem>
          <IonItem href="/dashboard">
            <IonIcon slot="start" color="medium" icon={build} />
            <IonLabel>Login</IonLabel>
          </IonItem>
          <IonItem
            href="https://ionicframework.com/docs/layout/structure"
            target="_blank"
          >
            <IonIcon slot="start" color="medium" icon={grid} />
            <IonLabel>Change Your App Layout</IonLabel>
          </IonItem>
          <IonItem
            href="https://ionicframework.com/docs/theming/basics"
            target="_blank"
          >
            <IonIcon slot="start" color="medium" icon={colorFill} />
            <IonLabel>Theme Your App</IonLabel>
            <IonButton routerLink="/over"> Over</IonButton>
          </IonItem>
        </IonList> */}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
