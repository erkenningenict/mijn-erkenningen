import { IonItem, IonLabel } from '@ionic/react';

interface NoLicenseProps {
  onDashboard?: boolean;
}

const NoLicense: React.FC<NoLicenseProps> = ({ onDashboard }) => {
  return (
    <IonItem>
      <IonLabel className="ion-text-wrap">
        <h3>U heeft (nog) geen geldige licenties.</h3>
        <p>
          Volg kennisbijeenkomst of doe een examen om een licentie te
          verkrijgen.{' '}
          {onDashboard && (
            <span>
              Of ga naar <a href="mijn-licenties">al uw licenties</a>.
            </span>
          )}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default NoLicense;
