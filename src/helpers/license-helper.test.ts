import {
  Certificering,
  CertificeringStatusEnum,
} from '../__generated__/graphql';
import {
  isLicenseExpired,
  isLicenseValid,
  isLicenseValidOnDate,
  isLicenseWithdrawn,
} from './license-helper';

describe('License Validations', () => {
  describe('isLicenseValid()', () => {
    test('should return true if license is valid', () => {
      const license: Partial<Certificering> = {
        Status: CertificeringStatusEnum.Geldig,
      };
      const result = isLicenseValid(license);
      expect(result).toBeTruthy();
    });
    test('should return false if license is invalid', () => {
      const license: Partial<Certificering> = {
        Status: CertificeringStatusEnum.Ingetrokken,
      };
      const result = isLicenseValid(license);
      expect(result).toBeFalsy();
    });
  });

  describe('isLicenseExpired()', () => {
    test('should return true if license is expired', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2012, 1, 1),
        EindDatum: new Date(2017, 1, 1),
      };
      const result = isLicenseExpired(license);
      expect(result).toBeTruthy();
    });
    test('should return false if license is not expired', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2012, 1, 1),
        EindDatum: new Date(2217, 1, 1),
      };
      const result = isLicenseExpired(license);
      expect(result).toBeFalsy();
    });
    test('should return false if postponed license is not expired', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2012, 1, 1),
        EindDatum: new Date(2019, 1, 1),
        UitstelVerleend: true,
        UitstelTot: new Date(2219, 1, 1),
        Status: CertificeringStatusEnum.Verlopen,
      };
      const result = isLicenseExpired(license);
      expect(result).toBeFalsy();
    });
    test('should return true if postponed license is expired', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2012, 1, 1),
        EindDatum: new Date(2019, 1, 1),
        UitstelVerleend: true,
        UitstelTot: new Date(2019, 2, 2),
      };
      const result = isLicenseExpired(license);
      expect(result).toBeTruthy();
    });
  });

  describe('isLicenseWithDrawn()', () => {
    test('should return false if license is is not withdrawn', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2012, 1, 1),
        EindDatum: new Date(2017, 1, 1),
        Status: CertificeringStatusEnum.Geldig,
      };
      const result = isLicenseWithdrawn(license);
      expect(result).toBeFalsy();
    });
    test('should return true if license status is withdrawn', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2012, 1, 1),
        EindDatum: new Date(2017, 1, 1),
        Status: CertificeringStatusEnum.Ingetrokken,
      };
      const result = isLicenseWithdrawn(license);
      expect(result).toBeTruthy();
    });
    test('should return true if license DateWithdrawn fields are on today', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2012, 1, 1),
        EindDatum: new Date(2017, 1, 1),
        DatumIngetrokkenVan: new Date(2017, 1, 1),
        DatumIngetrokkenTot: new Date(2025, 1, 1),
        Status: CertificeringStatusEnum.Geldig,
      };
      const result = isLicenseWithdrawn(license);
      expect(result).toBeTruthy();
    });
    test('should return false if license DateWithdrawn fields are not on today', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2012, 1, 1),
        EindDatum: new Date(2017, 1, 1),
        DatumIngetrokkenVan: new Date(2025, 1, 1),
        DatumIngetrokkenTot: new Date(2025, 1, 2),
        Status: CertificeringStatusEnum.Geldig,
      };
      const result = isLicenseWithdrawn(license);
      expect(result).toBeFalsy();
    });
  });

  describe('isLicenseValidOnDate()', () => {
    test('should be true on date for normal scenario', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2019, 0, 1),
        EindDatum: new Date(2022, 0, 1),
        DatumIngetrokkenVan: null,
        DatumIngetrokkenTot: null,
        Status: CertificeringStatusEnum.Geldig,
      };
      const checkDate = new Date(2019, 5, 1);
      const result = isLicenseValidOnDate(license, checkDate);
      expect(result).toBeTruthy();
    });

    test('should be false when withdrawn', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2019, 0, 1),
        EindDatum: new Date(2022, 0, 1),
        DatumIngetrokkenVan: new Date(2019, 2, 1),
        DatumIngetrokkenTot: new Date(2019, 8, 1),
        Status: CertificeringStatusEnum.Ingetrokken,
      };
      const checkDate = new Date(2019, 5, 1);
      const result = isLicenseValidOnDate(license, checkDate);
      expect(result).toBeFalsy();
    });

    test('should be true when check date within license date ', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2019, 0, 1),
        EindDatum: new Date(2022, 0, 1),
        DatumIngetrokkenVan: null,
        DatumIngetrokkenTot: null,
        Status: CertificeringStatusEnum.Geldig,
      };
      const checkDate = new Date(2019, 5, 1);
      const result = isLicenseValidOnDate(license, checkDate);
      expect(result).toBeTruthy();
    });

    test('should be true when license is expired, but extension is given', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2015, 0, 1),
        EindDatum: new Date(2019, 0, 1),
        DatumIngetrokkenVan: null,
        DatumIngetrokkenTot: null,
        UitstelVerleend: true,
        UitstelTot: new Date(2019, 6, 1),
        Status: CertificeringStatusEnum.Verlopen,
      };
      const checkDate = new Date(2019, 5, 1);
      const result = isLicenseValidOnDate(license, checkDate);
      expect(result).toBeTruthy();
    });

    test('should be false when license is expired, and extension period is past', () => {
      const license: Partial<Certificering> = {
        BeginDatum: new Date(2015, 0, 1),
        EindDatum: new Date(2019, 0, 1),
        DatumIngetrokkenVan: null,
        DatumIngetrokkenTot: null,
        UitstelVerleend: true,
        UitstelTot: new Date(2019, 4, 1),
        Status: CertificeringStatusEnum.Verlopen,
      };
      const checkDate = new Date(2019, 5, 1);
      const result = isLicenseValidOnDate(license, checkDate);
      expect(result).toBeFalsy();
    });
  });
});
