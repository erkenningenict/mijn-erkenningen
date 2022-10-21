import React from 'react';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonText,
  IonLoading,
  IonNote,
} from '@ionic/react';
import './Login.css';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useApp_AuthenticateMutation } from '../../__generated__/graphql';
import { setAuthState } from '../../helpers/authState';
import { Redirect, useHistory } from 'react-router';
import { SelectedLicense } from '../../contexts/SelectedLicenseContext';
import { useToast } from '../../components/Toast';
import { Authenticated } from '../../contexts/AuthContext';
import { IsOffline } from '../../contexts/OfflineContext';

type Inputs = {
  username: string;
  password: string;
};

export const LoginPage: React.FC<any> = React.memo(() => {
  const Toast = useToast();
  const { offline } = IsOffline.useContainer();
  const history = useHistory();
  const { authenticated, setAuthenticated } = Authenticated.useContainer();
  const { setLicense } = SelectedLicense.useContainer();
  const redirect = new URLSearchParams(history.location.search).get('redirect');

  const defaultValues =
    process.env.NODE_ENV === 'production'
      ? { username: '', password: '' }
      : { username: 'Groot600', password: '1234' };

  const {
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues,
  });

  const [login, { loading }] = useApp_AuthenticateMutation({});

  const errorMessage = (field: keyof Inputs, message: string) => {
    if (Object.keys(errors).filter((e) => e === field).length > 0) {
      return (
        <IonText color="danger">
          <p className="ion-padding-start">{message}</p>
        </IonText>
      );
    }
    return null;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const result = await login({
        variables: {
          input: {
            username: data.username,
            password: data.password,
          },
        },
      });
      if (result.data?.authenticate) {
        const authResult = result.data?.authenticate;
        if (authResult.Persoon) {
          setAuthState(
            authResult.Persoon as any,
            authResult.roles,
            authResult.accessToken,
            authResult.refreshToken,
          );
          setAuthenticated(true);
          setLicense(undefined);
        }
      }
    } catch (err: any) {
      if (err.message === 'Failed to fetch') {
        Toast.warning(
          'U heeft geen toegang tot internet. Netwerk toegang is nodig om in te loggen.',
        );
      } else {
        setAuthenticated(false);

        Toast.error(err.message);
      }
    }
  };

  if (authenticated) {
    if (history.location.search.match(/redirect/) && redirect !== null) {
      if (redirect === '/inloggen') {
        return <Redirect to="/dashboard" push={true}></Redirect>;
      } else {
        return <Redirect to={redirect} push={true}></Redirect>;
      }
    } else {
      return <Redirect to="/dashboard" push={true}></Redirect>;
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Inloggen</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <IonNote>
                Gebruik dezelfde gebruikersnaam en wachtwoord als voor de
                website erkenningen.nl
              </IonNote>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Gebruikersnaam</IonLabel>

            <Controller
              render={({ field: { onChange, onBlur, value, name } }) => (
                <IonInput
                  name={name}
                  onIonChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  autocomplete="off"
                ></IonInput>
              )}
              control={control}
              name="username"
              rules={{
                required: true,
              }}
            />
          </IonItem>
          {errorMessage('username', 'Gebruikersnaam is verplicht')}

          <IonItem>
            <IonLabel position="floating">Wachtwoord</IonLabel>
            <Controller
              render={({ field: { onChange, onBlur, value, name } }) => (
                <IonInput
                  name={name}
                  type="password"
                  autocomplete="off"
                  value={value}
                  onIonChange={onChange}
                  onBlur={onBlur}
                ></IonInput>
              )}
              control={control}
              name="password"
              rules={{
                required: true,
              }}
            />
          </IonItem>
          {errorMessage('password', 'Wachtwoord is verplicht')}

          <IonButton
            expand="block"
            disabled={isSubmitting || offline}
            style={{ margin: 14 }}
            type="submit"
          >
            Inloggen
          </IonButton>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <IonNote>
                Wachtwoord of gebruikersnaam vergeten? Ga naar de{' '}
                <a
                  href="https://administratie.erkenningen.nl/Default.aspx?tabid=154"
                  target="_blank"
                  rel="noreferrer"
                >
                  website
                </a>{' '}
                om uw gegevens op te vragen.
              </IonNote>
            </IonLabel>
          </IonItem>
        </form>

        {loading && (
          <IonLoading
            isOpen={true}
            message={'Even geduld aub, u wordt ingelogd'}
            duration={0}
          />
        )}
      </IonContent>
    </IonPage>
  );
});
