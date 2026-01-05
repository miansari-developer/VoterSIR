export interface VoterPayloadDTO {
  applicantFirstName?: string;
  applicantFirstNameL1?: string;
  applicantLastName?: string;
  applicantLastNameL1?: string;
  epicNumber?: string;
  partSerialNumber?: string;
  partNumber?: string;
  partName?: string;
  partNameL1?: string;
  acNumber?: string;
  asmblyName?: string;
  asmblyNameL1?: string;
  prlmntNo?: string;
  prlmntName?: string;
  prlmntNameL1?: string;
  stateName?: string;
  stateNameL1?: string;
  languageCd?: string;
  stateCd?: string;
  photo?: string;
  dob?: string;
  districtCd?: string;
  houseNumber?: string;
  passportNo?: string;
  emailId?: string;
  mobileNo?: string;
  createdBy?: string;
  createdDttm?: string;
  modifiedBy?: string;
  modifiedDttm?: string;
  documentUploadedFlag?: string;
  isMovedToDraft?: string;
  bloOverRiddenFlg?: string;
  submittedForRecommendation?: string;
  epicId?: string;
  erollAge?: number;
  bloName?: string;
  bloNo?: string;
  districtName?: string;
  ageStatusFlag?: string;
}

export class VoterPayload {
  private readonly data: VoterPayloadDTO;

  constructor(data: VoterPayloadDTO = {}) {
    this.data = data;
  }

  // -------- COMPUTED --------

  get fullName(): string {
    const first = this.data.applicantFirstName?.trim() ?? '';
    const last = this.data.applicantLastName?.trim() ?? '';
    return `${first}${last ? ' ' + last : ''}` || '-';
  }

  get fullNameLanguage(): string {
    const first = this.data.applicantFirstNameL1 ?? '';
    const last = this.data.applicantLastNameL1 ?? '';
    return `${first}${last ? ' ' + last : ''}`.trim() || '-';
  }

  get dateOfBirth(): string {
    return this.data.dob ? this.data.dob.split('-').reverse().join('-') : '-';
  }

  get isNotSubmittedInCat3(): boolean {
    return (
      this.data.submittedForRecommendation === 'Y' ||
      (this.data.createdBy === 'CITIZEN' && this.data.submittedForRecommendation == null)
    );
  }

  get isSubmittedInCat3(): boolean {
    return !this.isNotSubmittedInCat3;
  }

  // -------- RAW GETTERS --------

  get applicantFirstName() {
    return this.data.applicantFirstName;
  }
  get applicantFirstNameL1() {
    return this.data.applicantFirstNameL1;
  }
  get applicantLastName() {
    return this.data.applicantLastName;
  }
  get applicantLastNameL1() {
    return this.data.applicantLastNameL1;
  }
  get epicNumber() {
    return this.data.epicNumber;
  }
  get partSerialNumber() {
    return this.data.partSerialNumber;
  }
  get partNumber() {
    return this.data.partNumber;
  }
  get partName() {
    return this.data.partName;
  }
  get partNameL1() {
    return this.data.partNameL1;
  }
  get acNumber() {
    return this.data.acNumber;
  }
  get asmblyName() {
    return this.data.asmblyName;
  }
  get asmblyNameL1() {
    return this.data.asmblyNameL1;
  }
  get prlmntNo() {
    return this.data.prlmntNo;
  }
  get prlmntName() {
    return this.data.prlmntName;
  }
  get prlmntNameL1() {
    return this.data.prlmntNameL1;
  }
  get stateName() {
    return this.data.stateName;
  }
  get stateNameL1() {
    return this.data.stateNameL1;
  }
  get languageCd() {
    return this.data.languageCd;
  }
  get stateCd() {
    return this.data.stateCd;
  }
  get photo() {
    return this.data.photo;
  }
  get dob() {
    return this.data.dob;
  }
  get districtCd() {
    return this.data.districtCd;
  }
  get houseNumber() {
    return this.data.houseNumber;
  }
  get passportNo() {
    return this.data.passportNo;
  }
  get emailId() {
    return this.data.emailId;
  }

  get mobileNo(): string {
    const mobile = this.data.mobileNo;
    return mobile && mobile.length === 10 ? maskMobile(mobile) : '-';
  }

  get createdBy() {
    return this.data.createdBy;
  }
  get createdDttm() {
    return this.data.createdDttm;
  }
  get modifiedBy() {
    return this.data.modifiedBy ?? '-';
  }
  get modifiedDttm() {
    return this.data.modifiedDttm ?? '-';
  }
  get documentUploadedFlag() {
    return this.data.documentUploadedFlag ?? '-';
  }
  get isMovedToDraft() {
    return this.data.isMovedToDraft ?? '-';
  }
  get bloOverRiddenFlg() {
    return this.data.bloOverRiddenFlg ?? '-';
  }
  get submittedForRecommendation() {
    return this.data.submittedForRecommendation;
  }
  get epicId() {
    return this.data.epicId;
  }
  get erollAge() {
    return this.data.erollAge;
  }
  get bloName() {
    return this.data.bloName;
  }
  get bloNo() {
    return this.data.bloNo;
  }
  get districtName() {
    return this.data.districtName;
  }
  get ageStatusFlag() {
    return this.data.ageStatusFlag;
  }
}

function maskMobile(mobile: string): string {
  return mobile.replace(/(\d{2})\d{6}(\d{2})/, '$1******$2');
}
