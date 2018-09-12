import React, { Component } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import Button from 'react-native-button';
import { SearchBar } from "react-native-elements";
import { AppStyles } from '../AppStyles';
import Hamburger from '../components/Hamburger';
import AsyncImageAnimated from 'react-native-async-image-animated';
import firebase from 'react-native-firebase';

class OrderListScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Orders',
    headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />
  });


  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('orders');
    this.unsubscribe = null;

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { foods } = doc.data();
      data.push({
        id: doc.id,
        list: foods,
      });
    });

    this.setState({ 
      data,
      loading: false,
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }



  onPress = (item) => {
    this.props.navigation.dispatch({type:'Reorder', items: item.list});
  }

  renderItem = ({ item }) => (
    <View style={styles.container}>
      <AsyncImageAnimated animationStyle={'fade'}  placeholderColor={AppStyles.color.placeholder} style={styles.photo} source={{ uri: item.list[0].photo }} />
      {
        item.list.map((food) => {
          return (
            <View style={styles.rowContainer} key={food.id}>
              <Text style={styles.count}>{food.count}</Text>
              <Text style={styles.title}>{food.name}</Text>
              <Text style={styles.price}>${food.price}</Text>
            </View>
          );
        })}
      <View style={styles.actionContainer}>
        <Text style={styles.total}>Total:${(item.list.reduce((prev, next) => prev + next.price * next.count, 0) + 1).toFixed(1)}</Text>
        <Button containerStyle={styles.actionButtonContainer} style={styles.actionButtonText}
          onPress={() => this.onPress(item)}>REORDER</Button>
      </View>
    </View>
  );


  render() {
    return (
      <FlatList style={styles.flat}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => `${item.id}`}
        initialNumToRender={5}
      />
    );
  }
}

const styles = StyleSheet.create({
  flat: {
    flex: 1,
    backgroundColor: AppStyles.color.white
  },
  container: {
    marginBottom: 30,
    flex: 1,
    padding: 10,
  },
  photo: {
    width: '100%',
    height: 100,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  count: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    borderWidth: 1,
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    color: AppStyles.color.main,
    borderColor: AppStyles.color.grey,
  },
  price: {
    padding: 10,
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    textAlign: "center",
  },
  title: {
    flex: 1,
    padding: 10,
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    textAlign: "left",
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  total: {
    flex: 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    color: AppStyles.color.text,
    borderColor: AppStyles.color.grey,
  },
  actionButtonContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 50,
    backgroundColor: AppStyles.color.main
  },
  actionButtonText: {
    color: AppStyles.color.white
  }

});


export default OrderListScreen;
