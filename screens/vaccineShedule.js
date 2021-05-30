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
export default class VaccineShedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'Plan', 'Actual', 'Doctor'],
      tableData: []
    }
  }
  setTheState = (data)=>{
    data[0][1] = new Date(data[0][1]).toDateString()
    data[1][1] = new Date(data[1][1]).toDateString()
    data[2][1] = new Date(data[2][1]).toDateString()

    this.setState({tableData: data})
  }
  getNew = async(id) =>{
    var vaccines = []
    await db.collection("user").doc(id).collection("childrens").get().then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        newData = doc.data()
            vaccines.push(newData.vaccine1, newData.vaccine2, newData.vaccine3, newData.vaccine4, newData.vaccine5)
 
      });
  });
  setTimeout(()=>  this.setTheState(vaccines), 100);
  }
 componentDidMount = async()=>{
  var phone = firebase.auth().currentUser.phoneNumber
  await db.collection("user").where("mobile_no", "==", phone).get().then((snapshot) => {
    snapshot.forEach(async(doc) => {
this.getNew(doc.id)

    
 
   });
     
             })
             
 }
 
 _alertIndex(index) {
  this.props.navigation.navigate("editVaccine", {
    details: this.state.tableData[index],
  });
}
element = (data, index)=>{
if(this.state.tableData[index][2] === "-"){
  return(
    <TouchableOpacity onPress={() => this._alertIndex(index)}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>Edit</Text>
    </View>
  </TouchableOpacity>
  )
} else {
  var date = new Date(this.state.tableData[index][2]).toDateString()
  return(
<Text style={styles.btnText}>{date}</Text>
  )
}
}

    render() {
      const state = this.state;
   
      return (
        <View style={styles.container}>
              <Header
ViewComponent={LinearGradient}
leftComponent={<Icon name='arrow-left' type='font-awesome' color='#5db8fe' size={35} onPress={()=>this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Schedule Vaccination', style: { color: '#5db8fe', fontSize: 15, paddingTop: 5} }}
  rightComponent={<Icon name='home' type='font-awesome' color='#5db8fe' size={35} onPress={()=>this.props.navigation.navigate("HomeScreen")}/>}
  linearGradientProps={{
    colors:['#8431bc', '#BE414D', '#EC670F'],
    start:{ x: -1, y: 0 },
    end:{ x: 1, y: 0 }
  }}
  containerStyle={{height: 70, width: 1000, marginLeft: -25}}
/>   
          <Table borderStyle={{borderColor: 'transparent'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
            {
              state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 2 ? this.element(cellData, index) : cellData} textStyle={styles.text}/>
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        </View>
      )
    }
  
  }
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#ff5300', borderTopLeftRadius: 10, borderTopRightRadius: 10},
    row: { flexDirection: 'row', backgroundColor: '#828acf'},
    text: { textAlign: 'center', color: "white" },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff', fontSize: 10 }
  });