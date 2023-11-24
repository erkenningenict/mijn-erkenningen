import { IonList, IonListHeader, IonItem, IonLabel } from '@ionic/react';
import React, { useEffect, useMemo } from 'react';
import LicenseValidityBadge from '../../../components/LicenseValidityBadge';
import NoLicense from '../../../components/NoLicense';
import { SelectedLicense } from '../../../contexts/SelectedLicenseContext';
import {
  relativeTimeFormatter,
  toDutchDate,
} from '../../../helpers/date-helpers';
import { isLicenseValidOnDate } from '../../../helpers/license-helper';
import {
  Certificering,
  CertificeringenFieldsFragment,
} from '../../../__generated__/graphql';

export interface GeldigeLicentiesPageProps {
  certificeringen: CertificeringenFieldsFragment[];
}

const GeldigeLicentiesPage: React.FC<GeldigeLicentiesPageProps> = ({
  certificeringen,
}) => {
  const { setLicense } = SelectedLicense.useContainer();
  const activeLicenses = useMemo(() => {
    return (
      certificeringen
        ?.filter((c: CertificeringenFieldsFragment) => {
          return isLicenseValidOnDate(c as Certificering, new Date());
        })
        .sort(
          (
            a: CertificeringenFieldsFragment,
            b: CertificeringenFieldsFragment,
          ) => (a.BeginDatum > b.BeginDatum ? 1 : -1),
        ) || []
    );
  }, [certificeringen]);

  useEffect(() => {
    if (activeLicenses && activeLicenses.length === 1) {
      setLicense?.(activeLicenses[0]);
    }
  }, [activeLicenses, setLicense]);

  return (
    <>
      <IonListHeader>
        <IonLabel>Mijn geldige licenties</IonLabel>
      </IonListHeader>
      <IonList>
        {activeLicenses.length === 0 && <NoLicense onDashboard={true} />}
        {activeLicenses.map((c: CertificeringenFieldsFragment) => {
          const showExpiredOrRelativeDate =
            new Date(c.EindDatum) < new Date()
              ? 'verlopen'
              : relativeTimeFormatter(c.EindDatum);
          return (
            <IonItem
              key={c.CertificeringID}
              routerLink={`/mijn-licenties/${c.CertificeringID}/overzicht`}
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
                  Geldig tot {toDutchDate(c.EindDatum)}
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
        <IonLabel>Al mijn licenties</IonLabel>
      </IonListHeader>
      <IonList>
        <IonItem routerLink={`/mijn-licenties`}>
          <IonLabel className="ion-text-wrap">
            Een overzicht van uw licenties
          </IonLabel>
        </IonItem>
      </IonList>
      <IonListHeader>
        <IonLabel>Bijeenkomsten</IonLabel>
      </IonListHeader>
      <IonList>
        <IonItem routerLink={`/bijeenkomsten/op-locatie`}>
          <IonLabel className="ion-text-wrap">
            Zoek een bijeenkomst, webinar of digitaal aanbod om uw licentie te
            verlengen
          </IonLabel>
        </IonItem>
      </IonList>
      <IonListHeader>
        <IonLabel>Deel uw gegevens</IonLabel>
      </IonListHeader>
      <IonList>
        <IonItem routerLink={`/mijn-profiel`}>
          <IonLabel className="ion-text-wrap">
            Bekijk uw profiel gegevens
          </IonLabel>
        </IonItem>
        <IonItem routerLink={`/deel-met-kennisaanbieder`}>
          <IonLabel className="ion-text-wrap">
            Deel uw gegevens met een kennisaanbieder
          </IonLabel>
        </IonItem>

        <IonItem routerLink={`/deel-met-handelaar`}>
          <IonLabel className="ion-text-wrap">
            Deel uw gegevens met de handelaar
          </IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};
export default GeldigeLicentiesPage;
