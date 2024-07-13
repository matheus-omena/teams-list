import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storage-config";
import { groupsGetAll } from "./groups-get-all";
import { AppError } from "../../utils/app-error";

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll();

    const groupAlreadyExists = storedGroups.includes(newGroupName);

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo com esse nome');
    }

    const storage = JSON.stringify([...storedGroups, newGroupName]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}