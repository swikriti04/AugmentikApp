import React, {useEffect, useState} from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Alert, StatusBar} from 'react-native'
import { styles } from '../assets/style'
import { vh, vw } from 'react-native-expo-viewport-units';


export const Headerm = ({headerName = '', navigation}) => {
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
                marginRight: vw(2),
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
                    <Image style={styles.menu} source={require('../assets/images/menu.png')} />
                </TouchableOpacity>
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    //Alert.alert("Modal has been closed.");
                    setModalVisible(false);
                }}>
                    <View style = {modalStyles.centeredView}>
                        <View style = {modalStyles.modalView}>
                            
                            <Text style= {{
                                padding: 10,
                                fontSize: 20,
                            }}>Menu</Text>

                            <TouchableOpacity 
                                style = {modalStyles.modalText} 
                                onPress = {() => {
                                    console.log('site')
                                    setModalVisible(false)
                                    navigation.navigate('Verification')
                                }} >
                                <Text style = {modalStyles.textStyle }>Site Inspection</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {modalStyles.modalText} 
                                onPress = {() => {
                                    console.log('Proposal')
                                    setModalVisible(false)
                                    navigation.navigate('ProSelect')
                            }}>
                                <Text style = {modalStyles.textStyle}>Proposal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
    )
}

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        marginTop: '17%',
        //width: '70%',
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 23,
        width: '90%',
        height: '95.5%',
        borderWidth: 4,
        borderColor: '#ffe4e1',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        }
    },
    textStyle: {
        color: "black",
        padding: 8,
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "left"
    }
})