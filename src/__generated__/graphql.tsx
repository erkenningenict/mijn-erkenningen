import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
  Email: any;
  /** Safe string custom scalar type that does not allow xss attacks */
  SafeString: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AangemeldeCursusDeelname = {
  __typename?: 'AangemeldeCursusDeelname';
  Begintijd: Scalars['String'];
  CursusDeelnameID: Scalars['Int'];
  CursusID: Scalars['Int'];
  Datum: Scalars['Date'];
  Eindtijd: Scalars['String'];
  IsDigitaalAanbod: Scalars['Boolean'];
  Locatie: Scalars['String'];
  Prijs: Scalars['Float'];
  Status: CursusDeelnameStatusEnum;
  Titel: Scalars['String'];
};

export type AuthenticateInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AuthenticateResult = {
  __typename?: 'AuthenticateResult';
  Persoon: Persoon;
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type Beoordeling = {
  __typename?: 'Beoordeling';
  Beoordelaar?: Maybe<Persoon>;
  BeoordelingID: Scalars['Int'];
  DatumGepland?: Maybe<Scalars['Date']>;
  DatumRapport?: Maybe<Scalars['Date']>;
  PersoonID?: Maybe<Scalars['Int']>;
  Rapport?: Maybe<Scalars['String']>;
  RapportCijfer?: Maybe<Scalars['Int']>;
  Status: BeoordelingStatusEnum;
  VakID: Scalars['Int'];
};

export enum BeoordelingStatusEnum {
  Afgekeurd = 'Afgekeurd',
  CommentaarGevraagd = 'CommentaarGevraagd',
  Goedgekeurd = 'Goedgekeurd',
  TerBeoordeling = 'TerBeoordeling'
}

export type Bijeenkomst = {
  __typename?: 'Bijeenkomst';
  Cursus?: Maybe<Cursus>;
  Vaknorm?: Maybe<Vaknorm>;
};

export type Certificaat = {
  __typename?: 'Certificaat';
  CertificaatID: Scalars['Int'];
  Code: Scalars['String'];
  Naam: Scalars['String'];
};

export type Certificering = {
  __typename?: 'Certificering';
  BeginDatum: Scalars['Date'];
  Certificaat?: Maybe<Certificaat>;
  CertificaatID: Scalars['Int'];
  CertificeringAantekeningen?: Maybe<Array<Maybe<CertificeringAantekening>>>;
  CertificeringID: Scalars['Int'];
  DatumAangemaakt: Scalars['Date'];
  DatumIngetrokkenTot?: Maybe<Scalars['Date']>;
  DatumIngetrokkenVan?: Maybe<Scalars['Date']>;
  /** Date on which all required sessions were taken */
  DatumVoldaan?: Maybe<Scalars['Date']>;
  EindDatum: Scalars['Date'];
  IsVerlengingVan?: Maybe<Scalars['Int']>;
  NormVersieID: Scalars['Int'];
  Nummer: Scalars['String'];
  NummerWeergave: Scalars['String'];
  Opmerkingen: Scalars['String'];
  Passen?: Maybe<Array<Maybe<Pas>>>;
  Persoon?: Maybe<Persoon>;
  PersoonID: Scalars['Int'];
  Status: CertificeringStatusEnum;
  UitstelTot?: Maybe<Scalars['Date']>;
  UitstelVerleend?: Maybe<Scalars['Boolean']>;
};

export type CertificeringAantekening = {
  __typename?: 'CertificeringAantekening';
  /** Can only contain KBA of KBA-GB */
  AantekeningCode: Scalars['String'];
  CertificeringID: Scalars['Int'];
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DatumGewijzigd?: Maybe<Scalars['Date']>;
  DatumPasAangemaakt?: Maybe<Scalars['Date']>;
  Opmerkingen?: Maybe<Scalars['String']>;
  PersoonIDAangemaakt?: Maybe<Scalars['Int']>;
  PersoonIDGewijzigd?: Maybe<Scalars['Int']>;
  VanafDatum: Scalars['Date'];
};

export enum CertificeringStatusEnum {
  DiplomaAfgekeurd = 'DiplomaAfgekeurd',
  Geldig = 'Geldig',
  Ingenomen = 'Ingenomen',
  Ingetrokken = 'Ingetrokken',
  TerGoedkeuring = 'TerGoedkeuring',
  Verlopen = 'Verlopen'
}

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  dateOfComment?: Maybe<Scalars['Date']>;
  sort?: Maybe<Scalars['Int']>;
  source?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Competentie = {
  __typename?: 'Competentie';
  Code: Scalars['String'];
  CompetentieID: Scalars['Int'];
  Naam: Scalars['String'];
  UniversiteitID?: Maybe<Scalars['Int']>;
};

export type Contactgegevens = {
  __typename?: 'Contactgegevens';
  Adresregel1: Scalars['String'];
  Adresregel2?: Maybe<Scalars['String']>;
  ContactgegevensID: Scalars['Int'];
  DisplayAddress?: Maybe<Scalars['String']>;
  DisplayPostalCodeCity?: Maybe<Scalars['String']>;
  DisplayStreetHouseNr?: Maybe<Scalars['String']>;
  Email?: Maybe<Scalars['String']>;
  EmailWerkgever?: Maybe<Scalars['String']>;
  Fax?: Maybe<Scalars['String']>;
  Huisnummer: Scalars['String'];
  HuisnummerToevoeging?: Maybe<Scalars['String']>;
  Land: Scalars['String'];
  Postcode: Scalars['String'];
  RekeningNummer?: Maybe<Scalars['String']>;
  Telefoon?: Maybe<Scalars['String']>;
  TerAttentieVan?: Maybe<Scalars['String']>;
  Website?: Maybe<Scalars['String']>;
  Woonplaats: Scalars['String'];
};

export type CreateCourseInput = {
  Begintijd: Scalars['Date'];
  Datum: Scalars['Date'];
  Docent?: Maybe<Scalars['SafeString']>;
  Eindtijd: Scalars['Date'];
  IsBesloten: Scalars['Boolean'];
  LokatieID: Scalars['Int'];
  MaximumCursisten: Scalars['Int'];
  Opmerkingen?: Maybe<Scalars['SafeString']>;
  Prijs: Scalars['Float'];
  Promotietekst: Scalars['SafeString'];
  Titel: Scalars['SafeString'];
  VakID: Scalars['Int'];
};

export type CreateInvoiceCollectionInput = {
  invoiceIds?: Maybe<Array<Scalars['Int']>>;
};

export type CreateInvoiceCollectionResult = {
  __typename?: 'CreateInvoiceCollectionResult';
  invoiceCollectionId?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreatePasInput = {
  amount?: Maybe<Scalars['Int']>;
  createInvoice?: Maybe<Scalars['Boolean']>;
  licenseId: Scalars['Int'];
  recipient?: Maybe<Scalars['SafeString']>;
  remark?: Maybe<Scalars['SafeString']>;
  requestDate: Scalars['Date'];
};

export type CreatePasResult = {
  __typename?: 'CreatePasResult';
  Pas?: Maybe<Pas>;
  success: Scalars['Boolean'];
};

export enum CrediteurTypeEnum {
  Persoon = 'persoon',
  Universiteit = 'universiteit'
}

export type Cursus = {
  __typename?: 'Cursus';
  /**  Only available when sub query is available  */
  AantalCursusDeelnames?: Maybe<Scalars['Int']>;
  AantalDeelnamesAangemeld?: Maybe<Scalars['Int']>;
  AantalDeelnamesVerwerkt?: Maybe<Scalars['Int']>;
  /**  Only available when associated entity CursusDeelname is available  */
  AantalDeelnamesVoorlopig?: Maybe<Scalars['Int']>;
  AocKenmerk?: Maybe<Scalars['String']>;
  CursusCode?: Maybe<Scalars['String']>;
  CursusDeelnames?: Maybe<Array<Maybe<CursusDeelname>>>;
  CursusID: Scalars['Int'];
  CursusleiderID?: Maybe<Scalars['Int']>;
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DatumGewijzigd?: Maybe<Scalars['Date']>;
  ExamenCursusID?: Maybe<Scalars['Int']>;
  IsBesloten?: Maybe<Scalars['Boolean']>;
  MaximumCursisten?: Maybe<Scalars['Int']>;
  Opmerkingen?: Maybe<Scalars['String']>;
  PersoonIDAangemaakt?: Maybe<Scalars['Int']>;
  PersoonIDGewijzigd?: Maybe<Scalars['Int']>;
  Prijs?: Maybe<Scalars['Float']>;
  Promotietekst?: Maybe<Scalars['String']>;
  Sessies?: Maybe<Array<Maybe<Sessie>>>;
  Status: CursusStatusEnum;
  Titel?: Maybe<Scalars['String']>;
  Vak: Vak;
  VakID?: Maybe<Scalars['Int']>;
};

export type CursusDeelname = {
  __typename?: 'CursusDeelname';
  Certificering?: Maybe<Certificering>;
  CertificeringID?: Maybe<Scalars['Int']>;
  Cursus: Cursus;
  CursusDeelnameID: Scalars['Int'];
  CursusID: Scalars['Int'];
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  Opmerkingen?: Maybe<Scalars['String']>;
  Persoon?: Maybe<Persoon>;
  PersoonID: Scalars['Int'];
  Status: CursusDeelnameStatusEnum;
};

export enum CursusDeelnameStatusEnum {
  Aangemeld = 'Aangemeld',
  Aanwezig = 'Aanwezig',
  Afgemeld = 'Afgemeld',
  Afgewezen = 'Afgewezen',
  Betaald = 'Betaald',
  Geregistreerd = 'Geregistreerd',
  Geslaagd = 'Geslaagd',
  GeslaagdPraktijkGezaktTheorie = 'GeslaagdPraktijk_GezaktTheorie',
  GeslaagdTheorieGezaktPraktijk = 'GeslaagdTheorie_GezaktPraktijk',
  Gezakt = 'Gezakt',
  Voorlopig = 'Voorlopig'
}

export type CursusNodes = {
  __typename?: 'CursusNodes';
  nodes?: Maybe<Array<Maybe<Cursus>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
};

export type CursusSessie = {
  __typename?: 'CursusSessie';
  CanUnRegister: Scalars['Boolean'];
  Competence: Scalars['String'];
  CourseCode: Scalars['String'];
  CourseId: Scalars['Int'];
  Date: Scalars['Date'];
  Distance?: Maybe<Scalars['Int']>;
  EndTime: Scalars['String'];
  LocationAddress?: Maybe<LocationAddress>;
  LocationName: Scalars['String'];
  Organizer: Scalars['String'];
  OrganizerEmail?: Maybe<Scalars['String']>;
  OrganizerPhone?: Maybe<Scalars['String']>;
  OrganizerWebsite?: Maybe<Scalars['String']>;
  Price: Scalars['Float'];
  PromoText?: Maybe<Scalars['String']>;
  Registered: Scalars['Boolean'];
  RegisteredDate?: Maybe<Scalars['Date']>;
  SpecialtyId: Scalars['Int'];
  SpecialtyWebsite?: Maybe<Scalars['String']>;
  StartTime: Scalars['String'];
  Theme: Scalars['String'];
  Title: Scalars['String'];
};

export enum CursusStatusEnum {
  Betaald = 'Betaald',
  DeelnemersAangemeld = 'DeelnemersAangemeld',
  Goedgekeurd = 'Goedgekeurd',
  Voorlopig = 'Voorlopig'
}

export enum DebiteurTypeEnum {
  Exameninstelling = 'exameninstelling',
  Persoon = 'persoon',
  Universiteit = 'universiteit',
  Vakgroep = 'vakgroep'
}

export type DeclarationInvoiceCreatedResult = {
  __typename?: 'DeclarationInvoiceCreatedResult';
  FactuurNummer: Scalars['String'];
  InvoiceLink: Scalars['String'];
};

export type DeleteBijeenkomstInput = {
  CursusID?: Maybe<Scalars['Int']>;
};

export type DeleteBijeenkomstResult = {
  __typename?: 'DeleteBijeenkomstResult';
  success: Scalars['Boolean'];
};

export type DeleteExamInput = {
  CursusID?: Maybe<Scalars['Int']>;
};

export type DeleteExamResult = {
  __typename?: 'DeleteExamResult';
  success: Scalars['Boolean'];
};

export type DeletePersoonHandelshuisvestigingForPersoonIdInput = {
  PersoonHandelshuisVestigingID: Scalars['Int'];
};

export type DeletePersoonVakgroepForPersoonIdInput = {
  PersoonVakgroepID: Scalars['Int'];
};

export type DigitaalExamen = {
  __typename?: 'DigitaalExamen';
  AssementId: Scalars['String'];
  DigitaalExamenId: Scalars['Int'];
  ExamenNaam: Scalars['String'];
  ExamenType: Scalars['String'];
};

export type DiscussieVisitatie = {
  __typename?: 'DiscussieVisitatie';
  Commentaar?: Maybe<Scalars['String']>;
  DatumTijd?: Maybe<Scalars['Date']>;
  DiscussieVisitatieID: Scalars['Int'];
  IsAuteurInspecteur?: Maybe<Scalars['Boolean']>;
  IsAuteurVakgroep?: Maybe<Scalars['Boolean']>;
  Persoon?: Maybe<Persoon>;
  PersoonID?: Maybe<Scalars['Int']>;
  VakgroepID?: Maybe<Scalars['Int']>;
  VisitatieID: Scalars['Int'];
};

export type Exam = {
  __typename?: 'Exam';
  Cursus?: Maybe<Cursus>;
  Vaknorm?: Maybe<Vaknorm>;
};

export type ExamenInstelling = {
  __typename?: 'ExamenInstelling';
  Code: Scalars['String'];
  Contactgegevens: Contactgegevens;
  ExamenInstellingID: Scalars['Int'];
  Examinator: Examinator;
  IsActief: Scalars['Boolean'];
  IsBtwPlichtig: Scalars['Boolean'];
  Naam: Scalars['String'];
};

export type ExamenInstellingLink = {
  __typename?: 'ExamenInstellingLink';
  Actief: Scalars['Boolean'];
  ExamenInstelling?: Maybe<ExamenInstelling>;
  ExamenInstellingID: Scalars['Int'];
  ExaminatorID: Scalars['Int'];
  PersoonID: Scalars['Int'];
};

export type Examinator = {
  __typename?: 'Examinator';
  Actief: Scalars['Boolean'];
  ExamenInstelling?: Maybe<ExamenInstelling>;
  ExamenInstellingID: Scalars['Int'];
  ExaminatorID: Scalars['Int'];
  Persoon?: Maybe<Persoon>;
  PersoonID: Scalars['Int'];
};

export enum FactuurHistorieStatusEnum {
  Aangemaakt = 'Aangemaakt',
  Betaald = 'Betaald',
  Creditfactuur = 'Creditfactuur',
  DoorBeAfgehandeld = 'Door_BE_Afgehandeld',
  Oninbaar = 'Oninbaar',
  OnjuistAangemaakt = 'OnjuistAangemaakt'
}

export type FactuurNodes = {
  __typename?: 'FactuurNodes';
  nodes?: Maybe<Array<Maybe<Invoice>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['ID'];
  mimetype: Scalars['String'];
  path: Scalars['String'];
};

export type FilterInvoicesInput = {
  CrediteurID?: Maybe<Scalars['Int']>;
  CrediteurType?: Maybe<Scalars['SafeString']>;
  CursusCode?: Maybe<Scalars['SafeString']>;
  DebiteurID?: Maybe<Scalars['Int']>;
  DebiteurType?: Maybe<DebiteurTypeEnum>;
  ExamenInstellingID?: Maybe<Scalars['Int']>;
  FactuurNummer?: Maybe<Scalars['SafeString']>;
  ForReviewersOnly?: Maybe<Scalars['Boolean']>;
  FromDate?: Maybe<Scalars['Date']>;
  InvoiceCollectionFilter?: Maybe<InvoiceCollectionsFilterEnum>;
  InvoiceStatusFilterList?: Maybe<Array<Maybe<Scalars['SafeString']>>>;
  PaymentStatus?: Maybe<PaymentStatusEnum>;
  ToDate?: Maybe<Scalars['Date']>;
  VakgroepID?: Maybe<Scalars['Int']>;
};

export type GetInspectionPlanningInput = {
  isInspector: Scalars['Boolean'];
  isRector: Scalars['Boolean'];
  plannable: Scalars['Boolean'];
  shouldOnlyBePlanned: Scalars['Boolean'];
  showStatsForPeriod: Scalars['Boolean'];
  startDate: Scalars['Date'];
  targetSettings: TargetSettings;
};

export type GetInspectionReportsInput = {
  competentieId: Scalars['Int'];
  datumVisitatieTot: Scalars['Date'];
  datumVisitatieVan: Scalars['Date'];
  examenInstellingId: Scalars['Int'];
  inspecteurId: Scalars['Int'];
  rapportCijfer: Scalars['Int'];
  themaId: Scalars['Int'];
  vakId: Scalars['Int'];
  vakgroepId: Scalars['Int'];
  volgensIntentieAanbod: Scalars['Int'];
};

export type Handelshuis = {
  __typename?: 'Handelshuis';
  ApiKey?: Maybe<Scalars['String']>;
  CDGdeelnemer?: Maybe<Scalars['Boolean']>;
  CdgBedrijfId?: Maybe<Scalars['Int']>;
  Code: Scalars['String'];
  Contactgegevens: Contactgegevens;
  ContactgegevensID: Scalars['Int'];
  EindDatumCertificaat?: Maybe<Scalars['Date']>;
  GegevensVerzamelen: Scalars['Boolean'];
  HandelshuisID: Scalars['Int'];
  IsActief: Scalars['Boolean'];
  IsBtwPlichtig: Scalars['Boolean'];
  Naam: Scalars['String'];
  UniversiteitID: Scalars['Int'];
  VKLHandel?: Maybe<Scalars['Boolean']>;
  WebserviceEnabled: Scalars['Boolean'];
};

export type HandelshuisVestiging = {
  __typename?: 'HandelshuisVestiging';
  CDGdeelnemer?: Maybe<Scalars['Boolean']>;
  CdgBedrijfId?: Maybe<Scalars['Int']>;
  CdgNevenvestigingId?: Maybe<Scalars['Int']>;
  Code: Scalars['String'];
  Contactgegevens: Contactgegevens;
  ContactgegevensID: Scalars['Int'];
  HandelshuisID: Scalars['Int'];
  HandelshuisVestigingID: Scalars['Int'];
  IsActief: Scalars['Boolean'];
  IsBtwPlichtig: Scalars['Boolean'];
  IsHoofdVestiging: Scalars['Boolean'];
  Naam: Scalars['String'];
  VKLHandel?: Maybe<Scalars['Boolean']>;
};

export enum InkoopVerkoopEnum {
  Inkoop = 'INKOOP',
  Verkoop = 'VERKOOP'
}

export type InsertPersoonHandelshuisvestigingForPersoonIdInput = {
  DebiteurNr?: Maybe<Scalars['SafeString']>;
  HandelshuisVestigingID: Scalars['Int'];
};

export type InsertPersoonVakgroepForPersoonIdInput = {
  DebiteurNr?: Maybe<Scalars['SafeString']>;
  VakgroepID: Scalars['Int'];
};

export type InspectionPlanningData = {
  __typename?: 'InspectionPlanningData';
  NrOfDaysSinceLastVisit?: Maybe<Scalars['Int']>;
  OrganizerTargetActual: Scalars['Float'];
  SessieData: PlanningData;
  ShouldBeVisited: Scalars['Boolean'];
  SpecialtyTargetActual: Scalars['Float'];
};

export type InspectionResult = {
  __typename?: 'InspectionResult';
  InspectionStatisticsOverall?: Maybe<VisitingData>;
  PlanningData: Array<Maybe<InspectionPlanningData>>;
  StatisticsPerOrganizer?: Maybe<Array<Maybe<StatisticsPerOrganizer>>>;
};

export type Inspector = {
  __typename?: 'Inspector';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Invoice = {
  __typename?: 'Invoice';
  BedragExBtw: Scalars['Float'];
  BedragIncBtw: Scalars['Float'];
  BtwBedrag: Scalars['Float'];
  CreditFactuurID?: Maybe<Scalars['Int']>;
  CreditFactuurNummer?: Maybe<Scalars['String']>;
  CreditInvoiceLink?: Maybe<Scalars['String']>;
  CrediteurID: Scalars['Int'];
  CrediteurType: Scalars['String'];
  CursusCode: Scalars['String'];
  DebiteurID: Scalars['Int'];
  DebiteurNaam: Scalars['String'];
  DebiteurType: DebiteurTypeEnum;
  FactuurDatum: Scalars['Date'];
  FactuurID: Scalars['Int'];
  FactuurJaar: Scalars['Int'];
  FactuurNummer: Scalars['String'];
  FactuurStatus: Scalars['String'];
  InVerzamelfactuur: Scalars['Int'];
  InvoiceLink: Scalars['String'];
  IsBetaald: Scalars['Boolean'];
  IsCreditFactuur?: Maybe<Scalars['Boolean']>;
  Kenmerk?: Maybe<Scalars['String']>;
  KenmerkJaarFactuurNummer: Scalars['String'];
  OrigineleFactuurID?: Maybe<Scalars['Int']>;
  OrigineleFactuurNummer?: Maybe<Scalars['String']>;
  OrigineleInvoiceLink?: Maybe<Scalars['String']>;
  ProductCode: Scalars['String'];
  ProductNaam: Scalars['String'];
  StatusOpmerkingen?: Maybe<Scalars['String']>;
  VerzamelFactuurBTWBedrag: Scalars['Float'];
  VerzamelFactuurBedrag: Scalars['Float'];
  VerzamelFactuurDatum?: Maybe<Scalars['Date']>;
  VerzamelFactuurDatumBetaald?: Maybe<Scalars['Date']>;
  VerzamelFactuurID: Scalars['Int'];
  VerzamelFactuurIsBetaald: Scalars['Boolean'];
  VerzamelFactuurOpmerking?: Maybe<Scalars['String']>;
};

export enum InvoiceCollectionsFilterEnum {
  Both = 'BOTH',
  InvoiceCollections = 'INVOICE_COLLECTIONS',
  NormalInvoices = 'NORMAL_INVOICES'
}

export type Kennisgebied = {
  __typename?: 'Kennisgebied';
  KennisgebiedID: Scalars['Int'];
  Naam: Scalars['String'];
  UniversiteitID?: Maybe<Scalars['Int']>;
};

export type Landen = {
  __typename?: 'Landen';
  Text: Scalars['String'];
  Value: Scalars['String'];
};

export type LastVisitData = {
  __typename?: 'LastVisitData';
  AccordingIntention?: Maybe<Scalars['Boolean']>;
  InspectorId?: Maybe<Scalars['Int']>;
  ReportCreatedDate?: Maybe<Scalars['Date']>;
  ReportGrade?: Maybe<Scalars['Float']>;
  VisitedDate?: Maybe<Scalars['Date']>;
};

export type LocationAddress = {
  __typename?: 'LocationAddress';
  City?: Maybe<Scalars['String']>;
  Email?: Maybe<Scalars['String']>;
  HouseNr: Scalars['String'];
  HouseNrExtension?: Maybe<Scalars['String']>;
  Street: Scalars['String'];
  Website?: Maybe<Scalars['String']>;
  Zipcode?: Maybe<Scalars['String']>;
};

export type Lokatie = {
  __typename?: 'Lokatie';
  Contactgegevens: Contactgegevens;
  ContactgegevensID?: Maybe<Scalars['Int']>;
  ExamenInstellingID?: Maybe<Scalars['Int']>;
  IsActief: Scalars['Boolean'];
  LokatieID: Scalars['Int'];
  Naam: Scalars['String'];
  Routebeschrijving: Scalars['String'];
  VakgroepID?: Maybe<Scalars['Int']>;
};

export type Monitor = {
  __typename?: 'Monitor';
  Achternaam: Scalars['SafeString'];
  Email: Scalars['Email'];
  ExamenInstellingID: Scalars['Int'];
  Geslacht: Scalars['SafeString'];
  MonitorID: Scalars['Int'];
  SortableFullName?: Maybe<Scalars['SafeString']>;
  Tussenvoegsel?: Maybe<Scalars['SafeString']>;
  Voornaam: Scalars['SafeString'];
};

export type MultiUploadResult = {
  __typename?: 'MultiUploadResult';
  result: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  DeletePersoonHandelshuisvestigingForPersoonId: Scalars['Boolean'];
  DeletePersoonVakgroepForPersoonId: Scalars['Boolean'];
  InsertPersoonHandelshuisvestigingForPersoonId: PersoonHandelshuisVestiging;
  InsertPersoonVakgroepForPersoonId: PersoonVakgroep;
  UpdatePersoonHandelshuisvestigingForPersoonId: PersoonHandelshuisVestiging;
  UpdatePersoonVakgroepForPersoonId: PersoonVakgroep;
  addVisitationComment?: Maybe<DiscussieVisitatie>;
  assignMonitor?: Maybe<Scalars['Boolean']>;
  authenticate?: Maybe<AuthenticateResult>;
  /**
   * Checks if person exists in the database by bsn and birth date and if not,
   * checks the person in the GBA
   */
  checkForExistingPersonByBsn?: Maybe<CheckForExistingPersonByBsnResult>;
  /** Checks if the person exists by initials, last name and birth date in the database */
  checkForExistingPersonByPersonData?: Maybe<CheckForExistingPersonByPersonDataResult>;
  createCourse?: Maybe<Cursus>;
  createDeclarationInvoice: DeclarationInvoiceCreatedResult;
  createDuplicateCardWithoutInvoice: Scalars['Boolean'];
  createInvoiceCollection: CreateInvoiceCollectionResult;
  /** The createLicense mutation is used to create a new license and a card for a person */
  createLicense: Certificering;
  createPas?: Maybe<CreatePasResult>;
  /** The `decoupleLicense` can be used to decouple an XX + KBA license */
  decoupleLicense: DecoupleLicenseResult;
  deleteBijeenkomst?: Maybe<DeleteBijeenkomstResult>;
  deleteExam?: Maybe<DeleteExamResult>;
  logout: Scalars['Boolean'];
  /** Manually start processing of graduates */
  manuallyProcessGraduates: ManuallyProcessGraduatesResult;
  multiUpload: MultiUploadResult;
  multipleUpload: Array<File>;
  regenerateAccessToken?: Maybe<RegenerateAccessTokenResult>;
  registerCardReturn: Scalars['Boolean'];
  /** Register for course */
  registerForCourse: RegisterResult;
  registerForCourseByHoogleraar: RegisterResult;
  removeBijeenkomstParticipant?: Maybe<RemoveBijeenkomstParticipantResult>;
  removeParticipant?: Maybe<RemoveParticipantResult>;
  /** The `requestDuplicate` can be used to request a license card duplicate */
  requestDuplicate: RequestDuplicateResult;
  /** The `requestLicense` can be used to request a certificate */
  requestLicense: RequestLicenseResult;
  saveBijeenkomst?: Maybe<SaveBijeenkomstResult>;
  saveExam?: Maybe<SaveExamResult>;
  /** Create or update a location */
  saveLocation: Lokatie;
  /** Create or update a monitor */
  saveMonitor: Monitor;
  singleUpload: File;
  submitBijeenkomstParticipants?: Maybe<SubmitBijeenkomstParticipantsResult>;
  submitParticipants?: Maybe<SubmitParticipantsResult>;
  submitToRemindo?: Maybe<SubmitToRemindoResult>;
  /** Un-register for course. Input is CursusDeelnameID */
  unRegisterForCourse: UnRegisterResult;
  unRegisterForCourseByCourseId: UnRegisterResult;
  unassignMonitor?: Maybe<Scalars['Boolean']>;
  unregisterForCourseByHoogleraar: UnRegisterResult;
  updateContactgegevens?: Maybe<Contactgegevens>;
  updateInvoiceStatus: UpdateInvoiceStatusResult;
  updatePlanning: UpdatePlanningResult;
  updateVisitationReport: Visitatie;
  uploadBijeenkomstParticipantsExcel?: Maybe<UploadBijeenkomstParticipantsExcelResult>;
  uploadParticipantsExcel?: Maybe<UploadParticipantsExcelResult>;
};


export type MutationDeletePersoonHandelshuisvestigingForPersoonIdArgs = {
  input: DeletePersoonHandelshuisvestigingForPersoonIdInput;
};


export type MutationDeletePersoonVakgroepForPersoonIdArgs = {
  input: DeletePersoonVakgroepForPersoonIdInput;
};


export type MutationInsertPersoonHandelshuisvestigingForPersoonIdArgs = {
  input: InsertPersoonHandelshuisvestigingForPersoonIdInput;
};


export type MutationInsertPersoonVakgroepForPersoonIdArgs = {
  input: InsertPersoonVakgroepForPersoonIdInput;
};


export type MutationUpdatePersoonHandelshuisvestigingForPersoonIdArgs = {
  input: UpdatePersoonHandelshuisvestigingForPersoonIdInput;
};


export type MutationUpdatePersoonVakgroepForPersoonIdArgs = {
  input: UpdatePersoonVakgroepForPersoonIdInput;
};


export type MutationAddVisitationCommentArgs = {
  input: AddVisitationCommentInput;
};


export type MutationAssignMonitorArgs = {
  input: AssignMonitorInput;
};


export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


export type MutationCheckForExistingPersonByBsnArgs = {
  birthDate: Scalars['Date'];
  bsn: Scalars['Int'];
};


export type MutationCheckForExistingPersonByPersonDataArgs = {
  birthDate: Scalars['Date'];
  initials: Scalars['String'];
  lastName: Scalars['String'];
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateDeclarationInvoiceArgs = {
  input: CreateDeclarationInvoiceInput;
};


export type MutationCreateDuplicateCardWithoutInvoiceArgs = {
  pasId: Scalars['Int'];
};


export type MutationCreateInvoiceCollectionArgs = {
  input: CreateInvoiceCollectionInput;
};


export type MutationCreateLicenseArgs = {
  input: CreateLicenseInput;
};


export type MutationCreatePasArgs = {
  input: CreatePasInput;
};


export type MutationDecoupleLicenseArgs = {
  input: DecoupleLicenseInput;
};


export type MutationDeleteBijeenkomstArgs = {
  input: DeleteBijeenkomstInput;
};


export type MutationDeleteExamArgs = {
  input: DeleteExamInput;
};


export type MutationMultiUploadArgs = {
  file1: Scalars['Upload'];
  file2: Scalars['Upload'];
};


export type MutationMultipleUploadArgs = {
  files: Array<Scalars['Upload']>;
};


export type MutationRegenerateAccessTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterCardReturnArgs = {
  input: RegisterCardReturnInput;
};


export type MutationRegisterForCourseArgs = {
  input: RegisterForCourseInput;
};


export type MutationRegisterForCourseByHoogleraarArgs = {
  input: RegisterForCourseByHoogleraarInput;
};


export type MutationRemoveBijeenkomstParticipantArgs = {
  input: RemoveBijeenkomstParticipantInput;
};


export type MutationRemoveParticipantArgs = {
  input: RemoveParticipantInput;
};


export type MutationRequestDuplicateArgs = {
  input: RequestDuplicateInput;
};


export type MutationRequestLicenseArgs = {
  createPersonByBsnInput?: Maybe<CreatePersonByBsn>;
  createPersonByPersonDataInput?: Maybe<CreatePersonByPersonData>;
  input: RequestLicenseInput;
  personDataInput?: Maybe<BasicPersonData>;
};


export type MutationSaveBijeenkomstArgs = {
  input: SaveBijeenkomstInput;
};


export type MutationSaveExamArgs = {
  input: SaveExamInput;
};


export type MutationSaveLocationArgs = {
  input: SaveLocationInput;
};


export type MutationSaveMonitorArgs = {
  input: SaveMonitorInput;
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationSubmitBijeenkomstParticipantsArgs = {
  input: SubmitBijeenkomstParticipantsInput;
};


export type MutationSubmitParticipantsArgs = {
  input: SubmitParticipantsInput;
};


export type MutationSubmitToRemindoArgs = {
  input: SubmitToRemindoInput;
};


export type MutationUnRegisterForCourseArgs = {
  CursusDeelnameID: Scalars['Int'];
};


export type MutationUnRegisterForCourseByCourseIdArgs = {
  input: UnRegisterForCourseByCourseIdInput;
};


export type MutationUnassignMonitorArgs = {
  input: UnassignMonitorInput;
};


export type MutationUnregisterForCourseByHoogleraarArgs = {
  input: UnregisterForCourseByHoogleraarInput;
};


export type MutationUpdateContactgegevensArgs = {
  input: UpdateContactgegevensInput;
};


export type MutationUpdateInvoiceStatusArgs = {
  input: UpdateInvoiceStatusInput;
};


export type MutationUpdatePlanningArgs = {
  inspectorId: Scalars['Int'];
  sessieId: Scalars['Int'];
  visitDate: Scalars['Date'];
};


export type MutationUpdateVisitationReportArgs = {
  input: UpdateVisitationReportInput;
};


export type MutationUploadBijeenkomstParticipantsExcelArgs = {
  input: UploadBijeenkomstParticipantsExcelInput;
};


export type MutationUploadParticipantsExcelArgs = {
  input: UploadParticipantsExcelInput;
};

export type My = {
  __typename?: 'My';
  AangemeldeCursusDeelnames?: Maybe<Array<Maybe<AangemeldeCursusDeelname>>>;
  AangemeldeCursusDeelnamesPerCertificeringId?: Maybe<Array<Maybe<CursusDeelname>>>;
  /**
   * Fetches only current licenses when 'alleenGeldig' is true.
   * When false (default), fetches all licenses.
   * 'perDatum' sets the date that the licenses should be valid (default today)
   */
  Certificeringen?: Maybe<Array<Maybe<Certificering>>>;
  CursusDeelnames?: Maybe<Array<Maybe<CursusDeelname>>>;
  /** Link to exameninstelling(en), via Examinator table */
  ExamenInstellingLinks?: Maybe<Array<Maybe<ExamenInstellingLink>>>;
  Persoon: Persoon;
  Roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  Studieresultaten?: Maybe<Array<Maybe<Studieresultaat>>>;
  StudyProgress: Array<StudyProgress>;
  /** Link to vakgroep(en), via Hoogleraar table */
  VakgroepLinks?: Maybe<Array<Maybe<VakgroepLink>>>;
  personId: Scalars['Int'];
};


export type MyAangemeldeCursusDeelnamesPerCertificeringIdArgs = {
  certificeringId: Scalars['Int'];
};


export type MyCertificeringenArgs = {
  alleenGeldig?: Maybe<Scalars['Boolean']>;
  inclusiefPassen?: Maybe<Scalars['Boolean']>;
  perDatum?: Maybe<Scalars['Date']>;
};


export type MyCursusDeelnamesArgs = {
  certificeringId?: Maybe<Scalars['Int']>;
};


export type MyExamenInstellingLinksArgs = {
  activeOnly?: Maybe<Scalars['Boolean']>;
};


export type MyStudieresultatenArgs = {
  certificeringId?: Maybe<Scalars['Int']>;
  fullDetails?: Maybe<Scalars['Boolean']>;
  isExamen?: Maybe<Scalars['Boolean']>;
};


export type MyStudyProgressArgs = {
  skipParticipationDetails?: Maybe<Scalars['Boolean']>;
};


export type MyVakgroepLinksArgs = {
  activeOnly?: Maybe<Scalars['Boolean']>;
};

export type Nationaliteiten = {
  __typename?: 'Nationaliteiten';
  Text: Scalars['String'];
  Value: Scalars['String'];
};

export type NormVersie = {
  __typename?: 'NormVersie';
  BeginDatum?: Maybe<Scalars['Date']>;
  Definitief?: Maybe<Scalars['Boolean']>;
  EindDatum?: Maybe<Scalars['Date']>;
  NormVersieID: Scalars['Int'];
  Opmerkingen?: Maybe<Scalars['String']>;
  UniversiteitID?: Maybe<Scalars['Int']>;
  Versienummer?: Maybe<Scalars['String']>;
};

export type OrderByArgs = {
  field: Scalars['String'];
  sortDirection: SortDirectionEnum;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type ParticipationPoint = {
  __typename?: 'ParticipationPoint';
  CountedPoints: Scalars['Int'];
  DonePoints: Scalars['Int'];
  RequiredPoints: Scalars['Int'];
  ThemaId: Scalars['Int'];
  ThemaNaam: Scalars['String'];
};

export type Pas = {
  __typename?: 'Pas';
  Aantal: Scalars['Int'];
  BriefVerstuurd: Scalars['Boolean'];
  CertificeringID: Scalars['Int'];
  ContactgegevensID?: Maybe<Scalars['Int']>;
  DatumAanvraag: Scalars['Date'];
  DatumUitgeleverd?: Maybe<Scalars['Date']>;
  Geadresseerde?: Maybe<Scalars['String']>;
  Licentie?: Maybe<Certificering>;
  PasAdres?: Maybe<Contactgegevens>;
  PasID: Scalars['Int'];
  PasRetouren?: Maybe<Array<Maybe<PasRetour>>>;
  Status: PasStatusEnum;
};

export type PasRetour = {
  __typename?: 'PasRetour';
  AangemaaktDoor: Scalars['String'];
  DatumAangemaakt: Scalars['Date'];
  DatumRetour: Scalars['Date'];
  PasID: Scalars['Int'];
  PasRetourID: Scalars['Int'];
};

export enum PasStatusEnum {
  Aangevraagd = 'Aangevraagd',
  Betaald = 'Betaald',
  Error = 'Error',
  OnHold = 'OnHold',
  Uitgeleverd = 'Uitgeleverd'
}

export enum PaymentStatusEnum {
  All = 'ALL',
  NotPaid = 'NOT_PAID',
  Paid = 'PAID'
}

export type Persoon = {
  __typename?: 'Persoon';
  Achternaam: Scalars['String'];
  Actief?: Maybe<Scalars['Boolean']>;
  BSN?: Maybe<Scalars['Int']>;
  /** Fetches all licenses */
  Certificeringen?: Maybe<Array<Maybe<Certificering>>>;
  /** Gets the contact data */
  Contactgegevens: Contactgegevens;
  CursusDeelname?: Maybe<Array<Maybe<CursusDeelname>>>;
  /** Name in format 'Voorletters [tussenvoegsel] Achternaam */
  FullName?: Maybe<Scalars['String']>;
  GbaNummer: Scalars['String'];
  GbaUpdate?: Maybe<Scalars['Date']>;
  Geboortedatum?: Maybe<Scalars['Date']>;
  Geslacht: Scalars['String'];
  IsGbaGeregistreerd?: Maybe<Scalars['Boolean']>;
  Nationaliteit: Scalars['String'];
  PersoonID: Scalars['Int'];
  Roepnaam: Scalars['String'];
  /** Name in format 'Achternaam, Voorletters [tussenvoegsel]' */
  SortableFullName?: Maybe<Scalars['String']>;
  Tussenvoegsel: Scalars['String'];
  Voorletters: Scalars['String'];
};


export type PersoonCertificeringenArgs = {
  alleenGeldig?: Maybe<Scalars['Boolean']>;
  perDatum?: Maybe<Scalars['Date']>;
};

export type PersoonHandelshuisVestiging = {
  __typename?: 'PersoonHandelshuisVestiging';
  DebiteurNr?: Maybe<Scalars['String']>;
  HandelshuisVestiging: HandelshuisVestiging;
  HandelshuisVestigingID: Scalars['Int'];
  Persoon: Persoon;
  PersoonHandelshuisVestigingID: Scalars['Int'];
  PersoonID: Scalars['Int'];
};

export type PersoonVakgroep = {
  __typename?: 'PersoonVakgroep';
  DebiteurNr?: Maybe<Scalars['String']>;
  Persoon: Persoon;
  PersoonID: Scalars['Int'];
  PersoonVakgroepID: Scalars['Int'];
  Vakgroep: Vakgroep;
  VakgroepID: Scalars['Int'];
};

export type PlanningData = {
  __typename?: 'PlanningData';
  BeginDatum: Scalars['Date'];
  BeginDatumTijd?: Maybe<Scalars['Date']>;
  Begintijd?: Maybe<Scalars['String']>;
  CursusCode?: Maybe<Scalars['Int']>;
  CursusID: Scalars['Int'];
  CursusStatus?: Maybe<Scalars['String']>;
  DatumRapport?: Maybe<Scalars['Date']>;
  DatumVisitatie?: Maybe<Scalars['Date']>;
  Eindtijd?: Maybe<Scalars['String']>;
  InstellingID: Scalars['Int'];
  InstellingNaam: Scalars['String'];
  LocatieID?: Maybe<Scalars['Int']>;
  LocatieToevoeging?: Maybe<Scalars['String']>;
  Naam?: Maybe<Scalars['String']>;
  PersoonID?: Maybe<Scalars['Int']>;
  Rapportcijfer?: Maybe<Scalars['Int']>;
  SessieID: Scalars['Int'];
  SessieType?: Maybe<Scalars['String']>;
  Titel?: Maybe<Scalars['String']>;
  VakID: Scalars['Int'];
  VakType: Scalars['String'];
  VisitatieID?: Maybe<Scalars['Int']>;
  VisitatieStatus?: Maybe<Scalars['String']>;
  VolgensIntentieAanbod?: Maybe<Scalars['Boolean']>;
  Woonplaats?: Maybe<Scalars['String']>;
};

export enum ProductConfiguratieCodeEnum {
  Ad = 'AD',
  Aeikg = 'AEIKG',
  Aekg = 'AEKG',
  Aekt = 'AEKT',
  Beec = 'BEEC',
  Beke = 'BEKE',
  Bevi = 'BEVI',
  D1 = 'D1',
  D2 = 'D2',
  D3 = 'D3',
  D4 = 'D4',
  Detk = 'DETK',
  Mgeg = 'MGEG',
  Mgegi = 'MGEGI',
  Mgek = 'MGEK',
  Mgeki = 'MGEKI',
  Mgem = 'MGEM',
  Mgemi = 'MGEMI'
}

export enum ProductEnum {
  D1 = 'D1',
  D2 = 'D2',
  D3 = 'D3',
  D4 = 'D4'
}

export type Query = {
  __typename?: 'Query';
  BijeenkomstDetails?: Maybe<Bijeenkomst>;
  BijeenkomstenList?: Maybe<CursusNodes>;
  Certificaten?: Maybe<Array<Maybe<Certificaat>>>;
  Certificering?: Maybe<Certificering>;
  Certificeringen?: Maybe<Array<Maybe<Certificering>>>;
  Competenties: Array<Maybe<Competentie>>;
  Contactgegevens?: Maybe<Contactgegevens>;
  CursusDeelnameDetails?: Maybe<CursusDeelname>;
  CursusDeelnames?: Maybe<Array<Maybe<CursusDeelname>>>;
  CursusSessies?: Maybe<Array<Maybe<CursusSessie>>>;
  ExamDetails?: Maybe<Exam>;
  ExamSpecialties?: Maybe<Array<Maybe<Vak>>>;
  ExamenInstellingen: Array<Maybe<ExamenInstelling>>;
  Exams?: Maybe<CursusNodes>;
  GetCursusDeelnemer?: Maybe<Persoon>;
  GetCursusDeelnemers?: Maybe<Array<Maybe<CursusDeelname>>>;
  GetCursusInfoForHoogleraar?: Maybe<Cursus>;
  GetCursusSessiesForHoogleraar?: Maybe<Array<Maybe<Sessie>>>;
  GetHandelshuisVestigingen: Array<Maybe<HandelshuisVestiging>>;
  GetHandelshuizen: Array<Maybe<Handelshuis>>;
  GetPersoonHandelshuisvestigingenForPersoonId: Array<Maybe<PersoonHandelshuisVestiging>>;
  GetPersoonVakgroepenForPersoonId: Array<Maybe<PersoonVakgroep>>;
  Kennisgebieden: Array<Maybe<Kennisgebied>>;
  Landen: Array<Maybe<Landen>>;
  Nationaliteiten: Array<Maybe<Nationaliteiten>>;
  Persoon?: Maybe<Persoon>;
  SearchCursusDeelnemers?: Maybe<Array<Maybe<Persoon>>>;
  SearchExamOrganizers?: Maybe<Array<Maybe<SearchExamOrganizerResult>>>;
  SearchLocations?: Maybe<Array<Maybe<Lokatie>>>;
  SearchMonitors?: Maybe<Array<Maybe<Monitor>>>;
  SearchOrganizers?: Maybe<Array<Maybe<SearchOrganizerResult>>>;
  SearchSpecialties?: Maybe<Array<Maybe<SearchSpecialtyResult>>>;
  Sessie?: Maybe<Sessie>;
  Specialties?: Maybe<Array<Maybe<Vak>>>;
  Specialty?: Maybe<Vak>;
  Themas: Array<Maybe<Thema>>;
  Vakgroepen: Array<Maybe<Vakgroep>>;
  Visitation?: Maybe<Visitatie>;
  VisitationDeclaration?: Maybe<VisitationDeclaration>;
  Visitations?: Maybe<VisitationInfoNodes>;
  /**
   * Gets a list of all available pre educations (vooropleidingen)
   * Optionally pass a array of codes (similar in vooropleiding.code) to filter the list (i.e. ["30.00", "30.01"])
   */
  Vooropleidingen: Array<Maybe<Vooropleiding>>;
  /** Gets an array of Certificate's by the code of the pre-education (vooropleiding) */
  certificatesByPreEducation: Array<Maybe<Certificaat>>;
  getInspectionPlanning?: Maybe<InspectionResult>;
  getInspectionReports?: Maybe<Array<Maybe<Visitatie>>>;
  getInspectors?: Maybe<Array<Maybe<Inspector>>>;
  getStudyProgressByLicenseId: StudyProgress;
  getStudyProgressByLicenseNumber: StudyProgress;
  getStudyProgressByPersonId: Array<StudyProgress>;
  hasDuplicatePending: Scalars['Boolean'];
  invoices: FactuurNodes;
  /** In the input, either specialtyId or courseId must be supplied */
  isLicenseValidForSpecialty: IsLicenseValidForSpecialtyResult;
  /** Fetches data of the current logged in person */
  my?: Maybe<My>;
  /** Get all pre education categories ordered by ID */
  preEducationCategories: Array<Maybe<VooropleidingCategorie>>;
  searchCard?: Maybe<Certificering>;
  tariefByCertificaatCode?: Maybe<TotaalExtBtwTarief>;
  tariefDuplicaat?: Maybe<TotaalExtBtwTarief>;
  uploads?: Maybe<Array<Maybe<File>>>;
};


export type QueryBijeenkomstDetailsArgs = {
  input: SearchBijeenkomstInput;
};


export type QueryBijeenkomstenListArgs = {
  input: BijeenkomstenListInput;
};


export type QueryCertificatenArgs = {
  idList?: Maybe<Array<Scalars['Int']>>;
};


export type QueryCertificeringArgs = {
  certificeringId: Scalars['Int'];
};


export type QueryCertificeringenArgs = {
  personId: Scalars['Int'];
};


export type QueryContactgegevensArgs = {
  ContactgegevensID: Scalars['Int'];
};


export type QueryCursusDeelnameDetailsArgs = {
  cursusDeelnameId: Scalars['Int'];
};


export type QueryCursusDeelnamesArgs = {
  certificeringId?: Maybe<Scalars['Int']>;
};


export type QueryCursusSessiesArgs = {
  input: SearchCourseSessionsInput;
};


export type QueryExamDetailsArgs = {
  input: SearchExamInput;
};


export type QueryExamSpecialtiesArgs = {
  input: ExamSpecialtiesInput;
};


export type QueryExamenInstellingenArgs = {
  findById?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
};


export type QueryExamsArgs = {
  input: ExamsInput;
};


export type QueryGetCursusDeelnemerArgs = {
  input?: Maybe<GetCursusDeelnemerInput>;
};


export type QueryGetCursusDeelnemersArgs = {
  input?: Maybe<GetCursusDeelnemersInput>;
};


export type QueryGetCursusInfoForHoogleraarArgs = {
  input?: Maybe<GetCursusInfoForHoogleraarInput>;
};


export type QueryGetCursusSessiesForHoogleraarArgs = {
  input?: Maybe<CursusSessiesForHoogleraarInput>;
};


export type QueryGetHandelshuisVestigingenArgs = {
  findById?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
};


export type QueryGetHandelshuizenArgs = {
  findById?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
};


export type QueryPersoonArgs = {
  PersoonID: Scalars['Int'];
};


export type QuerySearchCursusDeelnemersArgs = {
  input?: Maybe<SearchCursusDeelnemersInput>;
};


export type QuerySearchLocationsArgs = {
  input: SearchLocationsInput;
};


export type QuerySearchMonitorsArgs = {
  input: SearchMonitorsInput;
};


export type QuerySearchSpecialtiesArgs = {
  input: SearchSpecialtyInput;
};


export type QuerySessieArgs = {
  sessieId: Scalars['Int'];
};


export type QuerySpecialtiesArgs = {
  input: SpecialtiesInput;
};


export type QuerySpecialtyArgs = {
  fullDetails?: Maybe<Scalars['Boolean']>;
  vakId: Scalars['Int'];
};


export type QueryVakgroepenArgs = {
  findById?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
};


export type QueryVisitationArgs = {
  input: VisitationInput;
};


export type QueryVisitationDeclarationArgs = {
  input: VisitationInput;
};


export type QueryVisitationsArgs = {
  input: VisitationsInput;
};


export type QueryVooropleidingenArgs = {
  codes?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryCertificatesByPreEducationArgs = {
  code: Scalars['String'];
};


export type QueryGetInspectionPlanningArgs = {
  input: GetInspectionPlanningInput;
};


export type QueryGetInspectionReportsArgs = {
  input: GetInspectionReportsInput;
};


export type QueryGetStudyProgressByLicenseIdArgs = {
  certificeringId: Scalars['Int'];
  skipParticipationDetails?: Maybe<Scalars['Boolean']>;
  studyResultsMustBePaid?: Maybe<Scalars['Boolean']>;
};


export type QueryGetStudyProgressByLicenseNumberArgs = {
  nummerweergave: Scalars['SafeString'];
  skipParticipationDetails?: Maybe<Scalars['Boolean']>;
  studyResultsMustBePaid?: Maybe<Scalars['Boolean']>;
};


export type QueryGetStudyProgressByPersonIdArgs = {
  personId: Scalars['Int'];
  skipParticipationDetails?: Maybe<Scalars['Boolean']>;
  studyResultsMustBePaid?: Maybe<Scalars['Boolean']>;
};


export type QueryHasDuplicatePendingArgs = {
  licenseId: Scalars['Int'];
};


export type QueryInvoicesArgs = {
  filterInvoices?: Maybe<FilterInvoicesInput>;
  orderBy?: Maybe<OrderByArgs>;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type QueryIsLicenseValidForSpecialtyArgs = {
  input: IsLicenseValidForSpecialtyInput;
};


export type QuerySearchCardArgs = {
  licenseNumber: Scalars['SafeString'];
};


export type QueryTariefByCertificaatCodeArgs = {
  certificaatCode: Scalars['String'];
  individueleAanvraag?: Maybe<Scalars['Boolean']>;
};

export type RegenerateAccessTokenResult = {
  __typename?: 'RegenerateAccessTokenResult';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type RegisterCardReturnInput = {
  DatumRetour: Scalars['Date'];
  PasID: Scalars['Int'];
};

export type RegisterResult = {
  __typename?: 'RegisterResult';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type RemoveBijeenkomstParticipantInput = {
  CursusDeelnameID?: Maybe<Scalars['Int']>;
  CursusID?: Maybe<Scalars['Int']>;
};

export type RemoveBijeenkomstParticipantResult = {
  __typename?: 'RemoveBijeenkomstParticipantResult';
  success: Scalars['Boolean'];
};

export type RemoveParticipantInput = {
  CursusDeelnameID?: Maybe<Scalars['Int']>;
  CursusID?: Maybe<Scalars['Int']>;
};

export type RemoveParticipantResult = {
  __typename?: 'RemoveParticipantResult';
  success: Scalars['Boolean'];
};

export type SaveBijeenkomstInput = {
  CursusID?: Maybe<Scalars['Int']>;
  IsBesloten?: Maybe<Scalars['Boolean']>;
  MaximumCursisten: Scalars['Int'];
  Opmerkingen?: Maybe<Scalars['SafeString']>;
  Prijs: Scalars['Float'];
  Promotietekst: Scalars['SafeString'];
  Sessies: Array<SaveBijeenkomstSessieInput>;
  Titel: Scalars['SafeString'];
  VakID: Scalars['Int'];
};

export type SaveBijeenkomstResult = {
  __typename?: 'SaveBijeenkomstResult';
  Cursus: Cursus;
};

export type SaveBijeenkomstSessieInput = {
  Begintijd: Scalars['Date'];
  CursusID: Scalars['Int'];
  Datum: Scalars['Date'];
  Docent?: Maybe<Scalars['SafeString']>;
  Eindtijd: Scalars['Date'];
  LokatieID: Scalars['Int'];
  SessieID?: Maybe<Scalars['Int']>;
};

export type SaveExamInput = {
  Begintijd: Scalars['Date'];
  CursusID?: Maybe<Scalars['Int']>;
  Datum: Scalars['Date'];
  Docent?: Maybe<Scalars['SafeString']>;
  Eindtijd: Scalars['Date'];
  IsBesloten?: Maybe<Scalars['Boolean']>;
  LokatieID: Scalars['Int'];
  MaximumCursisten: Scalars['Int'];
  Opmerkingen?: Maybe<Scalars['SafeString']>;
  Prijs: Scalars['Float'];
  Promotietekst: Scalars['SafeString'];
  SessieID?: Maybe<Scalars['Int']>;
  Titel: Scalars['SafeString'];
  VakID: Scalars['Int'];
};

export type SaveExamResult = {
  __typename?: 'SaveExamResult';
  Cursus: Cursus;
};

export type SearchExamOrganizerResult = {
  __typename?: 'SearchExamOrganizerResult';
  ExamenInstellingID: Scalars['Int'];
  Naam?: Maybe<Scalars['String']>;
};

export type SearchOrganizerResult = {
  __typename?: 'SearchOrganizerResult';
  Naam?: Maybe<Scalars['String']>;
  VakgroepID: Scalars['Int'];
};

export type SearchSpecialtyResult = {
  __typename?: 'SearchSpecialtyResult';
  Code: Scalars['String'];
  Competence: Scalars['String'];
  Organizer: Scalars['String'];
  OrganizerEmail?: Maybe<Scalars['String']>;
  OrganizerPhone?: Maybe<Scalars['String']>;
  OrganizerWebsite?: Maybe<Scalars['String']>;
  Price: Scalars['Float'];
  PromoText?: Maybe<Scalars['String']>;
  SpecialtyId: Scalars['Int'];
  SpecialtyWebsite?: Maybe<Scalars['String']>;
  Theme: Scalars['String'];
  Title: Scalars['String'];
};

export type Sessie = {
  __typename?: 'Sessie';
  Begintijd: Scalars['Date'];
  Cursus?: Maybe<Cursus>;
  CursusID: Scalars['Int'];
  Datum: Scalars['Date'];
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DatumBegintijd: Scalars['Date'];
  DatumEindtijd: Scalars['Date'];
  DatumGewijzigd?: Maybe<Scalars['Date']>;
  DigitaalExamen?: Maybe<DigitaalExamen>;
  DigitaalExamenId?: Maybe<Scalars['Int']>;
  Docent: Scalars['String'];
  Eindtijd: Scalars['Date'];
  Lokatie?: Maybe<Lokatie>;
  LokatieID: Scalars['Int'];
  LokatieToevoeging: Scalars['String'];
  Monitors?: Maybe<Array<Maybe<Monitor>>>;
  Opmerkingen: Scalars['String'];
  PersoonIDAangemaakt?: Maybe<Scalars['Int']>;
  PersoonIDGewijzigd?: Maybe<Scalars['Int']>;
  SessieID: Scalars['Int'];
  SessieType: Scalars['String'];
  Visitatie?: Maybe<Visitatie>;
};

export enum SortDirectionEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StatisticsPerOrganizer = {
  __typename?: 'StatisticsPerOrganizer';
  OrganizerId: Scalars['Int'];
  OrganizerName: Scalars['String'];
  OrganizerType: Scalars['String'];
  SpecialtyStatistics?: Maybe<Array<Maybe<StatisticsPerSpecialty>>>;
  VisitingData?: Maybe<VisitingData>;
};

export type StatisticsPerSpecialty = {
  __typename?: 'StatisticsPerSpecialty';
  Title: Scalars['String'];
  VakID: Scalars['Int'];
  VakType: Scalars['String'];
  VisitingData?: Maybe<VisitingData>;
};

export type Studieresultaat = {
  __typename?: 'Studieresultaat';
  Certificering?: Maybe<Certificering>;
  Cursus: Cursus;
  Datum: Scalars['Date'];
  NormVersie: NormVersie;
  Persoon: Persoon;
  Status: StudieresultaatStatusEnum;
  StudieresultaatID: Scalars['Int'];
  Vak: Vak;
};

export enum StudieresultaatStatusEnum {
  Betaald = 'Betaald',
  Definitief = 'Definitief',
  Voorlopig = 'Voorlopig'
}

export type StudyProgress = {
  __typename?: 'StudyProgress';
  Certificering: Certificering;
  Completed: Scalars['Boolean'];
  CountedPoints: Scalars['Int'];
  DonePoints: Scalars['Int'];
  ParticipationPoints?: Maybe<Array<Maybe<ParticipationPoint>>>;
  PointsToDo: Scalars['Int'];
  RequiredPoints: Scalars['Int'];
  RequiredPointsTodo: Scalars['Int'];
  Studieresultaten?: Maybe<Array<Maybe<Studieresultaat>>>;
};

export type SubmitBijeenkomstParticipantsInput = {
  CursusID?: Maybe<Scalars['Int']>;
};

export type SubmitBijeenkomstParticipantsResult = {
  __typename?: 'SubmitBijeenkomstParticipantsResult';
  success: Scalars['Boolean'];
};

export type SubmitParticipantsInput = {
  CursusID?: Maybe<Scalars['Int']>;
};

export type SubmitParticipantsResult = {
  __typename?: 'SubmitParticipantsResult';
  success: Scalars['Boolean'];
};

export type SubmitToRemindoInput = {
  CursusID?: Maybe<Scalars['Int']>;
};

export type SubmitToRemindoResult = {
  __typename?: 'SubmitToRemindoResult';
  success: Scalars['Boolean'];
};

export type TargetSettings = {
  organizerMargin: Scalars['Float'];
  organizerTarget: Scalars['Float'];
  overallMargin: Scalars['Float'];
  overallTarget: Scalars['Float'];
  specialtyMargin: Scalars['Float'];
  specialtyTarget: Scalars['Float'];
};

export type Thema = {
  __typename?: 'Thema';
  Code: Scalars['String'];
  Naam: Scalars['String'];
  ThemaID: Scalars['Int'];
  UniversiteitID?: Maybe<Scalars['Int']>;
};

export type TotaalExtBtwTarief = {
  __typename?: 'TotaalExtBtwTarief';
  TotaalExtBtw?: Maybe<Scalars['Float']>;
};

export type UnRegisterResult = {
  __typename?: 'UnRegisterResult';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UpdateInvoiceStatusInput = {
  actionDate: Scalars['Date'];
  invoiceId: Scalars['Int'];
  isInvoiceCollection: Scalars['Boolean'];
  remarks?: Maybe<Scalars['SafeString']>;
  status: FactuurHistorieStatusEnum;
};

export type UpdateInvoiceStatusResult = {
  __typename?: 'UpdateInvoiceStatusResult';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdatePersoonHandelshuisvestigingForPersoonIdInput = {
  DebiteurNr: Scalars['SafeString'];
  PersoonHandelshuisVestigingID: Scalars['Int'];
};

export type UpdatePersoonVakgroepForPersoonIdInput = {
  DebiteurNr: Scalars['SafeString'];
  PersoonVakgroepID: Scalars['Int'];
};

export type UpdatePlanningResult = {
  __typename?: 'UpdatePlanningResult';
  planned: Scalars['Boolean'];
};

export type UploadBijeenkomstParticipantsExcelInput = {
  CursusID?: Maybe<Scalars['Int']>;
  file: Scalars['Upload'];
};

export type UploadBijeenkomstParticipantsExcelResult = {
  __typename?: 'UploadBijeenkomstParticipantsExcelResult';
  success: Scalars['Boolean'];
  validationErrors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UploadParticipantsExcelInput = {
  CursusID?: Maybe<Scalars['Int']>;
  file: Scalars['Upload'];
};

export type UploadParticipantsExcelResult = {
  __typename?: 'UploadParticipantsExcelResult';
  success: Scalars['Boolean'];
  validationErrors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Vaardigheid = {
  __typename?: 'Vaardigheid';
  Code: Scalars['String'];
  Omschrijving: Scalars['String'];
  VaardigheidID: Scalars['Int'];
};

export type Vak = {
  __typename?: 'Vak';
  Afkorting?: Maybe<Scalars['String']>;
  BeoordelaarNaam?: Maybe<Scalars['String']>;
  Beoordelingen?: Maybe<Array<Maybe<Beoordeling>>>;
  Code?: Maybe<Scalars['String']>;
  CompetentieID?: Maybe<Scalars['Int']>;
  CompetentieNaam?: Maybe<Scalars['String']>;
  Competenties?: Maybe<Array<Maybe<Competentie>>>;
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DigitaalAanbod?: Maybe<Scalars['Boolean']>;
  Docenten?: Maybe<Scalars['String']>;
  Doelgroep?: Maybe<Scalars['String']>;
  Doelstelling?: Maybe<Scalars['String']>;
  EvaluatieWijze?: Maybe<Scalars['String']>;
  ExamenInstelling?: Maybe<ExamenInstelling>;
  ExamenInstellingID?: Maybe<Scalars['Int']>;
  ExamenType?: Maybe<Scalars['String']>;
  GewijzigdDatum?: Maybe<Scalars['Date']>;
  Inhoud?: Maybe<Scalars['String']>;
  IsExamenVak?: Maybe<Scalars['Boolean']>;
  Kosten?: Maybe<Scalars['Float']>;
  MaximumCursisten?: Maybe<Scalars['Int']>;
  MaximumDatum?: Maybe<Scalars['Date']>;
  MinimumDatum?: Maybe<Scalars['Date']>;
  NormVersieID: Scalars['Int'];
  Praktijk?: Maybe<Scalars['String']>;
  Promotietekst?: Maybe<Scalars['String']>;
  Samenhang?: Maybe<Scalars['String']>;
  Samenvatting?: Maybe<Scalars['String']>;
  Status: VakStatusEnum;
  ThemaID?: Maybe<Scalars['Int']>;
  ThemaNaam?: Maybe<Scalars['String']>;
  Themas?: Maybe<Array<Maybe<Thema>>>;
  Tijdsduur?: Maybe<Scalars['String']>;
  Titel?: Maybe<Scalars['String']>;
  VakDiscussie?: Maybe<Array<Maybe<VakDiscussie>>>;
  VakID: Scalars['Int'];
  VakKennisgebieden?: Maybe<Array<Maybe<Kennisgebied>>>;
  VakVaardigheden?: Maybe<Array<Maybe<Vaardigheid>>>;
  Vakgroep?: Maybe<Vakgroep>;
  VakgroepID?: Maybe<Scalars['Int']>;
  Vernieuwend?: Maybe<Scalars['String']>;
  Website?: Maybe<Scalars['String']>;
  Werkvorm?: Maybe<Scalars['String']>;
};

export type VakDiscussie = {
  __typename?: 'VakDiscussie';
  comments?: Maybe<Array<Maybe<Comment>>>;
  title?: Maybe<Scalars['String']>;
};

export enum VakExamenTypeEnum {
  Ad = 'AD',
  Agn = 'AGN',
  Ak = 'AK',
  Be = 'BE',
  Bk = 'BK',
  Bv = 'BV',
  Dk = 'DK',
  Ec = 'EC',
  Ek = 'EK',
  Et = 'ET',
  HercertificeringsExamen = 'HERCERTIFICERINGS_EXAMEN',
  StartExamen = 'START_EXAMEN',
  Tb = 'TB'
}

export enum VakStatusEnum {
  Afgekeurd = 'Afgekeurd',
  Goedgekeurd = 'Goedgekeurd',
  InOntwerp = 'InOntwerp',
  Ingediend = 'Ingediend',
  Ingetrokken = 'Ingetrokken',
  Voorlopig = 'Voorlopig',
  WordtBeoordeeld = 'WordtBeoordeeld'
}

export type Vakgroep = {
  __typename?: 'Vakgroep';
  ApiKey?: Maybe<Scalars['String']>;
  Code: Scalars['String'];
  Contactgegevens: Contactgegevens;
  ContactgegevensID: Scalars['Int'];
  IsActief: Scalars['Boolean'];
  IsBtwPlichtig: Scalars['Boolean'];
  Naam: Scalars['String'];
  UniversiteitID: Scalars['Int'];
  VakgroepID: Scalars['Int'];
  WebserviceEnabled: Scalars['Boolean'];
};

export type VakgroepLink = {
  __typename?: 'VakgroepLink';
  Actief: Scalars['Boolean'];
  HoogleraarID: Scalars['Int'];
  PersoonID: Scalars['Int'];
  Vakgroep?: Maybe<Vakgroep>;
  VakgroepID: Scalars['Int'];
};

export type Vaknorm = {
  __typename?: 'Vaknorm';
  CompetentieID: Scalars['Int'];
  MinimumPunten: Scalars['Int'];
  NormVersieID: Scalars['Int'];
  ThemaID: Scalars['Int'];
  VaknormID: Scalars['Int'];
};

export type Visitatie = {
  __typename?: 'Visitatie';
  AangemaaktDoor?: Maybe<Scalars['String']>;
  Cursus?: Maybe<Cursus>;
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DatumGewijzigd?: Maybe<Scalars['Date']>;
  DatumRapport?: Maybe<Scalars['Date']>;
  DatumVisitatie?: Maybe<Scalars['Date']>;
  DiscussieVisitaties?: Maybe<Array<Maybe<DiscussieVisitatie>>>;
  GewijzigdDoor?: Maybe<Scalars['String']>;
  Inspecteur?: Maybe<Persoon>;
  IsDeclarationPossible?: Maybe<Scalars['Boolean']>;
  IsDeclarationSubmitted?: Maybe<Scalars['Boolean']>;
  LastChangeBy?: Maybe<Scalars['String']>;
  LastChangeDate?: Maybe<Scalars['Date']>;
  PersoonID: Scalars['Int'];
  Rapport?: Maybe<Scalars['String']>;
  Rapportcijfer?: Maybe<Scalars['Int']>;
  Sessie?: Maybe<Sessie>;
  SessieID: Scalars['Int'];
  Status: VisitatieStatusEnum;
  VisitatieBeoordelingCategorieen?: Maybe<Array<Maybe<VisitatieBeoordelingCategorie>>>;
  VisitatieID: Scalars['Int'];
  VolgensIntentieAanbod: Scalars['Boolean'];
  VragenJson?: Maybe<Scalars['SafeString']>;
};

export type VisitatieBeoordelingCategorie = {
  __typename?: 'VisitatieBeoordelingCategorie';
  AangemaaktDoor?: Maybe<Scalars['String']>;
  CategorieNaam: Scalars['String'];
  CategorieTemplateID: Scalars['Int'];
  Cijfer?: Maybe<Scalars['Float']>;
  DatumAangemaakt: Scalars['Date'];
  DatumGewijzigd: Scalars['Date'];
  GewijzigdDoor?: Maybe<Scalars['String']>;
  TotaalPunten?: Maybe<Scalars['Float']>;
  VanafDatum: Scalars['Date'];
  Versie: Scalars['String'];
  VisitatieBeoordelingCategorieID: Scalars['ID'];
  VisitatieID: Scalars['Int'];
  Vragen?: Maybe<Array<Maybe<VisitatieBeoordelingCategorieVraag>>>;
  Weging: Scalars['Float'];
};

export type VisitatieBeoordelingCategorieVraag = {
  __typename?: 'VisitatieBeoordelingCategorieVraag';
  AangemaaktDoor?: Maybe<Scalars['String']>;
  CategorieTemplateID: Scalars['Int'];
  Cijfer?: Maybe<Scalars['Float']>;
  DatumAangemaakt: Scalars['Date'];
  DatumGewijzigd: Scalars['Date'];
  GewijzigdDoor?: Maybe<Scalars['String']>;
  Naam: Scalars['String'];
  Toelichting?: Maybe<Scalars['String']>;
  TotaalPunten?: Maybe<Scalars['Float']>;
  VanafDatum: Scalars['Date'];
  Versie: Scalars['String'];
  VisitatieBeoordelingCategorieID: Scalars['ID'];
  VisitatieBeoordelingCategorieVraagID: Scalars['ID'];
  VraagTemplateID: Scalars['Int'];
  Weging: Scalars['Float'];
};

export enum VisitatieStatusEnum {
  Ingediend = 'Ingediend',
  Ingepland = 'Ingepland',
  RapportWordtOpgesteld = 'RapportWordtOpgesteld'
}

export type VisitationDeclaration = {
  __typename?: 'VisitationDeclaration';
  FactuurNummer?: Maybe<Scalars['String']>;
  HasInvoice: Scalars['Boolean'];
  InvoiceLink?: Maybe<Scalars['String']>;
  TariffDayPart: Scalars['Float'];
  TariffKm: Scalars['Float'];
  Visitatie?: Maybe<Visitatie>;
};

export type VisitationInfoNodes = {
  __typename?: 'VisitationInfoNodes';
  nodes?: Maybe<Array<Maybe<Visitatie>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
};

export type VisitingData = {
  __typename?: 'VisitingData';
  AverageRate?: Maybe<Scalars['Float']>;
  AverageScoreAccordingIntention?: Maybe<Scalars['Float']>;
  LastVisitData?: Maybe<LastVisitData>;
  NrOfCourses: Scalars['Int'];
  NrOfVisits: Scalars['Int'];
  VisitTarget: Scalars['Float'];
  VisitTargetActual: Scalars['Float'];
};

export type Vooropleiding = {
  __typename?: 'Vooropleiding';
  Categorie: VooropleidingCategorie;
  Certificaten?: Maybe<Array<Maybe<Certificaat>>>;
  Code: Scalars['String'];
  IsActief: Scalars['Boolean'];
  Naam: Scalars['String'];
  Omschrijving: Scalars['String'];
  UniversiteitID: Scalars['Int'];
  VooropleidingCategorieID: Scalars['Int'];
  VooropleidingID: Scalars['Int'];
};

export type VooropleidingCategorie = {
  __typename?: 'VooropleidingCategorie';
  Naam: Scalars['String'];
  VooropleidingCategorieID: Scalars['Int'];
};

export enum VrijstellingCertificaatStatusEnum {
  Betaald = 'Betaald',
  VoorlopigBetaald = 'VoorlopigBetaald'
}

export enum VrijstellingsVerzoekBetaalStatusEnum {
  Betaald = 'Betaald'
}

export enum VrijstellingsVerzoekStatusEnum {
  Aangevraagd = 'Aangevraagd',
  Afgekeurd = 'Afgekeurd',
  Betaald = 'Betaald',
  Geannuleerd = 'Geannuleerd',
  Goedgekeurd = 'Goedgekeurd'
}

export type AddVisitationCommentInput = {
  commentaar: Scalars['SafeString'];
  visitatieId: Scalars['Int'];
};

export type AssignMonitorInput = {
  MonitorID?: Maybe<Scalars['Int']>;
  SessieID?: Maybe<Scalars['Int']>;
};

export type BasicPersonData = {
  Email?: Maybe<Scalars['Email']>;
  PersoonID: Scalars['Int'];
};

export type BijeenkomstenListInput = {
  code?: Maybe<Scalars['SafeString']>;
  from?: Maybe<Scalars['Date']>;
  locationId?: Maybe<Scalars['Int']>;
  orderBy: OrderByArgs;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
  status?: Maybe<CursusStatusEnum>;
  title?: Maybe<Scalars['SafeString']>;
  to?: Maybe<Scalars['Date']>;
  vakId?: Maybe<Scalars['Int']>;
  vakgroepId?: Maybe<Scalars['Int']>;
  withoutParticipants?: Maybe<Scalars['Boolean']>;
};

export type CheckForExistingPersonByBsnResult = {
  __typename?: 'checkForExistingPersonByBsnResult';
  /** If personFound = true, the remarks how person is found (only on BSN, or on BSN and birth date) */
  message?: Maybe<Scalars['String']>;
  /** If person is found, true, not found is false */
  personFoundInDatabase: Scalars['Boolean'];
  /** Optional check if the person is found in the Gba (only executed when not found in database) */
  personFoundInGba?: Maybe<Scalars['Boolean']>;
  /** If personFound = true, an array of the found persons (of type Persoon, but limited fields) */
  persons?: Maybe<Array<Maybe<Persoon>>>;
};

export type CheckForExistingPersonByPersonDataResult = {
  __typename?: 'checkForExistingPersonByPersonDataResult';
  /** If personFound = true, the remarks how person is found (only on BSN, or on BSN and birth date) */
  message?: Maybe<Scalars['String']>;
  /** If person is found, true, not found is false */
  personFoundInDatabase: Scalars['Boolean'];
  /** If personFound = true, an array of the found persons (of type Persoon, but limited fields) */
  persons?: Maybe<Array<Maybe<Persoon>>>;
};

export type ContactgegevensInput = {
  Adresregel1: Scalars['SafeString'];
  Email?: Maybe<Scalars['SafeString']>;
  Huisnummer: Scalars['SafeString'];
  HuisnummerToevoeging?: Maybe<Scalars['SafeString']>;
  Land: Scalars['SafeString'];
  Postcode: Scalars['SafeString'];
  Telefoon?: Maybe<Scalars['SafeString']>;
  Website?: Maybe<Scalars['SafeString']>;
  Woonplaats: Scalars['SafeString'];
};

export type CreateDeclarationInvoiceInput = {
  NrOfDayParts?: Maybe<Scalars['Int']>;
  NrOfKilometers?: Maybe<Scalars['Int']>;
  Other?: Maybe<Scalars['Float']>;
  OtherDescription?: Maybe<Scalars['SafeString']>;
  PublicTransport?: Maybe<Scalars['Float']>;
  VisitatieID: Scalars['Int'];
};

export type CreateLicenseInput = {
  certificateId: Scalars['Int'];
  endDate: Scalars['Date'];
  /** licenseId that the new license should be based off from */
  isExtensionOf: Scalars['Int'];
  personId: Scalars['Int'];
  remark?: Maybe<Scalars['SafeString']>;
  startDate: Scalars['Date'];
};

export type CreatePersonByBsn = {
  /** BSN can be 8 or 9 digits long */
  BSN: Scalars['Int'];
  /** Email address is required */
  Email: Scalars['Email'];
  /**
   * Use i.e. `new Date(Date.UTC(1955, 8, 3)).getTime()`
   * which is: 3 sept 1955 00:00:00 GMT+2 (CEST)
   * Needed to match SQL Server database field value for a Date field
   */
  Geboortedatum: Scalars['Date'];
};

export type CreatePersonByPersonData = {
  /** Max 50 chars */
  Achternaam: Scalars['SafeString'];
  /** Max 100 chars */
  Adresregel1: Scalars['SafeString'];
  /** Max 100 chars */
  Adresregel2?: Maybe<Scalars['SafeString']>;
  /** Email address is required */
  Email: Scalars['Email'];
  /**
   * Use i.e. `new Date(Date.UTC(1955, 8, 3)).getTime()`
   * which is: 3 sept 1955 00:00:00 GMT+2 (CEST)
   * Needed to match SQL Server database field value for a Date field
   */
  Geboortedatum: Scalars['Date'];
  /** Can only be 'o', 'm, 'v' */
  Geslacht: Scalars['SafeString'];
  /** Max 20 chars */
  Huisnummer: Scalars['Int'];
  /** Max 20 chars */
  HuisnummerToevoeging?: Maybe<Scalars['SafeString']>;
  /** Use Landen endpoint */
  Land: Scalars['SafeString'];
  /** Use Nationaliteiten endpoint */
  Nationaliteit: Scalars['SafeString'];
  /** Max 20 chars */
  Postcode: Scalars['SafeString'];
  /** Max 50 chars */
  Tussenvoegsel?: Maybe<Scalars['SafeString']>;
  /** Max 50 chars */
  Voorletters: Scalars['SafeString'];
  /** Max 100 chars */
  Woonplaats: Scalars['SafeString'];
};

export type CursusSessiesForHoogleraarInput = {
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
};

export type DecoupleLicenseInput = {
  confirmationEmail?: Maybe<Scalars['String']>;
  /** Current XX + KBA license which should be decoupled */
  licenseId: Scalars['Int'];
};

export type DecoupleLicenseResult = {
  __typename?: 'decoupleLicenseResult';
  kbaLicense?: Maybe<Certificering>;
  updatedLicense?: Maybe<Certificering>;
};

export type ExamSpecialtiesInput = {
  examenInstellingId?: Maybe<Scalars['Int']>;
  validOnly?: Maybe<Scalars['Boolean']>;
};

export type ExamsInput = {
  examCode?: Maybe<Scalars['SafeString']>;
  from?: Maybe<Scalars['Date']>;
  locationId?: Maybe<Scalars['Int']>;
  orderBy: OrderByArgs;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
  status?: Maybe<CursusStatusEnum>;
  title?: Maybe<Scalars['SafeString']>;
  to?: Maybe<Scalars['Date']>;
  withoutParticipants?: Maybe<Scalars['Boolean']>;
};

export type GetCursusDeelnemerInput = {
  CursusID: Scalars['Int'];
  PasNummer?: Maybe<Scalars['String']>;
  PersoonID?: Maybe<Scalars['Int']>;
};

export type GetCursusDeelnemersInput = {
  CursusID: Scalars['Int'];
};

export type GetCursusInfoForHoogleraarInput = {
  cursusId?: Maybe<Scalars['Int']>;
};

export type IsLicenseValidForSpecialtyInput = {
  courseId?: Maybe<Scalars['Int']>;
  licenseId: Scalars['Int'];
  specialtyId?: Maybe<Scalars['Int']>;
};

export type IsLicenseValidForSpecialtyResult = {
  __typename?: 'isLicenseValidForSpecialtyResult';
  success: Scalars['Boolean'];
};

export type ManuallyProcessGraduatesResult = {
  __typename?: 'manuallyProcessGraduatesResult';
  message: Scalars['String'];
};

export type RegisterForCourseByHoogleraarInput = {
  courseId: Scalars['Int'];
  licenseId: Scalars['Int'];
  persoonId: Scalars['Int'];
};

export type RegisterForCourseInput = {
  city?: Maybe<Scalars['SafeString']>;
  code?: Maybe<Scalars['SafeString']>;
  country?: Maybe<Scalars['SafeString']>;
  courseDateTime?: Maybe<Scalars['Date']>;
  courseId: Scalars['Int'];
  email?: Maybe<Scalars['Email']>;
  houseNr?: Maybe<Scalars['SafeString']>;
  houseNrExtension?: Maybe<Scalars['SafeString']>;
  invoiceAddress?: Maybe<Scalars['SafeString']>;
  isDigitalSpecialty: Scalars['Boolean'];
  knowledgeArea?: Maybe<Scalars['SafeString']>;
  licenseId: Scalars['Int'];
  phoneNr?: Maybe<Scalars['SafeString']>;
  specialtyId?: Maybe<Scalars['Int']>;
  street?: Maybe<Scalars['SafeString']>;
  title: Scalars['SafeString'];
  zipcode?: Maybe<Scalars['SafeString']>;
};

export type RequestDuplicateInput = {
  /** Nr of cards */
  count?: Maybe<Scalars['Int']>;
  /** Licenses which should be duplicated */
  licenseIds: Array<Maybe<Scalars['Int']>>;
  /** Remark for invoice (required for anything other than KBA) */
  remark?: Maybe<Scalars['SafeString']>;
};

export type RequestDuplicateResult = {
  __typename?: 'requestDuplicateResult';
  /** One or multiple passes (1 for each license) */
  cards: Array<Pas>;
  /**
   * The link to the invoice in format
   * window.open('iDeal/Factuur.aspx?SafeKey=ZR6HXPxJ00YCgPIvrf3ciG00iwRcs0FDOXkJ6S9AYiOnRSYChcmsCc+/DyH1KeCh1ZL95PyapQQxIqFviIvWpWZjgR77CTAvsd1k/DFhQb5VXOx7SoHu+I0+NQiOpn1nTkeXHTYqsmggI81XDjnLowbb5qmDhynQpJqCMerD5iw=','FactuurVenster','left=100,top=50,width=700,height=800,location=0,resizable=1,toolbar=1')
   */
  invoiceLink: Scalars['String'];
};

export type RequestLicenseInput = {
  /** License the user is requesting, based on the limited list of pre-educations */
  CertificaatID: Scalars['Int'];
  /** Optional: Current license that the new license should be based off from */
  CertificeringID?: Maybe<Scalars['Int']>;
  /**
   * Date of pre-education result received
   * Must be between max 5 years in past or today
   */
  dateReceived: Scalars['Date'];
  /**
   * File to upload 1.
   * Eigen Verklaring or KVK uittreksel (legitimatiebewijs) or Registration certificate (inschrijvingsbewijs opleiding adviseren)
   */
  file1: Scalars['Upload'];
  /**
   * File to upload 2.
   * For normal license request: Diploma
   */
  file2?: Maybe<Scalars['Upload']>;
  /**
   * File to upload 3.
   * For normal license request: cijferlijst
   * For registration certificate: none
   */
  file3?: Maybe<Scalars['Upload']>;
  /** The Id of the pre-education (vooropleiding) */
  preEducationId: Scalars['Int'];
  /** Optional remarks */
  remarks?: Maybe<Scalars['SafeString']>;
};

export type RequestLicenseResult = {
  __typename?: 'requestLicenseResult';
  VrijstellingsVerzoekID: Scalars['Int'];
  invoiceLink: Scalars['String'];
  requestFormPdfLink: Scalars['String'];
};

export type SaveLocationInput = {
  Contactgegevens?: Maybe<ContactgegevensInput>;
  ContactgegevensID?: Maybe<Scalars['Int']>;
  ExamenInstellingID?: Maybe<Scalars['Int']>;
  IsActief: Scalars['Boolean'];
  LokatieID?: Maybe<Scalars['Int']>;
  Naam: Scalars['SafeString'];
  Routebeschrijving?: Maybe<Scalars['SafeString']>;
  VakgroepID?: Maybe<Scalars['Int']>;
};

export type SaveMonitorInput = {
  Achternaam: Scalars['SafeString'];
  Email: Scalars['Email'];
  ExamenInstellingID?: Maybe<Scalars['Int']>;
  Geslacht: Scalars['SafeString'];
  MonitorID?: Maybe<Scalars['Int']>;
  Tussenvoegsel?: Maybe<Scalars['SafeString']>;
  Voornaam: Scalars['SafeString'];
};

export type SearchBijeenkomstInput = {
  cursusId: Scalars['Int'];
};

export type SearchCourseSessionsForHoogleraarInput = {
  competenceId?: Maybe<Scalars['Int']>;
  currentCourseId?: Maybe<Scalars['Int']>;
  distanceRadius?: Maybe<Scalars['Int']>;
  from?: Maybe<Scalars['Date']>;
  hoogleraarId?: Maybe<Scalars['Int']>;
  isOnlineCourse: Scalars['Boolean'];
  isWebinar: Scalars['Boolean'];
  knowledgeAreaId?: Maybe<Scalars['Int']>;
  themeId?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['Date']>;
  zipcodeNumbers?: Maybe<Scalars['Int']>;
};

export type SearchCourseSessionsInput = {
  competenceId?: Maybe<Scalars['Int']>;
  currentCourseId?: Maybe<Scalars['Int']>;
  distanceRadius?: Maybe<Scalars['Int']>;
  from?: Maybe<Scalars['Date']>;
  isOnlineCourse: Scalars['Boolean'];
  isWebinar: Scalars['Boolean'];
  knowledgeAreaId?: Maybe<Scalars['Int']>;
  themeId?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['Date']>;
  zipcodeNumbers?: Maybe<Scalars['Int']>;
};

export type SearchCursusDeelnemersInput = {
  CursusID: Scalars['Int'];
  geboortejaar?: Maybe<Scalars['String']>;
  naam?: Maybe<Scalars['String']>;
  pasnummer?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
};

export type SearchExamInput = {
  examId: Scalars['Int'];
};

export type SearchLocationsInput = {
  ExamenInstellingID?: Maybe<Scalars['Int']>;
  VakgroepID?: Maybe<Scalars['Int']>;
};

export type SearchMonitorsInput = {
  ExamenInstellingID?: Maybe<Scalars['Int']>;
};

export type SearchSpecialtyInput = {
  competenceId?: Maybe<Scalars['Int']>;
  isOnlineCourse: Scalars['Boolean'];
  knowledgeAreaId?: Maybe<Scalars['Int']>;
  specialtyId?: Maybe<Scalars['Int']>;
  themeId?: Maybe<Scalars['Int']>;
};

export type SpecialtiesInput = {
  vakgroepId?: Maybe<Scalars['Int']>;
};

export type UnRegisterForCourseByCourseIdInput = {
  cursusId: Scalars['Int'];
  dateTime: Scalars['Date'];
};

export type UnassignMonitorInput = {
  MonitorID?: Maybe<Scalars['Int']>;
  SessieID?: Maybe<Scalars['Int']>;
};

export type UnregisterForCourseByHoogleraarInput = {
  CursusDeelnameID: Scalars['Int'];
};

export type UpdateContactgegevensInput = {
  Email?: Maybe<Scalars['SafeString']>;
  EmailWerkgever?: Maybe<Scalars['SafeString']>;
  Telefoon?: Maybe<Scalars['SafeString']>;
};

export type UpdateVisitationReportInput = {
  DatumRapport?: Maybe<Scalars['Date']>;
  Rapport: Scalars['SafeString'];
  Rapportcijfer: Scalars['Int'];
  Status: VisitatieStatusEnum;
  VisitatieID: Scalars['Int'];
  VolgensIntentieAanbod: Scalars['Boolean'];
  VragenJson: Scalars['SafeString'];
  ratings?: Maybe<Array<VisitatieBeoordelingCategorieInput>>;
};

export type VisitatieBeoordelingCategorieInput = {
  CategorieNaam: Scalars['String'];
  CategorieTemplateID: Scalars['Int'];
  Cijfer?: Maybe<Scalars['Float']>;
  TotaalPunten?: Maybe<Scalars['Float']>;
  VanafDatum: Scalars['Date'];
  Versie: Scalars['String'];
  VisitatieBeoordelingCategorieID: Scalars['ID'];
  VisitatieID: Scalars['Int'];
  Vragen?: Maybe<Array<Maybe<VisitatieBeoordelingCategorieVraagInput>>>;
  Weging: Scalars['Float'];
};

export type VisitatieBeoordelingCategorieVraagInput = {
  CategorieTemplateID: Scalars['Int'];
  Cijfer?: Maybe<Scalars['Float']>;
  Naam: Scalars['String'];
  Toelichting?: Maybe<Scalars['String']>;
  TotaalPunten?: Maybe<Scalars['Float']>;
  VanafDatum: Scalars['Date'];
  Versie: Scalars['String'];
  VisitatieBeoordelingCategorieID: Scalars['ID'];
  VisitatieBeoordelingCategorieVraagID: Scalars['ID'];
  VraagTemplateID: Scalars['Int'];
  Weging: Scalars['Float'];
};

export type VisitationInput = {
  visitatieId: Scalars['Int'];
};

export type VisitationsInput = {
  courseCode?: Maybe<Scalars['SafeString']>;
  from?: Maybe<Scalars['Date']>;
  orderBy: OrderByArgs;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
  status?: Maybe<VisitatieStatusEnum>;
  title?: Maybe<Scalars['SafeString']>;
  to?: Maybe<Scalars['Date']>;
};

export type App_GetMyQueryVariables = Exact<{ [key: string]: never; }>;


export type App_GetMyQuery = { my?: Maybe<{ __typename?: 'My', personId: number, Roles?: Maybe<Array<Maybe<string>>>, Persoon: { __typename?: 'Persoon', PersoonID: number, Geboortedatum?: Maybe<any>, FullName?: Maybe<string>, Geslacht: string, IsGbaGeregistreerd?: Maybe<boolean>, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, DisplayAddress?: Maybe<string>, Adresregel1: string, Adresregel2?: Maybe<string>, Huisnummer: string, HuisnummerToevoeging?: Maybe<string>, Postcode: string, Woonplaats: string, Land: string, Email?: Maybe<string>, EmailWerkgever?: Maybe<string>, Telefoon?: Maybe<string> } }, Certificeringen?: Maybe<Array<Maybe<{ __typename?: 'Certificering', CertificeringID: number, NummerWeergave: string, Status: CertificeringStatusEnum, BeginDatum: any, EindDatum: any, DatumIngetrokkenVan?: Maybe<any>, DatumIngetrokkenTot?: Maybe<any>, UitstelTot?: Maybe<any>, UitstelVerleend?: Maybe<boolean>, Certificaat?: Maybe<{ __typename?: 'Certificaat', CertificaatID: number, Code: string, Naam: string }> }>>> }> };

export type MyContactgegevensFieldsFragment = { __typename?: 'Contactgegevens', ContactgegevensID: number, DisplayAddress?: Maybe<string>, Adresregel1: string, Adresregel2?: Maybe<string>, Huisnummer: string, HuisnummerToevoeging?: Maybe<string>, Postcode: string, Woonplaats: string, Land: string, Email?: Maybe<string>, EmailWerkgever?: Maybe<string>, Telefoon?: Maybe<string> };

export type CertificeringenFieldsFragment = { __typename?: 'Certificering', CertificeringID: number, NummerWeergave: string, Status: CertificeringStatusEnum, BeginDatum: any, EindDatum: any, DatumIngetrokkenVan?: Maybe<any>, DatumIngetrokkenTot?: Maybe<any>, UitstelTot?: Maybe<any>, UitstelVerleend?: Maybe<boolean>, Certificaat?: Maybe<{ __typename?: 'Certificaat', CertificaatID: number, Code: string, Naam: string }> };

export type App_AuthenticateMutationVariables = Exact<{
  input: AuthenticateInput;
}>;


export type App_AuthenticateMutation = { authenticate?: Maybe<{ __typename?: 'AuthenticateResult', roles: Array<string>, accessToken: string, refreshToken: string, Persoon: { __typename?: 'Persoon', PersoonID: number, Achternaam: string, Geboortedatum?: Maybe<any>, Voorletters: string } }> };

export type App_LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type App_LogoutMutation = { logout: boolean };

export type App_GetStudyProgressByLicenseIdQueryVariables = Exact<{
  certificeringId: Scalars['Int'];
}>;


export type App_GetStudyProgressByLicenseIdQuery = { getStudyProgressByLicenseId: { __typename?: 'StudyProgress', RequiredPoints: number, DonePoints: number, CountedPoints: number, RequiredPointsTodo: number, Completed: boolean, PointsToDo: number, Certificering: { __typename?: 'Certificering', PersoonID: number, CertificeringID: number, CertificaatID: number, Status: CertificeringStatusEnum, NummerWeergave: string, DatumVoldaan?: Maybe<any>, BeginDatum: any, EindDatum: any, DatumIngetrokkenVan?: Maybe<any>, DatumIngetrokkenTot?: Maybe<any>, UitstelTot?: Maybe<any>, UitstelVerleend?: Maybe<boolean>, Persoon?: Maybe<{ __typename?: 'Persoon', PersoonID: number, FullName?: Maybe<string>, Geboortedatum?: Maybe<any> }>, Certificaat?: Maybe<{ __typename?: 'Certificaat', CertificaatID: number, Naam: string, Code: string }>, Passen?: Maybe<Array<Maybe<{ __typename?: 'Pas', PasID: number, Status: PasStatusEnum, DatumUitgeleverd?: Maybe<any>, DatumAanvraag: any }>>> }, ParticipationPoints?: Maybe<Array<Maybe<{ __typename?: 'ParticipationPoint', ThemaId: number, ThemaNaam: string, RequiredPoints: number, DonePoints: number, CountedPoints: number }>>>, Studieresultaten?: Maybe<Array<Maybe<{ __typename?: 'Studieresultaat', StudieresultaatID: number, Datum: any, Status: StudieresultaatStatusEnum, Cursus: { __typename?: 'Cursus', CursusID: number, CursusCode?: Maybe<string>, Status: CursusStatusEnum, Titel?: Maybe<string>, Vak: { __typename?: 'Vak', VakID: number, Titel?: Maybe<string>, ThemaNaam?: Maybe<string>, CompetentieNaam?: Maybe<string>, Vakgroep?: Maybe<{ __typename?: 'Vakgroep', VakgroepID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Telefoon?: Maybe<string> } }> }, Sessies?: Maybe<Array<Maybe<{ __typename?: 'Sessie', SessieID: number, DatumBegintijd: any, Lokatie?: Maybe<{ __typename?: 'Lokatie', LokatieID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Woonplaats: string } }> }>>> } }>>> } };

export type CertificeringFieldsFragment = { __typename?: 'Certificering', PersoonID: number, CertificeringID: number, CertificaatID: number, Status: CertificeringStatusEnum, NummerWeergave: string, DatumVoldaan?: Maybe<any>, BeginDatum: any, EindDatum: any, DatumIngetrokkenVan?: Maybe<any>, DatumIngetrokkenTot?: Maybe<any>, UitstelTot?: Maybe<any>, UitstelVerleend?: Maybe<boolean>, Persoon?: Maybe<{ __typename?: 'Persoon', PersoonID: number, FullName?: Maybe<string>, Geboortedatum?: Maybe<any> }>, Certificaat?: Maybe<{ __typename?: 'Certificaat', CertificaatID: number, Naam: string, Code: string }>, Passen?: Maybe<Array<Maybe<{ __typename?: 'Pas', PasID: number, Status: PasStatusEnum, DatumUitgeleverd?: Maybe<any>, DatumAanvraag: any }>>> };

export type PasFieldsFragment = { __typename?: 'Pas', PasID: number, Status: PasStatusEnum, DatumUitgeleverd?: Maybe<any>, DatumAanvraag: any };

export type StudieresultatenFieldsOnStudyProgressFragment = { __typename?: 'Studieresultaat', StudieresultaatID: number, Datum: any, Status: StudieresultaatStatusEnum, Cursus: { __typename?: 'Cursus', CursusID: number, CursusCode?: Maybe<string>, Status: CursusStatusEnum, Titel?: Maybe<string>, Vak: { __typename?: 'Vak', VakID: number, Titel?: Maybe<string>, ThemaNaam?: Maybe<string>, CompetentieNaam?: Maybe<string>, Vakgroep?: Maybe<{ __typename?: 'Vakgroep', VakgroepID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Telefoon?: Maybe<string> } }> }, Sessies?: Maybe<Array<Maybe<{ __typename?: 'Sessie', SessieID: number, DatumBegintijd: any, Lokatie?: Maybe<{ __typename?: 'Lokatie', LokatieID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Woonplaats: string } }> }>>> } };

export type StudyProgressFieldsFragment = { __typename?: 'StudyProgress', RequiredPoints: number, DonePoints: number, CountedPoints: number, RequiredPointsTodo: number, Completed: boolean, PointsToDo: number, ParticipationPoints?: Maybe<Array<Maybe<{ __typename?: 'ParticipationPoint', ThemaId: number, ThemaNaam: string, RequiredPoints: number, DonePoints: number, CountedPoints: number }>>>, Studieresultaten?: Maybe<Array<Maybe<{ __typename?: 'Studieresultaat', StudieresultaatID: number, Datum: any, Status: StudieresultaatStatusEnum, Cursus: { __typename?: 'Cursus', CursusID: number, CursusCode?: Maybe<string>, Status: CursusStatusEnum, Titel?: Maybe<string>, Vak: { __typename?: 'Vak', VakID: number, Titel?: Maybe<string>, ThemaNaam?: Maybe<string>, CompetentieNaam?: Maybe<string>, Vakgroep?: Maybe<{ __typename?: 'Vakgroep', VakgroepID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Telefoon?: Maybe<string> } }> }, Sessies?: Maybe<Array<Maybe<{ __typename?: 'Sessie', SessieID: number, DatumBegintijd: any, Lokatie?: Maybe<{ __typename?: 'Lokatie', LokatieID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Woonplaats: string } }> }>>> } }>>> };

export type ParticipationPointsFieldsFragment = { __typename?: 'ParticipationPoint', ThemaId: number, ThemaNaam: string, RequiredPoints: number, DonePoints: number, CountedPoints: number };

export type App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQueryVariables = Exact<{
  certificeringId: Scalars['Int'];
}>;


export type App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery = { my?: Maybe<{ __typename?: 'My', personId: number, Studieresultaten?: Maybe<Array<Maybe<{ __typename?: 'Studieresultaat', StudieresultaatID: number, Certificering?: Maybe<{ __typename?: 'Certificering', CertificeringID: number, NummerWeergave: string, CertificaatID: number }>, Cursus: { __typename?: 'Cursus', CursusID: number, CursusCode?: Maybe<string>, Prijs?: Maybe<number>, Titel?: Maybe<string>, Promotietekst?: Maybe<string>, Status: CursusStatusEnum, Sessies?: Maybe<Array<Maybe<{ __typename?: 'Sessie', SessieID: number, DatumBegintijd: any, DatumEindtijd: any, Lokatie?: Maybe<{ __typename?: 'Lokatie', LokatieID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, DisplayAddress?: Maybe<string>, DisplayStreetHouseNr?: Maybe<string>, DisplayPostalCodeCity?: Maybe<string> } }> }>>>, Vak: { __typename?: 'Vak', VakID: number, ThemaNaam?: Maybe<string>, CompetentieNaam?: Maybe<string>, Vakgroep?: Maybe<{ __typename?: 'Vakgroep', VakgroepID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } }>, ExamenInstelling?: Maybe<{ __typename?: 'ExamenInstelling', ExamenInstellingID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } }> } } }>>>, AangemeldeCursusDeelnamesPerCertificeringId?: Maybe<Array<Maybe<{ __typename?: 'CursusDeelname', CursusDeelnameID: number, Status: CursusDeelnameStatusEnum, Cursus: { __typename?: 'Cursus', CursusID: number, CursusCode?: Maybe<string>, Prijs?: Maybe<number>, Titel?: Maybe<string>, Promotietekst?: Maybe<string>, Status: CursusStatusEnum, Sessies?: Maybe<Array<Maybe<{ __typename?: 'Sessie', SessieID: number, DatumBegintijd: any, DatumEindtijd: any, Lokatie?: Maybe<{ __typename?: 'Lokatie', LokatieID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, DisplayAddress?: Maybe<string>, DisplayStreetHouseNr?: Maybe<string>, DisplayPostalCodeCity?: Maybe<string> } }> }>>>, Vak: { __typename?: 'Vak', VakID: number, ThemaNaam?: Maybe<string>, CompetentieNaam?: Maybe<string>, Vakgroep?: Maybe<{ __typename?: 'Vakgroep', VakgroepID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } }>, ExamenInstelling?: Maybe<{ __typename?: 'ExamenInstelling', ExamenInstellingID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } }> } } }>>> }> };

export type LokatieFieldsFragment = { __typename?: 'Lokatie', LokatieID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, DisplayAddress?: Maybe<string>, DisplayStreetHouseNr?: Maybe<string>, DisplayPostalCodeCity?: Maybe<string> } };

