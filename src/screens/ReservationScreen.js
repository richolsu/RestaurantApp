import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../AppStyles';
import Hamburger from '../components/Hamburger';

export default class FoodDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Reservations',
    headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  json = require('../jsons/reservation.json');

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          // data: page === 1 ? res.results : [...this.state.data, ...res.results],
          data: this.json.result,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderItem = ({ item }) => (
    <Image style={styles.detail} source={{ uri: item }} />
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.photo} source={{ uri: this.state.data.photo }} />
        <View style={styles.info}>
          <Text style={styles.title}> {this.state.data.name} </Text>
          <Text style={styles.description}> {this.state.data.address} </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInputBody} placeholder="First Name" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInputBody} placeholder="Last Name" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInputBody} placeholder="Phone Number" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInputBody} placeholder="Reservation Details" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
          </View>
          <Button containerStyle={styles.buttonContainer} style={styles.buttonText}
            onPress={() => this.props.navigation.dispatch({ type: 'Login' })}>Make Reservation</Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  photo: {
    height: 200,
  },
  info: {
    padding: 20,
    alignItems: 'center',
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 25,
  },
  description: {
    marginTop: 10,
    color: AppStyles.color.text,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    backgroundColor: AppStyles.color.main,
    padding: 10,
  },
  buttonText: {
    color: 'white'
  },
  textInputContainer: {
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: 5,
  },
  textInputbody: {
    color: AppStyles.color.text,
  }

});