import React, {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
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

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handling login functionality
  const handleLogin = async () => {
    if (email.trim() == '') {
      setEmailValid(false);
      return;
    }
    if (password.trim() == '') {
      setPasswordValid(false);
      return;
    }

    Keyboard.dismiss();

    setIsLoading(true);

    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response) {
        navigation.navigate('Dashboard');
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      alert('Email or Password is incorrect!');
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

  return (
    <Container containerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Welcome Back</Text>
      </View>
      <View style={styles.formContainer}>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
          {isLoading && <ActivityIndicator color={colors.white} />}
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Login;
