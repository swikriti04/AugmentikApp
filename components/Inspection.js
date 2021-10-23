import React, { useEffect, useState } from 'react'
import {styles} from '../assets/style'
import { Text, View, Button, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Header } from './header';
import { Picker} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { vh, vw } from 'react-native-expo-viewport-units';
import { RNS3 } from 'react-native-aws3';
import { Config } from './config';
import { RadioButton } from 'react-native-paper';

export const Inspection = ({navigation}) => {

    const [wallChecked, setWallChecked] = useState('');
    const [parapetCheck, setParapetCheck] = useState('No');
    const [parapetValue, setParapetValue] = useState('');

    const [highChecked, setHighChecked] = useState('');
    const [heightCheck, setHeightCheck] = useState('No');
    const [heightValue, setHeightValue] = useState('');

    const [name, setName] = React.useState('');
    const [adres, setAdres] = React.useState('');
    const [point, setPointS] = React.useState('');
    const [mobC, setMobC] = React.useState('');
    const [nAirp, setNAirp] = React.useState('');
    const [nRail, setNRail] = React.useState('');
    const [dRail, setDRail] = React.useState('');
    const [nBus, setNBus] = React.useState('');
    const [dBus, setDBus] = React.useState('');
    const [dAirp, setDAirp] = React.useState('');
    const [heightB, setHeightB] = React.useState('');
    const [roofAccess, setRoofAccess] = React.useState('');
    const [delivery, setDelivery] = React.useState('');
    const [dRoof, setDRoof] = React.useState('');
    const [dNBuild, setDNBuild] = React.useState('');
    const [nHeightB, setNHeightB] = React.useState('');
    const [dcCable, setDcCable] = React.useState('');
    const [acCable, setAcCable] = React.useState('');
    const [build, setbuild] = React.useState('');
    const [roofType, setRoofType] = React.useState('');
    const [agBuild, setAgBuild] = React.useState('');
    const [agRoof, setAgRoof] = React.useState('');
    const [hRoof, setHRoof] = React.useState('');
    const [BuildingOwnership, setBuildingOwnership] = React.useState('');
    const [city, setCity] = React.useState('');
    const [district, setDistrict] = React.useState('');
    const [states, setStates] = React.useState('');
    const [mobP, setMobP] = React.useState('');
    const [emailC, setEmailC] = React.useState('');
    const [emailP, setEmailP] = React.useState('');
    const [show, setShow] = useState('No-show');
    const [s3uri, setS3Uri] = useState('');
    const [loc, setLoc] = React.useState({
        latitude: '',
        longitude: ''
    });

    const file = {
        uri: "",
        name: "",
        type: "image/png"
    }

    const handleSubmit = () => {
        var formdata = new FormData();
            formdata.append("name", name);
            formdata.append("photo", s3uri);
            formdata.append("Latitude", loc.latitude);
            formdata.append("Longitude", loc.longitude);
    
            console.log(formdata);
            
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow'
            };
            
            fetch("https://sheet.best/api/sheets/7df5f5ed-f376-49b4-935f-640cfb9c3b77", requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));

            navigation.navigate('ProSelect')
    }

    const setCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          //console.log(errorMsg)
          return;
        }
        if(status=== 'granted'){
            //console.log('granted')
            let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
            //console.log('location',location)
            setLoc({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            //console.log(loc);
            //console.log(loc)
        }
      }; 
    
    useEffect(() => {
        setCurrentLocation();
        }
      , []);


    const onChooseImagePress = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3Uri(response.body.postResponse.location);
                setShow('blah')
                console.log(s3uri);
            })

        }
    }

    console.log('Insp')
        return (
            <View style={styles.container}>
            <Header headerName={'Inspection'} navigation={navigation}/>
            <ScrollView
                style={{
                    marginTop: '30%',
                    marginRight: '4%',
                    marginBottom: '5%',
                    width: '95%',
                    borderRadius: 10,
                    borderBottomColor: '#e6e6e6',
                }}
            >
                <TextInput 
                    style={styles.input}
                    placeholder="Enter Client's Name"
                    onChangeText={(n) => setName(n)}
                />

                
                <TextInput 
                    style={styles.input}
                    placeholder="Mobile Number of Client"
                    onChangeText={(b) => setMobC(b)}
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Email Id of Client"
                    onChangeText={(c) => setEmailC(c)}
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Point of Contact (POC) Site"
                    onChangeText={(a) => setPointS(a)}
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Mobile Number of POC"
                    onChangeText={(d) => setMobP(d)}
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Email Id of POC"
                    onChangeText={(e) => setEmailP(e)}
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Site Address"
                    onChangeText={(f) => setAdres(f)}
                />
                
                <TextInput 
                    style={styles.input}
                    placeholder="State"
                    onChangeText={(g) => setStates(g)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="City"
                    onChangeText={(h) => setCity(h)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="District"
                    onChangeText={(i) => setDistrict(i)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Height of Building"
                    onChangeText={(j) => setHeightB(j)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Dimensions of Roof (LxB) in meter sq"
                    onChangeText={(k) => setDRoof(k)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Nearby Building Height"
                    onChangeText={(l) => setNHeightB(l)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Nearby Building Distance from Site"
                    onChangeText={(m) => setDNBuild(m)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Name of Nearest Airport"
                    onChangeText={(o) => setNAirp(o)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Distance Nearest Airport"
                    onChangeText={(p) => setDAirp(p)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Name of Nearest Bus Terminus"
                    onChangeText={(r) => setNBus(r)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Distance of Nearest Bus Terminus"
                    onChangeText={(s) => setDBus(s)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Name of Nearest Railway Station"
                    onChangeText={(t) => setNRail(t)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Distance of Nearest Railway Station"
                    onChangeText={(u) => setDRail(u)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Age of Building"
                    onChangeText={(v) => setAgBuild(v)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Age of Roof"
                    onChangeText={(w) => setAgRoof(w)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Height of Roof"
                    onChangeText={(x) => setHRoof(x)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Tentative Length of DC Cable"
                    onChangeText={(y) => setDcCable(y)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Tentative Length of AC Cable"
                    onChangeText={(z) => setAcCable(z)}
                />

                <View style={styles.inputpi}>
                    <Picker
                        style={styles.input}
                        onValueChange={ (value) => {
                            setbuild(value)
                            //console.log(build)
                        }}
                        itemStyle={{backgroundColor: '#ffe4e1'}}
                        selectedValue = {build}

                    >
                        <Picker.Item label= 'Select Building Type *' value="disabled" color="#aaa" backgroundColor = '#ffe4e1' />
                        <Picker.Item label='Residential' value='Residential' />
                        <Picker.Item label='Industrial' value='Industrial' />
                        <Picker.Item label='Commercial' value='Commercial' />
                        <Picker.Item label='Government' value='Government' />
                        <Picker.Item label='Farms' value='Farms' />
                        <Picker.Item label='Others' value='Others' />
                    </Picker>

                </View>

                <View style={styles.inputpi}>

                    <Picker
                        style={styles.input}
                        onValueChange={ (value) => {
                            setBuildingOwnership(value)
                            //console.log(BuildingOwnership)
                        }}
                        selectedValue = {BuildingOwnership}

                    >
                        <Picker.Item label= 'Select Building Ownership *' value="disabled" color="#aaa" />
                        <Picker.Item label='Owned By Client' value='Owned By Client' />
                        <Picker.Item label='Leased By Client' value='Leased By Client' />

                    </Picker>
                </View>

                <View style={styles.inputpi}>
                    <Picker
                        style={styles.input}
                        onValueChange={ (value) => {
                            setRoofType(value)
                            //console.log(build)
                        }}
                        itemStyle={{backgroundColor: '#ffe4e1'}}
                        selectedValue = {roofType}

                    >
                        <Picker.Item label= 'Select Roof Type *' value="disabled" color="#aaa" backgroundColor = '#ffe4e1' />
                        <Picker.Item label='RCC' value='RCC' />
                        <Picker.Item label='Metal Shed' value='Metal Shed' />
                        <Picker.Item label='Asbestos' value='Asbestos' />
                        <Picker.Item label='Others' value='Others' />
                    </Picker>

                </View>
                <View style={styles.inputpi}>

                    <Picker
                        style={styles.input}
                        onValueChange={ (value) => {
                            setRoofAccess(value)
                            //console.log(BuildingOwnership)
                        }}
                        selectedValue = {roofAccess}

                    >
                        <Picker.Item label= 'Roof Access For Man' value="disabled" color="#aaa" />
                        <Picker.Item label='Permanent Stairs' value='Permanent Stair' />
                        <Picker.Item label='Temporary Stairs' value='Temporary Stairs' />
                        <Picker.Item label='ladder' value='ladder' />
                        <Picker.Item label='Others' value='Others' />

                    </Picker>
                </View>
                <View style={styles.inputpi}>

                    <Picker
                        style={styles.input}
                        onValueChange={ (value) => {
                            setDelivery(value)
                            //console.log(BuildingOwnership)
                        }}
                        selectedValue = {delivery}

                    >
                        <Picker.Item label= 'Proposed Method of Material delivery on Roof' value="disabled" color="#aaa" />
                        <Picker.Item label='Lift' value='Lift' />
                        <Picker.Item label='Crane' value='Crane' />
                        <Picker.Item label='Stairs' value='Stairs' />
                        <Picker.Item label='Others' value='Others' />

                    </Picker>
                </View>

                {
                    show === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            onChooseImagePress()
                        }}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 50,
                        width: vw(89),
                        marginLeft: 20,
                        marginTop: 20,
                        padding: 15,
                        marginBottom: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text 
                        style={{
                            fontWeight: 'bold',
                            color: '#FDA162',
                        }} 
                       
                    >
                        Upload Electricity Bill Image
                    </Text>
                </TouchableOpacity>
                :
                <View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 50,
                            width: vw(89),
                            marginLeft: 20,
                            marginTop: 20,
                            padding: 15,
                            marginBottom: 18,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text 
                            style={{
                                fontWeight: 'bold',
                                color: '#FDA162',
                            }} 
                        >
                            Uploaded
                        </Text>
                    </TouchableOpacity>

                </View>
    }
                {/* Parapet Check */}
                <View
                    style={styles.inputpi}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#FDA162',
                            padding: 10,
                            marginLeft: 20,
                            marginTop: 20,
                            fontSize: 15,
                        }} 
                    >
                        Parapet wall (safety wall) on roof
                    </Text>
                    <TouchableOpacity 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <RadioButton 
                            value="Yes"
                            status={ wallChecked === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setWallChecked('Yes')
                                setParapetCheck('Yes')
                            }}
                        />
                        <Text style={{
                            color: '#000',
                        }}>
                            Yes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <RadioButton 
                            value="No"
                            status={ wallChecked === 'no' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setWallChecked('no')
                                setParapetCheck('No')
                            }}
                        />
                        <Text style={{
                            color: '#000',
                            marginTop: 8,
                        }}>
                            No
                        </Text>
                    </TouchableOpacity>
                </View>
                    {
                        parapetCheck === 'Yes' ? 
                        <TextInput 
                            style={styles.input} 
                            placeholder='Enter parapet walls height in metres'
                            onChangeText={(text) => setParapetHeight(text)}
                        />
                        :
                        null
                    }
                {/* Major equipment */}
                <View
                    style={styles.inputpi}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#FDA162',
                            padding: 10,
                            marginLeft: 20,
                            marginTop: 20,
                            fontSize: 15,
                        }} 
                    >
                        Any high rise building near site ?
                    </Text>
                    <TouchableOpacity 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <RadioButton 
                            value="Yes"
                            status={ highChecked === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setHighChecked('Yes')
                                setHeightCheck('Yes')
                            }}
                        />
                        <Text style={{
                            color: '#000',
                        }}>
                            Yes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <RadioButton 
                            value="No"
                            status={ highChecked === 'no' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setHighChecked('no')
                                setHeightCheck('No')
                            }}
                        />
                        <Text style={{
                            color: '#000',
                            marginTop: 8,
                        }}>
                            No
                        </Text>
                    </TouchableOpacity>
                </View>
                    {
                        heightCheck === 'Yes' ? 
                        <TextInput 
                            style={styles.input} 
                            placeholder='Enter distance and height'
                            onChangeText={(text) => setHeightValue(text)}
                        />
                        :
                        null
                    }
                <View
                    style={styles.inputpi}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            padding: 10,
                        }}
                    >
                        Number of electricity connections of site (1,2,3….)
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#FDA162',
                            padding: 10,
                        }}
                        >
                        If connections > 1, enter load and voltage of each connection separated by comma(,)
                    </Text>
                </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter number of connections'
                     />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter sanctioned load of connection'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter connected voltage'
                    />
            </ScrollView>
            <TouchableOpacity
                        onPress = {() => {
                            handleSubmit()
                        }}
                    style={{
                        backgroundColor: '#fff',
                        // borderTopLeftRadius: 40,
                        // borderTopRightRadius: 40,
                        borderRadius: 10,
                        marginLeft: '28%',
                        padding: 15,
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text 
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#FDA162',
                        }} 
                        
                    >
                        Select Proposal
                    </Text>
                </TouchableOpacity>
            </View>
        )
}
