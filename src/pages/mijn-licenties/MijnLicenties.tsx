import {
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  RefresherEventDetail,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonLoading,
} from '@ionic/react';
import React from 'react';
import ErrorComponent from '../../components/ErrorComponent';
import LicenseValidityBadge from '../../components/LicenseValidityBadge';
import NoLicense from '../../components/NoLicense';
import { relativeTimeFormatter, toDutchDate } from '../../helpers/date-helpers';
import { isLicenseValidOnDate } from '../../helpers/license-helper';
import {
  Certificering,
  CertificeringenFieldsFragment,
  useApp_GetMyQuery,
} from '../../__generated__/graphql';

export interface MijnLicentiesProps {}

const MijnLicentiesPage: React.FC<MijnLicentiesProps> = () => {
  const { loading, error, data, refetch } = useApp_GetMyQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <ErrorComponent error={error} />;
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await refetch();
    } catch (error) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  const activeLicensesList =
    data?.my?.Certificeringen &&
    (data?.my?.Certificeringen.filter((c: CertificeringenFieldsFragment) => {
      return isLicenseValidOnDate(c as Certificering, new Date());
    }).sort(
      (a: CertificeringenFieldsFragment, b: CertificeringenFieldsFragment) =>
        a.BeginDatum > b.BeginDatum ? 1 : -1,
    ) ||
      []);

  const inactiveLicensesList =
    data?.my?.Certificeringen &&
    (data?.my?.Certificeringen.filter((c: CertificeringenFieldsFragment) => {
      return !isLicenseValidOnDate(c as Certificering, new Date());
    }).sort(
      (a: CertificeringenFieldsFragment, b: CertificeringenFieldsFragment) =>
        a.BeginDatum > b.BeginDatum ? -1 : 1,
    ) ||
      []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mijn licenties</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonListHeader>
          <IonLabel>Geldige licenties</IonLabel>
        </IonListHeader>

        <IonList>
          {activeLicensesList?.length === 0 && <NoLicense></NoLicense>}
          {activeLicensesList?.map((c: CertificeringenFieldsFragment) => {
            const showExpiredOrRelativeDate =
              new Date(c.EindDatum) < new Date()
                ? 'verlopen'
                : relativeTimeFormatter(c.EindDatum);
            return (
              <IonItem
                key={c.CertificeringID}
                routerLink={`/mijn-licenties/${c.CertificeringID}`}
              >
                <IonLabel className="ion-text-wrap">
                  <h2>{c.Certificaat!.Naam}</h2>
                  <h3>
                    {c.NummerWeergave}{' '}
                    <LicenseValidityBadge
                      license={c as unknown as Certificering}
                    />
                  </h3>
                  <p>
                    Geldig van {toDutchDate(c.BeginDatum)} tot{' '}
                    {toDutchDate(c.EindDatum)}
                    {` (${showExpiredOrRelativeDate})`}
                  </p>
                  <p style={{ color: 'red' }}>
                    {c.UitstelVerleend
                      ? ` U heeft uitstel gekregen tot ${toDutchDate(
                          c.UitstelTot,
                        )}`
                      : ''}
                  </p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>

        <IonListHeader>
          <IonLabel>Overige licenties</IonLabel>
        </IonListHeader>
        <IonList>
          {inactiveLicensesList?.length === 0 && <NoLicense></NoLicense>}
          {inactiveLicensesList?.map((c: CertificeringenFieldsFragment) => {
            const showExpiredOrRelativeDate =
              new Date(c.EindDatum) < new Date()
                ? 'verlopen'
                : new Date(c.BeginDatum) > new Date()
                ? 'nog niet geldig'
                : relativeTimeFormatter(c.EindDatum);
            return (
              <IonItem
                key={c.CertificeringID}
                routerLink={`/mijn-licenties/${c.CertificeringID}`}
              >
                <IonLabel className="ion-text-wrap">
                  <h2>{c.Certificaat!.Naam}</h2>
                  <h3>
                    {c.NummerWeergave}{' '}
                    <LicenseValidityBadge
                      license={c as unknown as Certificering}
                    />
                  </h3>
                  <p>
                    Geldig van {toDutchDate(c.BeginDatum)} tot{' '}
                    {toDutchDate(c.EindDatum)}
                    {` (${showExpiredOrRelativeDate})`}
                  </p>
                  <p style={{ color: 'red' }}>
                    {c.UitstelVerleend
                      ? ` U heeft uitstel gekregen tot ${toDutchDate(
                          c.UitstelTot,
                        )}`
                      : ''}
                  </p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
      {loading && (
        <IonLoading
          isOpen={true}
          message={'Even geduld aub, gegevens worden opgehaald'}
          duration={0}
        />
      )}
    </IonPage>
  );
};

export default MijnLicentiesPage;
