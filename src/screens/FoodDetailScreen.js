import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class FoodDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Food Detail',
    };
    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Food Detail Screen </Text>  
            </View>
        );
    }
}