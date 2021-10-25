import React, { useEffect, useState } from 'react';
import {styles} from '../assets/style';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Header } from './header';
import { Picker} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { vh, vw } from 'react-native-expo-viewport-units';
import { RNS3 } from 'react-native-aws3';
import { Config } from './config';
import { RadioButton } from 'react-native-paper';
import { Headerm } from './headerm';

const s3URLArray = [];
let j = 0;
const monthNo=[1,2,3,4,5,6];
const dir = ['East', 'West', 'North', 'South'];
const dirPhotu = [];
let i = 0;
export const Inspection = ({navigation}) => {

    const [connect, setConnect] = useState('');
    const [load, setLoad] = useState('');
    const [voltage, setVoltage] = useState('');

    const [wallChecked, setWallChecked] = useState('');
    const [parapetCheck, setParapetCheck] = useState('');
    const [parapetValue, setParapetValue] = useState('');

    const [consChecked, setConsChecked] = useState('');
    const [consCheck, setConsCheck] = useState('');
    const [consValue, setConsValue] = useState('');

    const [birdChecked, setbirdChecked] = useState('');
    const [birdCheck, setbirdCheck] = useState('');
    const [birdValue, setbirdValue] = useState('');

    const [monkChecked, setMonkChecked] = useState('');
    const [monkCheck, setMonkCheck] = useState('');
    const [monkValue, setMonkValue] = useState('');

    const [eleChecked, setEleChecked] = useState('');
    const [eleCheck, setEleCheck] = useState('');
    const [eleValue, setEleValue] = useState('');

    const [highChecked, setHighChecked] = useState('');
    const [heightCheck, setHeightCheck] = useState('');
    const [heightValue, setHeightValue] = useState('');

    const [strChecked, setStrChecked] = useState('');
    const [strCheck, setStrCheck] = useState('');
    const [strValue, setStrValue] = useState('');

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    //const [otherImage, setOtherImage] = useState('');
    const [adres, setAdres] = useState('');
    const [point, setPointS] = useState('');
    const [mobC, setMobC] = useState('');
    const [nAirp, setNAirp] = useState('');
    const [nRail, setNRail] = useState('');
    const [dRail, setDRail] = useState('');
    const [nBus, setNBus] = useState('');
    const [dBus, setDBus] = useState('');
    const [dAirp, setDAirp] = useState('');
    const [heightB, setHeightB] = useState('');
    const [roofAccess, setRoofAccess] = useState('');
    const [delivery, setDelivery] = useState('');
    const [dRoof, setDRoof] = useState('');
    const [dNBuild, setDNBuild] = useState('');
    const [nHeightB, setNHeightB] = useState('');
    const [dcCable, setDcCable] = useState('');
    const [acCable, setAcCable] = useState('');
    const [build, setbuild] = useState('');
    const [roofType, setRoofType] = useState('');
    const [agBuild, setAgBuild] = useState('');
    const [agRoof, setAgRoof] = useState('');
    const [hRoof, setHRoof] = useState('');
    const [BuildingOwnership, setBuildingOwnership] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [states, setStates] = useState('');
    const [mobP, setMobP] = useState('');
    const [emailC, setEmailC] = useState('');
    const [emailP, setEmailP] = useState('');
    const [show, setShow] = useState('No-show');
    const [showM6, setShowM6] = useState('No-show');
    const [showM5, setShowM5] = useState('No-show');
    const [showM4, setShowM4] = useState('No-show');
    const [showM1, setShowM1] = useState('No-show');
    const [showM3, setShowM3] = useState('No-show');
    const [showM2, setShowM2] = useState('No-show');
    const [s3UriM1, setS3UriM1] = useState('');
    const [s3UriM2, setS3UriM2] = useState('');
    const [s3UriM3, setS3UriM3] = useState('');
    const [s3UriM4, setS3UriM4] = useState('');
    const [s3UriM5, setS3UriM5] = useState('');
    const [s3UriM6, setS3UriM6] = useState('');
    const [s3UriD1, setS3UriD1] = useState('');
    const [s3UriD2, setS3UriD2] = useState('');
    const [s3UriD3, setS3UriD3] = useState('');
    const [s3UriD4, setS3UriD4] = useState('');
    const [s3UriOI, setS3UriOI] = useState('');
    const [showD4, setShowD4] = useState('No-show');
    const [showD1, setShowD1] = useState('No-show');
    const [showD3, setShowD3] = useState('No-show');
    const [showD2, setShowD2] = useState('No-show');

    const [loc, setLoc] = useState({
        latitude: '',
        longitude: ''
    });

    const file = {
        uri: "",
        name: "",
        type: "image/png"
    }

    const handleSubmit = () => {
        let formdata = new FormData();
            formdata.append("Client's Name", name);
            formdata.append("Address", adres);
            formdata.append("Name POC", point);
            formdata.append("Height of Building", heightB);
            formdata.append("Distance of Airport", dAirp);
            formdata.append("Roof Access", roofAccess);
            formdata.append("Material Delivery", delivery);
            formdata.append("Dimensions of Roof", dRoof);
            formdata.append("Nearby Building Distance", dNBuild);
            formdata.append("Nearby Building Height", nHeightB);
            formdata.append("Building Type", build);
            formdata.append("Roof Type", roofType);
            formdata.append("Age of Building", agBuild);
            formdata.append("Parapet Wall on Roof", parapetCheck);
            formdata.append("Height of Parapet Wall", parapetValue);
            formdata.append("Is SIte Fully Constructed", consCheck);
            formdata.append("Time of Completion", consValue);
            formdata.append("Problem of Monkey", monkCheck);
            formdata.append("Problem of Birds", birdCheck);
            formdata.append("Is Elevated Structure", eleCheck);
            formdata.append("Elevated Structure", eleValue);
            formdata.append("Any Nearby HighRise Building", heightCheck);
            formdata.append("HighRise Height & Distance", heightValue);
            formdata.append("Any Equipment on Roof", strCheck);
            formdata.append("Dimensions of Equipment", strValue);
            formdata.append("Other Comments", comment);
            formdata.append("Other Image", s3UriOI);
            formdata.append("City", city);
            formdata.append("District", district);
            formdata.append("State", states);
            formdata.append("POC Mobile No.", mobP);
            formdata.append("Client's Email", emailC);
            formdata.append("POC's Email", emailP);
            formdata.append("No. of Connections", connect);
            formdata.append("Connection Load", load);
            formdata.append("Connection Voltage", voltage);
            formdata.append("Building Ownership", BuildingOwnership);
            formdata.append("Age of Roof", agRoof);
            formdata.append("Height of Roof", hRoof);
            formdata.append("Length of DC Cable", dcCable);
            formdata.append("Length of AC Cable", acCable);
            formdata.append("Distance of Bus Terminus", dBus);
            formdata.append("Name of Bus Terminus", nBus);
            formdata.append("Distance of Railway Station", dRail);
            formdata.append("Name of Railway Station", nRail);
            formdata.append("Name of Airport", nAirp);
            formdata.append("Client's Mob No.", mobC);
            //formdata.append("photo", s3uri);
            formdata.append("Latitude", loc.latitude);
            formdata.append("Longitude", loc.longitude);
            formdata.append("Month1", s3UriM1);
            formdata.append("Month2", s3UriM2);
            formdata.append("Month3", s3UriM3);
            formdata.append("Month4", s3UriM4);
            formdata.append("Month5", s3UriM5);
            formdata.append("Month6", s3UriM6);
            formdata.append("East", s3UriD1);
            formdata.append("West", s3UriD2);
            formdata.append("North", s3UriD3);
            formdata.append("South", s3UriD4);
    
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
        console.log("useeffect called!!!");
        console.log("useeffect",s3URLArray)
        }
      , []);

    const onChooseImagePressM1 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriM1(response.body.postResponse.location);
                setShowM1('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }

    const onChooseImagePressM2 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriM2(response.body.postResponse.location);
                setShowM2('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }

    const onChooseImagePressM3 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriM3(response.body.postResponse.location);
                setShowM3('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }

    const onChooseImagePressM4 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriM4(response.body.postResponse.location);
                setShowM4('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }

    const onChooseImagePressM5 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriM5(response.body.postResponse.location);
                setShowM5('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }

    const onChooseImagePressM6 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriM6(response.body.postResponse.location);
                setShowM6('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }

    const onChooseImagePressD1 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriD1(response.body.postResponse.location);
                setShowD1('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }

    const onChooseImagePressD2 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriD2(response.body.postResponse.location);
                setShowD2('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }
    const onChooseImagePressD3 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriD3(response.body.postResponse.location);
                setShowD3('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }
    const onChooseImagePressD4 = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriD4(response.body.postResponse.location);
                setShowD4('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }

    const onChooseImagePressOI = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        console.log(result.cancelled)
        if(result.cancelled=== true){
            Alert.alert('No Image','You did not select any image')
        }
        else{
            //let result = await ImagePicker.launchImageLibraryAsync();
            //console.log(result.uri)
            file.uri = result.uri;
            file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
            file.type = 'image/jpg';
            //console.log(file);
            RNS3.put(file, Config).then(response => {
                // if (response.status !== 201)
                // throw new Error("Failed to upload image to S3 bucket");
                //console.log("Response s3: ",response.body.postResponse.location);
                setS3UriOI(response.body.postResponse.location);
                setShow('blah')
                //console.log(s3uri);
                Alert.alert('Image', 'Image Uploaded Successfully')
            })

        }
    }

    // const onChooseImagePress = async () =>{
    //     let result = await ImagePicker.launchCameraAsync();
    //     console.log(result.cancelled)
    //     if(result.cancelled=== true){
    //         Alert.alert('No Image','You did not select any image')
    //     }
    //     else{
    //         //let result = await ImagePicker.launchImageLibraryAsync();
    //         console.log(result.uri)
    //         file.uri = result.uri;
    //         file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
    //         file.type = 'image/jpg';
    //         //console.log(file);
    //         RNS3.put(file, Config).then(response => {
    //             // if (response.status !== 201)
    //             // throw new Error("Failed to upload image to S3 bucket");
    //             //console.log("Response s3: ",response.body.postResponse.location);
    //             setS3Uri(response.body.postResponse.location);
    //             console.log(s3uri);
    //         })
    //         if(s3uri.length > 0){
    //             j++;
    //             s3URLArray.push(s3uri)
    //             console.log(s3URLArray)
    //         }else{
    //             Alert.alert('Image not uploaded','Please try again')
    //         }
    //     }
    // }

    // const onChooseImagePressDir = async () =>{
    //     let result = await ImagePicker.launchCameraAsync();
    //     console.log(result.cancelled)
    //     if(result.cancelled=== true){
    //         Alert.alert('No Image','You did not select any image')
    //     }
    //     else{
    //         //let result = await ImagePicker.launchImageLibraryAsync();
    //         console.log(result.uri)
    //         file.uri = result.uri;
    //         file.name = `sunkonnect/${new Date(Date.now()).toISOString()}.jpg`;
    //         file.type = 'image/jpg';
    //         //console.log(file);
    //         RNS3.put(file, Config).then(response => {
    //             // if (response.status !== 201)
    //             // throw new Error("Failed to upload image to S3 bucket");
    //             //console.log("Response s3: ",response.body.postResponse.location);
    //             setS3Uri(response.body.postResponse.location);
    //             console.log(s3uri);
    //         })
    //         if(s3uri.length>0){
    //             i++;
    //             dirPhotu.push(s3uri)
    //             console.log(dirPhotu)
    //         }else{
    //             Alert.alert('Image not uploaded','Please try again')
    //         }
    //     }
    // }

        return (
            <View style={styles.container}>
            <Headerm headerName={'Inspection'} navigation={navigation}/>
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
                        <Picker.Item label= 'Method of Material delivery on Roof' value="disabled" color="#aaa" />
                        <Picker.Item label='Lift' value='Lift' />
                        <Picker.Item label='Crane' value='Crane' />
                        <Picker.Item label='Stairs' value='Stairs' />
                        <Picker.Item label='Others' value='Others' />

                    </Picker>
                </View>
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
                            marginLeft: 20,
                            
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
                            marginLeft: 20,
                            marginBottom:10,
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
                            onChangeText={(text) => setParapetValue(text)}
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
                            marginLeft: 20,
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
                            marginLeft: 20,
                            marginBottom:10,
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
                            placeholder='Enter Building Height And Distance'
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
                            color: '#FDA162',
                            padding: 10,
                            marginLeft: 20,
                            marginTop: 20,
                            fontSize: 15,
                        }} 
                    >
                        Any Major Equipment on Roof (Water Tank, Ventilating Unit etc)?
                    </Text>
                    <TouchableOpacity 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20,
                        }}
                    >
                        <RadioButton 
                            value="Yes"
                            status={ strChecked === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setStrChecked('Yes')
                                setStrCheck('Yes')
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
                            marginLeft: 20,
                            marginBottom:10,
                        }}
                    >
                        <RadioButton 
                            value="No"
                            status={ strChecked === 'no' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setStrChecked('no')
                                setStrCheck('No')
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
                        strCheck === 'Yes' ? 
                        <TextInput 
                            style={styles.input} 
                            placeholder='Dimensions of Equipment'
                            onChangeText={(text) => setStrValue(text)}
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
                            color: '#FDA162',
                            padding: 10,
                            marginLeft: 20,
                            marginTop: 20,
                            fontSize: 15,
                        }} 
                    >
                        Is Site Fully Constructed ?
                    </Text>
                    <TouchableOpacity 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20,
                        }}
                    >
                        <RadioButton 
                            value="Yes"
                            status={ consChecked === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setConsChecked('Yes')
                                setConsCheck('Yes')
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
                            marginLeft: 20,
                            marginBottom:10,
                        }}
                    >
                        <RadioButton 
                            value="No"
                            status={ consChecked === 'no' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setConsChecked('no')
                                setConsCheck('No')
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
                        consCheck === 'No' ? 
                        <TextInput 
                            style={styles.input} 
                            placeholder='Tentative Time For Completion'
                            onChangeText={(text) => setConsValue(text)}
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
                            color: '#FDA162',
                            padding: 10,
                            marginLeft: 20,
                            marginTop: 20,
                            fontSize: 15,
                        }} 
                    >
                        Is Elevated Structure OK ?
                    </Text>
                    <TouchableOpacity 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20,
                        }}
                    >
                        <RadioButton 
                            value="Yes"
                            status={ eleChecked === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setEleChecked('Yes')
                                setEleCheck('Yes')
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
                            marginLeft: 20,
                            marginBottom:10,
                        }}
                    >
                        <RadioButton 
                            value="No"
                            status={ eleChecked === 'no' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setEleChecked('no')
                                setEleCheck('No')
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
                        eleCheck === 'No' ? 
                        <TextInput 
                            style={styles.input} 
                            placeholder='Add Comments'
                            onChangeText={(text) => setEleValue(text)}
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
                            color: '#FDA162',
                            padding: 10,
                            marginLeft: 20,
                            marginTop: 20,
                            fontSize: 15,
                        }} 
                    >
                        Is There Any Problem of Birds in Locality ?
                    </Text>
                    <TouchableOpacity 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20,
                        }}
                    >
                        <RadioButton 
                            value="Yes"
                            status={ birdChecked === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setbirdChecked('Yes')
                                setbirdCheck('Yes')
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
                            marginLeft: 20,
                            marginBottom:10,
                        }}
                    >
                        <RadioButton 
                            value="No"
                            status={ birdChecked === 'no' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setbirdChecked('no')
                                setbirdCheck('No')
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
                        Is There Any Problem of Monkeys in Locality ?
                    </Text>
                    <TouchableOpacity 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20,
                        }}
                    >
                        <RadioButton 
                            value="Yes"
                            status={ monkChecked === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setMonkChecked('Yes')
                                setMonkCheck('Yes')
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
                            marginLeft: 20,
                            marginBottom:10,
                        }}
                    >
                        <RadioButton 
                            value="No"
                            status={ monkChecked === 'no' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setMonkChecked('no')
                                setMonkCheck('No')
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
                <View
                    style={styles.inputpi}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            padding: 10,
                        }}
                    >
                        Number of electricity connections of site (1, 2, 3...)
                    </Text>
                    <Text
                        style={{
                            //fontWeight: 'bold',
                            color: 'red',
                            padding: 10,
                        }}
                        >
                        If connections > 1, enter load and voltage of each connection separated by comma(,)
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: '#F4F5FC',
                            borderColor: '#FDA162',
                            borderWidth: 3,      
                            padding: 20,
                            margin: 10,
                            width: '94%',
                            borderRadius: 20,
                        }}
                        placeholder='Enter number of connections'
                        onChangeText={(ll)=> setConnect(ll)}
                     />
                </View>
                    
                    <TextInput
                        style={styles.input}
                        placeholder='Enter sanctioned load of connections'
                        onChangeText={(la)=> setLoad(la)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter connected voltages'
                        onChangeText={(lb)=> setVoltage(lb)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Any Other Comments'
                        onChangeText={(cc)=> setComment(cc)}
                    />
                    <Text style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 60,
                        fontWeight: 'bold',
                    }}>Upload Electricity Bill of Past Six Months</Text>
                {/* {
                    j < 6 ?
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
                            Upload Electricity Bill Image of Month {monthNo[j]}
                        </Text>
                    </TouchableOpacity>
                    :
                    <View
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
                            Thanks for uploading photos
                        </Text>
                    </View>
                } */}
                
                {/* {
                    i < 4 ?
                    <TouchableOpacity
                        onPress = {() => {
                                onChooseImagePressDir()
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
                            Upload Photo of {dir[i]}  Direction
                        </Text>
                    </TouchableOpacity>
                    :
                    <View
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
                            Thanks for uploading photos
                        </Text>
                    </View>
                } */}
                {
                    showM1 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressM1()
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
                        Upload Electricity Bill Of Month 1
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

                {
                    showM2 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressM2()
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
                        Upload Electricity Bill Of Month 2
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

                {
                    showM3 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressM3()
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
                        Upload Electricity Bill Of Month 3
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
                {
                    showM4 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressM4()
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
                        Upload Electricity Bill Of Month 4
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
                {
                    showM5 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressM5()
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
                        Upload Electricity Bill Of Month 5
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
                {
                    showM6 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressM6()
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
                        Upload Electricity Bill Of Month 6
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
                <Text style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 38,
                    fontWeight: 'bold',
                }}>Upload Site Image of Directions Mentioned Below</Text>
                {
                    showD4 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressD4()
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
                        Site Image of East Direction
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
                {
                    showD3 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressD3()
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
                        Site Image of West Direction
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
                {
                    showD2 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressD2()
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
                        Site Image of North Direction
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
                {
                    showD1 === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressD1()
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
                        Site Image of South Direction
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
                {
                    show === 'No-show' ?
                <TouchableOpacity
                    onPress = {() => {
                            
                            onChooseImagePressOI()
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
                        Any Other Image
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
            </ScrollView>
            </View>
        )
}
