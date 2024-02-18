import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

import styles from './styles';

interface CustomButtonnProps extends TouchableOpacityProps {
  isLoading?: boolean;
  onPress: () => void;
  title: string;
}

const CustomButton: React.FC<CustomButtonnProps> = ({
  title,
  isLoading = false,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={styles.loginButton}
      onPress={onPress}
      disabled={isLoading}
      {...props}>
      <Text style={styles.loginButtonText}>{title}</Text>
      {isLoading && <ActivityIndicator color="white" />}
    </TouchableOpacity>
  );
};
export default CustomButton;
