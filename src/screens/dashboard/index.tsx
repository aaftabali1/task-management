import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Keyboard} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';

import Container from '../../components/Container';
import Header from '../../components/Header';
import colors from '../../utils/colors';

import styles from './styles';

interface Task {
  id: string;
  title: string;
  content: string;
  status: 'todo' | 'progress' | 'done';
}

const Dashboard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [todos, setTodos] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');

  const filteredTodo = todos.filter(
    todo => filter === 'all' || todo.status === filter,
  );

  // adding listener to get all tasks from firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          firebase
            .database()
            .ref(`/users/${user.uid}`)
            .on('value', (snapshot: any) => {
              const todoData = snapshot.val();

              if (todoData) {
                const todoArray = Object.entries(todoData).map(
                  ([id, data]: any) => ({id, ...data}),
                );
                setTodos(todoArray);
              }
            });
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    // Fetching all the todo here!
    fetchData();
  }, []);

  // Navigation to add todo task is handled here!
  const addTask = () => {
    navigation.navigate('AddTask');
  };

  // Handling delete todo here
  const handleDeleteTodo = async (id: string) => {
    try {
      Keyboard.dismiss();
      const user = firebase.auth().currentUser;
      if (!user) {
        return;
      }
      await database().ref(`/users/${user.uid}/${id}`).set(null);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Filter button render method
  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        onPress={() => setFilter('all')}
        style={[
          styles.filterBtn,
          {
            backgroundColor:
              filter === 'all' ? colors.black : colors.placeholder,
          },
        ]}>
        <Text style={styles.filterText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFilter('todo')}
        style={[
          styles.filterBtn,
          {
            backgroundColor:
              filter === 'todo' ? colors.black : colors.placeholder,
          },
        ]}>
        <Text style={styles.filterText}>To Do</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFilter('progress')}
        style={[
          styles.filterBtn,
          {
            backgroundColor:
              filter === 'progress' ? colors.black : colors.placeholder,
          },
        ]}>
        <Text style={styles.filterText}>In Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFilter('done')}
        style={[
          styles.filterBtn,
          {
            backgroundColor:
              filter === 'done' ? colors.black : colors.placeholder,
            marginEnd: 0,
          },
        ]}>
        <Text style={styles.filterText}>Done</Text>
      </TouchableOpacity>
    </View>
  );

  // Todo item component
  const todoItem = ({item}: {item: Task}) => {
    return (
      <View style={styles.taskContainer}>
        <Text style={[styles.taskTitle, styles.flexOne]}>{item.title}</Text>
        <View style={styles.flexOne}>
          <Text style={styles.taskDescription}>{item.content}</Text>
          <View style={styles.statusContainer}>
            <Text
              style={[styles.statusButton, getStatusButtonStyle(item.status)]}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={styles.editContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTask', {task: item})}
            style={styles.editBtn}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteTodo(item.id)}
            style={styles.editBtn}>
            <Text style={styles.editText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Container containerStyle={styles.container}>
      <Header title="Dashboard" />
      <Text style={styles.filterHeading}>Filter</Text>
      {renderFilterButtons()}
      <FlatList
        data={filteredTodo}
        showsVerticalScrollIndicator={false}
        renderItem={todoItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <Text>No tasks available</Text>}
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
    case 'todo':
      return styles.statusButtonToDo;
    case 'progress':
      return styles.statusButtonInProgress;
    case 'done':
      return styles.statusButtonDone;
    default:
      return null;
  }
};

export default Dashboard;
