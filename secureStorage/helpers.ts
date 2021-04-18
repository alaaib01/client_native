import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * save key value pair in secure store 
 * @param key string
 * @param value any value
 */
async function saveValue(key: string, value: any) {
    await AsyncStorage.setItem(key, value);
}

/**
 * get value by key from secure store 
 * @param key string
 * @returns 
 */
async function getValueFor(key: string) {
    let result = await AsyncStorage.getItem(key);
    if (result) {
        return result
    } else {
        return null
    }
}

export {
    saveValue,
    getValueFor
}