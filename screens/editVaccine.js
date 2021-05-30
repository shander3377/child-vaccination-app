import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView
} from "react-native";
import Places from "google-places-web";
import db from '../config.js';
import * as Animatable from "react-native-animatable";
import {SearchBar, Header, Icon} from "react-native-elements"
import {LinearGradient} from "expo-linear-gradient"
import firebase from "firebase"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import * as Location from 'expo-location';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
export default class editVaccine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:  this.props.navigation.getParam("details")[0],
      expected:  this.props.navigation.getParam("details")[1],
      actual: "",
      doctor: "",
      shouldShow: false,
      textToShow: "Vaccination Date"
    }
  }
  UploadData = async(id, userid)=>{
      var name = this.state.name
await db.collection("user").doc(userid).collection("childrens").doc(id).update({
name: [this.state.name, this.state.expected, this.state.actual.nativeEvent.timestamp, this.state.doctor]
})
  }
  getNew = async(id) =>{
    var docid = ""
    await db.collection("user").doc(id).collection("childrens").get().then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
            docid = doc.id
 
      });
  });
  setTimeout(()=>  this.UploadData(docid, id), 100);
  }
 getPhone = async()=>{
  var phone = firebase.auth().currentUser.phoneNumber
  await db.collection("user").where("mobile_no", "==", phone).get().then((snapshot) => {
    snapshot.forEach(async(doc) => {
this.getNew(doc.id)

    
 
   });
     
             })
             
 }
 
 _alertIndex(index) {
  this.props.navigation.navigate("EditVaccine", {
    details: this.state.tableData[index],
  });
}
checkDocInput = (text) =>{
  if(text){
    this.setState({doctor: text})
  } 
}
checkDOB = (text) =>{
  if(text){
    this.setState({actual: text.nativeEvent.timestamp, textToShow: new Date(text.nativeEvent.timestamp).toDateString(), shouldShow: false})

  }
}
dobinput = () =>{
  this.setState({shouldShow: true})
}
    render() {
      const state = this.state;
   

      return (
        <View style={styles.container}>
             <Header
ViewComponent={LinearGradient}
leftComponent={<Icon name='arrow-left' type='font-awesome' color='#5db8fe' size={35} onPress={()=>this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Save Vaccination Details', style: { color: '#5db8fe', fontSize: 15, paddingTop: 5} }}
  rightComponent={<Icon name='home' type='font-awesome' color='#5db8fe' size={35} onPress={()=>this.props.navigation.navigate("HomeScreen")}/>}
  linearGradientProps={{
    colors:['#8431bc', '#BE414D', '#EC670F'],
    start:{ x: -1, y: 0 },
    end:{ x: 1, y: 0 }
  }}
  containerStyle={{height: 70, width: 1000, marginLeft: -25}}
/>   
          <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Vaccine Name: {this.state.name}</Text>
          <Text style={styles.itemText}>Expected Date: {this.state.expected}</Text>
        </View>
   
        <View style={[styles.itemContainer, {height: 180}]}>
          <Text style={styles.itemText}>Please Fill the details below:</Text>
          <Text style={styles.footerText}> Doctor/Hospital Name</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#ff5300" size={30} style={{marginLeft: 2}} />
                      <TextInput
                          placeholder="Doctor/Hospital Name"
                          style={styles.textInput}
                          onChangeText={(text) => this.checkDocInput(text)}
                          placeholderTextColor="#5f8bad"
                      />
                      {this.state.checkDocInput ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>
                  </View>
          
                    <TouchableOpacity style={[styles.itemContainer, {height: 100}]} onPress={()=>{this.dobinput()}}>
          <Text style={[styles.itemText, {fontSize: 25, marginTop: 25}]}>{this.state.textToShow}</Text>
          </TouchableOpacity>
{this.state.shouldShow ? (<DateTimePicker
          mode={"date"}
          display="calendar"
          onChange={(date)=>this.checkDOB(date)}
          value={new Date()}
        />):(null)}

<TouchableOpacity style={[styles.itemContainer, {height: 100}]} onPress={()=>{this.getPhone()}}>
          <Text style={[styles.itemText, {fontSize: 30, marginTop: 25}]}>Save</Text>
          </TouchableOpacity>
    
                </View>
      )
    }
  
  }
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#ff5300' },
   itemContainer: {backgroundColor: '#5db8fe', borderRadius: 15, height: 150, marginTop: 20},
   animation: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ff5300",
    paddingBottom: 5,
},
textInput: {
    flex: 1,
    paddingLeft: 10,
},
footerText: {
  color: "white",
  marginTop: 20,
  fontSize: 18,
  fontWeight: "bold"
},
   itemText: {marginTop: 15, color: "white", fontSize: 20, textAlign: 'center', fontWeight: 'bold'}
  });