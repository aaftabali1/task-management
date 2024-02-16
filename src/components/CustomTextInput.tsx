import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import colors from '../utils/colors';

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: boolean;
  multiline?: boolean;
  containerStyle?: ViewStyle;
}

const CustomTextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType,
  error,
  multiline,
  containerStyle,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          {borderColor: focused ? colors.blue : colors.borderColor},
          error && {borderColor: 'red'},
          containerStyle,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword && secureTextEntry}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={colors.placeholder}
        autoCapitalize="none"
        keyboardType={keyboardType}
        autoCorrect={false}
        multiline={multiline}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={togglePasswordVisibility}>
          <Image
            source={
              showPassword
                ? require('../assets/images/eye-off.png')
                : require('../assets/images/eye.png')
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;
