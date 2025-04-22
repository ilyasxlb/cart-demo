import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const QuantityControl: React.FC<Props> = ({
  qty,
  onIncrement,
  onDecrement,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onDecrement}
      style={[styles.btn, styles.decrement]}>
      <Text style={styles.btnText}>−</Text>
    </TouchableOpacity>
    <Text style={styles.qty}>{qty}</Text>
    <TouchableOpacity
      onPress={onIncrement}
      style={[styles.btn, styles.increment]}>
      <Text style={styles.btnText}>＋</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  decrement: {
    marginRight: 8,
  },
  increment: {
    marginLeft: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 20,
  },
  qty: {
    fontSize: 16,
    minWidth: 24,
    textAlign: 'center',
  },
});
