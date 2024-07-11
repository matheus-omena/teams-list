import { Header } from '../../components/header';
import { Highlight } from '../../components/highlight';
import { Container, Content, Icon } from './styles';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function NewGroup() {
  const navigation = useNavigation();
  const [groupName, setGroupName] = useState<string>('');

  function handleNew() {
    navigation.navigate('players', { group: groupName });    
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        
        <Highlight title='Nova' subtitle='Crie a turma para adicionar pessoas' />

        <Input
          placeholder='Nome da turma'
          onChangeText={setGroupName}
        />

        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>            
    </Container>
  );
}
