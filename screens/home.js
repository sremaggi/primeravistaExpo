import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView,ImageBackground, ScrollView,Dimensions,Image, TouchableOpacity, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { doc, getDoc,getFirestore } from "firebase/firestore";
import AppFirebase from '../firebase/config';
import { getAuth,onAuthStateChanged } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';

const auth = getAuth(AppFirebase);


const db = getFirestore(AppFirebase);




const image = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/primeravistaexpo.appspot.com/o/primeravistaExpo%2Fcasa.jpg?alt=media&token=06f7b093-aa89-49df-96e0-f3027be1e00b',
};





export default function HomeScreen({navigation}) {  

  const [name,setName] = useState('')
  const docRef = doc(db, "users", auth.currentUser.uid);
  getDoc(docRef).then((userCredential)=>{
    setName(userCredential.data().name)
  });
         return (
          <ImageBackground
          style={[styles.image,StyleSheet.absoluteFill]}
          source={image}
          resizeMode="stretch">
          <SafeAreaView style={styles.container}>
          <View style={styles.buttonContainersLogin}>
              <TouchableOpacity onPress={()=>{
                console.log('ProfileScreen Redirection')
                navigation.navigate('ProfileScreen');
              }}  style={[styles.buttonLogin,{backgroundColor:'#009BFF50'}]}>

                <Ionicons name="construct-sharp" size={25} color="black" />
                <Text style={styles.textStyle}>{name}</Text>
              </TouchableOpacity>
            </View>
            <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
            <Text style={styles.title}>
                Hospedaje Primera Vista
              </Text>
              <Text style={styles.textStyle}>
                Pantalla de Inicio
              </Text>
            </BlurView>
            
            <View style={styles.buttonContainers}>
            <TouchableOpacity onPress={()=>{console.log('informacion screen')}} style={[styles.button,{backgroundColor:'#59FF0030'}]}>
                <Text style={styles.textStyle}>Información</Text>
                <Ionicons name="md-home-outline" size={25} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{console.log('redirect to --> bookings');navigation.navigate('BookingsScreen')}}  style={[styles.button,{backgroundColor:'#59FF0030'}]}>
                <Text style={styles.textStyle}>Reservar</Text>
                <Ionicons name="ios-calendar-sharp" size={25} color="green" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainers}>
            <TouchableOpacity onPress={()=>{console.log('contacto screen')}} style={[styles.button,{backgroundColor:'#59FF0030'}]}>
                <Text style={styles.textStyle}>Contacto</Text>
                <Ionicons name="ios-call-outline" size={25} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{console.log('comentarios screen')}}  style={[styles.button,{backgroundColor:'#59FF0030'}]}>
                <Text style={styles.textStyle}>Comentarios</Text>
                <Ionicons name="ios-book-outline" size={25} color="green" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
        );
};

const styles = StyleSheet.create({
  buttonContainersLogin:{
    marginTop:20,
    margin:2,
    flexDirection:'row-reverse',
    flex:0.3,

  },
  buttonContainers:{
    marginTop:5,
    flexDirection:'row',
    flex:0.3,

  },
  button:{
    borderColor: '#f0f0f0',
    borderWidth:1,
    margin:5,
    alignItems:'center',
    justifyContent:'center',
    flex:0.5,
  },
  buttonLogin:{
    borderColor: '#f0f0f0',
    borderWidth:1,
    margin:5,
    alignItems:'center',
    justifyContent:'center',
    flex:0.25,
  },
  image:{
    flex: 1,
    width:'100%',
    height:'100%',
  },
  container: {
    flex: 0.5,
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
    padding: 2,
  },
  blurContainer: {
    alignItems:'center',
    flex: 0.3,
    padding:5,
    justifyContent: 'center',
  },
  blurContainerButtons: {
    margin:10,
    flex:0.5,
    alignItems:'center',
    justifyContent: 'center',
  }
});