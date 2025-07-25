import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import io from 'socket.io-client';

export default function PatientStatusScreen({ doctorId, patientId }) {
  const [status, setStatus] = useState('');
  const [eta, setEta] = useState('');
  const [queue, setQueue] = useState([]);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const socket = io('http://YOUR_BACKEND_URL');
    socket.on('queueUpdate', data => {
      if (data.doctorId === doctorId) {
        setStatus(data.status);
        setEta(data.eta);
        setQueue(data.queue);
        if (data.queue && patientId) {
          const pos = data.queue.findIndex(p => p.id === patientId);
          setPosition(pos >= 0 ? pos + 1 : null);
        }
      }
    });
    return () => socket.disconnect();
  }, [doctorId, patientId]);

  return (
    <View>
      <Text>Doctor Status: {status}</Text>
      <Text>ETA: {eta}</Text>
      <Text>Your Queue Position: {position !== null ? position : 'N/A'}</Text>
    </View>
  );
} 