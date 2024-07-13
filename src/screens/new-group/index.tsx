import { Header } from '../../components/header';
import { Highlight } from '../../components/highlight';
import { Container, Content, Icon } from './styles';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { groupCreate } from '../../storage/group/group-create';
import { AppError } from '../../utils/app-error';
import { Alert, KeyboardAvoidingView } from 'react-native';

export function NewGroup() {
  const navigation = useNavigation();
  const [groupName, setGroupName] = useState<string>('');

  async function handleNew() {
    try {
      if (groupName.trim().length === 0) {        
        Alert.alert('Novo grupo', 'Informe o nome da turma.');        
      } else {
        await groupCreate(groupName);
        navigation.navigate('players', { group: groupName });    
      }      
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Novo grupo', err.message);
      } else {
        console.error(err);
        Alert.alert('Novo grupo', 'Não foi possível criar um novo grupo.');
      }      
    }    
  }

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='padding'
      >
      <Header showBackButton />

      <Content>
        <Icon />
        
        <Highlight title='Nova' subtitle='Crie a turma para adicionar pessoas' />

        <Input
          placeholder='Nome da turma'
          onChangeText={setGroupName}
          onSubmitEditing={handleNew}
          returnKeyType='done'  
        />

        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>  
      </KeyboardAvoidingView>          
    </Container>
  );
}
