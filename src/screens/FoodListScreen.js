import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class FoodListScreen extends React.Component {
    static navigationOptions = {
        title: 'Foods',
    };
    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Foods Screen </Text>  
            </View>
        );
    }
}