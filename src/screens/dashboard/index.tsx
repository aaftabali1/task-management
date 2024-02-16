import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles'; // Importing the CSS styles
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Container from '../../components/Container';
import Header from '../../components/Header';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

const Dashboard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [tasks, setTasks] = useState<Task[]>([
    {id: 'asdf', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'asdddfewf', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'wfddef', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'bafg', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'ertert', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'sfvd', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'afddew', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'vasdf', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'erwerdddwef', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'vasdasf', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'asfqwfadf', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'assfeasdf', title: 'asdf', description: 'asdf', status: 'To Do'},
    {id: 'atertsdfasd', title: 'asdf', description: 'asdf', status: 'To Do'},
  ]);

  const addTask = () => {
    navigation.navigate('AddTask');
  };

  return (
    <Container containerStyle={styles.container}>
      <Header title="Dashboard" />
      <FlatList
        data={tasks}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <View style={styles.statusContainer}>
              <Text
                style={[
                  styles.statusButton,
                  getStatusButtonStyle(item.status),
                ]}>
                {item.status}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.floatingActionButton} onPress={addTask}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </Container>
  );
};

// Utility function to get style for status button based on status
const getStatusButtonStyle = (status: Task['status']) => {
  switch (status) {
    case 'To Do':
      return styles.statusButtonToDo;
    case 'In Progress':
      return styles.statusButtonInProgress;
    case 'Done':
      return styles.statusButtonDone;
    default:
      return null;
  }
};

export default Dashboard;
