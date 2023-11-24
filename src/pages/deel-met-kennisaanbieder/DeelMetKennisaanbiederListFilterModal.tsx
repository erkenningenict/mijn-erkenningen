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
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ViewFilterOptionsEnum } from '../../enums/enums';
import { ViewFilterKennisaanbieder } from '../../contexts/FilterSettingsDeelMetKennisaanbieder';

export interface DeelMetKennisaanbiederFilters {
  viewFilter: ViewFilterOptionsEnum;
}

interface WebinarListFilterModalProps {
  dismissModal: any;
  onFilter: (values: DeelMetKennisaanbiederFilters) => void;
}

export const DeelMetKennisaanbiederFilterModal: React.FC<WebinarListFilterModalProps> =
  ({ dismissModal, onFilter }) => {
    const { filterSettings } = ViewFilterKennisaanbieder.useContainer();
    const {
      control,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<DeelMetKennisaanbiederFilters>({
      defaultValues: {
        viewFilter: filterSettings.viewFilterOption,
      },
    });

    const onSubmit: SubmitHandler<DeelMetKennisaanbiederFilters> = async (
      data: DeelMetKennisaanbiederFilters,
    ) => {
      try {
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
              <IonLabel position="floating">Toon</IonLabel>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <IonSelect
                    value={value}
                    name={name}
                    placeholder={`Tonen`}
                    onIonChange={(e) => onChange(e.detail.value)}
                    cancelText="Annuleren"
                  >
                    <IonSelectOption
                      key={ViewFilterOptionsEnum.all}
                      value={ViewFilterOptionsEnum.all}
                    >
                      Alle
                    </IonSelectOption>
                    <IonSelectOption
                      key={ViewFilterOptionsEnum.sharedOnly}
                      value={ViewFilterOptionsEnum.sharedOnly}
                    >
                      Door mij gedeeld
                    </IonSelectOption>
                    <IonSelectOption
                      key={ViewFilterOptionsEnum.notShared}
                      value={ViewFilterOptionsEnum.notShared}
                    >
                      Nog niet gedeeld
                    </IonSelectOption>
                  </IonSelect>
                )}
                control={control}
                name="viewFilter"
              />
            </IonItem>

            <IonButton
              expand="block"
              disabled={isSubmitting}
              style={{ margin: 14 }}
              type="submit"
            >
              Toepassen
            </IonButton>
          </form>
        </IonContent>
      </>
    );
  };
