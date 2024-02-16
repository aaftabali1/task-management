import React, {useState} from 'react';
import {Keyboard, View} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Container from '../../components/Container';
import Header from '../../components/Header';
import {checkValueEmpty} from '../../utils/constants';
import {Picker} from '@react-native-picker/picker';

const AddTask: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');

  const createNewTask = () => {
    if (checkValueEmpty(newTaskTitle)) {
      setTitleError(true);
      return;
    }

    Keyboard.dismiss();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.goBack();
    }, 2 * 1000);
  };

  const handleTaskTitle = (taskTitle: string) => {
    setNewTaskTitle(taskTitle);
    setTitleError(false);
  };

  const handleTaskDesc = (taskDesc: string) => {
    setNewTaskDescription(taskDesc);
  };

  return (
    <Container containerStyle={styles.container}>
      <Header title={'Create Task'} />
      <View style={styles.inputContainer}>
        <CustomTextInput
          error={titleError}
          value={newTaskTitle}
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
          value={newTaskDescription}
          placeholder={'Enter task description'}
          multiline
          containerStyle={styles.textarea}
          onChangeText={handleTaskDesc}
        />
        <CustomButton
          title="Create Task"
          onPress={createNewTask}
          isLoading={isLoading}
        />
      </View>
    </Container>
  );
};

export default AddTask;
