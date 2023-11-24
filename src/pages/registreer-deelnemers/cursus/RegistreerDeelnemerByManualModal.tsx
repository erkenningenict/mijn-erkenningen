import {
  IonButton,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonInput,
  IonModal,
} from '@ionic/react';
import React, { useState } from 'react';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ViewFilterDeelnemer } from '../../../contexts/SearchSettingsRegistreerDeelnemer';
import { RegistreerDeelnemersResultListModal } from './RegistreerDeelnemersResultListModal';

export interface RegistreerDeelnemerByManualInput {
  naam: string;
  postcode: string;
  geboortejaar: string;
}

interface RegistreerDeelnemerByManualFilterModalProps {
  dismissModal: any;
}

export const RegistreerDeelnemerByManualModal: React.FC<
  RegistreerDeelnemerByManualFilterModalProps
> = ({ dismissModal }) => {
  const { filterSettings, setFilterSettings } =
    ViewFilterDeelnemer.useContainer();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegistreerDeelnemerByManualInput>({
    defaultValues: {
      naam: filterSettings.naam,
      postcode: filterSettings.postcode,
      geboortejaar: filterSettings.geboortejaar,
    },
  });

  const [
    showRegistreerDeelnemerResultListModal,
    setShowRegistreerDeelnemerResultListModal,
  ] = useState<boolean>(false);

  const handleSetFilterValues = (values: RegistreerDeelnemerByManualInput) => {
    setFilterSettings({
      ...filterSettings,
      naam: values.naam,
      postcode: values.postcode,
      geboortejaar: values.geboortejaar,
    });
  };

  const onSubmit: SubmitHandler<RegistreerDeelnemerByManualInput> = async (
    data: RegistreerDeelnemerByManualInput,
  ) => {
    console.log('#DH# on submit search', data);
    if (
      !data ||
      (data.naam === '' && data.postcode === '' && data.geboortejaar === '')
    ) {
      console.log('Leeg');
      return 0;
    }
    try {
      handleSetFilterValues(data);
      setShowRegistreerDeelnemerResultListModal(true);
    } catch (err) {
      console.log('#DH# err?', err);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => dismissModal()}>Annuleren</IonButton>
          </IonButtons>
          <IonTitle>Zoek persoon</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <IonItem>
            <IonLabel position="floating">Naam</IonLabel>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <IonInput
                  name={name}
                  onIonChange={onChange}
                  type="text"
                  placeholder="Naam"
                  autocomplete="off"
                  maxlength={100}
                  value={value}
                ></IonInput>
              )}
              control={control}
              name="naam"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Postcode (cijfers)</IonLabel>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <IonInput
                  name={name}
                  onIonChange={onChange}
                  type="number"
                  inputmode="numeric"
                  placeholder="Postcode"
                  autocomplete="off"
                  maxlength={100}
                  value={value}
                ></IonInput>
              )}
              control={control}
              name="postcode"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Geboortejaar</IonLabel>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <IonInput
                  name={name}
                  onIonChange={onChange}
                  type="number"
                  inputmode="numeric"
                  placeholder="Geboortejaar"
                  autocomplete="off"
                  maxlength={100}
                  value={value}
                ></IonInput>
              )}
              control={control}
              name="geboortejaar"
            />
          </IonItem>

          <div className="ion-padding">
            <input
              type="submit"
              style={{
                visibility: 'hidden',
                position: 'absolute',
                left: '-999px',
              }}
            />
            <IonButton expand="block" disabled={isSubmitting} type="submit">
              Zoeken
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              color="medium"
              type="reset"
              className="ion-margin-top"
            >
              Wissen
            </IonButton>
          </div>
        </form>
      </IonContent>
      <IonModal
        isOpen={showRegistreerDeelnemerResultListModal}
        onDidDismiss={() => setShowRegistreerDeelnemerResultListModal(false)}
      >
        <RegistreerDeelnemersResultListModal
          dismissModal={(closeParent: boolean) => {
            setShowRegistreerDeelnemerResultListModal(false);
            if (closeParent) {
              dismissModal();
            }
          }}
        />
      </IonModal>
    </>
  );
};
