import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const { login } = useAppContext();
  const router = useRouter();

  const handleLogin = () => {
    if (login(username, password)) {
      router.replace('/cities');
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password (min 4 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {showError && <Text style={styles.error}>Please enter a username and a 4+ character password.</Text>}
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  error: { color: 'red', marginBottom: 12 },
});