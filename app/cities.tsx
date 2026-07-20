import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function CityListScreen() {
  const [newCityName, setNewCityName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const { cities, addCity, removeCity, renameCity } = useAppContext();
  const router = useRouter();

  const handleAdd = async () => {
    if (newCityName.trim().length > 0) {
      await addCity(newCityName.trim());
      setNewCityName('');
    }
  };

  const startEditing = (id: string, currentName: string) => {
    setEditingId(id);
    setEditText(currentName);
  };

  const saveEdit = async (id: string) => {
    if (editText.trim().length > 0) {
      await renameCity(id, editText.trim());
    }
    setEditingId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Cities</Text>
      <View style={styles.addRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add a city"
          value={newCityName}
          onChangeText={setNewCityName}
        />
        <Button title="Add" onPress={handleAdd} />
      </View>
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          editingId === item.id ? (
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={editText}
                onChangeText={setEditText}
                autoFocus
              />
              <Button title="Save" onPress={() => saveEdit(item.id)} />
            </View>
          ) : (
            <View style={styles.row}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => router.push(`/city/${item.cityName}`)}
              >
                <Text style={styles.cityName}>{item.cityName}</Text>
              </TouchableOpacity>
              <Button title="Edit" onPress={() => startEditing(item.id, item.cityName)} />
              <Button title="Remove" onPress={() => removeCity(item.id)} />
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, marginBottom: 12 },
  addRow: { flexDirection: 'row', gap: 8, marginBottom: 16, alignItems: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, gap: 8 },
  cityName: { fontSize: 18 },
});