export type CursusFieldsFragment = { __typename?: 'Cursus', CursusID: number, CursusCode?: Maybe<string>, Prijs?: Maybe<number>, Titel?: Maybe<string>, Promotietekst?: Maybe<string>, Status: CursusStatusEnum, Sessies?: Maybe<Array<Maybe<{ __typename?: 'Sessie', SessieID: number, DatumBegintijd: any, DatumEindtijd: any, Lokatie?: Maybe<{ __typename?: 'Lokatie', LokatieID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, DisplayAddress?: Maybe<string>, DisplayStreetHouseNr?: Maybe<string>, DisplayPostalCodeCity?: Maybe<string> } }> }>>>, Vak: { __typename?: 'Vak', VakID: number, ThemaNaam?: Maybe<string>, CompetentieNaam?: Maybe<string>, Vakgroep?: Maybe<{ __typename?: 'Vakgroep', VakgroepID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } }>, ExamenInstelling?: Maybe<{ __typename?: 'ExamenInstelling', ExamenInstellingID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } }> } };

export type VakgroepFieldsFragment = { __typename?: 'Vakgroep', VakgroepID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } };

export type ExamenInstellingFieldsFragment = { __typename?: 'ExamenInstelling', ExamenInstellingID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } };

export type App_UpdateContactgegevensMutationVariables = Exact<{
  input: UpdateContactgegevensInput;
}>;


