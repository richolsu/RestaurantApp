import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from 'react-native-button';
import { AppStyles } from '../AppStyles';
import Hamburger from '../components/Hamburger';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class CartScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Your Cart',
    headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />,
    headerRight: <View></View>,
  });


  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('orders');
    this.unsubscribe = null;

    console.log(this.props.user);
    this.state = {
      loading: false,
      data: {},
      error: null,
      refreshing: false,
      firstname: '',
      lastname: '',
      phone: this.props.user.id,
      detail: '',
    };
  }


  renderFooter = () => {

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.price}>${this.props.cartItems.reduce((prev, next) => prev + next.price * next.count, 0)}</Text>
        </View>
      </View>
    );
  };

  onPress = () => {
    const foods = [];
    this.props.cartItems.forEach((item) => {
      const { name, photo, price,count } = item;
      foods.push({
        id: item.id,
        name,
        count,
        photo, 
        price
      });
    });

    const { navigation } = this.props;
    this.ref.add({
      user_id: this.props.user.id,
      foods:foods
    }).then(function (docRef) {
      navigation.dispatch({ type: 'PlaceOrder' });
    }).catch(function (error) {
      alert(error);
    });

    
  }

  renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.rowContainer} key={item.id}>
        <Text style={styles.count}>{item.count}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );


  render() {
    const { cartItems } = this.props;
    return (
      <View style={styles.container}>
        {this.props.cartItems.length>0 &&
        <FlatList style={styles.flat}
          data={this.props.cartItems}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.id}`}
          ListFooterComponent={this.renderFooter}
        />}
        {this.props.cartItems.length==0 && <Text style={styles.emptyTitle}> Cart is empty </Text>}
        {this.props.cartItems.length > 0 && <Button containerStyle={styles.actionButtonContainer} style={styles.actionButtonText}
          onPress={this.onPress}>PLACE ORDER</Button>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white
  },
  emptyTitle: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    textAlignVertical:'center',
    justifyContent: 'center',
  },
  flat: {
    flex: 1,
    margin: 10,
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
    fontFamily: AppStyles.fontName.bold,
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
  actionButtonContainer: {
    padding: 10,
    backgroundColor: AppStyles.color.main,
    marginBottom: 30
  },
  actionButtonText: {
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.white
  }

});


// export default CartScreen;
const mapStateToProps = state => ({
  cartItems: state.cart,
  user: state.auth.user
});

export default connect(mapStateToProps)(CartScreen);
