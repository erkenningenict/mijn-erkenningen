import React from 'react';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonModal,
  IonDatetime,
} from '@ionic/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { add, endOfDay } from 'date-fns';
import { toDutchDate } from '../../helpers/date-helpers';
import {
  FilterSettingsRegistreerDeelnemerCursussen,
  SimpleFilterSettingsRegistreerDeelnemerCursussen,
} from '../../contexts/FilterSettingsRegistreerDeelnemerCursussen';

interface WebinarListFilterModalProps {
  dismissModal: any;
  onFilter: (values: FilterSettingsRegistreerDeelnemerCursussen) => void;
}

export const CursussenListFilter: React.FC<WebinarListFilterModalProps> = ({
  dismissModal,
  onFilter,
}) => {
  const { filterSettings, setFilterSettings } =
    SimpleFilterSettingsRegistreerDeelnemerCursussen.useContainer();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FilterSettingsRegistreerDeelnemerCursussen>({
    defaultValues: {
      datumVanaf: endOfDay(
        new Date(filterSettings.datumVanaf) ?? new Date(),
      ).toISOString(),
      datumTot: endOfDay(
        new Date(filterSettings.datumTot) ?? add(new Date(), { months: 1 }),
      ).toISOString(),
    },
  });

  const startDateWatch = watch('datumVanaf');
  const endDateWatch = watch('datumTot');

  const minDate = add(new Date(), { months: -1 }).toISOString();
  const maxDate = add(new Date(), { months: 2 }).toISOString();

  const handleSetToday = () => {
    const data: FilterSettingsRegistreerDeelnemerCursussen = {
      datumVanaf: new Date().toISOString(),
      datumTot: new Date().toISOString(),
    };
    setFilterSettings(data);

    onFilter(data);

    dismissModal();
  };

  const onSubmit: SubmitHandler<FilterSettingsRegistreerDeelnemerCursussen> =
    async (data: FilterSettingsRegistreerDeelnemerCursussen) => {
      try {
        setFilterSettings(data);

        onFilter(data);

        dismissModal();
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
          <IonTitle>Filter</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <IonItem>
            <IonLabel>Datum vanaf</IonLabel>
            <IonButton id="open-modal-start-date">
              {toDutchDate(startDateWatch)}
            </IonButton>
            <IonModal trigger="open-modal-start-date">
              <IonContent>
                <Controller
                  render={({ field: { onChange, value, name } }) => (
                    <IonDatetime
                      locale="nl-NL"
                      name={name}
                      presentation="date"
                      min={minDate}
                      max={maxDate}
                      hourCycle="h23"
                      showDefaultButtons={true}
                      cancelText="Annuleren"
                      doneText="Gereed"
                      firstDayOfWeek={1}
                      onIonChange={(e) => {
                        onChange(
                          endOfDay(new Date(e.detail.value!)).toISOString(),
                        );
                      }}
                      value={value}
                    >
                      <div slot="title">Kies datum vanaf</div>
                    </IonDatetime>
                  )}
                  control={control}
                  name="datumVanaf"
                />
              </IonContent>
            </IonModal>
          </IonItem>

          <IonItem>
            <IonLabel>Datum tot</IonLabel>
            <IonButton id="open-modal-end-date">
              {toDutchDate(endDateWatch)}
            </IonButton>
            <IonModal trigger="open-modal-end-date">
              <IonContent>
                <Controller
                  render={({ field: { onChange, value, name } }) => (
                    <IonDatetime
                      locale="nl-NL"
                      name={name}
                      presentation="date"
                      min={minDate}
                      max={maxDate}
                      showDefaultButtons={true}
                      cancelText="Annuleren"
                      doneText="Gereed"
                      firstDayOfWeek={1}
                      onIonChange={(e) => {
                        onChange(
                          endOfDay(new Date(e.detail.value!)).toISOString(),
                        );
                      }}
                      value={value}
                    >
                      <div slot="title">Kies datum tot</div>
                    </IonDatetime>
                  )}
                  control={control}
                  name="datumTot"
                />
              </IonContent>
            </IonModal>
          </IonItem>

          <div className="ion-padding">
            <IonButton
              expand="block"
              fill="outline"
              color="medium"
              disabled={isSubmitting}
              type="button"
              onClick={handleSetToday}
            >
              Vandaag
            </IonButton>
            <IonButton
              expand="block"
              disabled={isSubmitting}
              type="submit"
              className="ion-margin-top"
            >
              Toepassen
            </IonButton>
          </div>
        </form>
      </IonContent>
    </>
  );
};
