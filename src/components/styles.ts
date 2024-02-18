import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import {fontPixel, heightPixel, widthPixel} from '../utils/constants';

export default StyleSheet.create({
  safeareaContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  textInput: {
    backgroundColor: colors.bgColor,
    borderRadius: 8,
    paddingVertical: heightPixel(16),
    paddingHorizontal: widthPixel(16),
    fontSize: fontPixel(16),
    borderWidth: 1,
    marginBottom: heightPixel(20),
  },
  eyeButton: {
    position: 'absolute',
    right: widthPixel(16),
    top: heightPixel(18),
    zIndex: 1,
    bottom: 0,
  },
  eyeIcon: {
    width: widthPixel(24),
    height: heightPixel(24),
    tintColor: colors.placeholder,
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
  headerContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgColor,
  },
  headerTitle: {
    fontSize: fontPixel(24),
    fontWeight: 'bold',
    paddingVertical: 20,
    color: colors.black,
  },
});
