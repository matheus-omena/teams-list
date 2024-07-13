import { Header } from '../../components/header';
import { Highlight } from '../../components/highlight';
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';
import { Input } from '../../components/input';
import { ButtonIcon } from '../../components/button-icon';
import { Filter } from '../../components/filter';
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { PlayerCard } from '../../components/player-card';
import { Button } from '../../components/button';
import { ListEmpty } from '../../components/list-empty';
import { useNavigation, useRoute } from '@react-navigation/native';
import { playerAddByGroup } from '../../storage/player/player-add-by-group';
import { AppError } from '../../utils/app-error';
import { playersGetByGroup } from '../../storage/player/players-get-by-group';
import { playersGetByGroupAndTeam } from '../../storage/player/players-get-by-group-and-team';
import { PlayerStorageDTO } from '../../storage/player/player-storage-dto';
import { playerRemoveByGroup } from '../../storage/player/player-remove-by-group';
import { groupRemove } from '../../storage/group/group-remove';

type RouteParams = {
  group: string;
}

export function Players() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);
  
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [activeTeam, setActiveTeam] = useState<string>('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);  

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {        
      return Alert.alert('Novo jogador', 'Informe o nome do jogador.');        
    } 

    const newPlayer = {
      name: newPlayerName,
      team: activeTeam
    };

    try {      
        await playerAddByGroup(newPlayer, group); 
        
        setNewPlayerName('');
        newPlayerNameInputRef.current?.blur();
        Keyboard.dismiss();        
        
        fetchPlayersByTeam();

    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Novo jogador', err.message);
      } else {
        console.error(err);
        Alert.alert('Novo jogador', 'Não foi possível adicionar o jogador.');
      }      
    }    
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, activeTeam);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert('Jogadores', 'Não foi possível carregar os jogadores.');
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {      
        await playerRemoveByGroup(playerName, group);    
        
        fetchPlayersByTeam();

    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Remover jogador', err.message);
      } else {
        console.error(err);
        Alert.alert('Remover jogador', 'Não foi possível remover o jogador.');
      }      
    }    
  }

  async function handleRemoveGroup() {
    await groupRemove(group);
    navigation.navigate('groups');
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [activeTeam]);

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='padding'
      >
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'          
        />

        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Filter
              title={item}            
              isActive={item === activeTeam}
              onPress={() => setActiveTeam(item)}
            />
          )}
          horizontal
        />   

        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>   
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <PlayerCard
            name={item.name}  
            onRemove={() => handleRemovePlayer(item.name)}            
          />
        )}  
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas nesse time.' />
        )}
        showsVerticalScrollIndicator={false}        
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && { flex:1 }
        ]}
      />   
      
      <Button
        title='Remover turma'
        type='SECONDARY'
        onPress={handleRemoveGroup}
      />
      </KeyboardAvoidingView>
    </Container>
  );
}