export type App_UpdateContactgegevensMutation = { updateContactgegevens?: Maybe<{ __typename?: 'Contactgegevens', ContactgegevensID: number, Email?: Maybe<string>, EmailWerkgever?: Maybe<string>, Telefoon?: Maybe<string> }> };

export type App_GetCursusSessiesQueryVariables = Exact<{
  input: SearchCourseSessionsInput;
}>;


export type App_GetCursusSessiesQuery = { CursusSessies?: Maybe<Array<Maybe<{ __typename?: 'CursusSessie', CanUnRegister: boolean, CourseId: number, SpecialtyId: number, CourseCode: string, Title: string, Date: any, StartTime: string, EndTime: string, Price: number, LocationName: string, Distance?: Maybe<number>, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: Maybe<string>, OrganizerPhone?: Maybe<string>, OrganizerWebsite?: Maybe<string>, PromoText?: Maybe<string>, Registered: boolean, RegisteredDate?: Maybe<any>, SpecialtyWebsite?: Maybe<string>, LocationAddress?: Maybe<{ __typename?: 'LocationAddress', Street: string, HouseNr: string, HouseNrExtension?: Maybe<string>, Zipcode?: Maybe<string>, City?: Maybe<string>, Email?: Maybe<string>, Website?: Maybe<string> }> }>>> };

