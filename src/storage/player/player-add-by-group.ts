import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./player-storage-dto";
import { PLAYER_COLLECTION } from "../storage-config";
import { playersGetByGroup } from "./players-get-by-group";
import { AppError } from "../../utils/app-error";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
  try {
    const storedPlayers = await playersGetByGroup(group);
    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

    if (playerAlreadyExists.length > 0) 
      throw new AppError('Essa pessoa já faz parte de um time.');

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw (error);
  }
}