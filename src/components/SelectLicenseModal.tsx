import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonItem,
  IonList,
  IonLoading,
  IonLabel,
  IonCardContent,
  IonCardTitle,
  IonButton,
} from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { SelectedLicense } from '../contexts/SelectedLicenseContext';
import { toDutchDate, relativeTimeFormatter } from '../helpers/date-helpers';
import { checkAuthenticationError } from '../helpers/error-helper';
import { isLicenseValidOnDate } from '../helpers/license-helper';
import { useApp_GetMyQuery } from '../__generated__/graphql';

interface SelectLicenseProps {
  dismissModal: any;
}

const SelectLicenseModal: React.FC<SelectLicenseProps> = ({ dismissModal }) => {
  const history = useHistory();
  const { setLicense } = SelectedLicense.useContainer();

  const { loading, error, data } = useApp_GetMyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const activeLicenses = data?.my?.Certificeringen?.filter((c) =>
    isLicenseValidOnDate(c),
  );
  // const activeLicenses = data?.my?.Certificeringen;

  useEffect(() => {
    if (activeLicenses && activeLicenses.length === 1) {
      setLicense(activeLicenses[0]);
      dismissModal();
    }
  }, [activeLicenses, data, setLicense, dismissModal]);

  if (error) {
    if (checkAuthenticationError(error)) {
      setTimeout(() => {
        //   dismissModal();
        history.push('/inloggen', {
          direction: 'none',
        });
        return;
      }, 10);
    }
  }

  const handleSelectedLicense = (licenseId: number) => {
    const license = activeLicenses?.find(
      (c) => c.CertificeringID === licenseId,
    );
    setLicense(license);
    dismissModal();
  };
  const handleNoValidLicense = () => {
    setLicense(null);
    dismissModal();
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => handleNoValidLicense()}>
              Annuleren
            </IonButton>
          </IonButtons>
          <IonTitle>Kies licentie</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Kies een licentie</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Dit helpt u de juiste bijeenkomst te kiezen</p>
          </IonCardContent>
        </IonCard>
        <IonList>
          {activeLicenses &&
            activeLicenses.map((license) => {
              return (
                <IonItem
                  button
                  key={license.CertificeringID}
                  onClick={() => handleSelectedLicense(license.CertificeringID)}
                >
                  <IonLabel className="ion-text-wrap">
                    <h2> {license.Certificaat?.Naam}</h2>
                    <p>{license.NummerWeergave}</p>
                    <h3>
                      Geldig tot {toDutchDate(license.EindDatum)}{' '}
                      <span style={{ fontSize: '80%' }}>
                        ({relativeTimeFormatter(license.EindDatum)})
                      </span>
                    </h3>
                  </IonLabel>
                </IonItem>
              );
            })}
          {activeLicenses && activeLicenses.length === 0 && (
            <IonItem button onClick={() => handleNoValidLicense()}>
              <IonLabel className="ion-text-wrap">
                U heeft geen geldige licenties, daarom kunt u zich niet voor
                bijeenkomsten registreren. Wilt u wel bijeenkomsten bekijken?
                Klik hier.
              </IonLabel>
            </IonItem>
          )}
        </IonList>
        <IonLoading
          isOpen={loading}
          message={'Even geduld aub, gegevens worden opgehaald'}
          duration={0}
        />
      </IonContent>
    </>
  );
};

export default SelectLicenseModal;
