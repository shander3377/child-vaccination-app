import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from "react-native";
import Places from "google-places-web";
import * as Animatable from "react-native-animatable";
import {SearchBar} from "react-native-elements"
import * as Location from 'expo-location';
export default class PedNearMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: "",
            long: ""
        }
    }
getPerms = async()=>{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
    this.props.navigation.navigate("WelcomeScreen")
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
        lat: location.coords.latitude,
        long: location.coords.longitude
    })
    this.getPeds()
}
getPeds = async()=>{
    try {
        const response = await Places.nearbysearch({
          location: this.state.lat+","+this.state.long,
          type: ["doctor"], // Undefined type will return all types
          rankby: "distance" // See google docs for different possible values
        });
       
console.warn(response);
      } catch (error) {
        console.log(error);
      }
}
componentDidMount = async() =>{
    Alert.alert(
        "To use This functionality you need to allow location access",
        [
          {
            text: "Cancel",
            onPress: () => this.props.navigation.navigate("WelcomeScreen"),
 
          },
          { text: "OK", onPress: () => this.getPerms() }
        ]
      );
    

}
  render() {
    return (
      <View>
       <Text>Home Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stretch: {
    width: 390,
    height: 300,
 marginTop: -121
  },
  textinput: {
    width: "100%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "black",
    color: "#FFFFFF"
  },
});
