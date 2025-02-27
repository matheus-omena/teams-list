import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./player-storage-dto";
import { PLAYER_COLLECTION } from "../storage-config";

export async function playersGetByGroup(group: string){
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

    const players: PlayerStorageDTO[] = storage? JSON.parse(storage) : [];

    return players;

  } catch (error) {
    throw (error);
  }
}