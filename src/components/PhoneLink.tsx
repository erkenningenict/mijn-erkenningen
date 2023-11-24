import { IonIcon } from '@ionic/react';
import { callOutline } from 'ionicons/icons';
interface PhoneLinkProps {
  phone?: string;
}
export const PhoneLink: React.FC<PhoneLinkProps> = ({ phone }) => {
  if (!phone) {
    return null;
  }
  return (
    <div className="mt-1">
      <a href={`tel:${phone?.replace(' ', '').replace('-', '')}`}>
        <IonIcon className="component-icon" slot="start" icon={callOutline} />
        {phone}
      </a>
    </div>
  );
};
