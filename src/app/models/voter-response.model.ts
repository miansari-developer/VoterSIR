import { VoterPayload, VoterPayloadDTO } from './voter-payload.model';

export interface VoterResponseDTO {
  status?: string;
  statusCode?: string;
  refId?: string;
  message?: string;
  payload?: VoterPayloadDTO;
  file?: string;
  preSignedUrl?: string;
}

export class VoterResponse {
  private readonly data: VoterResponseDTO;

  readonly payload: VoterPayload | null;

  constructor(data: VoterResponseDTO = {}) {
    this.data = data;
    this.payload = data.payload ? new VoterPayload(data.payload) : null;
  }

  get status() {
    return this.data.status;
  }
  get statusCode() {
    return this.data.statusCode;
  }
  get refId() {
    return this.data.refId;
  }
  get message() {
    return this.data.message;
  }
  get file() {
    return this.data.file;
  }
  get preSignedUrl() {
    return this.data.preSignedUrl;
  }
}
