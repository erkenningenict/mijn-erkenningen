import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonPage,
  IonListHeader,
  IonList,
  IonLabel,
  IonItem,
} from '@ionic/react';
import './About.css';

export const AboutPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Over deze app</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard className="welcome-card">
          <img
            style={{ margin: '20px 0 0px 20px', borderRadius: '5px' }}
            className="logo"
            alt="Logo Bureau Erkenningen"
            src="assets/BE-logo.svg"
          />
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: '20px' }}>
              Bureau Erkenningen app
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              De Bureau Erkenningen app geeft inzicht in uw licenties, passen,
              studievordering, aankomende bijeenkomsten en bezochte
              bijeenkomsten.
            </p>
            <br />
            <p>
              Uw inloggegevens zijn hetzelfde als op de{' '}
              <a
                href="https://administratie.erkenningen.nl"
                target="_blank"
                rel="noreferrer"
              >
                Bureau Erkenningen website
              </a>
              .
            </p>
            <p>
              Uw wachtwoord wijzigt u via deze{' '}
              <a
                href="https://administratie.erkenningen.nl/Default.aspx?tabid=143"
                target="_blank"
                rel="noreferrer"
              >
                link
              </a>
              .
            </p>
            <br />
            <h2>Disclaimer en privacy statement</h2>
            <p>
              <a
                href="https://administratie.erkenningen.nl/Default.aspx?tabid=154&ctl=Terms"
                target="_blank"
                rel="noreferrer"
              >
                Bekijk hier de disclaimer
              </a>
            </p>
            <p>
              <a
                href="https://administratie.erkenningen.nl/Default.aspx?tabid=289"
                target="_blank"
                rel="noreferrer"
              >
                Privacy statement
              </a>
            </p>
            <p>
              Wilt u uw account verwijderen? Stuur dan een e-mail via deze{' '}
              <a href="mailto:info@erkenningen.nl?subject=Account%20verwijderen%20verzoek">
                link
              </a>
              .
            </p>
          </IonCardContent>
        </IonCard>
        <IonListHeader>
          <IonLabel>App versie</IonLabel>
        </IonListHeader>
        <IonList>
          <IonItem>
            <IonLabel>2.2.0</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
