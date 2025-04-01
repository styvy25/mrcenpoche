
import { Feature } from "@/services/paymentService";

export { Feature };

export interface ApiKeys {
  perplexity?: string;
  youtube?: string;
  stripe?: string;
}

export interface ApiKeyStatus {
  perplexity: boolean;
  youtube: boolean;
  stripe: boolean;
}

export interface ApiKeysStorage {
  api_keys: ApiKeys;
}
