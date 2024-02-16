import {StyleSheet} from 'react-native';
import {fontPixel, heightPixel} from '../../utils/constants';
import colors from '../../utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {},
  logoText: {
    fontSize: fontPixel(32),
    fontWeight: 'bold',
    color: colors.black,
  },
  formContainer: {
    width: '80%',
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: colors.black,
    borderRadius: 8,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginButtonText: {
    color: colors.white,
    fontSize: fontPixel(16),
    marginEnd: 10,
  },
  footerContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
  },
  forgotPasswordButton: {},
  forgotPasswordText: {
    fontSize: fontPixel(15),
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    fontSize: fontPixel(15),
  },
  signupButton: {},
  signupButtonText: {
    fontSize: fontPixel(15),
  },
});
