import React from 'react';
import { Image, ScrollView, Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles, TextInputStyle } from '../AppStyles';
import Hamburger from '../components/Hamburger';
import AsyncImageAnimated from '../components/AsyncImageAnimated';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

class ReservationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Reservations',
    headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />,
  });


  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('restaurants').limit(1);
    this.reservationRef = firebase.firestore().collection('reservations');
    this.unsubscribe = null;

    console.log(this.props.user);
    this.state = {
      loading: false,
      data: {},
      error: null,
      refreshing: false,
      firstname:this.props.user.fullname,
      lastname:this.props.user.fullname,
      phone:this.props.user.phone,
      detail:'',
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { name, address, photo } = doc.data();
      data.push({
        id: doc.id,
        name,
        address,
        photo,
        doc,
      });
    });

    this.setState({
      data: data[0],
      loading: false,
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderItem = ({ item }) => (
    <Image style={styles.detail} source={{ uri: item }} />
  );

  onReserve = () => {
    this.reservationRef.add({
      user_id: this.props.user.id,
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      phone:this.state.phone,
      detail:this.state.detail
    }).then(function (docRef) {
      Alert.alert(
        '',
        'Your reservation was successful!',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      );
      
    }).catch(function (error) {
      alert(error);
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <AsyncImageAnimated animationStyle={'fade'} placeholderColor={AppStyles.color.placeholder} style={styles.photo} source={{ uri: this.state.data.photo }} />
          <View style={styles.overlay} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}> {this.state.data.name} </Text>
          <Text style={styles.description}> {this.state.data.address} </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} placeholder="First Name" onChangeText={(text) => this.setState({ firstname: text })} value={this.state.firstname} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={(text) => this.setState({ lastname: text })} value={this.state.lastname} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} placeholder="Phone Number" onChangeText={(text) => this.setState({ phone: text })} value={this.state.phone} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} placeholder="Reservation Details" onChangeText={(text) => this.setState({ detail: text })} value={this.state.detail} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
          </View>
          <Button containerStyle={styles.buttonContainer} style={styles.buttonText}
            onPress={() => this.onReserve()}>Make Reservation</Button>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ReservationScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  photo: {
    width: '100%',
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
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
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.text,
    fontSize: 25,
  },
  description: {
    marginTop: 10,
    fontFamily: AppStyles.fontName.text,
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
  textInput: {
    height: 42,
    paddingLeft: 10,
    paddingRight: 10,
    color: AppStyles.color.text,
  }

});