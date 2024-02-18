import React from 'react';
import {SafeAreaView, StatusBar, StyleProp, ViewStyle} from 'react-native';
import colors from '../utils/colors';

import styles from './styles';

interface ContainerProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const Container: React.FC<ContainerProps> = ({children, containerStyle}) => {
  return (
    <SafeAreaView style={[styles.safeareaContainer, containerStyle]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {children}
    </SafeAreaView>
  );
};

export default Container;
