import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class SignupScreen extends React.Component {
    static navigationOptions = {
        title: 'Signup',        
        headerTitle: <HeaderSearch />,
    };
    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Signup Screen </Text>  
            </View>
        );
    }
}