import React, { useEffect, useMemo, useState } from 'react';
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
  IonSelect,
  IonSelectOption,
  IonItemDivider,
  IonToggle,
  IonTextarea,
} from '@ionic/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { checkAuthenticationError } from '../../helpers/error-helper';
import { useHistory, useLocation } from 'react-router';
import {
  Certificering,
  RegisterForCourseInput,
  useApp_GetMyQuery,
  useApp_RegisterForCourseMutation,
} from '../../__generated__/graphql';
import { relativeTimeFormatter, toDutchDate } from '../../helpers/date-helpers';
import SectorenList from '../../components/SectorenList';
import { useToast } from '../../components/Toast';
import { isLicenseValidOnDate } from '../../helpers/license-helper';
import ErrorComponent from '../../components/ErrorComponent';
import { client } from '../../AppWrapper';
import { IsOffline } from '../../contexts/OfflineContext';

type Inputs = {
  code: string;
  courseDateTime: Date;
  title: string;
  courseId: number;
  isDigitalSpecialty: boolean;
  specialtyId: number;
  invoiceAddress: string;
  knowledgeArea: string;
  street: string;
  houseNr: string;
  houseNrExtension: string;
  country: string;
  zipcode: string;
  city: string;
  phoneNr: string;
  email: string;
};

interface RegisterModalProps {
  dismissModal: any;
  selectedLicenseId: number;
  code: string;
  courseDateTime: Date;
  title: string;
  courseId: number;
  isDigitalSpecialty: boolean;
  specialtyId: number;
}