export type CursusSessiesFieldsFragment = { __typename?: 'CursusSessie', CanUnRegister: boolean, CourseId: number, SpecialtyId: number, CourseCode: string, Title: string, Date: any, StartTime: string, EndTime: string, Price: number, LocationName: string, Distance?: Maybe<number>, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: Maybe<string>, OrganizerPhone?: Maybe<string>, OrganizerWebsite?: Maybe<string>, PromoText?: Maybe<string>, Registered: boolean, RegisteredDate?: Maybe<any>, SpecialtyWebsite?: Maybe<string>, LocationAddress?: Maybe<{ __typename?: 'LocationAddress', Street: string, HouseNr: string, HouseNrExtension?: Maybe<string>, Zipcode?: Maybe<string>, City?: Maybe<string>, Email?: Maybe<string>, Website?: Maybe<string> }> };

export type App_GetCursusSessiesDetailsNoLicenseQueryVariables = Exact<{
  input: SearchCourseSessionsInput;
}>;


export type App_GetCursusSessiesDetailsNoLicenseQuery = { CursusSessies?: Maybe<Array<Maybe<{ __typename?: 'CursusSessie', CanUnRegister: boolean, CourseId: number, SpecialtyId: number, CourseCode: string, Title: string, Date: any, StartTime: string, EndTime: string, Price: number, LocationName: string, Distance?: Maybe<number>, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: Maybe<string>, OrganizerPhone?: Maybe<string>, OrganizerWebsite?: Maybe<string>, PromoText?: Maybe<string>, Registered: boolean, RegisteredDate?: Maybe<any>, SpecialtyWebsite?: Maybe<string>, LocationAddress?: Maybe<{ __typename?: 'LocationAddress', Street: string, HouseNr: string, HouseNrExtension?: Maybe<string>, Zipcode?: Maybe<string>, City?: Maybe<string>, Email?: Maybe<string>, Website?: Maybe<string> }> }>>> };

