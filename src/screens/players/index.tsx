import { Header } from '../../components/header';
import { Highlight } from '../../components/highlight';
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';
import { Input } from '../../components/input';
import { ButtonIcon } from '../../components/button-icon';
import { Filter } from '../../components/filter';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { PlayerCard } from '../../components/player-card';
import { Button } from '../../components/button';
import { ListEmpty } from '../../components/list-empty';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
  group: string;
}

export function Players() {
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [activeTeam, setActiveTeam] = useState('Time A');
  const [players, setPlayers] = useState<string[]>(['Carlos', 'Arouca']);  

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />

        <ButtonIcon
          icon='add'
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
        keyExtractor={item => item}
        renderItem={({item}) => (
          <PlayerCard
            name={item}  
            onRemove={() => null}            
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
      />
    </Container>
  );
}
