import { useState } from 'react';
import './App.css';
import { initialStudents, rooms } from './mockData';
import type { Student, AttendanceStatus } from './types';
import { FaArrowLeft, FaDoorOpen, FaUserGraduate, FaCalendarAlt, FaCheck, FaTimes, FaExclamationCircle, FaRedoAlt } from 'react-icons/fa'; // Import Ikon

const POIN_PER_ABSEN = 4;

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);


  const handleAttendanceChange = (studentId: string, logId: string, newStatus: AttendanceStatus) => {
    setStudents(currentStudents =>
      currentStudents.map(student => {
        if (student.id === studentId) {
          const updatedLog = student.attendanceLog.map(log =>
            log.id === logId ? { ...log, status: newStatus } : log
          );
          return { ...student, attendanceLog: updatedLog };
        }
        return student;
      })
    );
  };

  const handleResetPoints = (studentId: string) => {
    if (window.confirm('Yakin ingin reset semua poin dan jadwal mahasiswa ini? Tindakan ini tidak bisa dibatalkan.')) {
      setStudents(currentStudents =>
        currentStudents.map(student => {
          if (student.id === studentId) {
            const resetLog = student.attendanceLog.map(log => ({ ...log, status: 'pending' as AttendanceStatus }));
            return { ...student, attendanceLog: resetLog };
          }
          return student;
        })
      );
    }
  };

  const calculatePoints = (student: Student): number => {
    const totalAbsent = student.attendanceLog.filter(log => log.status === 'absent').length;
    return totalAbsent * POIN_PER_ABSEN;
  };


  const renderRoomSelection = () => (
    <div className="view-container">
      <h2>Pilih Kamar</h2>
      <div className="room-list">
        {rooms.map(room => (
          <button key={room} className="room-card" onClick={() => setSelectedRoom(room)}>
            <FaDoorOpen className="icon-card" /> Kamar {room}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStudentSelection = () => {
    const studentsInRoom = students
      .filter(s => s.room === selectedRoom)
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())); // Search bar

    return (
      <div className="view-container">
        <button className="btn-back" onClick={() => setSelectedRoom(null)}>
          <FaArrowLeft /> Kembali ke Daftar Kamar
        </button>
        <h2>Mahasiswa di Kamar {selectedRoom}</h2>
        <input
          type="text"
          placeholder="Cari nama di kamar ini..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="student-list-simple">
          {studentsInRoom.map(student => (
            <button key={student.id} className="student-name-card" onClick={() => setSelectedStudentId(student.id)}>
              <span className="student-name"><FaUserGraduate /> {student.name}</span>
              <span className={`student-points-badge ${calculatePoints(student) > 0 ? 'has-points' : 'zero-points'}`}>
                Poin: {calculatePoints(student)}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderStudentDetail = () => {
    const student = students.find(s => s.id === selectedStudentId);

    if (!student) {
      return (
        <div>
          <p>Error: Mahasiswa tidak ditemukan.</p>
          <button className="btn-back" onClick={() => setSelectedStudentId(null)}>
            <FaArrowLeft /> Kembali
          </button>
        </div>
      );
    }

    const totalPoints = calculatePoints(student);

    return (
      <div className="view-container">
        <button className="btn-back" onClick={() => { setSelectedStudentId(null); setSearchTerm(''); }}>
          <FaArrowLeft /> Kembali ke Kamar {student.room}
        </button>
        
        <div className="student-detail-header">
          <h3>{student.name}</h3>
          <p>Kamar: {student.room}</p>
          <div className="points-section">
            <span className={`total-points ${totalPoints > 0 ? 'has-points' : ''}`}>
              Total Poin: {totalPoints}
            </span>
            <button className="btn-reset" onClick={() => handleResetPoints(student.id)}>
              <FaRedoAlt /> Reset Poin
            </button>
          </div>
        </div>

        <h4><FaCalendarAlt /> Jadwal Kehadiran</h4>
        <div className="schedule-list">
          {student.attendanceLog.map(log => (
            <div key={log.id} className="schedule-item">
              <div className="schedule-info">
                <strong>{log.event}</strong>
                <span>{log.date}</span>
              </div>
              <div className="schedule-actions">
                <button
                  className={`btn-status present ${log.status === 'present' ? 'active' : ''}`}
                  onClick={() => handleAttendanceChange(student.id, log.id, 'present')}
                >
                  <FaCheck /> Hadir
                </button>
                <button
                  className={`btn-status excused ${log.status === 'excused' ? 'active' : ''}`}
                  onClick={() => handleAttendanceChange(student.id, log.id, 'excused')}
                >
                  <FaExclamationCircle /> Izin
                </button>
                <button
                  className={`btn-status absent ${log.status === 'absent' ? 'active' : ''}`}
                  onClick={() => handleAttendanceChange(student.id, log.id, 'absent')}
                >
                  <FaTimes /> Absen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistem Absensi Asrama</h1>
        <p className="app-tagline">Monitoring Kehadiran Vesper & Midweek</p>
      </header>

      {!selectedRoom && renderRoomSelection()}
      {selectedRoom && !selectedStudentId && renderStudentSelection()}
      {selectedRoom && selectedStudentId && renderStudentDetail()}
    </div>
  );
}

export default App;