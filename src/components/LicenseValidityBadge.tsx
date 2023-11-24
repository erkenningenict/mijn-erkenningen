import { dateToUTC, toDutchDate } from '../helpers/date-helpers';
import {
  isLicenseWithdrawn,
  isLicenseExpired,
} from '../helpers/license-helper';
import {
  Certificering,
  CertificeringStatusEnum,
} from '../__generated__/graphql';

interface LicenseValidityBadgeProps {
  license: Certificering;
}

const LicenseValidityBadge: React.FC<LicenseValidityBadgeProps> = (props) => {
  const getStatusText = (
    license: Partial<Certificering>,
    checkDate: Date = new Date(),
  ) => {
    if (isLicenseWithdrawn(license, checkDate)) {
      return CertificeringStatusEnum.Ingetrokken;
    }
    if (
      isLicenseExpired(license, checkDate) &&
      license.Status !== CertificeringStatusEnum.DiplomaAfgekeurd &&
      license.Status !== CertificeringStatusEnum.Ingenomen &&
      license.Status !== CertificeringStatusEnum.Ingetrokken
    ) {
      return CertificeringStatusEnum.Verlopen;
    }
    if (new Date(license.BeginDatum) > dateToUTC(checkDate)) {
      return `Automatisch geldig per ${toDutchDate(license.BeginDatum)}`;
    }
    if (license.Status !== CertificeringStatusEnum.Geldig) {
      return license.Status;
    }
    if (license.Status === CertificeringStatusEnum.Geldig) {
      return license.Status;
    }
  };
  const text = getStatusText(props.license);
  let bgColor = '';
  let color = '';
  switch (text) {
    case CertificeringStatusEnum.Geldig:
      // green
      bgColor = 'green';
      color = '#fff';

      break;
    case CertificeringStatusEnum.Verlopen:
      // grey
      bgColor = 'grey';
      color = '#fff';
      break;
    case CertificeringStatusEnum.Ingetrokken:
    case CertificeringStatusEnum.Ingenomen:
      // red
      bgColor = 'red';
      color = '#fff';
      break;
    default:
      // dark orange
      bgColor = '#a96f00';
      color = '#fff';
      break;
  }

  return (
    <div
      style={{
        background: bgColor,
        color: color,
        padding: '4px',
        borderRadius: '5px',
        display: 'inline-block',
        fontSize: '10px',
        textTransform: 'uppercase',
      }}
    >
      {text}
    </div>
  );
};

export default LicenseValidityBadge;
