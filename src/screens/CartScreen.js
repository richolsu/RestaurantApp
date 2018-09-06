import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from 'react-native-button';
import { SearchBar } from "react-native-elements";
import { AppStyles } from '../AppStyles';
import Hamburger from '../components/Hamburger';

class CartScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Your Cart',
    headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />,
    headerRight: <View></View>,
  });

  json = require('../jsons/cart.json');

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: this.json.results,
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }


  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          // data: page === 1 ? res.results : [...this.state.data, ...res.results],
          data: this.json.results,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.price}>${this.state.data.reduce((prev, next) => prev + next.price * next.count, 0)}</Text>
        </View>
      </View>
    );
  };

  onPress = (item) => {
    this.props.navigation.navigate('FoodDetail');
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
    return (
      <View style={styles.container}>
        <FlatList style={styles.flat}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.id}`}
          // ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
        <Button containerStyle={styles.actionButtonContainer} style={styles.actionButtonText}
          onPress={() => this.props.navigation.dispatch({ type: 'Cart' })}>PLACE ORDER</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white
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
    backgroundColor: AppStyles.color.main
  },
  actionButtonText: {
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.white
  }

});


export default CartScreen;
