import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
} from '@ionic/react';
import { useApolloClient } from '@apollo/client';
import { Redirect, useHistory } from 'react-router';
import { deleteAuthState } from '../helpers/authState';
import { checkAuthenticationError } from '../helpers/error-helper';
import { IsOffline } from '../contexts/OfflineContext';
import { Authenticated } from '../contexts/AuthContext';
import { useEffect } from 'react';
import React from 'react';
import { useToast } from './Toast';

interface ErrorComponentProps {
  error: any;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  const history = useHistory();
  const { offline } = IsOffline.useContainer();
  const Toast = useToast();
  const { authenticated, setAuthenticated } = Authenticated.useContainer();

  const client = useApolloClient();
  const showLoggedOutMessage = React.useCallback(() => {
    Toast.error('Inlog token verlopen, log opnieuw in');
  }, [Toast]);

  useEffect(() => {
    if (checkAuthenticationError(error) && authenticated) {
      console.log('#DH# SHOW LOGGED OUT MESSAGE');
      setAuthenticated(false);
      showLoggedOutMessage();
      deleteAuthState();
      client.clearStore();
    }
  }, [authenticated, client, error, setAuthenticated, showLoggedOutMessage]);

  if (checkAuthenticationError(error)) {
    return <Redirect to={`/inloggen?redirect=${history.location.pathname}`} />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Foutmelding</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Foutmelding 😧</IonCardTitle>
            <IonCardSubtitle></IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {error?.message === 'Failed to fetch' ? (
              <>
                <p>
                  Er is geen internetverbinding. Probeer het later opnieuw of
                </p>
                <IonButton onClick={() => history.push('/home')}>
                  ga naar home
                </IonButton>
                {!offline && (
                  <IonButton onClick={() => window.location.reload()}>
                    Probeer het opnieuw
                  </IonButton>
                )}
              </>
            ) : (
              <>
                <p>
                  Er is een foutmelding opgetreden: {error?.message}. Probeer
                  het later opnieuw of
                </p>
                <IonButton onClick={() => history.push('/home')}>
                  ga naar home
                </IonButton>
                {!offline && (
                  <IonButton onClick={() => window.location.reload()}>
                    Probeer het opnieuw
                  </IonButton>
                )}
              </>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ErrorComponent;
