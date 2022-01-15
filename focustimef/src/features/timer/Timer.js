import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';

import { RoundedButton } from '../../components/roundedButton';
import { Countdown } from '../../components/CountDown';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setStarted] = useState(true);
  const [progress, setProgress] = useState(1);

  const onProgress = (p) => {
    setProgress(p / 100)
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000)
      setTimeout(()=> clearInterval(interval), 5000)
    } else {
      Vibration.vibrate(10000)
    }
  };

  const onEnd = async ()=>{
    await vibrate();
    setMinutes(0.1);
    setStarted(false);
    setProgress(1);
    onTimerEnd();
  }

  const changeTime = (min) => () => {
    setProgress(1);
    setStarted(false);
    setMinutes(min);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onEnd = {onEnd}
          onProgress={onProgress}
        />
        <View style={{ padding: 50 }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>

      <View style={styles.buttonWrapper()}>
        <Timing changeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper({ flex: 0.3 })}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252250',
    flex: 1,
  },
  countdown: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: 'white', textAlign: 'center' },
  task: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  buttonWrapper: ({
    flex = 0.25,
    padding = 15,
    justifyContent = 'center',
  } = {}) => ({
    flex,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent,
    padding,
  }),
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
