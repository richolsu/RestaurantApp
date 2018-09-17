import React, { Component } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { AppStyles } from '../AppStyles';
import Hamburger from '../components/Hamburger';
import AsyncImageAnimated from '../components/AsyncImageAnimated';
import firebase from 'react-native-firebase';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 2;
// item size
const PRODUCT_ITEM_HEIGHT = 150;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

class CategoryListScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Menu',
    headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />
  });


  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('categories');
    this.unsubscribe = null;

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { name, photo } = doc.data();
      data.push({
        id: doc.id,
        doc,
        name, // DocumentSnapshot
        photo
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
    this.props.navigation.navigate('FoodList', { item: item });
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPress(item)}>
      <View style={styles.container}>
        <AsyncImageAnimated animationStyle={'fade'} placeholderColor={AppStyles.color.placeholder} style={styles.photo} source={{ uri: item.photo }} />
        <View style={styles.overlay} />
        <Text numberOfLines={3} style={styles.title}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );


  render() {
    return (
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => `${item.id}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: PRODUCT_ITEM_OFFSET,
    width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
      PRODUCT_ITEM_MARGIN,
    height: PRODUCT_ITEM_HEIGHT,
  },
  title: {
    color: 'white',
    fontSize: 19,
    fontFamily: AppStyles.fontName.bold,
    textAlign: 'center'
  },
  photo: {
    width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
      PRODUCT_ITEM_MARGIN,
    height: PRODUCT_ITEM_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

export default CategoryListScreen;
