import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import Container from '../../components/Container';
import colors from '../../utils/colors';
import CustomTextInput from '../../components/CustomTextInput';

import styles from './styles';

const Signup = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [nameValid, setNameValid] = useState(true);

  // handling sign up
  const handleSignUp = async () => {
    if (email.trim() == '') {
      setEmailValid(false);
      return;
    }
    if (password.trim() == '') {
      setPasswordValid(false);
      return;
    }

    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response) {
        navigation.navigate('Dashboard');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Task management', 'Email is already registered!');
    }
  };

  // handling email input
  const handleEmailInput = (emailText: string) => {
    setEmail(emailText);
    setEmailValid(true);
  };

  // handling password input
  const handlePasswordInput = (passwordText: string) => {
    setPassword(passwordText);
    setPasswordValid(true);
  };

  // handling name input
  const handleNameInput = (nameText: string) => {
    setFullName(nameText);
    setNameValid(true);
  };

  return (
    <Container containerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Let's Manage Tasks</Text>
      </View>
      <View style={styles.formContainer}>
        <CustomTextInput
          value={fullName}
          onChangeText={handleNameInput}
          error={!nameValid}
          placeholder="Full Name"
        />
        <CustomTextInput
          value={email}
          onChangeText={handleEmailInput}
          error={!emailValid}
          placeholder="Email"
        />
        <CustomTextInput
          value={password}
          onChangeText={handlePasswordInput}
          secureTextEntry={!passwordVisible}
          placeholder="Password"
          error={!passwordValid}
        />
        <TouchableOpacity
          testID="signUp"
          style={styles.loginButton}
          onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
          {isLoading && <ActivityIndicator color={colors.white} />}
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Signup;
