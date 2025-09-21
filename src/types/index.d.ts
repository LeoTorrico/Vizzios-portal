export interface EmployeeRecord {
  id: string;
  photo: string;
  timestamp: string;
}

export interface AttendanceDTO {
  carnet: string;
  type: "IN" | "OUT";
  recordedAt: string;
  imageBase64: string;
}
