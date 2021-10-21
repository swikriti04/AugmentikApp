import React, { Component } from 'react'
import {styles} from '../assets/style'
import { Text, View, Button } from 'react-native'
import { Header } from './header';

export const ProSelection = ({navigation}) => {
    console.log('Pro')
        return (
            <View style={styles.container}>
            <Header headerName={'Proposal'} navigation={navigation}/>
                <Text> Proposal Selection </Text>
            </View>
        )
}
