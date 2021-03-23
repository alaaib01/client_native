import * as SecureStore from 'expo-secure-store'
async function saveValue(key: string, value: any) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
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