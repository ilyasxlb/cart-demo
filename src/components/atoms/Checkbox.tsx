import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  checked: boolean;
};
export const Checkbox: React.FC<Props> = ({checked}: Props) => (
  <View style={checked ? styles.checked : styles.unchecked} />
);

const styles = StyleSheet.create({
  checked: {marginRight: 8, width: 16, height: 16, backgroundColor: '#333'},
  unchecked: {
    marginRight: 8,
    width: 16,
    height: 16,
    borderColor: '#333',
    borderWidth: 2,
  },
});
