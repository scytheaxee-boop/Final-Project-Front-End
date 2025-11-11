import type { Student, AttendanceLog } from './types';
import { v4 as uuidv4 } from 'uuid';

const initialScheduleTemplate: AttendanceLog[] = [
  { id: uuidv4(), date: 'Jumat, 7 Nov 2025', event: 'Vesper', status: 'pending' },
  { id: uuidv4(), date: 'Rabu, 12 Nov 2025', event: 'Midweek', status: 'pending' },
  { id: uuidv4(), date: 'Jumat, 14 Nov 2025', event: 'Vesper', status: 'pending' },
  { id: uuidv4(), date: 'Rabu, 19 Nov 2025', event: 'Midweek', status: 'pending' },
  { id: uuidv4(), date: 'Jumat, 21 Nov 2025', event: 'Vesper', status: 'pending' },
  { id: uuidv4(), date: 'Rabu, 26 Nov 2025', event: 'Midweek', status: 'pending' },
];

const createNewSchedule = (): AttendanceLog[] => {
  return JSON.parse(JSON.stringify(initialScheduleTemplate));
}

export const initialStudents: Student[] = [
  
  { id: 's001', name: 'Andy Wijaya', room: '001', attendanceLog: createNewSchedule() },
  { id: 's002', name: 'Budi Santoso', room: '001', attendanceLog: createNewSchedule() },
  { id: 's003', name: 'Citra Lestari', room: '001', attendanceLog: createNewSchedule() },
  { id: 's004', name: 'Dewi Anggraini', room: '001', attendanceLog: createNewSchedule() },
  
  { id: 's005', name: 'Jeremy Kairupan', room: '002', attendanceLog: createNewSchedule() },
  { id: 's006', name: 'Fajar Nugroho', room: '002', attendanceLog: createNewSchedule() },
  { id: 's007', name: 'Gita Permata', room: '002', attendanceLog: createNewSchedule() },
  { id: 's008', name: 'Hadi Prawira', room: '002', attendanceLog: createNewSchedule() },
  
  { id: 's009', name: 'Indra Gunawan', room: '003', attendanceLog: createNewSchedule() },
  { id: 's010', name: 'Joko Susilo', room: '003', attendanceLog: createNewSchedule() },
  { id: 's011', name: 'Kania Dewi', room: '003', attendanceLog: createNewSchedule() },
  { id: 's012', name: 'Lia Puspita', room: '003', attendanceLog: createNewSchedule() },
  
  { id: 's013', name: 'Mira Haling', room: '004', attendanceLog: createNewSchedule() },
  { id: 's014', name: 'Nina Wati', room: '004', attendanceLog: createNewSchedule() },
  { id: 's015', name: 'Oscar Pranata', room: '004', attendanceLog: createNewSchedule() },
  { id: 's016', name: 'Prima Yuda', room: '004', attendanceLog: createNewSchedule() },
  
  { id: 's017', name: 'Qori Sandioriva', room: '005', attendanceLog: createNewSchedule() },
  { id: 's018', name: 'Rian Febrianto', room: '005', attendanceLog: createNewSchedule() },
  { id: 's019', name: 'Siska Dwi', room: '005', attendanceLog: createNewSchedule() },
  { id: 's020', name: 'Tora Gunadi', room: '005', attendanceLog: createNewSchedule() },

  { id: 's021', name: 'Udin Raharja', room: '006', attendanceLog: createNewSchedule() },
  { id: 's022', name: 'Vina Panduwinata', room: '006', attendanceLog: createNewSchedule() },
  { id: 's023', name: 'Wati Lestari', room: '006', attendanceLog: createNewSchedule() },
  { id: 's024', name: 'Yuda Keling', room: '006', attendanceLog: createNewSchedule() },
];

export const rooms = [...new Set(initialStudents.map(s => s.room))].sort();