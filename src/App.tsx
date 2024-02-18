import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {firebase} from '@react-native-firebase/auth';

import Login from './screens/login';
import Dashboard from './screens/dashboard';
import Signup from './screens/signup';
import AddTask from './screens/addTask';

const Stack = createNativeStackNavigator();

export default () => {
  const [screen, setScreen] = useState('');

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user == null) {
      setScreen('Login');
    } else {
      setScreen('Dashboard');
    }
  }, []);

  if (screen == '') {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screen}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddTask" component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
