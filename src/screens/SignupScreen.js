import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles, ButtonStyle, TextInputStyle, TextStyle } from '../AppStyles';

export default class SignupScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[TextStyle.title, TextStyle.leftTitle]}>Create new account</Text>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} placeholder="Full Name" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} placeholder="Phone Number" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} placeholder="E-mail Address" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} placeholder="Password" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <Button containerStyle={[ButtonStyle.facebookContainer, { marginTop: 50 }]} style={ButtonStyle.facebookText}
          onPress={() => this.props.navigation.dispatch({ type: 'Login' })}>Sign Up</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

});