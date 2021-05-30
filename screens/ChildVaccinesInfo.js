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
import * as Animatable from "react-native-animatable";
import {SearchBar, Header} from "react-native-elements"
import {LinearGradient} from "expo-linear-gradient"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import * as Location from 'expo-location';
export default class ChildVaccinesInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Name', 'Time', 'Dose', 'Route', 'Site'],
          tableData: [
            ['Diphtheria, Pertussis & Tetanus (DPT) booster-1 ', '16-24 months', '0.5 ml ', 'Intra-muscular', 'Antero-lateral side of mid-thigh'],
            ['MR 2nd dose', '16-24 months', '0.5 ml', 'Intra-muscular', 'Right upper Arm'],
            ['OPV Booster', '16-24 months', '2 drops', 'Oral', 'Oral'],
            ['JE-2', '16-24 months', '0.5 ml', 'Sub-cutaneous (Live attenuated vaccine) Intramuscular(Killed  vaccine) ', 'Left upper Arm (Live attenuated vaccine) Anterolateral aspect of mid thigh (Killed vaccine) '],
            ['Vitamin A (2nd to 9th dose) ', '16-18 months. Then one dose every 6 months up to the age of 5 years', '2 ml (2 lakh IU)', 'Oral', 'Oral'],
            ['DPT Booster-2 ', '5-6 years ', '0.5 ml', 'Intra-muscular', 'Upper Arm'],
            ['Td', '10 years & 16 years)', '0.5 ml', 'Intra-muscular', 'Upper Arm']
          ]
          }
      }
     

    //inside children document, there will be a collection for vaccines, which will have a document which will have fields for each vaccine. And each field will have a object which will contain details of vaccine, object will be - {"basicDetails": [name, expected date, submitted date, doctor/hospital]} 


    render() {
      return (
          <View style={styles.container}>
            <Header
  ViewComponent={LinearGradient}
  leftComponent={<Icon name='arrow-left' type='font-awesome' color='#696969' size={25} onPress={()=>this.props.navigation.goBack()}/>}
    centerComponent={{ text: 'Child Vaccination Detail', style: { color: '#fff', fontSize: 15, paddingTop: 5} }}
  RightComponent={<Icon name='home' type='font-awesome' color='#696969' size={35} onPress={()=>this.props.navigation.navigate("HomeScreen")}/>}
    linearGradientProps={{
      colors:['#8431bc', '#BE414D', '#EC670F'],
      start:{ x: -1, y: 0 },
      end:{ x: 1, y: 0 }
    }}
    containerStyle={{height: 70, width: 1000, marginLeft: -25}}
  />   
            <ScrollView>
              <Animatable.View animation="fadeInUpBig">
          <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} widthArr={[86,81,76,64,51.5]} />
            <Rows data={this.state.tableData} style={styles.row} textStyle={styles.text} widthArr={[86,81,76,64,51.5]} />
          </Table>
          </Animatable.View>
          </ScrollView>
  
        </View>
      );
    }
  }
  
   
  const styles = StyleSheet.create({
      container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#Fff' },
      head: { height: 50, backgroundColor: '#ff5300', borderTopLeftRadius: 10, borderTopRightRadius: 10},
        row: { flexDirection: 'row', backgroundColor: '#828acf', marginRight: 10 },
        text: { textAlign: 'center', color: "white" },
  
    });