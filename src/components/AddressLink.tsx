import { IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';

interface AddressLinkProps {
  address?: string;
}
export const AddressLink: React.FC<AddressLinkProps> = ({ address }) => {
  if (!address) {
    return null;
  }
  return (
    <div className="mt-1">
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${address.replace(
          /\s/g,
          '+',
        )}`}
      >
        <IonIcon
          className="component-icon"
          slot="start"
          icon={locationOutline}
        />
        {address}
      </a>
    </div>
  );
};
