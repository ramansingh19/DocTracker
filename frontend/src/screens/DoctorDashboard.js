import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Switch, Text, View } from 'react-native';

export default function DoctorDashboard({ token }) {
  const [status, setStatus] = useState('in_transit');
  const [sharing, setSharing] = useState(true);
  const [eta, setEta] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let interval;
    if (sharing) {
      getAndSendLocation();
      interval = setInterval(getAndSendLocation, 30000);
    }
    return () => clearInterval(interval);
  }, [sharing]);

  const getAndSendLocation = async () => {
    let { status: locStatus } = await Location.requestForegroundPermissionsAsync();
    if (locStatus !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required.');
      return;
    }
    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
    try {
      const res = await axios.post(
        'http://YOUR_BACKEND_URL/api/doctor/update-location',
        { lat: coords.latitude, lng: coords.longitude },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEta(res.data.eta);
    } catch (err) {
      Alert.alert('Error', 'Failed to update location');
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.post(
        'http://YOUR_BACKEND_URL/api/doctor/update-status',
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Status updated');
    } catch {
      Alert.alert('Error', 'Failed to update status');
    }
  };

  const handleSharingToggle = async (value) => {
    setSharing(value);
    try {
      await axios.post(
        'http://YOUR_BACKEND_URL/api/doctor/location-sharing',
        { enabled: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {
      Alert.alert('Error', 'Failed to update sharing');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Dashboard</Text>
      <Text>Status:</Text>
      <Picker selectedValue={status} onValueChange={setStatus} style={styles.input}>
        <Picker.Item label="In Transit" value="in_transit" />
        <Picker.Item label="Consulting" value="consulting" />
        <Picker.Item label="In OT" value="in_ot" />
        <Picker.Item label="Available" value="available" />
      </Picker>
      <Button title="Update Status" onPress={handleStatusUpdate} />
      <View style={styles.row}>
        <Text>Location Sharing:</Text>
        <Switch value={sharing} onValueChange={handleSharingToggle} />
      </View>
      <Text>ETA to Hospital: {eta}</Text>
      <Text>Current Location: {location ? `${location.latitude}, ${location.longitude}` : 'N/A'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e6f0fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1976d2' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, backgroundColor: '#fff' },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 }
}); 