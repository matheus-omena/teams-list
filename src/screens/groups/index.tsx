import { useCallback, useEffect, useState } from 'react';
import { GroupCard } from '../../components/group-card';
import { Header } from '../../components/header';
import { Highlight } from '../../components/highlight';
import { Container } from './styles';
import { FlatList } from 'react-native';
import { Button } from '../../components/button';
import { ListEmpty } from '../../components/list-empty';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '../../storage/group/groups-get-all';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new-group');
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (err) {
      console.error(err);
      alert('Não foi possível carregar as turmas. Tente novamente.');
    }    
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />

      <Highlight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />             

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={  
          <ListEmpty message='Que tal adicionar a primera turma?' />          
        }
      /> 

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}
