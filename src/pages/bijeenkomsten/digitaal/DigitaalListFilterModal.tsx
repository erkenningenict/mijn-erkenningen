import React, { useCallback, useEffect, useState } from 'react';
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
  IonLoading,
  IonModal,
} from '@ionic/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  useApp_GetListsQuery,
  useApp_GetMyQuery,
} from '../../../__generated__/graphql';
import { checkAuthenticationError } from '../../../helpers/error-helper';
import { FilterSettings, SimpleFilter } from '../../../contexts/FilterSettings';
import { toDutchDate } from '../../../helpers/date-helpers';
import { SelectedLicense } from '../../../contexts/SelectedLicenseContext';
import SelectLicenseModal from '../../../components/SelectLicenseModal';

export interface DigitaalFilters extends FilterSettings {}

interface WebinarListFilterModalProps {
  dismissModal: any;
  onFilter: (values: DigitaalFilters) => void;
}

export const DigitaalListFilterModal: React.FC<WebinarListFilterModalProps> = ({
  dismissModal,
  onFilter,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { license } = SelectedLicense.useContainer();
  const { filterSettings } = SimpleFilter.useContainer();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<DigitaalFilters>({});

  const { loading, error, data } = useApp_GetListsQuery({
    fetchPolicy: 'cache-first',
  });

  const {
    loading: loadingMy,
    error: myError,
    data: myData,
  } = useApp_GetMyQuery({
    fetchPolicy: 'cache-first',
  });

  if (error || myError) {
    if (checkAuthenticationError(error)) {
      dismissModal();
    }
  }

  const setDefaultValues = useCallback(() => {
    reset({
      sectorId: filterSettings.sectorId,
      themaId: filterSettings.themaId,
    });
  }, [reset, filterSettings]);

  useEffect(() => {
    setDefaultValues();
  }, [data, myData, setDefaultValues]);

  const onSubmit: SubmitHandler<DigitaalFilters> = async (
    data: DigitaalFilters,
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

      {loading || loadingMy ? (
        <IonContent>
          <IonLoading
            isOpen={loading}
            message={'Even geduld aub, gegevens worden opgehaald'}
            duration={0}
          />
        </IonContent>
      ) : (
        <IonContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <IonItem>
              <IonLabel>
                <div>Geselecteerde licentie:</div>
                <div className="text-bold">{license?.Certificaat?.Naam}</div>
                <div className="text-sm">
                  Geldig tot: {toDutchDate(license?.EindDatum)}
                </div>
              </IonLabel>
              <IonButton onClick={() => setShowModal(true)}>Wijzig</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Sector</IonLabel>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <IonSelect
                    value={value}
                    name={name}
                    placeholder={`Selecteer sector ${value}`}
                    onIonChange={(e) => onChange(e.detail.value)}
                    cancelText="Annuleren"
                  >
                    {[{ KennisgebiedID: 0, Naam: 'Alle' }]
                      .concat(data?.Kennisgebieden ?? [])
                      .map((k) => (
                        <IonSelectOption
                          key={k.KennisgebiedID}
                          value={k.KennisgebiedID}
                        >
                          {k.Naam}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                )}
                control={control}
                name="sectorId"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Thema</IonLabel>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <IonSelect
                    value={value}
                    name={name}
                    placeholder="Selecteer thema"
                    onIonChange={(e) => onChange(e.detail.value)}
                    cancelText="Annuleren"
                  >
                    {[{ ThemaID: 0, Naam: 'Alle' }]
                      .concat(data?.Themas ?? [])
                      .map((t) => (
                        <IonSelectOption key={t.ThemaID} value={t.ThemaID}>
                          {t.Naam}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                )}
                control={control}
                name="themaId"
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
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <SelectLicenseModal
              dismissModal={() => {
                setShowModal(false);
              }}
            />
          </IonModal>
        </IonContent>
      )}
    </>
  );
};
