import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import IconBadge from 'react-native-icon-badge';

export default class ShoppingCartButton extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>{this.props.onPress}}>
          
            <IconBadge
              MainElement={
                <Image source = {require('../../assets/icons/cart.png')}  
                style={{width:35, height:35, margin:6 }}/>
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>12</Text>
              }
              IconBadgeStyle={
                {width:20,
                height:20,
                backgroundColor: '#FF0011'}
              }
  
            />
          </TouchableOpacity>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    button: {
      backgroundColor: '#859a9b',
      borderRadius: 20,
      padding: 10,
      marginBottom: 20,
      shadowColor: '#303838',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      shadowOpacity: 0.35,
    },
  });  