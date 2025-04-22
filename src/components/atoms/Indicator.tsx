import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';

type Prop = {
  caption?: string;
};

export const FullScreenIndicator: React.FC<Prop> = ({caption}) => (
  <View style={styles.loaderOverlay}>
    <Text style={styles.loadText}>{'Ожидание ответа сервера...'}</Text>
    {caption && <Text style={styles.bottomText}>{caption}</Text>}
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const styles = StyleSheet.create({
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 10,
  },
  loadText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '300',
  },
  bottomText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '300',
    marginBottom: 128,
  },
});
