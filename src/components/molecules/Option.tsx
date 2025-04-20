import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Checkbox} from '@components/atoms/Checkbox';

type Props = {
  label: string;
  selected: boolean;
  onToggle: () => void;
};

export const OptionItem: React.FC<Props> = ({label, selected, onToggle}) => (
  <TouchableOpacity style={styles.item} onPress={onToggle}>
    <Checkbox checked={selected} />
    <Text>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {paddingVertical: 12, flexDirection: 'row', alignItems: 'center'},
});
