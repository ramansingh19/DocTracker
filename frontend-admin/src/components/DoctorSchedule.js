import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function DoctorSchedule() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/api/doctors').then(res => setDoctors(res.data));
  }, []);
  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Status</th><th>Schedule</th></tr>
      </thead>
      <tbody>
        {doctors.map(doc => (
          <tr key={doc.id}>
            <td>{doc.name}</td>
            <td>{doc.status}</td>
            <td>{doc.schedule}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 