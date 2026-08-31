import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@fitness_';

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) { console.log('save error', e); }
};

export const loadData = async (key) => {
  try {
    const v = await AsyncStorage.getItem(PREFIX + key);
    return v ? JSON.parse(v) : null;
  } catch (e) { return null; }
};

export const clearAll = async () => {
  const keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(keys.filter(k => k.startsWith(PREFIX)));
};
