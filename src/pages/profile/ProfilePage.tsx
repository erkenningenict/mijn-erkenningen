import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonModal,
  IonLoading,
} from '@ionic/react';
import React, { useState } from 'react';
import ErrorComponent from '../../components/ErrorComponent';
import { toDutchDate } from '../../helpers/date-helpers';
import {
  MyContactgegevensFieldsFragment,
  useApp_GetMyQuery,
} from '../../__generated__/graphql';
import { EditProfileModal } from './EditProfileModal';

const ProfilePage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorInModal, setErrorInModal] = useState<any>();
  const { loading, error, data } = useApp_GetMyQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <ErrorComponent error={error} />;
  }
  if (errorInModal) {
    return <ErrorComponent error={error} />;
  }

  const my = data?.my?.Persoon;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profiel</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>{my?.FullName}</IonCardTitle>
            <IonCardSubtitle>Persoon ID: {my?.PersoonID}</IonCardSubtitle>
            <p>Geboortedatum: {toDutchDate(my?.Geboortedatum)}</p>
            <p>Geslacht: {my?.Geslacht}</p>
          </IonCardHeader>
          <IonCardContent>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td className="font-bold py-2">Adres</td>
                  <td>{my?.Contactgegevens.DisplayAddress}</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">E-mail</td>
                  <td>
                    {my?.Contactgegevens.Email || 'Onbekend - vul in aub'}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold py-2">E-mail werkgever</td>
                  <td>{my?.Contactgegevens.EmailWerkgever || 'Onbekend'}</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">Telefoon</td>
                  <td>{my?.Contactgegevens.Telefoon}</td>
                </tr>
              </tbody>
            </table>
            <IonButton onClick={() => setShowModal(true)}>
              Wijzig uw gegevens
            </IonButton>

            <h2 style={{ marginTop: '15px' }}>Inloggegevens</h2>
            <p>
              Uw inloggegevens zijn hetzelfde als op de{' '}
              <a
                href="https://administratie.erkenningen.nl"
                target="_blank"
                rel="noreferrer"
              >
                Bureau Erkenningen website
              </a>
              .
            </p>
            <p>
              Uw wachtwoord wijzigt u via deze{' '}
              <a
                href="https://administratie.erkenningen.nl/Default.aspx?tabid=143"
                target="_blank"
                rel="noreferrer"
              >
                link
              </a>
              .
            </p>
          </IonCardContent>
        </IonCard>
        <IonLoading
          isOpen={loading}
          message={'Even geduld aub, gegevens worden opgehaald'}
          duration={0}
        />
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <EditProfileModal
            contactgegevens={
              data?.my?.Persoon.Contactgegevens ||
              ({} as MyContactgegevensFieldsFragment)
            }
            dismissModal={(error?: any) => {
              setShowModal(false);
              if (error) {
                setErrorInModal(error);
              }
            }}
          />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
