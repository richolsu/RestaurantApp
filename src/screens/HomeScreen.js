import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { AppStyles } from '../AppStyles';
import Hamburger from '../components/Hamburger';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 1,
      data: { deals: [] },
      loading: false,
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  json = require('../jsons/home.json');

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

  onPressCategoryItem = (item) => {
    this.props.navigation.navigate('FoodList');
  }

  onPressDealItem = (item) => {
    this.props.navigation.navigate('FoodList');
  }

  onPressFoodItem = (item) => {
    this.props.navigation.navigate('FoodDetail');
  }

  renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressCategoryItem(item)}>
      <View style={styles.categoryItemContainer}>
        <Image style={styles.categoryItemPhoto} source={{ uri: item.photo }} />
        <Text style={styles.categoryItemTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  renderFoodItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressDealItem(item)}>
      <View style={styles.foodItemContainer}>
        <Image style={styles.foodPhoto} source={{ uri: item.photo }} />
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderDealItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressFoodItem(item)}>
      <View style={styles.dealItemContainer}>
        <Image style={StyleSheet.absoluteFillObject} source={{ uri: item.photo }} />
        <View style={styles.overlay} />
        <Text style={styles.dealName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { activeSlide } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}> Popular Categories </Text>
        <View style={styles.categories}>
          <FlatList
            horizontal={true}
            data={this.state.data.categories}
            renderItem={this.renderCategoryItem}
            keyExtractor={item => `${item.id}`}
          />
        </View>
        <Text style={styles.title}> Best Deals </Text>
        <View style={styles.deals}>
          <Carousel
            ref={(c) => { this._slider1Ref = c; }}
            data={this.state.data.deals}
            renderItem={this.renderDealItem}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            hasParallaxImages={true}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={1}
            loop={true}
            // loopClonesPerSide={2}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          />
          <Pagination
            dotsLength={this.state.data.deals.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor={'rgba(255, 255, 255, 0.92)'}
            dotStyle={styles.paginationDot}
            inactiveDotColor='white'
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
        </View>
        <Text style={styles.title}> Most Popular </Text>
        <View style={styles.foods}>
          <FlatList
            data={this.state.data.foods}
            renderItem={this.renderFoodItem}
            keyExtractor={item => `${item.id}`}
          />
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
  categories: {
    marginTop: 10,
  },
  categoryItemContainer: {
    margin: 10,
    alignItems: 'center'
  },
  categoryItemPhoto: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  categoryItemTitle: {
    color: 'black',
  },
  deals: {
    marginTop: 10,
  },
  dealItemContainer: {
    flex: 1,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: viewportWidth,
    height: 200,
    backgroundColor: 'green'
  },
  dealPhoto: {
    width: '100%',
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  dealName: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    // backgroundColor: 'green',
    paddingVertical: 8,
    marginTop: 150,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },


  foods: {
    marginTop: 10,
  },
  foodItemContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 20,
  },
  foodPhoto: {
    width: '100%',
    height: 200,
  },
  foodInfo: {
    marginTop: 10,
    flexDirection: 'row'
  },
  foodName: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },
  foodPrice: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'black',
  },
  title: {
    color: AppStyles.color.text,
    fontSize: 25,
  },
  photo: {
    height: 300,
  },
  detail: {
    height: 60,
    width: 100,
    marginRight: 10
  },

  description: {
    marginTop: 20,
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
    fontWeight: 'bold',
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
    color: AppStyles.color.white
  },



});