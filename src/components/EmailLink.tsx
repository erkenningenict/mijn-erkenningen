import { IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
interface EmailLinkProps {
  email?: string;
}
export const EmailLink: React.FC<EmailLinkProps> = ({ email }) => {
  if (!email) {
    return null;
  }
  return (
    <div className="mt-1">
      <a href={`mailto:${email}`}>
        <IonIcon className="component-icon" slot="start" icon={mailOutline} />
        {email}
      </a>
    </div>
  );
};
