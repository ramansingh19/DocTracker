import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor');

  const handleSignup = async () => {
    if (!email || !password || password.length < 8) {
      Alert.alert('Validation Error', 'Please enter a valid email and a strong password (min 8 chars).');
      return;
    }
    try {
      const res = await axios.post('http://YOUR_BACKEND_URL/api/signup', { email, password, role });
      Alert.alert('Signup Success', 'You can now log in.');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Signup Failed', err.response?.data?.error || 'Error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Picker selectedValue={role} onValueChange={setRole} style={styles.input}>
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e6f0fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1976d2' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, padding: 10, backgroundColor: '#fff' }
}); 