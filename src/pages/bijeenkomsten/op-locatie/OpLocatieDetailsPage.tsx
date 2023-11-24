import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonBackButton,
  IonLoading,
  IonButton,
  IonModal,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { client } from '../../../AppWrapper';
import { CardHeader } from '../../../components/CardHeader';
import { EmailLink } from '../../../components/EmailLink';
import ErrorComponent from '../../../components/ErrorComponent';
import { PhoneLink } from '../../../components/PhoneLink';
import SelectLicenseModal from '../../../components/SelectLicenseModal';
import { useToast } from '../../../components/Toast';
import { WebsiteLink } from '../../../components/WebsiteLink';
import { SelectedLicense } from '../../../contexts/SelectedLicenseContext';
import { toDutchDate } from '../../../helpers/date-helpers';
import { toDutchMoney } from '../../../helpers/format-money';
import {
  CursusSessiesFieldsFragment,
  useApp_GetCursusSessiesDetailsNoLicenseQuery,
  useApp_GetCursusSessiesDetailsQuery,
  useApp_UnRegisterForCourseByCourseIdMutation,
} from '../../../__generated__/graphql';
import { RegisterModal } from '../RegisterModal';

export interface BijeenkomstDetailsProps {}

const OpLocatieDetailsPage: React.FC<BijeenkomstDetailsProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const Toast = useToast();
  const [showLicenseModal, setShowLicenseModal] = useState<boolean>(false);
  const { license } = SelectedLicense.useContainer();
  const { cursusId } = useParams<{ cursusId: string }>();

  const { loading, error, data, refetch } = useApp_GetCursusSessiesDetailsQuery(
    {
      variables: {
        input: {
          currentCourseId: +cursusId,
          isOnlineCourse: false,
          isWebinar: false,
        },
        inputCheck: {
          courseId: +cursusId,
          licenseId: license?.CertificeringID || 0,
        },
      },
      fetchPolicy: 'cache-and-network',
      skip: cursusId === null || !license || license === null,
    },
  );

  const {
    loading: loadingNoLicense,
    error: errorNoLicense,
    data: dataNoLicense,
  } = useApp_GetCursusSessiesDetailsNoLicenseQuery({
    variables: {
      input: {
        currentCourseId: +cursusId,
        isOnlineCourse: false,
        isWebinar: false,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: !!license,
  });

  const [unRegisterCourse, { loading: mutationLoading }] =
    useApp_UnRegisterForCourseByCourseIdMutation();

  useEffect(() => {
    if (license === null) {
      setShowLicenseModal(true);
    }
  }, [license]);

  if (error) {
    console.log('#DH# error', error);
    return <ErrorComponent error={error} />;
  }

  if (errorNoLicense) {
    console.log('#DH# error no license', error);
    return <ErrorComponent error={error} />;
  }

  const d = (
    dataNoLicense
      ? dataNoLicense?.CursusSessies &&
        dataNoLicense.CursusSessies.length === 1 &&
        dataNoLicense.CursusSessies[0]
      : data?.CursusSessies &&
        data.CursusSessies.length === 1 &&
        data.CursusSessies[0]
  ) as CursusSessiesFieldsFragment;

  const getCourseDateTime = () => {
    const courseDate = new Date(d?.Date);
    const timeParts = d?.StartTime.split(':');

    if (timeParts) {
      courseDate.setHours(parseInt(timeParts[0], 10));
      courseDate.setMinutes(parseInt(timeParts[1], 10));
    }

    return courseDate;
  };

  const handleOpenRegisterModal = () => {
    setShowModal(true);
  };

  const handleUnRegister = async () => {
    try {
      const res = await unRegisterCourse({
        variables: { input: { cursusId: d.CourseId, dateTime: d.Date } },
      });
      if (res.data?.unRegisterForCourseByCourseId?.success) {
        Toast.success('U bent afgemeld');
        refetch();
        await client.refetchQueries({
          include: [
            'App_GetStudyProgressByLicenseId',
            'App_GetMyStudieresultatenEnAangemeldeCursusdeelnames',
          ],
        });
      } else {
        Toast.error(
          `U kon niet afgemeld worden. Reden: ${res.data?.unRegisterForCourseByCourseId?.message}`,
        );
      }
    } catch (err) {
      console.log('#DH# Error unregister', err);
      Toast.error(`U kon niet afgemeld worden. Reden: ${err}`);
    }
  };

  const address = d?.LocationAddress;
  const handleGoToMaps = () => {
    if (address) {
      const addressForLink = `${address.Street} ${address.HouseNr}${address.HouseNrExtension},${address.Zipcode} ${address.City}`;
      window.open(
        `https://www.google.nl/maps/place/${addressForLink.replace(
          /\s/g,
          '+',
        )}`,
      );
    }
  };
  const locationName = d?.LocationName;
  const locationAddress = address && (
    <div className="location-area">
      {(locationName === 'Webinar' || locationName === 'Online cursus') && (
        <>
          <p className="location-label">Webinar</p>
        </>
      )}

      {locationName !== 'Webinar' && locationName !== 'Online cursus' && (
        <>
          <CardHeader>Bijeenkomstlocatie</CardHeader>
          <p>{locationName}</p>
          <p>
            {address.Street} {address.HouseNr}
            {address.HouseNrExtension || ''}, {address.Zipcode} {address.City}
          </p>
          <IonButton onClick={handleGoToMaps} color="medium">
            <IonIcon slot="start" icon={locationOutline} />
            Open kaart
          </IonButton>
        </>
      )}
    </div>
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/bijeenkomsten/op-locatie"></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Op locatie</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <>
          <IonModal
            isOpen={showLicenseModal}
            onDidDismiss={() => setShowLicenseModal(false)}
          >
            <SelectLicenseModal
              dismissModal={() => {
                setShowLicenseModal(false);
              }}
            />
          </IonModal>

          {d && (
            <>
              <IonCard className="welcome-card">
                <IonCardHeader>
                  <p style={{ fontSize: '16px', marginBottom: '5px' }}>
                    <strong>{d.Title}</strong>
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    Cursuscode: {d.CourseCode}
                  </p>
                  {d.CanUnRegister && (
                    <IonItem color="success">
                      <IonLabel className="ion-text-wrap">
                        U bent aangemeld voor deze bijeenkomst.
                      </IonLabel>
                    </IonItem>
                  )}
                  {d.CanUnRegister && (
                    <IonButton
                      type="button"
                      color="danger"
                      expand="block"
                      className="mt-1"
                      onClick={handleUnRegister}
                    >
                      Afmelden
                    </IonButton>
                  )}
                  {data && !data?.isLicenseValidForSpecialty.success && (
                    <div className="bg-red-500 p-2 mt-1 rounded-md text-white">
                      <h5 className="mb-1">
                        Door het volgen van deze bijeenkomst kunt u uw
                        (geselecteerde) licentie NIET verlengen.
                      </h5>
                      Zoek een bijeenkomst van een ander bijeenkomsttype waarmee
                      u uw licentie wel kunt verlengen of kies een andere
                      licentie (indien u meerdere licenties bezit).
                    </div>
                  )}
                </IonCardHeader>
                <IonCardContent>
                  <dl className="styled-dl mb-2">
                    <dt>Thema</dt>
                    <dd>{d.Theme}</dd>

                    <dt>Competentie</dt>
                    <dd>{d.Competence}</dd>

                    <dt>Datum</dt>
                    <dd>{toDutchDate(d.Date)}</dd>

                    <dt>Van-tot</dt>
                    <dd>
                      {d.StartTime} - {d.EndTime}
                    </dd>

                    <dt>Plaats</dt>
                    <dd>{d.LocationAddress?.City}</dd>

                    <dt>Prijs</dt>
                    <dd>{toDutchMoney(d.Price, { euroPrefix: true })}</dd>
                  </dl>
                  <p className={`mt-2`}>{d.PromoText}</p>

                  {locationAddress}

                  <CardHeader>Aanbiedergegevens</CardHeader>

                  {d?.Organizer}

                  {d.OrganizerEmail && <EmailLink email={d.OrganizerEmail} />}

                  {d.OrganizerPhone && <PhoneLink phone={d.OrganizerPhone} />}

                  {d.OrganizerWebsite && (
                    <WebsiteLink website={d.OrganizerWebsite} />
                  )}

                  {!d.Registered &&
                    data?.isLicenseValidForSpecialty.success && (
                      <IonButton
                        type="button"
                        expand="block"
                        className="mt-2"
                        onClick={handleOpenRegisterModal}
                      >
                        Aanmelden
                      </IonButton>
                    )}
                </IonCardContent>
              </IonCard>

              <IonModal
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
              >
                <RegisterModal
                  selectedLicenseId={license?.CertificeringID ?? 0}
                  code={d.CourseCode}
                  courseDateTime={getCourseDateTime()}
                  courseId={d.CourseId}
                  isDigitalSpecialty={false}
                  specialtyId={d.SpecialtyId}
                  title={d.Title}
                  dismissModal={() => {
                    setShowModal(false);
                    refetch();
                  }}
                />
              </IonModal>
            </>
          )}
        </>
        <IonLoading
          isOpen={loading || loadingNoLicense}
          message={'Even geduld aub, gegevens worden opgehaald'}
          duration={0}
        />
        <IonLoading
          isOpen={mutationLoading}
          message={'Even geduld aub, gegevens worden verwerkt'}
          duration={0}
        />
      </IonContent>
    </IonPage>
  );
};

export default OpLocatieDetailsPage;