export const RegisterModal: React.FC<RegisterModalProps> = React.memo(
  (props) => {
    const history = useHistory();
    const location = useLocation();
    const { offline } = IsOffline.useContainer();
    const Toast = useToast();

    const [licenseId, setLicenseId] = useState<number>(props.selectedLicenseId);
    const [showAccountAddressField, setShowAccountAddressField] =
      useState<boolean>(false);

    const {
      loading,
      error,
      data: myInfo,
    } = useApp_GetMyQuery({
      fetchPolicy: 'cache-first',
    });

    const [registerCourse, { loading: mutationLoading, error: mutationError }] =
      useApp_RegisterForCourseMutation();

    const defaultValues = useMemo(() => {
      return {
        code: props.code,
        courseDateTime: props.courseDateTime,
        title: props.title,
        courseId: props.courseId,
        isDigitalSpecialty: props.isDigitalSpecialty,
        specialtyId: props.specialtyId,
        invoiceAddress: '',
        knowledgeArea: '',
        street: '',
        houseNr: '',
        houseNrExtension: '',
        country: '',
        zipcode: '',
        city: '',
        phoneNr: '',
        email: '',
      };
    }, [props]);

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<Inputs>({
      defaultValues,
    });

    const myData = myInfo?.my;

    const activeLicenses = myData?.Certificeringen?.filter((c) =>
      isLicenseValidOnDate(c as Certificering),
    );

    useEffect(() => {
      // fallback to all licenses and select the first one
      if (
        activeLicenses &&
        activeLicenses?.length > 0 &&
        props.selectedLicenseId === 0
      ) {
        const licenses =
          [...activeLicenses].sort((a, b) =>
            a.BeginDatum > b.BeginDatum ? 1 : -1,
          ) || [];
        setLicenseId(licenses[0].CertificeringID);
      }
    }, [activeLicenses, props.selectedLicenseId]);

    useEffect(() => {
      // fill default values for form
      if (myData) {
        const contact = myData?.Persoon?.Contactgegevens;
        reset({
          ...defaultValues,
          email: contact?.Email,
          phoneNr: contact.Telefoon,
          street: contact.Adresregel1,
          houseNr: contact.Huisnummer,
          houseNrExtension: contact.HuisnummerToevoeging,
          zipcode: contact.Postcode,
          city: contact.Woonplaats,
          country: contact.Land,
        });
      }
    }, [myData, reset, defaultValues]);

    if (error || mutationError) {
      if (checkAuthenticationError(error)) {
        console.log('#DH# err', error, location.pathname);

        setTimeout(() => {
          history.push(`/inloggen?redirect=${location.pathname}`, {
            direction: 'none',
          });
          props.dismissModal();
          return;
        });
        return null;
      }
    }

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
      try {
        const input: RegisterForCourseInput = {
          licenseId: licenseId ?? 0,
          code: data.code,
          courseDateTime: data.courseDateTime,
          title: data.title,
          courseId: data.courseId,
          isDigitalSpecialty: data.isDigitalSpecialty,
          specialtyId: data.specialtyId,
          invoiceAddress: data.invoiceAddress,
          knowledgeArea: data.knowledgeArea,
          street: data.street,
          houseNr: data.houseNr,
          houseNrExtension: data.houseNrExtension,
          country: data.country ?? 'Nederland',
          zipcode: data.zipcode,
          city: data.city,
          phoneNr: data.phoneNr,
          email: data.email,
        };
        const res = await registerCourse({
          variables: { input },
        });
        if (res.data?.registerForCourse?.success) {
          Toast.success('U bent aangemeld');
          props.dismissModal();
          await client.refetchQueries({
            include: ['App_GetSearchSpecialties', 'App_GetCursusSessies'],
          });
        } else {
          Toast.error(
            res.data?.registerForCourse.message ??
              'Er is iets misgegaan bij het aanmelden. Probeer het later opnieuw',
          );
        }
      } catch (err: any) {
        console.log('#DH# err mutation?', err);

        if (!checkAuthenticationError(err)) {
          return <ErrorComponent error={err} />;
        } else {
          Toast.error(
            `Fout bij aanmelden, probeer het later opnieuw. Melding: ${
              err?.message ?? 'onbekend'
            }`,
          );
        }
      }
    };

    const ChosenLicense = () => {
      const license = activeLicenses?.find(
        (al) => al.CertificeringID === licenseId,
      );
      if (!license) {
        return <div>Nog geen licentie gekozen</div>;
      }
      return (
        <div className="my-2">
          <p>
            {license.Certificaat?.Naam}
            <br />
            {license.NummerWeergave}
            <br />
            Geldig tot {toDutchDate(license.EindDatum)}{' '}
            <span style={{ fontSize: '80%' }}>
              ({relativeTimeFormatter(license.EindDatum)})
            </span>
          </p>
        </div>
      );
    };

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

    return (
      <>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton onClick={() => props.dismissModal()}>
                Annuleren
              </IonButton>
            </IonButtons>
            <IonTitle>Aanmelden</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <IonItem>
              <IonLabel>Kies licentie</IonLabel>
              <IonSelect
                value={licenseId}
                placeholder="Selecteer licentie"
                onIonChange={(e) => setLicenseId(+e.detail.value)}
                cancelText="Annuleren"
              >
                {activeLicenses?.map((al) => (
                  <IonSelectOption
                    key={al.CertificeringID}
                    value={al.CertificeringID}
                  >
                    {al.Certificaat?.Code} {al.NummerWeergave}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <ChosenLicense></ChosenLicense>
            </IonItem>

            <IonItemDivider>
              <div className="py-2">
                <div>
                  <IonLabel>Aanmeldingsgegevens</IonLabel>
                </div>
                <div style={{ display: 'block' }}>
                  <p style={{ fontWeight: 'normal' }}>
                    Deze gegevens worden aan de aanbieder doorgegeven. De
                    aanbieder verwerkt deze gegevens volgens haar richtlijnen.
                    De richtlijnen zijn bij de aanbieder beschikbaar.
                  </p>
                </div>
              </div>
            </IonItemDivider>
            <IonItem>
              <IonLabel position="floating">
                Uw persoonlijke e-mailadres *
              </IonLabel>

              <Controller
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <IonInput
                    name={name}
                    onIonChange={onChange}
                    type="text"
                    onBlur={onBlur}
                    placeholder="Emailadres (mijn.adres@domein.nl)"
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
            {errorMessage('email', 'Geen geldig e-mailadres')}

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
                name="phoneNr"
                rules={{
                  pattern: /^(0)\d{9,14}$/,
                }}
              />
            </IonItem>
            {errorMessage('phoneNr', 'Geen geldig telefoon nr')}

            <IonItem>
              <IonLabel position="floating">Sector *</IonLabel>
              <Controller
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <IonSelect
                    value={value}
                    placeholder="Selecteer sector"
                    onIonChange={(e) => onChange(e.detail.value)}
                    cancelText="Annuleren"
                  >
                    <SectorenList />
                  </IonSelect>
                )}
                control={control}
                name="knowledgeArea"
                rules={{ required: true }}
              />
            </IonItem>
            {errorMessage('knowledgeArea', 'Sector is verplicht')}

            <IonItemDivider>
              <div className="py-2">
                <div>
                  <IonLabel>Rekening</IonLabel>
                </div>
                <div style={{ display: 'block' }}>
                  <p style={{ fontWeight: 'normal' }}>
                    Alleen invullen als de rekening niet naar uw eigen adres
                    gestuurd moet worden. Vul in dat geval de naam en het
                    VOLLEDIGE adres in van de organisatie waar de rekening naar
                    toe moet.
                  </p>
                </div>
              </div>
            </IonItemDivider>

            <IonItem>
              <IonLabel>Rekening adres invoeren</IonLabel>
              <IonToggle
                color="primary"
                checked={showAccountAddressField}
                onIonChange={() =>
                  setShowAccountAddressField(!showAccountAddressField)
                }
              />
            </IonItem>

            {showAccountAddressField && (
              <>
                <IonItem>
                  <IonLabel position="floating">Rekening *</IonLabel>

                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <IonTextarea
                        name={name}
                        autoGrow={true}
                        onIonChange={onChange}
                        placeholder="Vul het volledige adres in"
                        onBlur={onBlur}
                        maxlength={100}
                        value={value}
                      ></IonTextarea>
                    )}
                    control={control}
                    name="invoiceAddress"
                    rules={{
                      required: true,
                    }}
                  />
                </IonItem>
                {errorMessage('invoiceAddress', 'Rekening adres is verplicht')}
              </>
            )}

            {!myData?.Persoon.IsGbaGeregistreerd && (
              <>
                <IonItemDivider>
                  <IonLabel>Uw adresgegevens</IonLabel>
                </IonItemDivider>

                <IonItem>
                  <IonLabel position="floating">Straat *</IonLabel>

                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <IonInput
                        name={name}
                        onIonChange={onChange}
                        type="text"
                        placeholder="Straat"
                        onBlur={onBlur}
                        autocomplete="off"
                        maxlength={100}
                        value={value}
                      ></IonInput>
                    )}
                    control={control}
                    name="street"
                    rules={{
                      required: true,
                    }}
                  />
                </IonItem>
                {errorMessage('street', 'Straat is verplicht')}

                <IonItem>
                  <IonLabel position="floating">Huisnummer *</IonLabel>

                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <IonInput
                        name={name}
                        onIonChange={onChange}
                        type="text"
                        placeholder="Huisnummer (getal)"
                        onBlur={onBlur}
                        autocomplete="off"
                        maxlength={20}
                        value={value}
                      ></IonInput>
                    )}
                    control={control}
                    name="houseNr"
                    rules={{
                      required: true,
                      pattern: /^\d{1,20}$/,
                    }}
                  />
                </IonItem>
                {errorMessage('houseNr', 'Huisnummer (getal) is verplicht')}

                <IonItem>
                  <IonLabel position="floating">Huisnummer toevoeging</IonLabel>

                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <IonInput
                        name={name}
                        onIonChange={onChange}
                        type="text"
                        placeholder="Huisnummer toevoeging"
                        onBlur={onBlur}
                        autocomplete="off"
                        maxlength={20}
                        value={value}
                      ></IonInput>
                    )}
                    control={control}
                    name="houseNrExtension"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Postcode *</IonLabel>

                  <Controller
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <IonInput
                        name={name}
                        onIonChange={onChange}
                        type="text"
                        placeholder="Postcode (1234 AA)"
                        onBlur={onBlur}
                        autocomplete="off"
                        maxlength={20}
                        value={value}
                      ></IonInput>
                    )}
                    control={control}
                    name="zipcode"
                    rules={{
                      required: true,
                    }}
                  />
                </IonItem>
                {errorMessage('zipcode', 'Postcode is verplicht')}

                <IonItem>
                  <IonLabel position="floating">Plaats *</IonLabel>

                  <Controller
                    render={({ field: { onChange, onBlur, value, name } }) => (
                      <IonInput
                        name={name}
                        onIonChange={onChange}
                        type="text"
                        placeholder="Plaats"
                        onBlur={onBlur}
                        autocomplete="off"
                        maxlength={100}
                        value={value}
                      ></IonInput>
                    )}
                    control={control}
                    name="city"
                    rules={{
                      required: true,
                    }}
                  />
                </IonItem>
                {errorMessage('city', 'Plaats is verplicht')}
              </>
            )}

            <IonButton
              expand="block"
              disabled={isSubmitting || offline}
              style={{ margin: 14 }}
              type="submit"
            >
              Aanmelding bevestigen
            </IonButton>
          </form>
          {loading && (
            <IonLoading
              isOpen={true}
              message={'Even geduld aub, gegevens worden opgehaald'}
              duration={0}
            />
          )}
          {mutationLoading && (
            <IonLoading
              isOpen={true}
              message={'Even geduld aub, gegevens worden opgeslagen'}
              duration={0}
            />
          )}
        </IonContent>
      </>
    );
  },
);
