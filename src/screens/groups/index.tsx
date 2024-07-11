import { useState } from 'react';
import { GroupCard } from '../../components/group-card';
import { Header } from '../../components/header';
import { Highlight } from '../../components/highlight';
import { Container } from './styles';
import { FlatList } from 'react-native';
import { Button } from '../../components/button';
import { ListEmpty } from '../../components/list-empty';
import { useNavigation } from '@react-navigation/native';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new-group');
  }

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
        renderItem={({ item }) => <GroupCard title={item} />}
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
