import {
  Certificering,
  CertificeringStatusEnum,
} from '../__generated__/graphql';
import { dateToUTC } from './date-helpers';

/**
 * Checks the license status for value 'Geldig'
 * Note: not taking into account the dates!
 * @param license
 */
export function isLicenseValid(license: Partial<Certificering>): boolean {
  return license.Status === CertificeringStatusEnum.Geldig;
}

/**
 * Check if license has been expired
 * @param license
 * @param checkDate Default today
 */
export function isLicenseExpired(
  license: Partial<Certificering>,
  checkDate: Date = new Date(),
): boolean {
  return license.UitstelVerleend
    ? new Date(license.UitstelTot) < dateToUTC(checkDate)
    : new Date(license.EindDatum) < dateToUTC(checkDate);
}

/**
 * Is the license withdrawn (checking DatumIngetrokkenVan - Tot or Status Ingetrokken)
 * @param license
 * @param checkDate Default today
 */
export function isLicenseWithdrawn(
  license: Partial<Certificering>,
  checkDate: Date = new Date(),
): boolean {
  if (
    license.Status === CertificeringStatusEnum.Ingetrokken &&
    (!license.DatumIngetrokkenVan || !license.DatumIngetrokkenTot)
  ) {
    return true;
  }
  if (!license.DatumIngetrokkenVan || !license.DatumIngetrokkenTot) {
    return false;
  }
  return (
    (new Date(license.DatumIngetrokkenVan) &&
      new Date(license.DatumIngetrokkenTot) &&
      dateToUTC(checkDate) >= new Date(license.DatumIngetrokkenVan) &&
      dateToUTC(checkDate) <= new Date(license.DatumIngetrokkenTot)) ||
    license.Status === CertificeringStatusEnum.Ingetrokken
  );
}

/**
 * Is the license valid on a given date (default today)
 * @param license
 * @param checkDate Default today
 */
export function isLicenseValidOnDate(
  license: Partial<Certificering>,
  checkDate: Date = new Date(),
): boolean {
  const isWithdrawn = isLicenseWithdrawn(license, checkDate);
  if (isWithdrawn) {
    return false;
  }
  const checkValidOnDate =
    (new Date(license.BeginDatum) <= dateToUTC(checkDate) &&
      new Date(license.EindDatum) >= dateToUTC(checkDate) &&
      license.Status === CertificeringStatusEnum.Geldig) ||
    ((license.Status === CertificeringStatusEnum.Verlopen ||
      license.Status === CertificeringStatusEnum.Geldig) &&
      license.UitstelVerleend &&
      license.UitstelVerleend === true &&
      new Date(license.UitstelTot) >= checkDate);
  if (!checkValidOnDate) {
    return false;
  }
  return true;
}
