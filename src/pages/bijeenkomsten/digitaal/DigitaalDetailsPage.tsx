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
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CardHeader } from '../../../components/CardHeader';
import { EmailLink } from '../../../components/EmailLink';
import ErrorComponent from '../../../components/ErrorComponent';
import { PhoneLink } from '../../../components/PhoneLink';
import SelectLicenseModal from '../../../components/SelectLicenseModal';
import { WebsiteLink } from '../../../components/WebsiteLink';
import { SelectedLicense } from '../../../contexts/SelectedLicenseContext';
import { toDutchMoney } from '../../../helpers/format-money';
import {
  SpecialtyDetailsFieldsFragment,
  useApp_GetSpecialtyDetailsNoLicenseQuery,
  useApp_GetSpecialtyDetailsQuery,
} from '../../../__generated__/graphql';
import { RegisterModal } from '../RegisterModal';

export interface DigitaalDetailsProps {}

const DigitaalDetailsPage: React.FC<DigitaalDetailsProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLicenseModal, setShowLicenseModal] = useState<boolean>(false);
  const { license } = SelectedLicense.useContainer();
  const { vakId } = useParams<{ vakId: string }>();

  const { loading, error, data, refetch } = useApp_GetSpecialtyDetailsQuery({
    variables: {
      input: {
        specialtyId: +vakId ?? 0,
        isOnlineCourse: true,
      },
      inputCheck: {
        licenseId: license?.CertificeringID ?? 0,
        specialtyId: +vakId ?? 0,
      },
    },
    skip: !license || license === null,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const {
    loading: loadingNoLicense,
    error: errorNoLicense,
    data: dataNoLicense,
  } = useApp_GetSpecialtyDetailsNoLicenseQuery({
    variables: {
      input: {
        specialtyId: +vakId ?? 0,
        isOnlineCourse: true,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: !license,
  });

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
      ? dataNoLicense?.SearchSpecialties &&
        dataNoLicense.SearchSpecialties.length === 1 &&
        dataNoLicense.SearchSpecialties[0]
      : data?.SearchSpecialties &&
        data.SearchSpecialties.length === 1 &&
        data.SearchSpecialties[0]
  ) as SpecialtyDetailsFieldsFragment;

  const aanbodWebsite = d?.SpecialtyWebsite;

  const handleOpenRegisterModal = () => {
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/digitale-bijeenkomsten"></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Digitale bijeenkomst</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <>
          <IonModal
            isOpen={showLicenseModal}
            swipeToClose={true}
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
                  <p>Erkenningsnummer: {d.SpecialtyId}</p>

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

                    <dt>Prijs</dt>
                    <dd>{toDutchMoney(d.Price, { euroPrefix: true })}</dd>
                  </dl>
                  <p className={`mt-2`}>{d.PromoText}</p>

                  <>
                    {aanbodWebsite &&
                      aanbodWebsite !== null &&
                      data?.isLicenseValidForSpecialty.success && (
                        <a
                          className="btn btn-primary mt-2"
                          style={{
                            margin: '20px 0',
                            display: 'block',
                          }}
                          href={`https://${aanbodWebsite?.replace(
                            'https://',
                            '',
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Direct aanmelden bij aanbieder
                        </a>
                      )}
                  </>

                  <CardHeader>Aanbiedergegevens</CardHeader>

                  {d?.Organizer}

                  {d.OrganizerEmail && <EmailLink email={d.OrganizerEmail} />}

                  {d.OrganizerPhone && <PhoneLink phone={d.OrganizerPhone} />}

                  {d.OrganizerWebsite && (
                    <WebsiteLink website={d.OrganizerWebsite} />
                  )}

                  {data?.isLicenseValidForSpecialty.success && (
                    <>
                      <IonButton
                        type="button"
                        expand="block"
                        className="mt-2"
                        onClick={handleOpenRegisterModal}
                      >
                        Aanmelden via Bureau Erkenningen *
                      </IonButton>
                      <p style={{ marginTop: '15px' }}>
                        * Digitale aanboden kunt u niet afmelden via Bureau
                        Erkenningen, doe dit bij de kennisaanbieder direct.
                      </p>
                    </>
                  )}
                </IonCardContent>
              </IonCard>
              {(loading || loadingNoLicense) && (
                <IonLoading
                  isOpen={true}
                  message={'Even geduld aub, gegevens worden opgehaald'}
                  duration={0}
                />
              )}

              <IonModal
                isOpen={showModal}
                swipeToClose={true}
                onDidDismiss={() => setShowModal(false)}
              >
                <RegisterModal
                  selectedLicenseId={license?.CertificeringID ?? 0}
                  code={d.Code}
                  courseDateTime={new Date()}
                  courseId={d.SpecialtyId}
                  isDigitalSpecialty={true}
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
      </IonContent>
    </IonPage>
  );
};

export default DigitaalDetailsPage;
