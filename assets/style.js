import { StyleSheet } from "react-native";
import { vh, vw } from 'react-native-expo-viewport-units';

export const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1,
        backgroundColor: '#FDA162',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    logo: {
        marginTop: vh(3),
        //marginBottom: '15%',
        marginLeft: vw(3),
        width: vw(30),
        height: vh(10),
        resizeMode: "contain",
      },
      menu: {
        marginTop: vh(6),
        //marginRight: vw(30),
        //marginHorizontal: vw(0),
        marginLeft: vw(4),
        marginRight: vw(1),
        width: vw(20),
        height: vh(5),
        resizeMode: "contain",
        position: 'relative'
      },
      header: {
        //marginTop: Constants.StatusBarHeight,
        position: "absolute",
        backgroundColor: '#fff',
        top: 0,
        zIndex: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        width: vw(100),
        height: vh(13),  
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        //paddingTop: StatusBar.currentHeight,
      },
      input: {
        backgroundColor: '#F4F5FC',
        borderColor: '#FDA162',
        borderWidth: 3,      
        padding: 20,
        margin: 20,
        width: '94%',
        borderRadius: 20,
      },
      inputpi: {
        backgroundColor: '#F4F5FC',
        borderColor: '#FDA162',
        borderWidth: 3,      
        //padding: 2,
        margin: 20,
        width: '94%',
        borderRadius: 20,
      },

})