export type App_GetCursusSessiesDetailsQueryVariables = Exact<{
  input: SearchCourseSessionsInput;
  inputCheck: IsLicenseValidForSpecialtyInput;
}>;


export type App_GetCursusSessiesDetailsQuery = { CursusSessies?: Maybe<Array<Maybe<{ __typename?: 'CursusSessie', CanUnRegister: boolean, CourseId: number, SpecialtyId: number, CourseCode: string, Title: string, Date: any, StartTime: string, EndTime: string, Price: number, LocationName: string, Distance?: Maybe<number>, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: Maybe<string>, OrganizerPhone?: Maybe<string>, OrganizerWebsite?: Maybe<string>, PromoText?: Maybe<string>, Registered: boolean, RegisteredDate?: Maybe<any>, SpecialtyWebsite?: Maybe<string>, LocationAddress?: Maybe<{ __typename?: 'LocationAddress', Street: string, HouseNr: string, HouseNrExtension?: Maybe<string>, Zipcode?: Maybe<string>, City?: Maybe<string>, Email?: Maybe<string>, Website?: Maybe<string> }> }>>>, isLicenseValidForSpecialty: { __typename?: 'isLicenseValidForSpecialtyResult', success: boolean } };

export type App_GetSearchSpecialtiesQueryVariables = Exact<{
  input: SearchSpecialtyInput;
}>;


export type App_GetSearchSpecialtiesQuery = { SearchSpecialties?: Maybe<Array<Maybe<{ __typename?: 'SearchSpecialtyResult', SpecialtyId: number, Code: string, Title: string, Price: number, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: Maybe<string>, OrganizerPhone?: Maybe<string>, OrganizerWebsite?: Maybe<string>, PromoText?: Maybe<string>, SpecialtyWebsite?: Maybe<string> }>>> };

export type App_VakgroepenQueryVariables = Exact<{
  input?: Maybe<Scalars['Int']>;
}>;


export type App_VakgroepenQuery = { Vakgroepen: Array<Maybe<{ __typename?: 'Vakgroep', VakgroepID: number, ContactgegevensID: number, Naam: string, IsBtwPlichtig: boolean, Code: string, IsActief: boolean, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Woonplaats: string } }>> };

export type App_VakgroepDetailsQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type App_VakgroepDetailsQuery = { Vakgroepen: Array<Maybe<{ __typename?: 'Vakgroep', VakgroepID: number, ContactgegevensID: number, Naam: string, Code: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Adresregel1: string, Adresregel2?: Maybe<string>, Huisnummer: string, HuisnummerToevoeging?: Maybe<string>, Postcode: string, Woonplaats: string, DisplayAddress?: Maybe<string>, DisplayPostalCodeCity?: Maybe<string>, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } }>> };

export type VakgroepDetailsFieldsFragment = { __typename?: 'Vakgroep', VakgroepID: number, ContactgegevensID: number, Naam: string, Code: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Adresregel1: string, Adresregel2?: Maybe<string>, Huisnummer: string, HuisnummerToevoeging?: Maybe<string>, Postcode: string, Woonplaats: string, DisplayAddress?: Maybe<string>, DisplayPostalCodeCity?: Maybe<string>, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } };

export type App_GetPersoonVakgroepenQueryVariables = Exact<{ [key: string]: never; }>;


export type App_GetPersoonVakgroepenQuery = { GetPersoonVakgroepenForPersoonId: Array<Maybe<{ __typename?: 'PersoonVakgroep', PersoonVakgroepID: number, PersoonID: number, VakgroepID: number, DebiteurNr?: Maybe<string>, Vakgroep: { __typename?: 'Vakgroep', VakgroepID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Adresregel1: string, Adresregel2?: Maybe<string>, Postcode: string, Woonplaats: string, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } } }>> };

export type App_GetHandelshuisVestigingenQueryVariables = Exact<{
  input?: Maybe<Scalars['Int']>;
}>;


export type App_GetHandelshuisVestigingenQuery = { GetHandelshuisVestigingen: Array<Maybe<{ __typename?: 'HandelshuisVestiging', HandelshuisID: number, HandelshuisVestigingID: number, ContactgegevensID: number, Naam: string, IsBtwPlichtig: boolean, Code: string, IsActief: boolean, CdgBedrijfId?: Maybe<number>, CdgNevenvestigingId?: Maybe<number>, CDGdeelnemer?: Maybe<boolean>, VKLHandel?: Maybe<boolean>, IsHoofdVestiging: boolean, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Woonplaats: string } }>> };

export type App_GetHandelshuisVestigingDetailsQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type App_GetHandelshuisVestigingDetailsQuery = { GetHandelshuisVestigingen: Array<Maybe<{ __typename?: 'HandelshuisVestiging', HandelshuisVestigingID: number, ContactgegevensID: number, Naam: string, Code: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Adresregel1: string, Adresregel2?: Maybe<string>, Huisnummer: string, HuisnummerToevoeging?: Maybe<string>, Postcode: string, Woonplaats: string, DisplayAddress?: Maybe<string>, DisplayPostalCodeCity?: Maybe<string>, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } }>> };

export type HandelshuisVestigingDetailsFieldsFragment = { __typename?: 'HandelshuisVestiging', HandelshuisVestigingID: number, ContactgegevensID: number, Naam: string, Code: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Adresregel1: string, Adresregel2?: Maybe<string>, Huisnummer: string, HuisnummerToevoeging?: Maybe<string>, Postcode: string, Woonplaats: string, DisplayAddress?: Maybe<string>, DisplayPostalCodeCity?: Maybe<string>, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } };

export type App_GetPersoonHandelshuisVestigingenQueryVariables = Exact<{ [key: string]: never; }>;


export type App_GetPersoonHandelshuisVestigingenQuery = { GetPersoonHandelshuisvestigingenForPersoonId: Array<Maybe<{ __typename?: 'PersoonHandelshuisVestiging', PersoonHandelshuisVestigingID: number, PersoonID: number, HandelshuisVestigingID: number, DebiteurNr?: Maybe<string>, HandelshuisVestiging: { __typename?: 'HandelshuisVestiging', HandelshuisVestigingID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Adresregel1: string, Adresregel2?: Maybe<string>, Postcode: string, Woonplaats: string, Email?: Maybe<string>, Telefoon?: Maybe<string>, Website?: Maybe<string> } } }>> };

export type App_GetCursusSessiesForHoogleraarQueryVariables = Exact<{
  input?: Maybe<CursusSessiesForHoogleraarInput>;
}>;


export type App_GetCursusSessiesForHoogleraarQuery = { GetCursusSessiesForHoogleraar?: Maybe<Array<Maybe<{ __typename?: 'Sessie', SessieID: number, CursusID: number, DatumBegintijd: any, DatumEindtijd: any, Cursus?: Maybe<{ __typename?: 'Cursus', CursusID: number, Titel?: Maybe<string>, IsBesloten?: Maybe<boolean>, CursusCode?: Maybe<string> }>, Lokatie?: Maybe<{ __typename?: 'Lokatie', LokatieID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, Woonplaats: string } }> }>>> };

export type App_GetCursusInfoForHoogleraarQueryVariables = Exact<{
  input?: Maybe<GetCursusInfoForHoogleraarInput>;
}>;


export type App_GetCursusInfoForHoogleraarQuery = { GetCursusInfoForHoogleraar?: Maybe<{ __typename?: 'Cursus', CursusID: number, Titel?: Maybe<string>, IsBesloten?: Maybe<boolean>, CursusCode?: Maybe<string>, Prijs?: Maybe<number>, Promotietekst?: Maybe<string>, Vak: { __typename?: 'Vak', VakID: number, ThemaNaam?: Maybe<string>, CompetentieNaam?: Maybe<string> }, Sessies?: Maybe<Array<Maybe<{ __typename?: 'Sessie', SessieID: number, DatumBegintijd: any, DatumEindtijd: any, Lokatie?: Maybe<{ __typename?: 'Lokatie', LokatieID: number, Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, DisplayAddress?: Maybe<string> } }> }>>> }> };

export type App_GetCursusDeelnemersQueryVariables = Exact<{
  input?: Maybe<GetCursusDeelnemersInput>;
}>;


export type App_GetCursusDeelnemersQuery = { GetCursusDeelnemers?: Maybe<Array<Maybe<{ __typename?: 'CursusDeelname', CursusDeelnameID: number, Status: CursusDeelnameStatusEnum, Persoon?: Maybe<{ __typename?: 'Persoon', PersoonID: number, Voorletters: string, Achternaam: string, Tussenvoegsel: string, SortableFullName?: Maybe<string>, Geboortedatum?: Maybe<any>, Geslacht: string }> }>>> };

export type App_SearchCursusDeelnemersQueryVariables = Exact<{
  input?: Maybe<SearchCursusDeelnemersInput>;
}>;


export type App_SearchCursusDeelnemersQuery = { SearchCursusDeelnemers?: Maybe<Array<Maybe<{ __typename?: 'Persoon', PersoonID: number, BSN?: Maybe<number>, Voorletters: string, Roepnaam: string, Achternaam: string, Tussenvoegsel: string, SortableFullName?: Maybe<string>, Nationaliteit: string, GbaNummer: string, IsGbaGeregistreerd?: Maybe<boolean>, Geboortedatum?: Maybe<any>, Geslacht: string, Actief?: Maybe<boolean>, GbaUpdate?: Maybe<any>, CursusDeelname?: Maybe<Array<Maybe<{ __typename?: 'CursusDeelname', CursusDeelnameID: number, Status: CursusDeelnameStatusEnum, Opmerkingen?: Maybe<string>, CertificeringID?: Maybe<number> }>>>, Certificeringen?: Maybe<Array<Maybe<{ __typename?: 'Certificering', CertificeringID: number, NummerWeergave: string, Status: CertificeringStatusEnum, BeginDatum: any, EindDatum: any, DatumIngetrokkenVan?: Maybe<any>, DatumIngetrokkenTot?: Maybe<any>, UitstelTot?: Maybe<any>, UitstelVerleend?: Maybe<boolean>, Certificaat?: Maybe<{ __typename?: 'Certificaat', CertificaatID: number, Code: string, Naam: string }> }>>> }>>> };

export type App_GetCursusDeelnemerQueryVariables = Exact<{
  input?: Maybe<GetCursusDeelnemerInput>;
}>;


export type App_GetCursusDeelnemerQuery = { GetCursusDeelnemer?: Maybe<{ __typename?: 'Persoon', PersoonID: number, Geboortedatum?: Maybe<any>, FullName?: Maybe<string>, Geslacht: string, IsGbaGeregistreerd?: Maybe<boolean>, Contactgegevens: { __typename?: 'Contactgegevens', ContactgegevensID: number, DisplayAddress?: Maybe<string> }, CursusDeelname?: Maybe<Array<Maybe<{ __typename?: 'CursusDeelname', CursusDeelnameID: number, CursusID: number, Status: CursusDeelnameStatusEnum }>>>, Certificeringen?: Maybe<Array<Maybe<{ __typename?: 'Certificering', CertificeringID: number, NummerWeergave: string, Status: CertificeringStatusEnum, BeginDatum: any, EindDatum: any, DatumIngetrokkenVan?: Maybe<any>, DatumIngetrokkenTot?: Maybe<any>, UitstelTot?: Maybe<any>, UitstelVerleend?: Maybe<boolean>, Certificaat?: Maybe<{ __typename?: 'Certificaat', CertificaatID: number, Code: string, Naam: string }> }>>> }> };

export type App_GetSpecialtyDetailsQueryVariables = Exact<{
  input: SearchSpecialtyInput;
  inputCheck: IsLicenseValidForSpecialtyInput;
}>;


export type App_GetSpecialtyDetailsQuery = { SearchSpecialties?: Maybe<Array<Maybe<{ __typename?: 'SearchSpecialtyResult', SpecialtyId: number, Code: string, Title: string, Price: number, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: Maybe<string>, OrganizerPhone?: Maybe<string>, OrganizerWebsite?: Maybe<string>, PromoText?: Maybe<string>, SpecialtyWebsite?: Maybe<string> }>>>, isLicenseValidForSpecialty: { __typename?: 'isLicenseValidForSpecialtyResult', success: boolean } };

export type App_GetSpecialtyDetailsNoLicenseQueryVariables = Exact<{
  input: SearchSpecialtyInput;
}>;


export type App_GetSpecialtyDetailsNoLicenseQuery = { SearchSpecialties?: Maybe<Array<Maybe<{ __typename?: 'SearchSpecialtyResult', SpecialtyId: number, Code: string, Title: string, Price: number, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: Maybe<string>, OrganizerPhone?: Maybe<string>, OrganizerWebsite?: Maybe<string>, PromoText?: Maybe<string>, SpecialtyWebsite?: Maybe<string> }>>> };

export type SpecialtyDetailsFieldsFragment = { __typename?: 'SearchSpecialtyResult', SpecialtyId: number, Code: string, Title: string, Price: number, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: Maybe<string>, OrganizerPhone?: Maybe<string>, OrganizerWebsite?: Maybe<string>, PromoText?: Maybe<string>, SpecialtyWebsite?: Maybe<string> };

export type App_GetKennisgebiedenQueryVariables = Exact<{ [key: string]: never; }>;


export type App_GetKennisgebiedenQuery = { Kennisgebieden: Array<Maybe<{ __typename?: 'Kennisgebied', KennisgebiedID: number, Naam: string }>> };

export type App_RegisterForCourseMutationVariables = Exact<{
  input: RegisterForCourseInput;
}>;


export type App_RegisterForCourseMutation = { registerForCourse: { __typename?: 'RegisterResult', success: boolean, message: string } };

export type App_RegisterForCourseByHoogleraarMutationVariables = Exact<{
  input: RegisterForCourseByHoogleraarInput;
}>;


export type App_RegisterForCourseByHoogleraarMutation = { registerForCourseByHoogleraar: { __typename?: 'RegisterResult', success: boolean, message: string } };

export type App_UnRegisterForCourseByCourseIdMutationVariables = Exact<{
  input: UnRegisterForCourseByCourseIdInput;
}>;


export type App_UnRegisterForCourseByCourseIdMutation = { unRegisterForCourseByCourseId: { __typename?: 'UnRegisterResult', success: boolean, message: string } };

export type App_UnregisterForCourseByHoogleraarMutationVariables = Exact<{
  input: UnregisterForCourseByHoogleraarInput;
}>;


export type App_UnregisterForCourseByHoogleraarMutation = { unregisterForCourseByHoogleraar: { __typename?: 'UnRegisterResult', success: boolean, message: string } };

export type App_GetListsQueryVariables = Exact<{ [key: string]: never; }>;


export type App_GetListsQuery = { Themas: Array<Maybe<{ __typename?: 'Thema', ThemaID: number, Naam: string }>>, Competenties: Array<Maybe<{ __typename?: 'Competentie', CompetentieID: number, Naam: string }>>, Kennisgebieden: Array<Maybe<{ __typename?: 'Kennisgebied', KennisgebiedID: number, Naam: string }>>, Landen: Array<Maybe<{ __typename?: 'Landen', Value: string, Text: string }>> };

export type App_InsertPersoonHandelshuisvestigingForPersoonIdMutationVariables = Exact<{
  input: InsertPersoonHandelshuisvestigingForPersoonIdInput;
}>;


export type App_InsertPersoonHandelshuisvestigingForPersoonIdMutation = { InsertPersoonHandelshuisvestigingForPersoonId: { __typename?: 'PersoonHandelshuisVestiging', PersoonHandelshuisVestigingID: number, PersoonID: number, HandelshuisVestigingID: number, DebiteurNr?: Maybe<string> } };

export type App_UpdatePersoonHandelshuisvestigingForPersoonIdMutationVariables = Exact<{
  input: UpdatePersoonHandelshuisvestigingForPersoonIdInput;
}>;


