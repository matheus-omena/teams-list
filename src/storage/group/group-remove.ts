import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storage-config";
import { groupsGetAll } from "./groups-get-all";


export async function groupRemove(groupName: string) {
  try {
    const storage = await groupsGetAll();
    const filtered = storage.filter(group => group !== groupName);    

    const groups = JSON.stringify(filtered);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);

  } catch (error) {    
    throw error;
  }
}