export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// export const SOCKET_BASE_URL =
//   process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000';

export const UPLOAD_ENDPOINT = `${API_BASE_URL}/statics/upload-editor`;

export enum EVENT_NAME {
  CAMPAIGN_DONATED = 'campaign_donated',
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export enum COOKIE_KEYS {
  ACCESS_TOKEN = '_bookstore_dashboard_access_token',
  REFRESH_TOKEN = '_bookstore_dashboard_refresh_token',
}

// export const supportedLanguage = [
//   { language: 'vietnamese', code: 'vi' },
//   { language: 'english', code: 'en' },
// ];

export const DEFAULT_ITEM_PER_PAGE = 10;
export const LIMIT_CAMPAIGNS = 6;

export const DEFAULT_ROWS_PER_PAGE = [5, 10];

export const EMERGENCY_CATEGORIES = [
  '614c2694b22cfa907eaeb1f0',
  '614c2698b22cfa907eaeb1f2',
];