export type App_UpdatePersoonHandelshuisvestigingForPersoonIdMutation = { UpdatePersoonHandelshuisvestigingForPersoonId: { __typename?: 'PersoonHandelshuisVestiging', PersoonHandelshuisVestigingID: number, PersoonID: number, HandelshuisVestigingID: number, DebiteurNr?: Maybe<string> } };

export type App_DeletePersoonHandelshuisvestigingForPersoonIdMutationVariables = Exact<{
  input: DeletePersoonHandelshuisvestigingForPersoonIdInput;
}>;


export type App_DeletePersoonHandelshuisvestigingForPersoonIdMutation = { DeletePersoonHandelshuisvestigingForPersoonId: boolean };

export type App_GetStudyProgressByLicenseNumberQueryVariables = Exact<{
  nummerweergave: Scalars['SafeString'];
}>;


export type App_GetStudyProgressByLicenseNumberQuery = { getStudyProgressByLicenseNumber: { __typename?: 'StudyProgress', Certificering: { __typename?: 'Certificering', CertificeringID: number, NummerWeergave: string, BeginDatum: any, EindDatum: any, Status: CertificeringStatusEnum, DatumIngetrokkenVan?: Maybe<any>, DatumIngetrokkenTot?: Maybe<any>, UitstelVerleend?: Maybe<boolean>, UitstelTot?: Maybe<any>, Certificaat?: Maybe<{ __typename?: 'Certificaat', CertificaatID: number, Code: string, Naam: string }>, Persoon?: Maybe<{ __typename?: 'Persoon', PersoonID: number, FullName?: Maybe<string>, Geboortedatum?: Maybe<any> }> } } };

export type App_InsertPersoonVakgroepForPersoonIdMutationVariables = Exact<{
  input: InsertPersoonVakgroepForPersoonIdInput;
}>;


export type App_InsertPersoonVakgroepForPersoonIdMutation = { InsertPersoonVakgroepForPersoonId: { __typename?: 'PersoonVakgroep', PersoonVakgroepID: number, PersoonID: number, VakgroepID: number, DebiteurNr?: Maybe<string> } };

export type App_UpdatePersoonVakgroepForPersoonIdMutationVariables = Exact<{
  input: UpdatePersoonVakgroepForPersoonIdInput;
}>;


export type App_UpdatePersoonVakgroepForPersoonIdMutation = { UpdatePersoonVakgroepForPersoonId: { __typename?: 'PersoonVakgroep', PersoonVakgroepID: number, PersoonID: number, VakgroepID: number, DebiteurNr?: Maybe<string> } };

export type App_DeletePersoonVakgroepForPersoonIdMutationVariables = Exact<{
  input: DeletePersoonVakgroepForPersoonIdInput;
}>;


export type App_DeletePersoonVakgroepForPersoonIdMutation = { DeletePersoonVakgroepForPersoonId: boolean };

export const MyContactgegevensFieldsFragmentDoc = gql`
    fragment MyContactgegevensFields on Contactgegevens {
  ContactgegevensID
  DisplayAddress
  Adresregel1
  Adresregel2
  Huisnummer
  HuisnummerToevoeging
  Postcode
  Woonplaats
  Land
  Email
  EmailWerkgever
  Telefoon
}
    `;
export const CertificeringenFieldsFragmentDoc = gql`
    fragment CertificeringenFields on Certificering {
  CertificeringID
  NummerWeergave
  Status
  BeginDatum
  EindDatum
  Certificaat {
    CertificaatID
    Code
    Naam
  }
  DatumIngetrokkenVan
  DatumIngetrokkenTot
  UitstelTot
  UitstelVerleend
}
    `;
export const PasFieldsFragmentDoc = gql`
    fragment PasFields on Pas {
  PasID
  Status
  DatumUitgeleverd
  DatumAanvraag
}
    `;
export const CertificeringFieldsFragmentDoc = gql`
    fragment CertificeringFields on Certificering {
  PersoonID
  Persoon {
    PersoonID
    FullName
    Geboortedatum
  }
  CertificeringID
  CertificaatID
  Certificaat {
    CertificaatID
    Naam
    Code
  }
  Status
  NummerWeergave
  DatumVoldaan
  BeginDatum
  EindDatum
  DatumIngetrokkenVan
  DatumIngetrokkenTot
  UitstelTot
  UitstelVerleend
  Passen {
    ...PasFields
  }
}
    ${PasFieldsFragmentDoc}`;
export const ParticipationPointsFieldsFragmentDoc = gql`
    fragment ParticipationPointsFields on ParticipationPoint {
  ThemaId
  ThemaNaam
  RequiredPoints
  DonePoints
  CountedPoints
}
    `;
export const StudieresultatenFieldsOnStudyProgressFragmentDoc = gql`
    fragment StudieresultatenFieldsOnStudyProgress on Studieresultaat {
  StudieresultaatID
  Datum
  Status
  Cursus {
    CursusID
    CursusCode
    Status
    Titel
    Vak {
      VakID
      Titel
      Vakgroep {
        VakgroepID
        Naam
        Contactgegevens {
          ContactgegevensID
          Telefoon
        }
      }
      ThemaNaam
      CompetentieNaam
    }
    Sessies {
      SessieID
      DatumBegintijd
      Lokatie {
        LokatieID
        Naam
        Contactgegevens {
          ContactgegevensID
          Woonplaats
        }
      }
    }
  }
}
    `;
export const StudyProgressFieldsFragmentDoc = gql`
    fragment StudyProgressFields on StudyProgress {
  RequiredPoints
  DonePoints
  CountedPoints
  RequiredPointsTodo
  Completed
  PointsToDo
  ParticipationPoints {
    ...ParticipationPointsFields
  }
  Studieresultaten {
    ...StudieresultatenFieldsOnStudyProgress
  }
}
    ${ParticipationPointsFieldsFragmentDoc}
${StudieresultatenFieldsOnStudyProgressFragmentDoc}`;
export const LokatieFieldsFragmentDoc = gql`
    fragment LokatieFields on Lokatie {
  LokatieID
  Naam
  Contactgegevens {
    ContactgegevensID
    DisplayAddress
    DisplayStreetHouseNr
    DisplayPostalCodeCity
  }
}
    `;
export const VakgroepFieldsFragmentDoc = gql`
    fragment VakgroepFields on Vakgroep {
  VakgroepID
  Naam
  Contactgegevens {
    ContactgegevensID
    Email
    Telefoon
    Website
  }
}
    `;
export const ExamenInstellingFieldsFragmentDoc = gql`
    fragment ExamenInstellingFields on ExamenInstelling {
  ExamenInstellingID
  Naam
  Contactgegevens {
    ContactgegevensID
    Email
    Telefoon
    Website
  }
}
    `;
export const CursusFieldsFragmentDoc = gql`
    fragment CursusFields on Cursus {
  CursusID
  CursusCode
  Prijs
  Titel
  Promotietekst
  Status
  Sessies {
    SessieID
    DatumBegintijd
    DatumEindtijd
    Lokatie {
      ...LokatieFields
    }
  }
  Vak {
    VakID
    ThemaNaam
    CompetentieNaam
    Vakgroep {
      ...VakgroepFields
    }
    ExamenInstelling {
      ...ExamenInstellingFields
    }
  }
}
    ${LokatieFieldsFragmentDoc}
${VakgroepFieldsFragmentDoc}
${ExamenInstellingFieldsFragmentDoc}`;
export const CursusSessiesFieldsFragmentDoc = gql`
    fragment CursusSessiesFields on CursusSessie {
  CanUnRegister
  CourseId
  SpecialtyId
  CourseCode
  Title
  Date
  StartTime
  EndTime
  Price
  LocationName
  LocationAddress {
    Street
    HouseNr
    HouseNrExtension
    Zipcode
    City
    Email
    Website
  }
  Distance
  Competence
  Theme
  Organizer
  OrganizerEmail
  OrganizerPhone
  OrganizerWebsite
  PromoText
  Registered
  RegisteredDate
  SpecialtyWebsite
}
    `;
export const VakgroepDetailsFieldsFragmentDoc = gql`
    fragment VakgroepDetailsFields on Vakgroep {
  VakgroepID
  ContactgegevensID
  Naam
  Code
  Contactgegevens {
    ContactgegevensID
    Adresregel1
    Adresregel2
    Huisnummer
    HuisnummerToevoeging
    Postcode
    Woonplaats
    DisplayAddress
    DisplayPostalCodeCity
    Email
    Telefoon
    Website
  }
}
    `;
export const HandelshuisVestigingDetailsFieldsFragmentDoc = gql`
    fragment HandelshuisVestigingDetailsFields on HandelshuisVestiging {
  HandelshuisVestigingID
  ContactgegevensID
  Naam
  Code
  Contactgegevens {
    ContactgegevensID
    Adresregel1
    Adresregel2
    Huisnummer
    HuisnummerToevoeging
    Postcode
    Woonplaats
    DisplayAddress
    DisplayPostalCodeCity
    Email
    Telefoon
    Website
  }
}
    `;
export const SpecialtyDetailsFieldsFragmentDoc = gql`
    fragment SpecialtyDetailsFields on SearchSpecialtyResult {
  SpecialtyId
  Code
  Title
  Price
  Competence
  Theme
  Organizer
  OrganizerEmail
  OrganizerPhone
  OrganizerWebsite
  PromoText
  SpecialtyWebsite
}
    `;
export const App_GetMyDocument = gql`
    query App_getMy {
  my {
    personId
    Roles
    Persoon {
      PersoonID
      Geboortedatum
      FullName
      Geslacht
      IsGbaGeregistreerd
      Contactgegevens {
        ...MyContactgegevensFields
      }
    }
    Certificeringen(inclusiefPassen: true) {
      ...CertificeringenFields
    }
  }
}
    ${MyContactgegevensFieldsFragmentDoc}
${CertificeringenFieldsFragmentDoc}`;

/**
 * __useApp_GetMyQuery__
 *
 * To run a query within a React component, call `useApp_GetMyQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetMyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetMyQuery({
 *   variables: {
 *   },
 * });
 */
export function useApp_GetMyQuery(baseOptions?: Apollo.QueryHookOptions<App_GetMyQuery, App_GetMyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetMyQuery, App_GetMyQueryVariables>(App_GetMyDocument, options);
      }
export function useApp_GetMyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetMyQuery, App_GetMyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetMyQuery, App_GetMyQueryVariables>(App_GetMyDocument, options);
        }
export type App_GetMyQueryHookResult = ReturnType<typeof useApp_GetMyQuery>;
export type App_GetMyLazyQueryHookResult = ReturnType<typeof useApp_GetMyLazyQuery>;
export type App_GetMyQueryResult = Apollo.QueryResult<App_GetMyQuery, App_GetMyQueryVariables>;
export const App_AuthenticateDocument = gql`
    mutation App_Authenticate($input: AuthenticateInput!) {
  authenticate(input: $input) {
    Persoon {
      PersoonID
      Achternaam
      Geboortedatum
      Voorletters
    }
    roles
    accessToken
    refreshToken
  }
}
    `;
export type App_AuthenticateMutationFn = Apollo.MutationFunction<App_AuthenticateMutation, App_AuthenticateMutationVariables>;

/**
 * __useApp_AuthenticateMutation__
 *
 * To run a mutation, you first call `useApp_AuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_AuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appAuthenticateMutation, { data, loading, error }] = useApp_AuthenticateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_AuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<App_AuthenticateMutation, App_AuthenticateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_AuthenticateMutation, App_AuthenticateMutationVariables>(App_AuthenticateDocument, options);
      }
export type App_AuthenticateMutationHookResult = ReturnType<typeof useApp_AuthenticateMutation>;
export type App_AuthenticateMutationResult = Apollo.MutationResult<App_AuthenticateMutation>;
export type App_AuthenticateMutationOptions = Apollo.BaseMutationOptions<App_AuthenticateMutation, App_AuthenticateMutationVariables>;
export const App_LogoutDocument = gql`
    mutation App_Logout {
  logout
}
    `;
export type App_LogoutMutationFn = Apollo.MutationFunction<App_LogoutMutation, App_LogoutMutationVariables>;

/**
 * __useApp_LogoutMutation__
 *
 * To run a mutation, you first call `useApp_LogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_LogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appLogoutMutation, { data, loading, error }] = useApp_LogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useApp_LogoutMutation(baseOptions?: Apollo.MutationHookOptions<App_LogoutMutation, App_LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_LogoutMutation, App_LogoutMutationVariables>(App_LogoutDocument, options);
      }
export type App_LogoutMutationHookResult = ReturnType<typeof useApp_LogoutMutation>;
export type App_LogoutMutationResult = Apollo.MutationResult<App_LogoutMutation>;
export type App_LogoutMutationOptions = Apollo.BaseMutationOptions<App_LogoutMutation, App_LogoutMutationVariables>;
export const App_GetStudyProgressByLicenseIdDocument = gql`
    query App_GetStudyProgressByLicenseId($certificeringId: Int!) {
  getStudyProgressByLicenseId(
    certificeringId: $certificeringId
    skipParticipationDetails: false
  ) {
    Certificering {
      ...CertificeringFields
    }
    ...StudyProgressFields
  }
}
    ${CertificeringFieldsFragmentDoc}
${StudyProgressFieldsFragmentDoc}`;

/**
 * __useApp_GetStudyProgressByLicenseIdQuery__
 *
 * To run a query within a React component, call `useApp_GetStudyProgressByLicenseIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetStudyProgressByLicenseIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetStudyProgressByLicenseIdQuery({
 *   variables: {
 *      certificeringId: // value for 'certificeringId'
 *   },
 * });
 */
export function useApp_GetStudyProgressByLicenseIdQuery(baseOptions: Apollo.QueryHookOptions<App_GetStudyProgressByLicenseIdQuery, App_GetStudyProgressByLicenseIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetStudyProgressByLicenseIdQuery, App_GetStudyProgressByLicenseIdQueryVariables>(App_GetStudyProgressByLicenseIdDocument, options);
      }
export function useApp_GetStudyProgressByLicenseIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetStudyProgressByLicenseIdQuery, App_GetStudyProgressByLicenseIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetStudyProgressByLicenseIdQuery, App_GetStudyProgressByLicenseIdQueryVariables>(App_GetStudyProgressByLicenseIdDocument, options);
        }
export type App_GetStudyProgressByLicenseIdQueryHookResult = ReturnType<typeof useApp_GetStudyProgressByLicenseIdQuery>;
export type App_GetStudyProgressByLicenseIdLazyQueryHookResult = ReturnType<typeof useApp_GetStudyProgressByLicenseIdLazyQuery>;
export type App_GetStudyProgressByLicenseIdQueryResult = Apollo.QueryResult<App_GetStudyProgressByLicenseIdQuery, App_GetStudyProgressByLicenseIdQueryVariables>;
export const App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesDocument = gql`
    query App_GetMyStudieresultatenEnAangemeldeCursusdeelnames($certificeringId: Int!) {
  my {
    personId
    Studieresultaten(certificeringId: $certificeringId, fullDetails: true) {
      StudieresultaatID
      Certificering {
        CertificeringID
        NummerWeergave
        CertificaatID
      }
      Cursus {
        ...CursusFields
      }
    }
    AangemeldeCursusDeelnamesPerCertificeringId(certificeringId: $certificeringId) {
      CursusDeelnameID
      Status
      Cursus {
        ...CursusFields
      }
    }
  }
}
    ${CursusFieldsFragmentDoc}`;

/**
 * __useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery__
 *
 * To run a query within a React component, call `useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery({
 *   variables: {
 *      certificeringId: // value for 'certificeringId'
 *   },
 * });
 */
export function useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery(baseOptions: Apollo.QueryHookOptions<App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery, App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery, App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQueryVariables>(App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesDocument, options);
      }
export function useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery, App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery, App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQueryVariables>(App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesDocument, options);
        }
export type App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQueryHookResult = ReturnType<typeof useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery>;
export type App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesLazyQueryHookResult = ReturnType<typeof useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesLazyQuery>;
export type App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQueryResult = Apollo.QueryResult<App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery, App_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQueryVariables>;
export const App_UpdateContactgegevensDocument = gql`
    mutation App_updateContactgegevens($input: updateContactgegevensInput!) {
  updateContactgegevens(input: $input) {
    ContactgegevensID
    Email
    EmailWerkgever
    Telefoon
  }
}
    `;
export type App_UpdateContactgegevensMutationFn = Apollo.MutationFunction<App_UpdateContactgegevensMutation, App_UpdateContactgegevensMutationVariables>;

/**
 * __useApp_UpdateContactgegevensMutation__
 *
 * To run a mutation, you first call `useApp_UpdateContactgegevensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_UpdateContactgegevensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appUpdateContactgegevensMutation, { data, loading, error }] = useApp_UpdateContactgegevensMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_UpdateContactgegevensMutation(baseOptions?: Apollo.MutationHookOptions<App_UpdateContactgegevensMutation, App_UpdateContactgegevensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_UpdateContactgegevensMutation, App_UpdateContactgegevensMutationVariables>(App_UpdateContactgegevensDocument, options);
      }
export type App_UpdateContactgegevensMutationHookResult = ReturnType<typeof useApp_UpdateContactgegevensMutation>;
export type App_UpdateContactgegevensMutationResult = Apollo.MutationResult<App_UpdateContactgegevensMutation>;
export type App_UpdateContactgegevensMutationOptions = Apollo.BaseMutationOptions<App_UpdateContactgegevensMutation, App_UpdateContactgegevensMutationVariables>;
export const App_GetCursusSessiesDocument = gql`
    query App_GetCursusSessies($input: searchCourseSessionsInput!) {
  CursusSessies(input: $input) {
    ...CursusSessiesFields
  }
}
    ${CursusSessiesFieldsFragmentDoc}`;

/**
 * __useApp_GetCursusSessiesQuery__
 *
 * To run a query within a React component, call `useApp_GetCursusSessiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetCursusSessiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetCursusSessiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetCursusSessiesQuery(baseOptions: Apollo.QueryHookOptions<App_GetCursusSessiesQuery, App_GetCursusSessiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetCursusSessiesQuery, App_GetCursusSessiesQueryVariables>(App_GetCursusSessiesDocument, options);
      }
export function useApp_GetCursusSessiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetCursusSessiesQuery, App_GetCursusSessiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetCursusSessiesQuery, App_GetCursusSessiesQueryVariables>(App_GetCursusSessiesDocument, options);
        }
export type App_GetCursusSessiesQueryHookResult = ReturnType<typeof useApp_GetCursusSessiesQuery>;
export type App_GetCursusSessiesLazyQueryHookResult = ReturnType<typeof useApp_GetCursusSessiesLazyQuery>;
export type App_GetCursusSessiesQueryResult = Apollo.QueryResult<App_GetCursusSessiesQuery, App_GetCursusSessiesQueryVariables>;
export const App_GetCursusSessiesDetailsNoLicenseDocument = gql`
    query App_GetCursusSessiesDetailsNoLicense($input: searchCourseSessionsInput!) {
  CursusSessies(input: $input) {
    CanUnRegister
    CourseId
    SpecialtyId
    CourseCode
    Title
    Date
    StartTime
    EndTime
    Price
    LocationName
    LocationAddress {
      Street
      HouseNr
      HouseNrExtension
      Zipcode
      City
      Email
      Website
    }
    Distance
    Competence
    Theme
    Organizer
    OrganizerEmail
    OrganizerPhone
    OrganizerWebsite
    PromoText
    Registered
    RegisteredDate
    SpecialtyWebsite
  }
}
    `;

/**
 * __useApp_GetCursusSessiesDetailsNoLicenseQuery__
 *
 * To run a query within a React component, call `useApp_GetCursusSessiesDetailsNoLicenseQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetCursusSessiesDetailsNoLicenseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetCursusSessiesDetailsNoLicenseQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetCursusSessiesDetailsNoLicenseQuery(baseOptions: Apollo.QueryHookOptions<App_GetCursusSessiesDetailsNoLicenseQuery, App_GetCursusSessiesDetailsNoLicenseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetCursusSessiesDetailsNoLicenseQuery, App_GetCursusSessiesDetailsNoLicenseQueryVariables>(App_GetCursusSessiesDetailsNoLicenseDocument, options);
      }
export function useApp_GetCursusSessiesDetailsNoLicenseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetCursusSessiesDetailsNoLicenseQuery, App_GetCursusSessiesDetailsNoLicenseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetCursusSessiesDetailsNoLicenseQuery, App_GetCursusSessiesDetailsNoLicenseQueryVariables>(App_GetCursusSessiesDetailsNoLicenseDocument, options);
        }
export type App_GetCursusSessiesDetailsNoLicenseQueryHookResult = ReturnType<typeof useApp_GetCursusSessiesDetailsNoLicenseQuery>;
export type App_GetCursusSessiesDetailsNoLicenseLazyQueryHookResult = ReturnType<typeof useApp_GetCursusSessiesDetailsNoLicenseLazyQuery>;
export type App_GetCursusSessiesDetailsNoLicenseQueryResult = Apollo.QueryResult<App_GetCursusSessiesDetailsNoLicenseQuery, App_GetCursusSessiesDetailsNoLicenseQueryVariables>;
export const App_GetCursusSessiesDetailsDocument = gql`
    query App_GetCursusSessiesDetails($input: searchCourseSessionsInput!, $inputCheck: isLicenseValidForSpecialtyInput!) {
  CursusSessies(input: $input) {
    CanUnRegister
    CourseId
    SpecialtyId
    CourseCode
    Title
    Date
    StartTime
    EndTime
    Price
    LocationName
    LocationAddress {
      Street
      HouseNr
      HouseNrExtension
      Zipcode
      City
      Email
      Website
    }
    Distance
    Competence
    Theme
    Organizer
    OrganizerEmail
    OrganizerPhone
    OrganizerWebsite
    PromoText
    Registered
    RegisteredDate
    SpecialtyWebsite
  }
  isLicenseValidForSpecialty(input: $inputCheck) {
    success
  }
}
    `;

/**
 * __useApp_GetCursusSessiesDetailsQuery__
 *
 * To run a query within a React component, call `useApp_GetCursusSessiesDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetCursusSessiesDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetCursusSessiesDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      inputCheck: // value for 'inputCheck'
 *   },
 * });
 */
export function useApp_GetCursusSessiesDetailsQuery(baseOptions: Apollo.QueryHookOptions<App_GetCursusSessiesDetailsQuery, App_GetCursusSessiesDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetCursusSessiesDetailsQuery, App_GetCursusSessiesDetailsQueryVariables>(App_GetCursusSessiesDetailsDocument, options);
      }
export function useApp_GetCursusSessiesDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetCursusSessiesDetailsQuery, App_GetCursusSessiesDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetCursusSessiesDetailsQuery, App_GetCursusSessiesDetailsQueryVariables>(App_GetCursusSessiesDetailsDocument, options);
        }
export type App_GetCursusSessiesDetailsQueryHookResult = ReturnType<typeof useApp_GetCursusSessiesDetailsQuery>;
export type App_GetCursusSessiesDetailsLazyQueryHookResult = ReturnType<typeof useApp_GetCursusSessiesDetailsLazyQuery>;
export type App_GetCursusSessiesDetailsQueryResult = Apollo.QueryResult<App_GetCursusSessiesDetailsQuery, App_GetCursusSessiesDetailsQueryVariables>;
export const App_GetSearchSpecialtiesDocument = gql`
    query App_GetSearchSpecialties($input: searchSpecialtyInput!) {
  SearchSpecialties(input: $input) {
    SpecialtyId
    Code
    Title
    Price
    Competence
    Theme
    Organizer
    OrganizerEmail
    OrganizerPhone
    OrganizerWebsite
    PromoText
    SpecialtyWebsite
  }
}
    `;

