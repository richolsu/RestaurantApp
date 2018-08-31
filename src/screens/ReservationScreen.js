import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class ReservationScreen extends React.Component {
    static navigationOptions = {
        title: 'Reservation',        
        headerTitle: <HeaderSearch />,
    };
    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Reservation Screen </Text>  
            </View>
        );
    }
}