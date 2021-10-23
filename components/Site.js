import React, { Component } from 'react'
import {styles} from '../assets/style'
import { Text, View, Button, Image, TouchableOpacity } from 'react-native'
//import { Header } from './header';
import {Headerm} from './headerm';

export const Site = ({navigation}) => {
    console.log('Site')
        return (
            <View style={styles.container}>
            <Headerm headerName={''} navigation={navigation}/>
                <Image style={styles.site} source={require('../assets/images/site.png')}/>
                <TouchableOpacity
                            style={{
                                marginTop: 20,
                                padding: 15,
                                margin: 7,
                                width: '80%',
                                backgroundColor: `#fff`,
                                borderRadius: 70,
                                borderWidth: 3,
                                borderColor: '#16A1DB',
                        }}
                        onPress = {() => navigation.navigate('Verification')}
                >
                    <Text style={{
                                fontSize: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 32,
                                color: '#FDA162',
                                fontWeight: 'bold'
                            }}>Click To Start Inspection</Text>
                </TouchableOpacity>
            </View>
        )
}
