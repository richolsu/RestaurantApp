import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class CategoryListScreen extends React.Component {
    static navigationOptions = {
        title: 'Categories',
    };
    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Categories Screen </Text>  
                <Button
                    title="Go to Food"
                    onPress={() => this.props.navigation.navigate('FoodList')}
                />
            </View>
        );
    }
}