/**
 * __useApp_GetSearchSpecialtiesQuery__
 *
 * To run a query within a React component, call `useApp_GetSearchSpecialtiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetSearchSpecialtiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetSearchSpecialtiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetSearchSpecialtiesQuery(baseOptions: Apollo.QueryHookOptions<App_GetSearchSpecialtiesQuery, App_GetSearchSpecialtiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetSearchSpecialtiesQuery, App_GetSearchSpecialtiesQueryVariables>(App_GetSearchSpecialtiesDocument, options);
      }
export function useApp_GetSearchSpecialtiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetSearchSpecialtiesQuery, App_GetSearchSpecialtiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetSearchSpecialtiesQuery, App_GetSearchSpecialtiesQueryVariables>(App_GetSearchSpecialtiesDocument, options);
        }
export type App_GetSearchSpecialtiesQueryHookResult = ReturnType<typeof useApp_GetSearchSpecialtiesQuery>;
export type App_GetSearchSpecialtiesLazyQueryHookResult = ReturnType<typeof useApp_GetSearchSpecialtiesLazyQuery>;
export type App_GetSearchSpecialtiesQueryResult = Apollo.QueryResult<App_GetSearchSpecialtiesQuery, App_GetSearchSpecialtiesQueryVariables>;
export const App_VakgroepenDocument = gql`
    query App_Vakgroepen($input: Int) {
  Vakgroepen(findById: $input, isActive: true) {
    VakgroepID
    ContactgegevensID
    Naam
    IsBtwPlichtig
    Code
    IsActief
    Contactgegevens {
      ContactgegevensID
      Woonplaats
    }
  }
}
    `;

/**
 * __useApp_VakgroepenQuery__
 *
 * To run a query within a React component, call `useApp_VakgroepenQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_VakgroepenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_VakgroepenQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_VakgroepenQuery(baseOptions?: Apollo.QueryHookOptions<App_VakgroepenQuery, App_VakgroepenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_VakgroepenQuery, App_VakgroepenQueryVariables>(App_VakgroepenDocument, options);
      }
export function useApp_VakgroepenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_VakgroepenQuery, App_VakgroepenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_VakgroepenQuery, App_VakgroepenQueryVariables>(App_VakgroepenDocument, options);
        }
export type App_VakgroepenQueryHookResult = ReturnType<typeof useApp_VakgroepenQuery>;
export type App_VakgroepenLazyQueryHookResult = ReturnType<typeof useApp_VakgroepenLazyQuery>;
export type App_VakgroepenQueryResult = Apollo.QueryResult<App_VakgroepenQuery, App_VakgroepenQueryVariables>;
export const App_VakgroepDetailsDocument = gql`
    query App_VakgroepDetails($input: Int!) {
  Vakgroepen(findById: $input) {
    ...VakgroepDetailsFields
  }
}
    ${VakgroepDetailsFieldsFragmentDoc}`;

/**
 * __useApp_VakgroepDetailsQuery__
 *
 * To run a query within a React component, call `useApp_VakgroepDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_VakgroepDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_VakgroepDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_VakgroepDetailsQuery(baseOptions: Apollo.QueryHookOptions<App_VakgroepDetailsQuery, App_VakgroepDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_VakgroepDetailsQuery, App_VakgroepDetailsQueryVariables>(App_VakgroepDetailsDocument, options);
      }
export function useApp_VakgroepDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_VakgroepDetailsQuery, App_VakgroepDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_VakgroepDetailsQuery, App_VakgroepDetailsQueryVariables>(App_VakgroepDetailsDocument, options);
        }
export type App_VakgroepDetailsQueryHookResult = ReturnType<typeof useApp_VakgroepDetailsQuery>;
export type App_VakgroepDetailsLazyQueryHookResult = ReturnType<typeof useApp_VakgroepDetailsLazyQuery>;
export type App_VakgroepDetailsQueryResult = Apollo.QueryResult<App_VakgroepDetailsQuery, App_VakgroepDetailsQueryVariables>;
export const App_GetPersoonVakgroepenDocument = gql`
    query App_GetPersoonVakgroepen {
  GetPersoonVakgroepenForPersoonId {
    PersoonVakgroepID
    PersoonID
    VakgroepID
    DebiteurNr
    Vakgroep {
      VakgroepID
      Naam
      Contactgegevens {
        ContactgegevensID
        Adresregel1
        Adresregel2
        Postcode
        Woonplaats
        Email
        Telefoon
        Website
      }
    }
  }
}
    `;

/**
 * __useApp_GetPersoonVakgroepenQuery__
 *
 * To run a query within a React component, call `useApp_GetPersoonVakgroepenQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetPersoonVakgroepenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetPersoonVakgroepenQuery({
 *   variables: {
 *   },
 * });
 */
export function useApp_GetPersoonVakgroepenQuery(baseOptions?: Apollo.QueryHookOptions<App_GetPersoonVakgroepenQuery, App_GetPersoonVakgroepenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetPersoonVakgroepenQuery, App_GetPersoonVakgroepenQueryVariables>(App_GetPersoonVakgroepenDocument, options);
      }
export function useApp_GetPersoonVakgroepenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetPersoonVakgroepenQuery, App_GetPersoonVakgroepenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetPersoonVakgroepenQuery, App_GetPersoonVakgroepenQueryVariables>(App_GetPersoonVakgroepenDocument, options);
        }
export type App_GetPersoonVakgroepenQueryHookResult = ReturnType<typeof useApp_GetPersoonVakgroepenQuery>;
export type App_GetPersoonVakgroepenLazyQueryHookResult = ReturnType<typeof useApp_GetPersoonVakgroepenLazyQuery>;
export type App_GetPersoonVakgroepenQueryResult = Apollo.QueryResult<App_GetPersoonVakgroepenQuery, App_GetPersoonVakgroepenQueryVariables>;
export const App_GetHandelshuisVestigingenDocument = gql`
    query App_GetHandelshuisVestigingen($input: Int) {
  GetHandelshuisVestigingen(findById: $input) {
    HandelshuisID
    HandelshuisVestigingID
    ContactgegevensID
    Naam
    IsBtwPlichtig
    Code
    IsActief
    CdgBedrijfId
    CdgNevenvestigingId
    CDGdeelnemer
    VKLHandel
    IsHoofdVestiging
    Contactgegevens {
      ContactgegevensID
      Woonplaats
    }
  }
}
    `;

/**
 * __useApp_GetHandelshuisVestigingenQuery__
 *
 * To run a query within a React component, call `useApp_GetHandelshuisVestigingenQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetHandelshuisVestigingenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetHandelshuisVestigingenQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetHandelshuisVestigingenQuery(baseOptions?: Apollo.QueryHookOptions<App_GetHandelshuisVestigingenQuery, App_GetHandelshuisVestigingenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetHandelshuisVestigingenQuery, App_GetHandelshuisVestigingenQueryVariables>(App_GetHandelshuisVestigingenDocument, options);
      }
export function useApp_GetHandelshuisVestigingenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetHandelshuisVestigingenQuery, App_GetHandelshuisVestigingenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetHandelshuisVestigingenQuery, App_GetHandelshuisVestigingenQueryVariables>(App_GetHandelshuisVestigingenDocument, options);
        }
export type App_GetHandelshuisVestigingenQueryHookResult = ReturnType<typeof useApp_GetHandelshuisVestigingenQuery>;
export type App_GetHandelshuisVestigingenLazyQueryHookResult = ReturnType<typeof useApp_GetHandelshuisVestigingenLazyQuery>;
export type App_GetHandelshuisVestigingenQueryResult = Apollo.QueryResult<App_GetHandelshuisVestigingenQuery, App_GetHandelshuisVestigingenQueryVariables>;
export const App_GetHandelshuisVestigingDetailsDocument = gql`
    query App_GetHandelshuisVestigingDetails($input: Int!) {
  GetHandelshuisVestigingen(findById: $input) {
    ...HandelshuisVestigingDetailsFields
  }
}
    ${HandelshuisVestigingDetailsFieldsFragmentDoc}`;

/**
 * __useApp_GetHandelshuisVestigingDetailsQuery__
 *
 * To run a query within a React component, call `useApp_GetHandelshuisVestigingDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetHandelshuisVestigingDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetHandelshuisVestigingDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetHandelshuisVestigingDetailsQuery(baseOptions: Apollo.QueryHookOptions<App_GetHandelshuisVestigingDetailsQuery, App_GetHandelshuisVestigingDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetHandelshuisVestigingDetailsQuery, App_GetHandelshuisVestigingDetailsQueryVariables>(App_GetHandelshuisVestigingDetailsDocument, options);
      }
export function useApp_GetHandelshuisVestigingDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetHandelshuisVestigingDetailsQuery, App_GetHandelshuisVestigingDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetHandelshuisVestigingDetailsQuery, App_GetHandelshuisVestigingDetailsQueryVariables>(App_GetHandelshuisVestigingDetailsDocument, options);
        }
export type App_GetHandelshuisVestigingDetailsQueryHookResult = ReturnType<typeof useApp_GetHandelshuisVestigingDetailsQuery>;
export type App_GetHandelshuisVestigingDetailsLazyQueryHookResult = ReturnType<typeof useApp_GetHandelshuisVestigingDetailsLazyQuery>;
export type App_GetHandelshuisVestigingDetailsQueryResult = Apollo.QueryResult<App_GetHandelshuisVestigingDetailsQuery, App_GetHandelshuisVestigingDetailsQueryVariables>;
export const App_GetPersoonHandelshuisVestigingenDocument = gql`
    query App_GetPersoonHandelshuisVestigingen {
  GetPersoonHandelshuisvestigingenForPersoonId {
    PersoonHandelshuisVestigingID
    PersoonID
    HandelshuisVestigingID
    DebiteurNr
    HandelshuisVestiging {
      HandelshuisVestigingID
      Naam
      Contactgegevens {
        ContactgegevensID
        Adresregel1
        Adresregel2
        Postcode
        Woonplaats
        Email
        Telefoon
        Website
      }
    }
  }
}
    `;

/**
 * __useApp_GetPersoonHandelshuisVestigingenQuery__
 *
 * To run a query within a React component, call `useApp_GetPersoonHandelshuisVestigingenQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetPersoonHandelshuisVestigingenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetPersoonHandelshuisVestigingenQuery({
 *   variables: {
 *   },
 * });
 */
export function useApp_GetPersoonHandelshuisVestigingenQuery(baseOptions?: Apollo.QueryHookOptions<App_GetPersoonHandelshuisVestigingenQuery, App_GetPersoonHandelshuisVestigingenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetPersoonHandelshuisVestigingenQuery, App_GetPersoonHandelshuisVestigingenQueryVariables>(App_GetPersoonHandelshuisVestigingenDocument, options);
      }
export function useApp_GetPersoonHandelshuisVestigingenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetPersoonHandelshuisVestigingenQuery, App_GetPersoonHandelshuisVestigingenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetPersoonHandelshuisVestigingenQuery, App_GetPersoonHandelshuisVestigingenQueryVariables>(App_GetPersoonHandelshuisVestigingenDocument, options);
        }
export type App_GetPersoonHandelshuisVestigingenQueryHookResult = ReturnType<typeof useApp_GetPersoonHandelshuisVestigingenQuery>;
export type App_GetPersoonHandelshuisVestigingenLazyQueryHookResult = ReturnType<typeof useApp_GetPersoonHandelshuisVestigingenLazyQuery>;
export type App_GetPersoonHandelshuisVestigingenQueryResult = Apollo.QueryResult<App_GetPersoonHandelshuisVestigingenQuery, App_GetPersoonHandelshuisVestigingenQueryVariables>;
export const App_GetCursusSessiesForHoogleraarDocument = gql`
    query App_GetCursusSessiesForHoogleraar($input: cursusSessiesForHoogleraarInput) {
  GetCursusSessiesForHoogleraar(input: $input) {
    SessieID
    CursusID
    DatumBegintijd
    DatumEindtijd
    Cursus {
      CursusID
      Titel
      IsBesloten
      CursusCode
    }
    Lokatie {
      LokatieID
      Naam
      Contactgegevens {
        ContactgegevensID
        Woonplaats
      }
    }
  }
}
    `;

/**
 * __useApp_GetCursusSessiesForHoogleraarQuery__
 *
 * To run a query within a React component, call `useApp_GetCursusSessiesForHoogleraarQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetCursusSessiesForHoogleraarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetCursusSessiesForHoogleraarQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetCursusSessiesForHoogleraarQuery(baseOptions?: Apollo.QueryHookOptions<App_GetCursusSessiesForHoogleraarQuery, App_GetCursusSessiesForHoogleraarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetCursusSessiesForHoogleraarQuery, App_GetCursusSessiesForHoogleraarQueryVariables>(App_GetCursusSessiesForHoogleraarDocument, options);
      }
export function useApp_GetCursusSessiesForHoogleraarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetCursusSessiesForHoogleraarQuery, App_GetCursusSessiesForHoogleraarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetCursusSessiesForHoogleraarQuery, App_GetCursusSessiesForHoogleraarQueryVariables>(App_GetCursusSessiesForHoogleraarDocument, options);
        }
export type App_GetCursusSessiesForHoogleraarQueryHookResult = ReturnType<typeof useApp_GetCursusSessiesForHoogleraarQuery>;
export type App_GetCursusSessiesForHoogleraarLazyQueryHookResult = ReturnType<typeof useApp_GetCursusSessiesForHoogleraarLazyQuery>;
export type App_GetCursusSessiesForHoogleraarQueryResult = Apollo.QueryResult<App_GetCursusSessiesForHoogleraarQuery, App_GetCursusSessiesForHoogleraarQueryVariables>;
export const App_GetCursusInfoForHoogleraarDocument = gql`
    query App_GetCursusInfoForHoogleraar($input: getCursusInfoForHoogleraarInput) {
  GetCursusInfoForHoogleraar(input: $input) {
    CursusID
    Titel
    IsBesloten
    CursusCode
    Prijs
    Promotietekst
    Vak {
      VakID
      ThemaNaam
      CompetentieNaam
    }
    Sessies {
      SessieID
      DatumBegintijd
      DatumEindtijd
      Lokatie {
        LokatieID
        Naam
        Contactgegevens {
          ContactgegevensID
          DisplayAddress
        }
      }
    }
  }
}
    `;

/**
 * __useApp_GetCursusInfoForHoogleraarQuery__
 *
 * To run a query within a React component, call `useApp_GetCursusInfoForHoogleraarQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetCursusInfoForHoogleraarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetCursusInfoForHoogleraarQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetCursusInfoForHoogleraarQuery(baseOptions?: Apollo.QueryHookOptions<App_GetCursusInfoForHoogleraarQuery, App_GetCursusInfoForHoogleraarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetCursusInfoForHoogleraarQuery, App_GetCursusInfoForHoogleraarQueryVariables>(App_GetCursusInfoForHoogleraarDocument, options);
      }
export function useApp_GetCursusInfoForHoogleraarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetCursusInfoForHoogleraarQuery, App_GetCursusInfoForHoogleraarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetCursusInfoForHoogleraarQuery, App_GetCursusInfoForHoogleraarQueryVariables>(App_GetCursusInfoForHoogleraarDocument, options);
        }
export type App_GetCursusInfoForHoogleraarQueryHookResult = ReturnType<typeof useApp_GetCursusInfoForHoogleraarQuery>;
export type App_GetCursusInfoForHoogleraarLazyQueryHookResult = ReturnType<typeof useApp_GetCursusInfoForHoogleraarLazyQuery>;
export type App_GetCursusInfoForHoogleraarQueryResult = Apollo.QueryResult<App_GetCursusInfoForHoogleraarQuery, App_GetCursusInfoForHoogleraarQueryVariables>;
export const App_GetCursusDeelnemersDocument = gql`
    query App_GetCursusDeelnemers($input: getCursusDeelnemersInput) {
  GetCursusDeelnemers(input: $input) {
    CursusDeelnameID
    Status
    Persoon {
      PersoonID
      Voorletters
      Achternaam
      Tussenvoegsel
      SortableFullName
      Geboortedatum
      Geslacht
    }
  }
}
    `;

/**
 * __useApp_GetCursusDeelnemersQuery__
 *
 * To run a query within a React component, call `useApp_GetCursusDeelnemersQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetCursusDeelnemersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetCursusDeelnemersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetCursusDeelnemersQuery(baseOptions?: Apollo.QueryHookOptions<App_GetCursusDeelnemersQuery, App_GetCursusDeelnemersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetCursusDeelnemersQuery, App_GetCursusDeelnemersQueryVariables>(App_GetCursusDeelnemersDocument, options);
      }
export function useApp_GetCursusDeelnemersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetCursusDeelnemersQuery, App_GetCursusDeelnemersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetCursusDeelnemersQuery, App_GetCursusDeelnemersQueryVariables>(App_GetCursusDeelnemersDocument, options);
        }
export type App_GetCursusDeelnemersQueryHookResult = ReturnType<typeof useApp_GetCursusDeelnemersQuery>;
export type App_GetCursusDeelnemersLazyQueryHookResult = ReturnType<typeof useApp_GetCursusDeelnemersLazyQuery>;
export type App_GetCursusDeelnemersQueryResult = Apollo.QueryResult<App_GetCursusDeelnemersQuery, App_GetCursusDeelnemersQueryVariables>;
export const App_SearchCursusDeelnemersDocument = gql`
    query App_SearchCursusDeelnemers($input: searchCursusDeelnemersInput) {
  SearchCursusDeelnemers(input: $input) {
    PersoonID
    BSN
    Voorletters
    Roepnaam
    Achternaam
    Tussenvoegsel
    SortableFullName
    Nationaliteit
    GbaNummer
    IsGbaGeregistreerd
    Geboortedatum
    Geslacht
    Actief
    GbaUpdate
    CursusDeelname {
      CursusDeelnameID
      Status
      Opmerkingen
      CertificeringID
    }
    Certificeringen {
      ...CertificeringenFields
    }
  }
}
    ${CertificeringenFieldsFragmentDoc}`;

/**
 * __useApp_SearchCursusDeelnemersQuery__
 *
 * To run a query within a React component, call `useApp_SearchCursusDeelnemersQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_SearchCursusDeelnemersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_SearchCursusDeelnemersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_SearchCursusDeelnemersQuery(baseOptions?: Apollo.QueryHookOptions<App_SearchCursusDeelnemersQuery, App_SearchCursusDeelnemersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_SearchCursusDeelnemersQuery, App_SearchCursusDeelnemersQueryVariables>(App_SearchCursusDeelnemersDocument, options);
      }
export function useApp_SearchCursusDeelnemersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_SearchCursusDeelnemersQuery, App_SearchCursusDeelnemersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_SearchCursusDeelnemersQuery, App_SearchCursusDeelnemersQueryVariables>(App_SearchCursusDeelnemersDocument, options);
        }
export type App_SearchCursusDeelnemersQueryHookResult = ReturnType<typeof useApp_SearchCursusDeelnemersQuery>;
export type App_SearchCursusDeelnemersLazyQueryHookResult = ReturnType<typeof useApp_SearchCursusDeelnemersLazyQuery>;
export type App_SearchCursusDeelnemersQueryResult = Apollo.QueryResult<App_SearchCursusDeelnemersQuery, App_SearchCursusDeelnemersQueryVariables>;
export const App_GetCursusDeelnemerDocument = gql`
    query App_GetCursusDeelnemer($input: getCursusDeelnemerInput) {
  GetCursusDeelnemer(input: $input) {
    PersoonID
    Geboortedatum
    FullName
    Geslacht
    IsGbaGeregistreerd
    Contactgegevens {
      ContactgegevensID
      DisplayAddress
    }
    CursusDeelname {
      CursusDeelnameID
      CursusID
      Status
    }
    Certificeringen {
      ...CertificeringenFields
    }
  }
}
    ${CertificeringenFieldsFragmentDoc}`;

/**
 * __useApp_GetCursusDeelnemerQuery__
 *
 * To run a query within a React component, call `useApp_GetCursusDeelnemerQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetCursusDeelnemerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetCursusDeelnemerQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetCursusDeelnemerQuery(baseOptions?: Apollo.QueryHookOptions<App_GetCursusDeelnemerQuery, App_GetCursusDeelnemerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetCursusDeelnemerQuery, App_GetCursusDeelnemerQueryVariables>(App_GetCursusDeelnemerDocument, options);
      }
export function useApp_GetCursusDeelnemerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetCursusDeelnemerQuery, App_GetCursusDeelnemerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetCursusDeelnemerQuery, App_GetCursusDeelnemerQueryVariables>(App_GetCursusDeelnemerDocument, options);
        }
export type App_GetCursusDeelnemerQueryHookResult = ReturnType<typeof useApp_GetCursusDeelnemerQuery>;
export type App_GetCursusDeelnemerLazyQueryHookResult = ReturnType<typeof useApp_GetCursusDeelnemerLazyQuery>;
export type App_GetCursusDeelnemerQueryResult = Apollo.QueryResult<App_GetCursusDeelnemerQuery, App_GetCursusDeelnemerQueryVariables>;
export const App_GetSpecialtyDetailsDocument = gql`
    query App_GetSpecialtyDetails($input: searchSpecialtyInput!, $inputCheck: isLicenseValidForSpecialtyInput!) {
  SearchSpecialties(input: $input) {
    ...SpecialtyDetailsFields
  }
  isLicenseValidForSpecialty(input: $inputCheck) {
    success
  }
}
    ${SpecialtyDetailsFieldsFragmentDoc}`;

/**
 * __useApp_GetSpecialtyDetailsQuery__
 *
 * To run a query within a React component, call `useApp_GetSpecialtyDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetSpecialtyDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetSpecialtyDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      inputCheck: // value for 'inputCheck'
 *   },
 * });
 */
export function useApp_GetSpecialtyDetailsQuery(baseOptions: Apollo.QueryHookOptions<App_GetSpecialtyDetailsQuery, App_GetSpecialtyDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetSpecialtyDetailsQuery, App_GetSpecialtyDetailsQueryVariables>(App_GetSpecialtyDetailsDocument, options);
      }
export function useApp_GetSpecialtyDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetSpecialtyDetailsQuery, App_GetSpecialtyDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetSpecialtyDetailsQuery, App_GetSpecialtyDetailsQueryVariables>(App_GetSpecialtyDetailsDocument, options);
        }
export type App_GetSpecialtyDetailsQueryHookResult = ReturnType<typeof useApp_GetSpecialtyDetailsQuery>;
export type App_GetSpecialtyDetailsLazyQueryHookResult = ReturnType<typeof useApp_GetSpecialtyDetailsLazyQuery>;
export type App_GetSpecialtyDetailsQueryResult = Apollo.QueryResult<App_GetSpecialtyDetailsQuery, App_GetSpecialtyDetailsQueryVariables>;
export const App_GetSpecialtyDetailsNoLicenseDocument = gql`
    query App_GetSpecialtyDetailsNoLicense($input: searchSpecialtyInput!) {
  SearchSpecialties(input: $input) {
    ...SpecialtyDetailsFields
  }
}
    ${SpecialtyDetailsFieldsFragmentDoc}`;

/**
 * __useApp_GetSpecialtyDetailsNoLicenseQuery__
 *
 * To run a query within a React component, call `useApp_GetSpecialtyDetailsNoLicenseQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetSpecialtyDetailsNoLicenseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetSpecialtyDetailsNoLicenseQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_GetSpecialtyDetailsNoLicenseQuery(baseOptions: Apollo.QueryHookOptions<App_GetSpecialtyDetailsNoLicenseQuery, App_GetSpecialtyDetailsNoLicenseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetSpecialtyDetailsNoLicenseQuery, App_GetSpecialtyDetailsNoLicenseQueryVariables>(App_GetSpecialtyDetailsNoLicenseDocument, options);
      }
export function useApp_GetSpecialtyDetailsNoLicenseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetSpecialtyDetailsNoLicenseQuery, App_GetSpecialtyDetailsNoLicenseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetSpecialtyDetailsNoLicenseQuery, App_GetSpecialtyDetailsNoLicenseQueryVariables>(App_GetSpecialtyDetailsNoLicenseDocument, options);
        }
export type App_GetSpecialtyDetailsNoLicenseQueryHookResult = ReturnType<typeof useApp_GetSpecialtyDetailsNoLicenseQuery>;
export type App_GetSpecialtyDetailsNoLicenseLazyQueryHookResult = ReturnType<typeof useApp_GetSpecialtyDetailsNoLicenseLazyQuery>;
export type App_GetSpecialtyDetailsNoLicenseQueryResult = Apollo.QueryResult<App_GetSpecialtyDetailsNoLicenseQuery, App_GetSpecialtyDetailsNoLicenseQueryVariables>;
export const App_GetKennisgebiedenDocument = gql`
    query App_GetKennisgebieden {
  Kennisgebieden {
    KennisgebiedID
    Naam
  }
}
    `;

/**
 * __useApp_GetKennisgebiedenQuery__
 *
 * To run a query within a React component, call `useApp_GetKennisgebiedenQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetKennisgebiedenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetKennisgebiedenQuery({
 *   variables: {
 *   },
 * });
 */
