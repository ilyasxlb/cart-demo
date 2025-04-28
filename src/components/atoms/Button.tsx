import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type ButtonColors = 'green' | 'blue' | 'red';

type Props = {
  disabled?: boolean;
  onPress: () => void;
  caption: string;
  color: ButtonColors;
} & TouchableOpacityProps;

export const PrimaryButton: React.FC<Props> = ({
  disabled = false,
  onPress,
  caption,
  color,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled && styles.buttonDisabled,
        styles[color],
      ]}
      activeOpacity={disabled ? 1 : 0.2}
      onPress={onPress}
      {...rest}>
      <Text style={styles.caption}>{caption}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 42,
    padding: 12,
    borderRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  buttonDisabled: {opacity: 1, backgroundColor: '#aaa'},
  caption: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
  green: {
    backgroundColor: '#28A745',
  },
  blue: {
    backgroundColor: '#007AFF',
  },
  red: {
    backgroundColor: '#9A2821',
  },
});
