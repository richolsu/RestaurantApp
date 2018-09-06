import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncImageAnimated from 'react-native-async-image-animated';
import Button from 'react-native-button';
import { AppStyles } from '../AppStyles';

export default class FoodDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Forbidden Salad',
  };

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

  json = require('../jsons/fooddetail.json');

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          // data: page === 1 ? res.results : [...this.state.data, ...res.results],
          data: this.json,
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
    <AsyncImageAnimated style={styles.detail} animationStyle={'fade'} placeholderColor={AppStyles.color.placeholder} source={{ uri: item }} />
  );

  renderSeparator = () => {
    return (
      <View
        style={{
          width: 10,
          height: "100%",
        }}
      />
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}> {this.state.data.name} </Text>
        <AsyncImageAnimated
          source={{
            uri: this.state.data.photo
          }}
          animationStyle={'fade'}
          style={styles.photo}
        />
        <View style={styles.detailPhotos}>
          <FlatList style={styles.flat}
            horizontal={true}
            ItemSeparatorComponent={this.renderSeparator}
            data={this.state.data.detail_photos}
            renderItem={this.renderItem}
            keyExtractor={item => `${item}`}
          />
        </View>
        <Text style={styles.description}> {this.state.data.description} </Text>
        <View style={styles.buttonSetContainer}>
          <View style={styles.buttonSet}>
            <Button containerStyle={styles.buttonContainer} style={styles.buttonText}
              onPress={() => this.props.navigation.dispatch({ type: 'Login' })}>-</Button>
            <Text style={styles.count}>12</Text>
            <Button containerStyle={styles.buttonContainer} style={styles.buttonText}
              onPress={() => this.props.navigation.dispatch({ type: 'Login' })}>+</Button>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.price}>$11.00</Text>
          <Button containerStyle={styles.actionButtonContainer} style={styles.actionButtonText}
            onPress={() => this.props.navigation.dispatch({ type: 'Login' })}>Add to Cart</Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  title: {
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.text,
    fontSize: 25,
  },
  photo: {
    width: '100%',
    height: 300,
    marginTop: 5,
  },
  detail: {
    height: 90,
    width: 120,
    marginBottom: 5,
  },
  detailPhotos: {
    height: 100,
    marginTop: 20,
  },
  description: {
    marginTop: 20,
    fontFamily: AppStyles.fontName.main,
    color: AppStyles.color.text,
  },
  buttonSetContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSet: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: AppStyles.borderRadius.main,
    borderColor: AppStyles.color.grey
  },
  count: {
    padding: 10,
    marginTop: 2,
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    textAlign: "center",
  },
  buttonContainer: {
    padding: 10,
    width: 50,
  },
  buttonText: {
    color: AppStyles.color.text
  },
  price: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: AppStyles.fontName.bold,
    padding: 10,
    textAlign: 'center',
    color: AppStyles.color.text,
    borderColor: AppStyles.color.grey,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 50,
  },
  actionButtonContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    backgroundColor: AppStyles.color.main
  },
  actionButtonText: {
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.white
  }

});