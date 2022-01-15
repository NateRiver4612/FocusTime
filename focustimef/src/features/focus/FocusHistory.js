import React from 'react';
import { StyleSheet, FlatList, View, Text, SafeAreaView } from 'react-native';

import { fontSizes, paddingSizes } from '../../utils/size';
import { RoundedButton } from '../../components/roundedButton';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  const HistoryItem = ({ item, index }) => {
    return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Things we have focused on:
        </Text>
        {focusHistory.length > 0 ? (
          <>
            <FlatList
              style={{}}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
          </>
        ) : (
          <Text style ={{color:'white',paddingTop:5,textAlign:'center'}}>Nothing yet</Text>
        )}
      </SafeAreaView>
      <View style={{ flex: 0.2, alignItems: 'center' }}>
        <RoundedButton size={75} title="Clear" onPress={() => clearHistory()} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 0 ? 'green' : 'red',
    fontSize: fontSizes.md,
  }),
});
