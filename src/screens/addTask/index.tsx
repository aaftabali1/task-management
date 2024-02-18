import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';

import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import Container from '../../components/Container';
import Header from '../../components/Header';
import {checkValueEmpty} from '../../utils/constants';

import styles from './styles';

const AddTask: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();

  const [taskTitle, setTaskTitle] = useState('');
  const [taskContent, setTaskContent] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('todo');
  const [buttonTitle, setButtonTitle] = useState('Create Task');
  const [taskId, setTaskId] = useState('0');

  // checking for update task
  // if we get task in params or not
  useEffect(() => {
    const task = route.params?.task;
    if (task == undefined) {
      return;
    }
    setTaskTitle(task.title);
    setTaskContent(task.content);
    setProgress(task.status);
    setButtonTitle('Update Task');
    setTaskId(task.id);
  }, []);

  // function to create a new task
  const createNewTask = async () => {
    if (checkValueEmpty(taskTitle)) {
      setTitleError(true);
      return;
    }
    try {
      Keyboard.dismiss();
      const user = firebase.auth().currentUser;
      if (!user) {
        return;
      }
      setIsLoading(true);
      await database().ref(`/users/${user.uid}/`).push({
        content: taskContent,
        title: taskTitle,
        status: progress,
      });
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding todo:', error);
      setIsLoading(false);
    }
  };

  // function to update the existing task
  const updateTask = async () => {
    if (checkValueEmpty(taskTitle)) {
      setTitleError(true);
      return;
    }
    try {
      Keyboard.dismiss();
      const user = firebase.auth().currentUser;
      if (!user) {
        return;
      }
      setIsLoading(true);
      await database().ref(`/users/${user.uid}/${taskId}`).set({
        content: taskContent,
        title: taskTitle,
        status: progress,
      });
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding todo:', error);
      setIsLoading(false);
    }
  };

  // handling task title
  const handleTaskTitle = (taskTitle: string) => {
    setTaskTitle(taskTitle);
    setTitleError(false);
  };

  // handling task content
  const handleTaskDesc = (taskDesc: string) => {
    setTaskContent(taskDesc);
  };

  return (
    <Container containerStyle={styles.container}>
      <Header title={'Create Task'} />
      <View style={styles.inputContainer}>
        <CustomTextInput
          error={titleError}
          value={taskTitle}
          placeholder={'Enter task title'}
          onChangeText={handleTaskTitle}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={progress}
            mode="dropdown"
            onValueChange={itemValue => setProgress(itemValue)}
            style={styles.picker}>
            <Picker.Item label="To Do" value="todo" />
            <Picker.Item label="In Progress" value="progress" />
            <Picker.Item label="Done" value="done" />
          </Picker>
        </View>
        <CustomTextInput
          value={taskContent}
          placeholder={'Enter task description'}
          multiline
          containerStyle={styles.textarea}
          onChangeText={handleTaskDesc}
        />
        <CustomButton
          title={buttonTitle}
          onPress={() => {
            if (taskId === '0') {
              createNewTask();
            } else {
              updateTask();
            }
          }}
          isLoading={isLoading}
        />
      </View>
    </Container>
  );
};

export default AddTask;
