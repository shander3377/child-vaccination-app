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
export default class InfantVaccinesInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Name', 'Time', 'Dose', 'Route', 'Site'],
          tableData: [
            ['Bacillus Calmette Guerin (BCG)', 'At birth or as early as possible till one year of age', '0.1ml(0.05ml till 1m age)', 'Intra-dermal', 'Left Upper Arm'],
            ['Hepatitis B - Birth dose', 'At birth or as early as possible within 24 hours', '0.5 ml', 'Intra-muscular', 'Antero-lateral side of midthigh '],
            ['Oral Polio Vaccine (OPV)-0', 'At birth or as early as possible within the first 15 days', '2 drops', 'Oral', 'Oral'],
            ['OPV 1, 2 & 3', 'At 6 weeks, 10 weeks & 14 weeks (OPV can be given till 5 years of age)', '2 drops', 'Oral', 'Oral'],
            ['Pentavalent 1, 2 & 3 ', 'At 6 weeks, 10 weeks & 14 weeks (can be given till one year of age)', '0.5 ml', 'Intra-muscular', 'Antero-lateral side of midthigh'],
            ['Pneumococcal', 'Two primary doses at 6 and 14 weeks followedby Booster doseat 9-12 months', '0.5 ml', 'Intra-muscular', 'Antero-lateral side of midthigh'],
            ['Rotavirus (RVV)', 'At 6 weeks, 10 weeks & 14 weeks(can be given till one year of age)', '5 drops (liquid vaccine) 2.5 ml (lyophilized vaccine)', 'Oral', 'Oral'],
            ['Inactivated Polio Vaccine (IPV)', 'Two fractional dose at 6 and 14 weeks of age', '0.1 ml', 'Intra dermal two fractional dose', 'Intra-dermal: Right upper arm'],
            ['Measles Rubella (MR) 1st dose', '9 completed months-12 months. (Measles can be given till 5 years of age)', '0.5 ml', 'Sub-cutaneous ', 'Right upper Arm'],
            ['Japanese Encephalitis (JE) - 1', '9 completed months-12 months.', '0.5 ml', 'Sub-cutaneous (Live attenuated vaccine) or Intramuscular(Killed vaccine) ', 'Sub-cutaneous (Live attenuated vaccine) Intramuscular(Killed )']
            ['Vitamin A (1st dose)', 'At 9 completed months with measles-Rubella', '1 ml ( 1 lakh IU) ', 'Oral', 'Oral'],
          ]
          }
      }
     

    


  render() {
    return (
        <View style={styles.container}>
          <Header
ViewComponent={LinearGradient}
leftComponent={<Icon name='arrow-left' type='font-awesome' color='#696969'size={35} onPress={()=>this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Infant Vaccination Detail', style: { color: '#fff', fontSize: 15, paddingTop: 5} }}
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