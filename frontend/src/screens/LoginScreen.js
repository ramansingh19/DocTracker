import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://YOUR_BACKEND_URL/api/login', { email, password });
      // Save token, navigate to dashboard
      Alert.alert('Login Success', `Welcome ${res.data.user.role}`);
    } catch (err) {
      Alert.alert('Login Failed', err.response?.data?.error || 'Error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Arrival Tracker</Text>
      <Picker selectedValue={role} onValueChange={setRole} style={styles.input}>
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e6f0fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1976d2' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, padding: 10, backgroundColor: '#fff' }
}); 