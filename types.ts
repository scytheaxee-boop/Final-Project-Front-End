export type AttendanceStatus = 'pending' | 'present' | 'absent' | 'excused';

export interface AttendanceLog {
  id: string;
  date: string;
  event: 'Vesper' | 'Midweek';
  status: AttendanceStatus;
}

export interface Student {
  id: string;
  name: string;
  room: string;
  attendanceLog: AttendanceLog[];
}