export interface EmployeeRecord {
  id: string;
  photo: string;
  timestamp: string;
}

export interface AttendanceDTO {
  carnet: string;
  recordedAt: string;
  imageBase64: string;
}

export interface PaginatedResponse {
  data: any[];
  meta: {
    total: number;
    page: number | string;
    lastPage: number;
    limit: number | string;
  };
}

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
