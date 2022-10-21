import { IonIcon } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
interface WebsiteLinkProps {
  website?: string;
}
export const WebsiteLink: React.FC<WebsiteLinkProps> = ({ website }) => {
  if (!website) {
    return null;
  }
  return (
    <div className="mt-1">
      <a
        href={website.replace(/^www/, 'https://www')}
        target="_blank"
        rel="noreferrer"
      >
        <IonIcon className="component-icon" slot="start" icon={globeOutline} />
        {website.replace('http://', '').replace('https://', '')}
      </a>
    </div>
  );
};
