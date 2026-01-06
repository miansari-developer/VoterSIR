import { BaseEntity } from "../services/local-storage-db.service";

export interface LastSIRApiResponse<T> {
  status: string;
  statusCode: number;
  refId: string | null;
  message: string;
  payload: T[];
  file: string | null;
}

export interface VoterLastSIRRecordDTO {
  id: string;
  firstName: string;
  lastName: string;
  epicNumber: string;
  currentStateCd: string;
  lastNameHindi: string;
  relativeLName: string;
  relativeFName: string;
  firstNameHindi: string;
  relativeFNameHindi: string;
  relativeLNameHindi: string;
  oldPartNumber: number;
  oldPartName: string;
  oldPartSerialNo: number;
  oldAcName: string;
  oldAcNo: number;
  oldDistName: string;
  oldDistNo: number;
  oldStateName: string;
  oldStateCd: string;
  relationType: string;
  oldFullName: string;
  oldFullNameL1: string;
  oldRelativeFullName: string;
  oldRelativeFullNameL1: string;
  age: string;
  gender: string | null;
  markedByBlo: string | null;
  bloMappedStateCd: string | null;
  bloMappedAcNo: number | null;
  bloMappedPartNo: number | null;
  bloMappedEpicNo: string | null;
}

export interface VoterLastSIRRecord extends BaseEntity {
  electorName: string;
  epicNumber: string;
  stateCode: string;
  electorHindiName:string;
  relativeName:string;
  relativeHindiName:string;
  oldPartNumber: number;
  oldPartName: string;
  oldPartSerialNo: number;
  oldAcName: string;
  oldAcNo: number;
  oldDistName: string;
  oldDistNo: number;
  oldStateName: string;
  oldStateCd: string;
  relationType: string;
  oldFullName: string;
  oldFullNameL1: string;
  oldRelativeFullName: string;
  oldRelativeFullNameL1: string;
  age: string;
  gender: string;
}