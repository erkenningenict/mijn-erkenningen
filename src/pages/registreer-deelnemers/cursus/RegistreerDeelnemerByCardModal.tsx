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
  IonText,
  IonLoading,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import ErrorComponent from '../../../components/ErrorComponent';
import { IsOffline } from '../../../contexts/OfflineContext';
import { ViewFilterDeelnemer } from '../../../contexts/SearchSettingsRegistreerDeelnemer';
import { useApp_SearchCursusDeelnemersQuery } from '../../../__generated__/graphql';
import { RegistreerDeelnemersResultListModal } from './RegistreerDeelnemersResultListModal';

export interface RegistreerDeelnemerByCardInput {
  pasnummer: string;
}

interface RegistreerDeelnemerByCardFilterModalProps {
  dismissModal: any;
}

export const RegistreerDeelnemerByCardModal: React.FC<RegistreerDeelnemerByCardFilterModalProps> =
  ({ dismissModal }) => {
    const { offline } = IsOffline.useContainer();
    const { cursusId } = useParams<{ cursusId: string }>();
    const history = useHistory();
    const { filterSettings, setFilterSettings } =
      ViewFilterDeelnemer.useContainer();

    const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitted },
    } = useForm<RegistreerDeelnemerByCardInput>({
      defaultValues: {
        pasnummer:
          filterSettings.pasnummer !== '' ? filterSettings.pasnummer : '3120',
      },
    });

    const [
      showRegistreerDeelnemerResultListModal,
      setShowRegistreerDeelnemerResultListModal,
    ] = useState<boolean>(false);

    const {
      loading: loadingCursusDeelnemers,
      error: errorCursusDeelnemers,
      data: dataCursusDeelnemers,
    } = useApp_SearchCursusDeelnemersQuery({
      variables: {
        input: {
          CursusID: parseInt(cursusId),
          pasnummer: filterSettings.pasnummer,
        },
      },
      fetchPolicy: 'network-only',
      skip:
        filterSettings.pasnummer === '' || filterSettings.pasnummer === '3120',
      nextFetchPolicy: 'network-only',
    });

    const deelnemers = dataCursusDeelnemers?.SearchCursusDeelnemers;

    // go to DeelnemersDetailsPage
    useEffect(() => {
      if (deelnemers && deelnemers?.length === 1) {
        dismissModal();
        setFilterSettings({
          ...filterSettings,
          pasnummer: '3120',
        });
        history.push(
          `/registreer-deelnemers/cursus/${cursusId}/deelnemer/${deelnemers[0].PersoonID}`,
        );
      }
    }, [
      deelnemers,
      dismissModal,
      history,
      cursusId,
      setFilterSettings,
      filterSettings,
    ]);

    const handleSetFilterValues = (values: RegistreerDeelnemerByCardInput) => {
      setFilterSettings({
        ...filterSettings,
        pasnummer: values.pasnummer,
      });
    };

    const onSubmit: SubmitHandler<RegistreerDeelnemerByCardInput> = async (
      data: RegistreerDeelnemerByCardInput,
    ) => {
      if (!data || data.pasnummer === '') {
        console.log('Leeg');
        return 0;
      }
      try {
        handleSetFilterValues(data);
        // setShowRegistreerDeelnemerResultListModal(true);
      } catch (err) {
        console.log('#DH# err?', err);
      }
    };

    if (errorCursusDeelnemers) {
      console.log('#DH# error', errorCursusDeelnemers);
      return <ErrorComponent error={errorCursusDeelnemers} />;
    }

    return (
      <>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton onClick={() => dismissModal()}>Annuleren</IonButton>
            </IonButtons>
            <IonTitle>Zoek criteria</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <IonItem>
              <IonText style={{ margin: '10px 0' }}>
                <p style={{ lineHeight: '1.3rem' }}>
                  Vul een pasnummer in zonder punten. Bijv. 3120210001234. 3120
                  is al ingevuld.
                </p>
              </IonText>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Pasnummer</IonLabel>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <IonInput
                    name={name}
                    onIonChange={onChange}
                    type="number"
                    inputmode="numeric"
                    placeholder="Pasnummer"
                    autocomplete="off"
                    maxlength={13}
                    value={value}
                  ></IonInput>
                )}
                control={control}
                name="pasnummer"
                rules={{
                  pattern: /^\d{13}$/,
                }}
              />
            </IonItem>
            {errors.pasnummer && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  Geen geldig pasnummer. Vul max. 13 cijfers in
                </p>
              </IonText>
            )}
            <div className="ion-padding">
              <IonButton
                expand="block"
                disabled={isSubmitting || offline}
                type="submit"
              >
                Zoeken
              </IonButton>
            </div>
          </form>
          {deelnemers?.length === 0 && isSubmitted && (
            <div className="ion-padding">
              <IonText color="danger">
                Pas is niet gevonden. Controleer het pasnummer.
              </IonText>
            </div>
          )}
        </IonContent>
        {loadingCursusDeelnemers && (
          <IonLoading
            isOpen={true}
            message={'Even geduld aub, pasnummer wordt gecontroleerd.'}
            duration={0}
          />
        )}
        <IonModal
          isOpen={showRegistreerDeelnemerResultListModal}
          swipeToClose={true}
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
