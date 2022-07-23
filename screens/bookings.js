import * as Calendar from 'expo-calendar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView,ImageBackground,TouchableOpacity,Button,TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';
import { StatusBar } from 'expo-status-bar';
import { doc, getDoc,getFirestore } from "firebase/firestore";
import AppFirebase from '../firebase/config';
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
const auth = getAuth(AppFirebase);
const db = getFirestore(AppFirebase);


const weekdaysSpanish =
  [
    'Lun', 
    'Mar', 
    'Mie', 
    'Jue', 
    'Vie', 
    'Sab', 
    'Dom'
  ]
const monthNamesSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const d = new Date();

const image = {
  uri: 'https://patrimoniovirtual.cl/wp-content/uploads/2019/01/HYPERLAPSE_0009-1.jpg',
};

export default function BookingsScreen({navigation},props) {

  const [info,setCurrentPayment] = useState('')
  const docRef = doc(db, "config", "admin");
  getDoc(docRef).then((userCredential)=>{
    setCurrentPayment(userCredential.data())
  }).catch(e=>{console.log(e)});

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };


  return (
    <ImageBackground
      style={[styles.image,StyleSheet.absoluteFill]}
      source={image}
      resizeMode="stretch">
      <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={()=>{navigation.navigate('HomeScreen')}} style={[styles.buttonHome]}>
    <Ionicons name="md-home-outline" size={25} color="black" />
    </TouchableOpacity>
        <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
        <Text style={styles.title}>
            Hospedaje Primera Vista
          </Text>
          <Text style={styles.textStyle}>Reservas</Text>
        </BlurView>
        <BlurView intensity={50} tint="light"   style={styles.reserveContainer}>
          <StatusBar style='auto'  />
        <KeyboardAwareScrollView style={styles.calendarContainer}>
          <CalendarPicker 
          customDatesStyles={[{
            date:'2022-07-14',
            style: {backgroundColor:'red'},
            textStyle: {color: 'white'}, // sets the font color
            containerStyle: [], // extra styling for day container
            allowDisabled: true,

          },{
            date:'2022-07-15',
            style: {backgroundColor:'red'},
            textStyle: {color: 'white'}, // sets the font color
            containerStyle: [], // extra styling for day container
            allowDisabled: true,

          }]}
          months={monthNamesSpanish} 
          weekdays={weekdaysSpanish} 
          startFromMonday={true}
          allowRangeSelection={true} 
          width={350} 
          onDateChange={onDateChange}
          previousTitle="<"
          nextTitle=">" 

          />
          <BlurView style={styles.infoContainer}>
          <View style={[styles.infoRow,{justifyContent:'center'}]}>
          <Text style={[styles.textStyle2,{fontWeight: 'bold'}]}>
            Fecha Inicio
          </Text>
          <Text style={[styles.textStyle2,{color:'green'}]}>
            {
            selectedStartDate  ? selectedStartDate.format('YYYY-MM-DD').toString()  + ' '+info.startDate: ''}
          </Text>
          <Text style={[styles.textStyle2,{fontWeight: 'bold'}]}>
           Fecha Termino
          </Text>
          <Text style={[styles.textStyle2,{color:'red'}]}>
            {selectedEndDate ? selectedEndDate.format('YYYY-MM-DD').toString()+ ' '+info.endDate: ''}
          </Text>
          <Text style={[styles.textStyle2,{fontWeight: 'bold'}]}>
            Días a reservar
          </Text>
          <Text style={styles.textStyle2}>
              {selectedEndDate ? Math.floor(
              (
                Date.parse(selectedEndDate) - Date.parse(selectedStartDate)
              ) / 86400000): ''}
          </Text>
          <Text style={[styles.textStyle2,{fontWeight: 'bold'}]}>
            Tarifa por Día
          </Text>
          <Text style={styles.textStyle2}>
              {selectedEndDate ? '$'+info.payment: ''}
          </Text>
          </View>
          <View style={[styles.infoRow,{justifyContent:'center'}]}>
          <Text style={[styles.textStyle2,{fontWeight: 'bold'}]}>
            Monto Total 
          </Text>
          <Text style={styles.textStyle2}>
              {selectedEndDate ? '$'+info.payment*Math.floor(
              (
                Date.parse(selectedEndDate) - Date.parse(selectedStartDate)
              ) / 86400000): ''}
          </Text>
          <TouchableOpacity onPress={()=>{console.log('PAGO')}} style={styles.button}>
            <Text style={styles.textStyle2}>Ir a pago</Text>

          </TouchableOpacity>
          </View>
          </BlurView>
        </KeyboardAwareScrollView>
        </BlurView>
      </SafeAreaView>
    </ImageBackground>
      
  );
}

//STYLES
const styles = StyleSheet.create({
  buttonStyle:{
    fontWeight: 'bold',  
    color: 'white',
    padding: 10,
    fontSize:15,
  },
  bookingButton:{
    marginTop:20,
    flex:0.4,
    backgroundColor:'green',
  },
  timepickerContainer:{
    marginTop:10,
    padding:10,
    flexDirection:'row',
  },
  infoContainer:{
    marginTop:10,
    padding:10,
    paddingBottom:50,
    flex:1,
    flexDirection:'row',
  },
  infoRow:{
    flex:0.5,
    alignItems:'center',
  },
  timepicker:{
    justifyContent:'center',
    alignItems:'center',
    width:'50%',
    height:230,
  },
  calendarContainer:{
    flex:0.6,
    marginTop:10,
    padding:10,
  },
  reserveContainer:{
    alignItems:'center',
    marginTop:10,
    flex:1,
    padding:10,
  },
  button:{
    justifyContent:'center',
    padding:20,
    flex:0.8,
    backgroundColor: '#DCC80250',
  },
  image:{
    flex: 1,
    width:'100%',
    height:'100%',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',    
    textAlign: 'center',    
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',  
    color: 'white',
    padding: 10,
  },
  blurContainer: {
    alignItems:'center',
    flex: 0.1,
    padding:20,
  },
  blurContainerDate: {
    marginTop:20,
    flexDirection:'row',
    alignItems:'center',
    flex: 0.1,
    justifyContent: 'center',
  },
  blurContainerButtons: {
    margin:10,
    flex:0.5,
    alignItems:'center',
    justifyContent: 'center',
  },
  buttonHome:{
    alignItems:'center',
    flexDirection:'column-reverse',
    marginBottom:10,
    flex:0.1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  dateText: {
    margin: 16,
  },
  textStyle2: {
    margin:1,
    fontSize: 15,
    color: 'white',
  
  },
});