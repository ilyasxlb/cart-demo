import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import {RootStackParamList} from '@navigation/index';

const OPTIONS = [
  'Оставить у двери',
  'Позвонить',
  'Домофон есть',
  'Злой консъерж',
];

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Options'>;

export const OptionsScreen: React.FC = () => {
  const [chosen, setChosen] = useState<string[]>([]);
  const navigation = useNavigation<NavProp>();

  const toggleOption = (opt: string) => {
    setChosen(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt],
    );
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <FlatList
        data={OPTIONS}
        keyExtractor={o => o}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => toggleOption(item)}>
            <View
              style={chosen.includes(item) ? styles.checked : styles.unchecked}
            />
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Confirmation', {options: chosen})
          }>
          <Text style={styles.buttonText}>Оформить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {paddingVertical: 12, flexDirection: 'row', alignItems: 'center'},
  footer: {padding: 16, borderTopWidth: 1, borderColor: '#ddd'},
  button: {backgroundColor: '#28A745', padding: 12, borderRadius: 6},
  buttonText: {color: '#fff', textAlign: 'center'},
  checked: {marginRight: 8, width: 16, height: 16, backgroundColor: '#333'},
  unchecked: {
    marginRight: 8,
    width: 16,
    height: 16,
    borderColor: '#333',
    borderWidth: 2,
  },
});
