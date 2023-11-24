import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonBackButton,
  IonItem,
  IonList,
  IonListHeader,
  IonGrid,
  IonCol,
  IonRow,
  IonLabel,
} from '@ionic/react';
import React from 'react';
import {
  CertificeringFieldsFragment,
  PasStatusEnum,
} from '../../../__generated__/graphql';
import { toDutchDate } from '../../../helpers/date-helpers';

export interface PassenPageProps {
  license?: CertificeringFieldsFragment;
}

const PassenPage: React.FC<PassenPageProps> = ({ license }) => {
  const uitTeLeverenPassen = license?.Passen?.filter(
    (p) =>
      p.Status === PasStatusEnum.Aangevraagd ||
      p.Status === PasStatusEnum.Betaald,
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Passen {license?.Certificaat?.Code}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonListHeader>
          <IonLabel>Uitgeleverde passen</IonLabel>
        </IonListHeader>

        <IonList>
          {license?.Passen?.length === 0 && (
            <div className="ion-padding">
              <h6>Er zijn nog geen passen beschikbaar</h6>
            </div>
          )}
          {license?.Passen?.filter(
            (p) => p.Status === PasStatusEnum.Uitgeleverd,
          ).map((p, index) => {
            return (
              <IonItem key={index}>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <p>Aangevraagd:</p>
                    </IonCol>
                    <IonCol>
                      <p>{toDutchDate(p.DatumAanvraag)}</p>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <p>Uitgeleverd:</p>
                    </IonCol>
                    <IonCol>
                      <p>{toDutchDate(p.DatumUitgeleverd)}</p>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            );
          })}
        </IonList>

        <IonListHeader>
          <IonLabel>Uit te leveren passen</IonLabel>
        </IonListHeader>

        <IonList>
          {uitTeLeverenPassen?.length === 0 && (
            <div className="ion-padding">
              <h6>Er zijn geen uit te leveren passen gevonden</h6>
              <p>
                Als u voldoende bijeenkomsten heeft gevolgd ontvangt u bij
                verlenging een nieuwe pas.
              </p>
            </div>
          )}
          {uitTeLeverenPassen?.map((p) => {
            return (
              <IonItem
                key={p.PasID}
                routerLink={`/mijn-licenties/${license?.CertificeringID}/bijeenkomsten/${p.PasID}/gevolgde-bijeenkomst-details`}
              >
                <div>
                  <p>{toDutchDate(p.DatumAanvraag)}</p>
                </div>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PassenPage;
