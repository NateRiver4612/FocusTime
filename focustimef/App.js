import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { colors } from './src/utils/color';
import { Timer } from './src/features/timer/Timer';
import { CountDown } from './src/components/CountDown';
import { useKeepAwake } from 'expo-keep-awake';
import { FocusHistory } from './src/features/focus/FocusHistory';

import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSES = {
  COMPLETED: 1,
  CANCELED: 0,
};

export const App = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const setFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory((focusHistory) => [
      ...focusHistory,
      {key:String(focusHistory.length + 1), subject: subject, status: status },
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history !== null) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          onTimerEnd={() => {
            setFocusHistoryWithStatus(focusSubject, STATUSES.COMPLETED);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            setFocusHistoryWithStatus(focusSubject, STATUSES.CANCELED);
            setFocusSubject(null);
          }}
          focusSubject={focusSubject}
        />
      ) : (
        <View style={styles.focusContainer}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  focusContainer: {
    flex: 1,
  },
});

export default App;
