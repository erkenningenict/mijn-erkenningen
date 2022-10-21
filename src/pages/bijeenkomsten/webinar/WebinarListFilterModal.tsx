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
  IonDatetime,
  IonModal,
} from '@ionic/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  useApp_GetListsQuery,
  useApp_GetMyQuery,
} from '../../../__generated__/graphql';
import { checkAuthenticationError } from '../../../helpers/error-helper';
import add from 'date-fns/add';
import { endOfDay } from 'date-fns';
import { toDutchDate } from '../../../helpers/date-helpers';
import { FilterSettings, SimpleFilter } from '../../../contexts/FilterSettings';
import SelectLicenseModal from '../../../components/SelectLicenseModal';
import { SelectedLicense } from '../../../contexts/SelectedLicenseContext';

export interface WebinarFilters extends FilterSettings {}

interface WebinarListFilterModalProps {
  dismissModal: any;
  onFilter: (values: WebinarFilters) => void;
}

export const WebinarListFilterModal: React.FC<WebinarListFilterModalProps> = ({
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
    watch,
    formState: { isSubmitting },
  } = useForm<WebinarFilters>({});

  const { loading, error, data } = useApp_GetListsQuery({
    fetchPolicy: 'cache-first',
  });

  const {
    loading: loadingMy,
    error: myError,
    data: myData,
  } = useApp_GetMyQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (error || myError) {
    if (checkAuthenticationError(error)) {
      dismissModal();
    }
  }

  const minDate = new Date().toISOString().substring(0, 10);
  const maxDate = add(new Date(), { years: 1 }).toISOString();

  const setDefaultValues = useCallback(() => {
    reset({
      sectorId: filterSettings.sectorId,
      themaId: filterSettings.themaId,
      competentieId: filterSettings.competentieId,
      datumVanaf: (
        new Date(filterSettings.datumVanaf) ?? new Date()
      ).toISOString(),
      datumTot: endOfDay(
        new Date(filterSettings.datumTot) ?? add(new Date(), { months: 3 }),
      ).toISOString(),
    });
  }, [reset, filterSettings]);

  const startDateWatch = watch('datumVanaf');
  const endDateWatch = watch('datumTot');

  useEffect(() => {
    setDefaultValues();
  }, [data, myData, setDefaultValues]);

  const onSubmit: SubmitHandler<WebinarFilters> = async (
    data: WebinarFilters,
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
          {loading && (
            <IonLoading
              isOpen={true}
              message={'Even geduld aub, gegevens worden opgehaald'}
              duration={0}
            />
          )}
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

            <IonItem>
              <IonLabel position="floating">Bijeenkomsttype</IonLabel>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <IonSelect
                    value={value}
                    name={name}
                    placeholder={`Selecteer bijeenkomsttype ${value}`}
                    onIonChange={(e) => onChange(e.detail.value)}
                    cancelText="Annuleren"
                  >
                    {[{ CompetentieID: 0, Naam: 'Alle' }]
                      .concat(data?.Competenties ?? [])
                      .map((c) => (
                        <IonSelectOption
                          key={c.CompetentieID}
                          value={c.CompetentieID}
                        >
                          {c.Naam}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                )}
                control={control}
                name="competentieId"
              />
            </IonItem>

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

            <IonButton
              expand="block"
              disabled={isSubmitting}
              style={{ margin: 14 }}
              type="submit"
            >
              Toepassen
            </IonButton>
          </form>
          <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => setShowModal(false)}
          >
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
