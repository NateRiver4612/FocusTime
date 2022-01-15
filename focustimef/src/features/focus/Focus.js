import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/roundedButton';
import {fontSizes, paddingSizes} from '../../utils/size';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you want to focus on</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: 10 }}
            value = {subject}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              // setFocusItem(text);
              setSubject(text)
              // addSubject(text)
            }}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent:'center'
  },
  titleContainer: {
    flex: 1,
    padding: paddingSizes.md,
    paddingBottom:0,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:"center",
    fontSize: fontSizes.umd,
  },
  inputContainer: {
    padding: paddingSizes.md,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
