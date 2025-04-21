import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useStores} from '@stores/storeContext';
import type {Toast} from '@stores/toastStore';

const ToastItem: React.FC<{toast: Toast}> = ({toast}) => {
  return (
    <View
      style={[
        styles.toast,
        toast.type === 'success' ? styles.success : styles.error,
      ]}>
      <Text style={styles.text}>{toast.message}</Text>
    </View>
  );
};

export const ToastBar: React.FC = observer(() => {
  const {toastStore} = useStores();
  const {queue} = toastStore;

  if (queue.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper} pointerEvents="none">
      {queue.map(toast => (
        <ToastItem key={toast.id.toString()} toast={toast} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 42,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 9999,
    elevation: 9999,
  },
  toast: {
    marginVertical: 4,
    padding: 12,
    borderRadius: 6,
  },
  success: {
    backgroundColor: '#4caf50',
  },
  error: {
    backgroundColor: '#f44336',
  },
  text: {
    color: '#fff',
  },
});
