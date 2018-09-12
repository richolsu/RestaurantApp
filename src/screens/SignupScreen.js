import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles, ButtonStyle, TextInputStyle, TextStyle } from '../AppStyles';
import firebase from 'react-native-firebase';

export default class SignupScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fullname: 'John smith',
      phone: '111',
      email: 'jhon@gmail.com',
      password: '111111',
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  onRegister = () => {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const { navigation } = this.props;
        const { fullname, phone, email } = this.state;
        const data = {
          email: email,
          fullname: fullname,
          phone: phone,
        };
        firebase.firestore().collection('users').doc(user.uid).set(data);
        firebase.firestore().collection('users').doc(user.uid).get().then(function (doc) {
          if (doc.exists) {
            navigation.dispatch({ type: 'Login', user: {id:doc.id, ...doc.data()} });
          } else {
            navigation.dispatch({ type: 'Login', user: {id:user.uid, fullname:'', phone:'', email:user.email} });
          }
        }).catch(function (error) {
          const { code, message } = error;
          alert(message);
        });

      }).catch((error) => {
        const { code, message } = error;
        alert(message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[TextStyle.title, TextStyle.leftTitle]}>Create new account</Text>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} placeholder="Full Name" onChangeText={(text) => this.setState({ fullname: text })} value={this.state.fullname} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} placeholder="Phone Number" onChangeText={(text) => this.setState({ phone: text })} value={this.state.phone} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} placeholder="E-mail Address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} placeholder="Password" secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} value={this.state.password} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <Button containerStyle={[ButtonStyle.facebookContainer, { marginTop: 50 }]} style={ButtonStyle.facebookText}
          onPress={() => this.onRegister()}>Sign Up</Button>
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