export function useApp_GetKennisgebiedenQuery(baseOptions?: Apollo.QueryHookOptions<App_GetKennisgebiedenQuery, App_GetKennisgebiedenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetKennisgebiedenQuery, App_GetKennisgebiedenQueryVariables>(App_GetKennisgebiedenDocument, options);
      }
export function useApp_GetKennisgebiedenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetKennisgebiedenQuery, App_GetKennisgebiedenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetKennisgebiedenQuery, App_GetKennisgebiedenQueryVariables>(App_GetKennisgebiedenDocument, options);
        }
export type App_GetKennisgebiedenQueryHookResult = ReturnType<typeof useApp_GetKennisgebiedenQuery>;
export type App_GetKennisgebiedenLazyQueryHookResult = ReturnType<typeof useApp_GetKennisgebiedenLazyQuery>;
export type App_GetKennisgebiedenQueryResult = Apollo.QueryResult<App_GetKennisgebiedenQuery, App_GetKennisgebiedenQueryVariables>;
export const App_RegisterForCourseDocument = gql`
    mutation App_registerForCourse($input: registerForCourseInput!) {
  registerForCourse(input: $input) {
    success
    message
  }
}
    `;
export type App_RegisterForCourseMutationFn = Apollo.MutationFunction<App_RegisterForCourseMutation, App_RegisterForCourseMutationVariables>;

/**
 * __useApp_RegisterForCourseMutation__
 *
 * To run a mutation, you first call `useApp_RegisterForCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_RegisterForCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appRegisterForCourseMutation, { data, loading, error }] = useApp_RegisterForCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_RegisterForCourseMutation(baseOptions?: Apollo.MutationHookOptions<App_RegisterForCourseMutation, App_RegisterForCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_RegisterForCourseMutation, App_RegisterForCourseMutationVariables>(App_RegisterForCourseDocument, options);
      }
export type App_RegisterForCourseMutationHookResult = ReturnType<typeof useApp_RegisterForCourseMutation>;
export type App_RegisterForCourseMutationResult = Apollo.MutationResult<App_RegisterForCourseMutation>;
export type App_RegisterForCourseMutationOptions = Apollo.BaseMutationOptions<App_RegisterForCourseMutation, App_RegisterForCourseMutationVariables>;
export const App_RegisterForCourseByHoogleraarDocument = gql`
    mutation App_registerForCourseByHoogleraar($input: registerForCourseByHoogleraarInput!) {
  registerForCourseByHoogleraar(input: $input) {
    success
    message
  }
}
    `;
export type App_RegisterForCourseByHoogleraarMutationFn = Apollo.MutationFunction<App_RegisterForCourseByHoogleraarMutation, App_RegisterForCourseByHoogleraarMutationVariables>;

/**
 * __useApp_RegisterForCourseByHoogleraarMutation__
 *
 * To run a mutation, you first call `useApp_RegisterForCourseByHoogleraarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_RegisterForCourseByHoogleraarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appRegisterForCourseByHoogleraarMutation, { data, loading, error }] = useApp_RegisterForCourseByHoogleraarMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_RegisterForCourseByHoogleraarMutation(baseOptions?: Apollo.MutationHookOptions<App_RegisterForCourseByHoogleraarMutation, App_RegisterForCourseByHoogleraarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_RegisterForCourseByHoogleraarMutation, App_RegisterForCourseByHoogleraarMutationVariables>(App_RegisterForCourseByHoogleraarDocument, options);
      }
export type App_RegisterForCourseByHoogleraarMutationHookResult = ReturnType<typeof useApp_RegisterForCourseByHoogleraarMutation>;
export type App_RegisterForCourseByHoogleraarMutationResult = Apollo.MutationResult<App_RegisterForCourseByHoogleraarMutation>;
export type App_RegisterForCourseByHoogleraarMutationOptions = Apollo.BaseMutationOptions<App_RegisterForCourseByHoogleraarMutation, App_RegisterForCourseByHoogleraarMutationVariables>;
export const App_UnRegisterForCourseByCourseIdDocument = gql`
    mutation App_unRegisterForCourseByCourseId($input: unRegisterForCourseByCourseIdInput!) {
  unRegisterForCourseByCourseId(input: $input) {
    success
    message
  }
}
    `;
export type App_UnRegisterForCourseByCourseIdMutationFn = Apollo.MutationFunction<App_UnRegisterForCourseByCourseIdMutation, App_UnRegisterForCourseByCourseIdMutationVariables>;

/**
 * __useApp_UnRegisterForCourseByCourseIdMutation__
 *
 * To run a mutation, you first call `useApp_UnRegisterForCourseByCourseIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_UnRegisterForCourseByCourseIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appUnRegisterForCourseByCourseIdMutation, { data, loading, error }] = useApp_UnRegisterForCourseByCourseIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_UnRegisterForCourseByCourseIdMutation(baseOptions?: Apollo.MutationHookOptions<App_UnRegisterForCourseByCourseIdMutation, App_UnRegisterForCourseByCourseIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_UnRegisterForCourseByCourseIdMutation, App_UnRegisterForCourseByCourseIdMutationVariables>(App_UnRegisterForCourseByCourseIdDocument, options);
      }
export type App_UnRegisterForCourseByCourseIdMutationHookResult = ReturnType<typeof useApp_UnRegisterForCourseByCourseIdMutation>;
export type App_UnRegisterForCourseByCourseIdMutationResult = Apollo.MutationResult<App_UnRegisterForCourseByCourseIdMutation>;
export type App_UnRegisterForCourseByCourseIdMutationOptions = Apollo.BaseMutationOptions<App_UnRegisterForCourseByCourseIdMutation, App_UnRegisterForCourseByCourseIdMutationVariables>;
export const App_UnregisterForCourseByHoogleraarDocument = gql`
    mutation App_unregisterForCourseByHoogleraar($input: unregisterForCourseByHoogleraarInput!) {
  unregisterForCourseByHoogleraar(input: $input) {
    success
    message
  }
}
    `;
export type App_UnregisterForCourseByHoogleraarMutationFn = Apollo.MutationFunction<App_UnregisterForCourseByHoogleraarMutation, App_UnregisterForCourseByHoogleraarMutationVariables>;

/**
 * __useApp_UnregisterForCourseByHoogleraarMutation__
 *
 * To run a mutation, you first call `useApp_UnregisterForCourseByHoogleraarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_UnregisterForCourseByHoogleraarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appUnregisterForCourseByHoogleraarMutation, { data, loading, error }] = useApp_UnregisterForCourseByHoogleraarMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_UnregisterForCourseByHoogleraarMutation(baseOptions?: Apollo.MutationHookOptions<App_UnregisterForCourseByHoogleraarMutation, App_UnregisterForCourseByHoogleraarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_UnregisterForCourseByHoogleraarMutation, App_UnregisterForCourseByHoogleraarMutationVariables>(App_UnregisterForCourseByHoogleraarDocument, options);
      }
export type App_UnregisterForCourseByHoogleraarMutationHookResult = ReturnType<typeof useApp_UnregisterForCourseByHoogleraarMutation>;
export type App_UnregisterForCourseByHoogleraarMutationResult = Apollo.MutationResult<App_UnregisterForCourseByHoogleraarMutation>;
export type App_UnregisterForCourseByHoogleraarMutationOptions = Apollo.BaseMutationOptions<App_UnregisterForCourseByHoogleraarMutation, App_UnregisterForCourseByHoogleraarMutationVariables>;
export const App_GetListsDocument = gql`
    query App_getLists {
  Themas {
    ThemaID
    Naam
  }
  Competenties {
    CompetentieID
    Naam
  }
  Kennisgebieden {
    KennisgebiedID
    Naam
  }
  Landen {
    Value
    Text
  }
}
    `;

/**
 * __useApp_GetListsQuery__
 *
 * To run a query within a React component, call `useApp_GetListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useApp_GetListsQuery(baseOptions?: Apollo.QueryHookOptions<App_GetListsQuery, App_GetListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetListsQuery, App_GetListsQueryVariables>(App_GetListsDocument, options);
      }
export function useApp_GetListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetListsQuery, App_GetListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetListsQuery, App_GetListsQueryVariables>(App_GetListsDocument, options);
        }
export type App_GetListsQueryHookResult = ReturnType<typeof useApp_GetListsQuery>;
export type App_GetListsLazyQueryHookResult = ReturnType<typeof useApp_GetListsLazyQuery>;
export type App_GetListsQueryResult = Apollo.QueryResult<App_GetListsQuery, App_GetListsQueryVariables>;
export const App_InsertPersoonHandelshuisvestigingForPersoonIdDocument = gql`
    mutation App_InsertPersoonHandelshuisvestigingForPersoonId($input: InsertPersoonHandelshuisvestigingForPersoonIdInput!) {
  InsertPersoonHandelshuisvestigingForPersoonId(input: $input) {
    PersoonHandelshuisVestigingID
    PersoonID
    HandelshuisVestigingID
    DebiteurNr
  }
}
    `;
export type App_InsertPersoonHandelshuisvestigingForPersoonIdMutationFn = Apollo.MutationFunction<App_InsertPersoonHandelshuisvestigingForPersoonIdMutation, App_InsertPersoonHandelshuisvestigingForPersoonIdMutationVariables>;

/**
 * __useApp_InsertPersoonHandelshuisvestigingForPersoonIdMutation__
 *
 * To run a mutation, you first call `useApp_InsertPersoonHandelshuisvestigingForPersoonIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_InsertPersoonHandelshuisvestigingForPersoonIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appInsertPersoonHandelshuisvestigingForPersoonIdMutation, { data, loading, error }] = useApp_InsertPersoonHandelshuisvestigingForPersoonIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_InsertPersoonHandelshuisvestigingForPersoonIdMutation(baseOptions?: Apollo.MutationHookOptions<App_InsertPersoonHandelshuisvestigingForPersoonIdMutation, App_InsertPersoonHandelshuisvestigingForPersoonIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_InsertPersoonHandelshuisvestigingForPersoonIdMutation, App_InsertPersoonHandelshuisvestigingForPersoonIdMutationVariables>(App_InsertPersoonHandelshuisvestigingForPersoonIdDocument, options);
      }
export type App_InsertPersoonHandelshuisvestigingForPersoonIdMutationHookResult = ReturnType<typeof useApp_InsertPersoonHandelshuisvestigingForPersoonIdMutation>;
export type App_InsertPersoonHandelshuisvestigingForPersoonIdMutationResult = Apollo.MutationResult<App_InsertPersoonHandelshuisvestigingForPersoonIdMutation>;
export type App_InsertPersoonHandelshuisvestigingForPersoonIdMutationOptions = Apollo.BaseMutationOptions<App_InsertPersoonHandelshuisvestigingForPersoonIdMutation, App_InsertPersoonHandelshuisvestigingForPersoonIdMutationVariables>;
export const App_UpdatePersoonHandelshuisvestigingForPersoonIdDocument = gql`
    mutation App_UpdatePersoonHandelshuisvestigingForPersoonId($input: UpdatePersoonHandelshuisvestigingForPersoonIdInput!) {
  UpdatePersoonHandelshuisvestigingForPersoonId(input: $input) {
    PersoonHandelshuisVestigingID
    PersoonID
    HandelshuisVestigingID
    DebiteurNr
  }
}
    `;
export type App_UpdatePersoonHandelshuisvestigingForPersoonIdMutationFn = Apollo.MutationFunction<App_UpdatePersoonHandelshuisvestigingForPersoonIdMutation, App_UpdatePersoonHandelshuisvestigingForPersoonIdMutationVariables>;

/**
 * __useApp_UpdatePersoonHandelshuisvestigingForPersoonIdMutation__
 *
 * To run a mutation, you first call `useApp_UpdatePersoonHandelshuisvestigingForPersoonIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_UpdatePersoonHandelshuisvestigingForPersoonIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appUpdatePersoonHandelshuisvestigingForPersoonIdMutation, { data, loading, error }] = useApp_UpdatePersoonHandelshuisvestigingForPersoonIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_UpdatePersoonHandelshuisvestigingForPersoonIdMutation(baseOptions?: Apollo.MutationHookOptions<App_UpdatePersoonHandelshuisvestigingForPersoonIdMutation, App_UpdatePersoonHandelshuisvestigingForPersoonIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_UpdatePersoonHandelshuisvestigingForPersoonIdMutation, App_UpdatePersoonHandelshuisvestigingForPersoonIdMutationVariables>(App_UpdatePersoonHandelshuisvestigingForPersoonIdDocument, options);
      }
export type App_UpdatePersoonHandelshuisvestigingForPersoonIdMutationHookResult = ReturnType<typeof useApp_UpdatePersoonHandelshuisvestigingForPersoonIdMutation>;
export type App_UpdatePersoonHandelshuisvestigingForPersoonIdMutationResult = Apollo.MutationResult<App_UpdatePersoonHandelshuisvestigingForPersoonIdMutation>;
export type App_UpdatePersoonHandelshuisvestigingForPersoonIdMutationOptions = Apollo.BaseMutationOptions<App_UpdatePersoonHandelshuisvestigingForPersoonIdMutation, App_UpdatePersoonHandelshuisvestigingForPersoonIdMutationVariables>;
export const App_DeletePersoonHandelshuisvestigingForPersoonIdDocument = gql`
    mutation App_DeletePersoonHandelshuisvestigingForPersoonId($input: DeletePersoonHandelshuisvestigingForPersoonIdInput!) {
  DeletePersoonHandelshuisvestigingForPersoonId(input: $input)
}
    `;
export type App_DeletePersoonHandelshuisvestigingForPersoonIdMutationFn = Apollo.MutationFunction<App_DeletePersoonHandelshuisvestigingForPersoonIdMutation, App_DeletePersoonHandelshuisvestigingForPersoonIdMutationVariables>;

/**
 * __useApp_DeletePersoonHandelshuisvestigingForPersoonIdMutation__
 *
 * To run a mutation, you first call `useApp_DeletePersoonHandelshuisvestigingForPersoonIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_DeletePersoonHandelshuisvestigingForPersoonIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appDeletePersoonHandelshuisvestigingForPersoonIdMutation, { data, loading, error }] = useApp_DeletePersoonHandelshuisvestigingForPersoonIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_DeletePersoonHandelshuisvestigingForPersoonIdMutation(baseOptions?: Apollo.MutationHookOptions<App_DeletePersoonHandelshuisvestigingForPersoonIdMutation, App_DeletePersoonHandelshuisvestigingForPersoonIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_DeletePersoonHandelshuisvestigingForPersoonIdMutation, App_DeletePersoonHandelshuisvestigingForPersoonIdMutationVariables>(App_DeletePersoonHandelshuisvestigingForPersoonIdDocument, options);
      }
export type App_DeletePersoonHandelshuisvestigingForPersoonIdMutationHookResult = ReturnType<typeof useApp_DeletePersoonHandelshuisvestigingForPersoonIdMutation>;
export type App_DeletePersoonHandelshuisvestigingForPersoonIdMutationResult = Apollo.MutationResult<App_DeletePersoonHandelshuisvestigingForPersoonIdMutation>;
export type App_DeletePersoonHandelshuisvestigingForPersoonIdMutationOptions = Apollo.BaseMutationOptions<App_DeletePersoonHandelshuisvestigingForPersoonIdMutation, App_DeletePersoonHandelshuisvestigingForPersoonIdMutationVariables>;
export const App_GetStudyProgressByLicenseNumberDocument = gql`
    query App_GetStudyProgressByLicenseNumber($nummerweergave: SafeString!) {
  getStudyProgressByLicenseNumber(nummerweergave: $nummerweergave) {
    Certificering {
      CertificeringID
      NummerWeergave
      Certificaat {
        CertificaatID
        Code
        Naam
      }
      BeginDatum
      EindDatum
      Status
      DatumIngetrokkenVan
      DatumIngetrokkenTot
      UitstelVerleend
      UitstelTot
      Persoon {
        PersoonID
        FullName
        Geboortedatum
      }
    }
  }
}
    `;

/**
 * __useApp_GetStudyProgressByLicenseNumberQuery__
 *
 * To run a query within a React component, call `useApp_GetStudyProgressByLicenseNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_GetStudyProgressByLicenseNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_GetStudyProgressByLicenseNumberQuery({
 *   variables: {
 *      nummerweergave: // value for 'nummerweergave'
 *   },
 * });
 */
export function useApp_GetStudyProgressByLicenseNumberQuery(baseOptions: Apollo.QueryHookOptions<App_GetStudyProgressByLicenseNumberQuery, App_GetStudyProgressByLicenseNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_GetStudyProgressByLicenseNumberQuery, App_GetStudyProgressByLicenseNumberQueryVariables>(App_GetStudyProgressByLicenseNumberDocument, options);
      }
export function useApp_GetStudyProgressByLicenseNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_GetStudyProgressByLicenseNumberQuery, App_GetStudyProgressByLicenseNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_GetStudyProgressByLicenseNumberQuery, App_GetStudyProgressByLicenseNumberQueryVariables>(App_GetStudyProgressByLicenseNumberDocument, options);
        }
export type App_GetStudyProgressByLicenseNumberQueryHookResult = ReturnType<typeof useApp_GetStudyProgressByLicenseNumberQuery>;
export type App_GetStudyProgressByLicenseNumberLazyQueryHookResult = ReturnType<typeof useApp_GetStudyProgressByLicenseNumberLazyQuery>;
export type App_GetStudyProgressByLicenseNumberQueryResult = Apollo.QueryResult<App_GetStudyProgressByLicenseNumberQuery, App_GetStudyProgressByLicenseNumberQueryVariables>;
export const App_InsertPersoonVakgroepForPersoonIdDocument = gql`
    mutation App_InsertPersoonVakgroepForPersoonId($input: InsertPersoonVakgroepForPersoonIdInput!) {
  InsertPersoonVakgroepForPersoonId(input: $input) {
    PersoonVakgroepID
    PersoonID
    VakgroepID
    DebiteurNr
  }
}
    `;
export type App_InsertPersoonVakgroepForPersoonIdMutationFn = Apollo.MutationFunction<App_InsertPersoonVakgroepForPersoonIdMutation, App_InsertPersoonVakgroepForPersoonIdMutationVariables>;

/**
 * __useApp_InsertPersoonVakgroepForPersoonIdMutation__
 *
 * To run a mutation, you first call `useApp_InsertPersoonVakgroepForPersoonIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_InsertPersoonVakgroepForPersoonIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appInsertPersoonVakgroepForPersoonIdMutation, { data, loading, error }] = useApp_InsertPersoonVakgroepForPersoonIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_InsertPersoonVakgroepForPersoonIdMutation(baseOptions?: Apollo.MutationHookOptions<App_InsertPersoonVakgroepForPersoonIdMutation, App_InsertPersoonVakgroepForPersoonIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_InsertPersoonVakgroepForPersoonIdMutation, App_InsertPersoonVakgroepForPersoonIdMutationVariables>(App_InsertPersoonVakgroepForPersoonIdDocument, options);
      }
export type App_InsertPersoonVakgroepForPersoonIdMutationHookResult = ReturnType<typeof useApp_InsertPersoonVakgroepForPersoonIdMutation>;
export type App_InsertPersoonVakgroepForPersoonIdMutationResult = Apollo.MutationResult<App_InsertPersoonVakgroepForPersoonIdMutation>;
export type App_InsertPersoonVakgroepForPersoonIdMutationOptions = Apollo.BaseMutationOptions<App_InsertPersoonVakgroepForPersoonIdMutation, App_InsertPersoonVakgroepForPersoonIdMutationVariables>;
export const App_UpdatePersoonVakgroepForPersoonIdDocument = gql`
    mutation App_UpdatePersoonVakgroepForPersoonId($input: UpdatePersoonVakgroepForPersoonIdInput!) {
  UpdatePersoonVakgroepForPersoonId(input: $input) {
    PersoonVakgroepID
    PersoonID
    VakgroepID
    DebiteurNr
  }
}
    `;
export type App_UpdatePersoonVakgroepForPersoonIdMutationFn = Apollo.MutationFunction<App_UpdatePersoonVakgroepForPersoonIdMutation, App_UpdatePersoonVakgroepForPersoonIdMutationVariables>;

/**
 * __useApp_UpdatePersoonVakgroepForPersoonIdMutation__
 *
 * To run a mutation, you first call `useApp_UpdatePersoonVakgroepForPersoonIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_UpdatePersoonVakgroepForPersoonIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appUpdatePersoonVakgroepForPersoonIdMutation, { data, loading, error }] = useApp_UpdatePersoonVakgroepForPersoonIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_UpdatePersoonVakgroepForPersoonIdMutation(baseOptions?: Apollo.MutationHookOptions<App_UpdatePersoonVakgroepForPersoonIdMutation, App_UpdatePersoonVakgroepForPersoonIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_UpdatePersoonVakgroepForPersoonIdMutation, App_UpdatePersoonVakgroepForPersoonIdMutationVariables>(App_UpdatePersoonVakgroepForPersoonIdDocument, options);
      }
export type App_UpdatePersoonVakgroepForPersoonIdMutationHookResult = ReturnType<typeof useApp_UpdatePersoonVakgroepForPersoonIdMutation>;
export type App_UpdatePersoonVakgroepForPersoonIdMutationResult = Apollo.MutationResult<App_UpdatePersoonVakgroepForPersoonIdMutation>;
export type App_UpdatePersoonVakgroepForPersoonIdMutationOptions = Apollo.BaseMutationOptions<App_UpdatePersoonVakgroepForPersoonIdMutation, App_UpdatePersoonVakgroepForPersoonIdMutationVariables>;
export const App_DeletePersoonVakgroepForPersoonIdDocument = gql`
    mutation App_DeletePersoonVakgroepForPersoonId($input: DeletePersoonVakgroepForPersoonIdInput!) {
  DeletePersoonVakgroepForPersoonId(input: $input)
}
    `;
export type App_DeletePersoonVakgroepForPersoonIdMutationFn = Apollo.MutationFunction<App_DeletePersoonVakgroepForPersoonIdMutation, App_DeletePersoonVakgroepForPersoonIdMutationVariables>;

/**
 * __useApp_DeletePersoonVakgroepForPersoonIdMutation__
 *
 * To run a mutation, you first call `useApp_DeletePersoonVakgroepForPersoonIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApp_DeletePersoonVakgroepForPersoonIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appDeletePersoonVakgroepForPersoonIdMutation, { data, loading, error }] = useApp_DeletePersoonVakgroepForPersoonIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApp_DeletePersoonVakgroepForPersoonIdMutation(baseOptions?: Apollo.MutationHookOptions<App_DeletePersoonVakgroepForPersoonIdMutation, App_DeletePersoonVakgroepForPersoonIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<App_DeletePersoonVakgroepForPersoonIdMutation, App_DeletePersoonVakgroepForPersoonIdMutationVariables>(App_DeletePersoonVakgroepForPersoonIdDocument, options);
      }
export type App_DeletePersoonVakgroepForPersoonIdMutationHookResult = ReturnType<typeof useApp_DeletePersoonVakgroepForPersoonIdMutation>;
export type App_DeletePersoonVakgroepForPersoonIdMutationResult = Apollo.MutationResult<App_DeletePersoonVakgroepForPersoonIdMutation>;
export type App_DeletePersoonVakgroepForPersoonIdMutationOptions = Apollo.BaseMutationOptions<App_DeletePersoonVakgroepForPersoonIdMutation, App_DeletePersoonVakgroepForPersoonIdMutationVariables>;