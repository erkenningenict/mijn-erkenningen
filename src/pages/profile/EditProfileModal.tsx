import React from 'react';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonText,
  IonLoading,
} from '@ionic/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  MyContactgegevensFieldsFragment,
  useApp_UpdateContactgegevensMutation,
} from '../../__generated__/graphql';
import { checkAuthenticationError } from '../../helpers/error-helper';
import { useToast } from '../../components/Toast';
import { IsOffline } from '../../contexts/OfflineContext';

type Inputs = {
  email: string;
  emailWerkgever: string;
  telefoon: string;
};

interface EditProfileModalProps {
  dismissModal: any;
  contactgegevens: MyContactgegevensFieldsFragment;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  dismissModal,
  contactgegevens,
}) => {
  const { offline } = IsOffline.useContainer();
  const Toast = useToast();
  const [updateContactgegevens, { loading: mutationLoading }] =
    useApp_UpdateContactgegevensMutation({});
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: contactgegevens.Email,
      emailWerkgever: contactgegevens.EmailWerkgever,
      telefoon: contactgegevens.Telefoon,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await updateContactgegevens({
        variables: {
          input: {
            Email: data.email.trim(),
            EmailWerkgever: data.emailWerkgever.trim(),
            Telefoon: data.telefoon.trim(),
          },
        },
      });
      dismissModal();
    } catch (err: any) {
      console.log('#DH# err?', err);
      if (checkAuthenticationError(err)) {
        dismissModal(err);
      } else {
        Toast.error(
          `Fout bij bewerken profiel, probeer het opnieuw. Foutmelding: ${
            err?.message || 'onbekend'
          }`,
        );
      }
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => dismissModal()}>Annuleren</IonButton>
          </IonButtons>
          <IonTitle>Bewerk profiel</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <IonItem>
            <IonLabel position="floating">Uw persoonlijke e-mailadres</IonLabel>

            <Controller
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <IonInput
                  name={name}
                  onIonChange={onChange}
                  type="email"
                  onBlur={onBlur}
                  autocomplete="off"
                  inputMode="email"
                  maxlength={100}
                  value={value}
                ></IonInput>
              )}
              control={control}
              name="email"
              rules={{
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }}
            />
          </IonItem>
          {errors.email && (
            <IonText color="danger">
              <p className="ion-padding-start">Geen geldig e-mailadres</p>
            </IonText>
          )}
          <IonItem>
            <IonLabel position="floating">E-mail werkgever</IonLabel>
            <Controller
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <IonInput
                  name={name}
                  type="email"
                  autocomplete="off"
                  inputMode="email"
                  onIonChange={onChange}
                  maxlength={100}
                  onBlur={onBlur}
                  value={value}
                ></IonInput>
              )}
              control={control}
              name="emailWerkgever"
              rules={{
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }}
            />
          </IonItem>
          {errors.emailWerkgever && (
            <IonText color="danger">
              <p className="ion-padding-start">Geen geldig e-mailadres</p>
            </IonText>
          )}
          <IonItem>
            <IonLabel position="floating">Telefoon</IonLabel>
            <Controller
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <IonInput
                  name={name}
                  type="text"
                  autocomplete="off"
                  placeholder="0612345678"
                  inputMode="tel"
                  maxlength={15}
                  onIonChange={onChange}
                  onBlur={onBlur}
                  value={value}
                ></IonInput>
              )}
              control={control}
              name="telefoon"
              rules={{
                pattern: /^(0)\d{9,14}$/,
              }}
            />
          </IonItem>
          {errors.telefoon && (
            <IonText color="danger">
              <p className="ion-padding-start">Geen geldig telefoon nr</p>
            </IonText>
          )}
          <IonButton
            expand="block"
            disabled={isSubmitting || offline}
            style={{ margin: 14 }}
            type="submit"
          >
            Opslaan
          </IonButton>
        </form>

        <IonLoading
          isOpen={mutationLoading}
          message={'Even geduld aub, gegevens worden opgeslagen'}
          duration={0}
        />
      </IonContent>
    </>
  );
};
