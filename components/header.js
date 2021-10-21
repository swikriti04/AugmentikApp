import React, {useEffect, useState} from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Alert, StatusBar} from 'react-native'
import { styles } from '../assets/style'
import { vh, vw } from 'react-native-expo-viewport-units';


export const Header = ({headerName = '', navigation}) => {
    //console.log(navigation)
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        //console.log(headerName)
    })

    return (
        <View style={styles.header}>
            
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
                
            <Text style={{
                fontSize: 24,
                textAlign: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                //paddingRight: vw(0),
                marginRight: vw(27),
                //marginHorizontal: vw(2),
                marginLeft: vw(1),
                marginTop: vh(5.8),
                marginBottom: 0,
                //marginHorizontal: vw(10),
            }}>
                {headerName}
            </Text>
                <TouchableOpacity onPress = {() => {
                    console.log('hi')
                    setModalVisible(true);
                }}>
                    {/* <Image style={styles.menu} source={require('../assets/images/menu.png')} /> */}
                </TouchableOpacity>
            </View>
    )
}

