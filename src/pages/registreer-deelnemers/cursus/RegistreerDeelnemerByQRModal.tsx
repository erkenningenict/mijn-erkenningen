import React, { useCallback, useEffect, useState } from 'react';
import {
  IonCard,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonPage,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonLoading,
  getPlatforms,
} from '@ionic/react';
import { IsOffline } from '../../../contexts/OfflineContext';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QrReader } from 'react-qr-reader';
import { parse } from 'date-fns';
import { useApp_SearchCursusDeelnemersQuery } from '../../../__generated__/graphql';
import ErrorComponent from '../../../components/ErrorComponent';
import { useHistory, useParams } from 'react-router';

interface WebinarListFilterModalProps {
  dismissModal: any;
}

export const RegistreerDeelnemerByQRModal: React.FC<WebinarListFilterModalProps> =
  ({ dismissModal }) => {
    const { offline } = IsOffline.useContainer();
    const { cursusId } = useParams<{ cursusId: string }>();
    const history = useHistory();
    const [qrData, setQrData] = useState<
      | {
          nummer: string;
          certificaatId: string;
          beginDatum: Date;
          eindDatum: Date;
        }
      | undefined
    >(undefined);
    const [showWebQrScanner, setShowWebQrScanner] = useState<boolean>(false);

    const {
      loading,
      error,
      data: dataCursusDeelnemers,
    } = useApp_SearchCursusDeelnemersQuery({
      variables: {
        input: {
          CursusID: parseInt(cursusId, 10),
          pasnummer: qrData?.nummer.replace(/\./g, ''),
        },
      },
      fetchPolicy: 'network-only',
      skip: qrData === undefined,
      nextFetchPolicy: 'network-only',
    });

    const deelnemers = dataCursusDeelnemers?.SearchCursusDeelnemers;

    // go to DeelnemersDetailsPage
    useEffect(() => {
      if (deelnemers && deelnemers?.length === 1) {
        dismissModal();

        setTimeout(() => {
          history.push(
            `/registreer-deelnemers/cursus/${cursusId}/deelnemer/${deelnemers[0].PersoonID}`,
          );
        }, 10);
      }
    }, [deelnemers, dismissModal, history, cursusId]);

    const decodeQrData = useCallback(
      (data: string) => {
        try {
          let nummer = '';
          let certificaatId = '0';
          let beginDatum: Date = new Date();
          let eindDatum: Date = new Date();
          const split = data.split('|');
          nummer = split[0];
          certificaatId = split[1];
          beginDatum = parse(split[2], 'yyMMdd', new Date());
          eindDatum = parse(split[3], 'yyMMdd', new Date());

          setQrData({
            nummer,
            certificaatId,
            beginDatum,
            eindDatum,
          });
        } catch (e) {
          console.log('#DH# error decoding', e);
        }
      },
      [setQrData],
    );

    const initiateScan = useCallback(async () => {
      setQrData(undefined);
      const platforms = getPlatforms();
      const isWeb =
        platforms.includes('desktop') ||
        platforms.includes('mobileweb') ||
        platforms.includes('pwa');

      if (!isWeb) {
        const data = await BarcodeScanner.scan();

        if (data) {
          decodeQrData(data.text);
        }
      } else {
        setShowWebQrScanner(true);
      }
    }, [setQrData, decodeQrData]);

    const scan = (data: string) => {
      decodeQrData(data);
    };

    useEffect(() => {
      if (!qrData) {
        initiateScan();
      }
    }, [qrData, initiateScan]);

    if (error) {
      console.log('#DH# RegistreerDeelnemerByQRModal error');
      return <ErrorComponent error={error} />;
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton onClick={() => dismissModal()}>Annuleren</IonButton>
            </IonButtons>
            <IonTitle>Scan QR code</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard className="welcome-card">
            <IonCardHeader>
              <IonCardTitle>Scan QR code</IonCardTitle>
              <ol className="ion-margin-top">
                <li>Vraag de deelnemer de Bureau Erkenningen app te openen.</li>
                <li>Vanuit het menu, kies "Mijn licenties".</li>
                <li>
                  Kies de licentie waarmee de deelnemer zich wil registreren.
                </li>
                <li>Scan de QR code van de licentie.</li>
              </ol>
            </IonCardHeader>
            <IonCardContent>
              {qrData && (
                <IonButton onClick={initiateScan} disabled={offline}>
                  Open QR code scanner
                </IonButton>
              )}
              {showWebQrScanner && (
                <QrReader
                  onResult={(result) => {
                    if (!!result) {
                      scan(result?.getText());
                      setShowWebQrScanner(false);
                    }
                  }}
                  constraints={{ facingMode: 'environment' }}
                />
              )}
            </IonCardContent>
          </IonCard>
          {loading && (
            <IonLoading
              isOpen={true}
              message={'Even geduld aub, gegevens worden opgehaald'}
              duration={0}
            />
          )}
        </IonContent>
      </IonPage>
    );
  };
