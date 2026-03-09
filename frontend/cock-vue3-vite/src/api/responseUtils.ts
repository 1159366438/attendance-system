import { BUSINESS_STATUS } from '../constants/api';

// Normalize backend responses. Some endpoints return {code,msg,...},
// others return raw data and rely on HTTP status.
// This helper abstracts the check and returns a uniform object.

export interface NormalizedResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  status: number;
}

export function normalizeResponse<T>(res: any): NormalizedResponse<T> {
  const status = res?.status || 0;
  const payload = res?.data;

  // If response body has a "code" field, treat as business response.
  if (payload && typeof payload === 'object' && 'code' in payload) {
    // backend may return code and message fields
    const code = payload.code;
    // require both HTTP 200 and business-code 200 for success
    const success = status === BUSINESS_STATUS.SUCCESS && code === BUSINESS_STATUS.SUCCESS;
    return {
      success,
      data: payload,
      message: payload.message || payload.msg || '',
      status,
    };
  }

  // Fallback: rely on HTTP status code alone
  const success = status === BUSINESS_STATUS.SUCCESS;
  return {
    success,
    data: payload,
    message: '',
    status,
  };
}
