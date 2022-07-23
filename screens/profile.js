import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView,ImageBackground, ScrollView,Dimensions,Image, TouchableOpacity, TextInput,Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { doc, getDoc,getFirestore } from "firebase/firestore";
import AppFirebase from '../firebase/config';
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import { useAuthentication } from '../utils/authentication';
import Ionicons from '@expo/vector-icons/Ionicons';
const auth = getAuth(AppFirebase);
const db = getFirestore(AppFirebase);


const image = {
  uri: 'https://patrimoniovirtual.cl/wp-content/uploads/2019/01/HYPERLAPSE_0169-1.jpg',
};

export default function ProfileScreen({navigation}) {


  const [currentUser,setCurrentUser] = useState('')
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((userCredential)=>{
      setCurrentUser(userCredential.data())
    }).catch(e=>{console.log(e)});

  return (
    <ImageBackground
    style={[styles.image,StyleSheet.absoluteFill]}
    source={image}
    resizeMode="stretch">
    <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={()=>{navigation.navigate('HomeScreen')}} style={[styles.buttonHome]}>
    <Ionicons name="md-home-outline" size={25} color="yellow" />
    </TouchableOpacity>
      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
      <Text style={styles.title}>
          Hospedaje Primera Vista
        </Text>
        <Text style={styles.textStyle}>
        Mi Cuenta
        </Text>
      </BlurView>
      <ScrollView style={{flex:1,}}>
      <BlurView intensity={50} tint="dark" style={styles.contentCenter}>
        <Text style={styles.titleContent}>{currentUser.name} {currentUser.surname}</Text>
        <Text style={styles.titleContent}>{currentUser.email}</Text>
        <Text style={styles.titleContent}>{currentUser.phone}</Text>
      <View style={styles.buttonContainers}>
      <TouchableOpacity onPress={()=>{
        signOut(auth).then(()=>{
            Alert.alert('Cerrando Sesión')
            navigation.navigate('WelcomeScreen')
        }).catch(e=>{
            console.log(e)
        })
      }} style={[styles.button,{backgroundColor:'red'}]}>
            <Text style={styles.textStyle}>Cerrar Sesión</Text>
          </TouchableOpacity>

      </View>
      </BlurView>
      </ScrollView>
    </SafeAreaView>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  input:{
    padding:5,
    borderColor:'#59FF0090',
    borderWidth:1,
    width:'100%',
  },
  buttonContainers:{
    flex:1,
    flexDirection:'row',

  },
  button:{
    marginTop:10,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },
  buttonHome:{
    //backgroundColor:'red',
    alignItems:'center',
    flexDirection:'column-reverse',
    marginBottom:10,
    flex:0.2,
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
  titleContent: {
    margin:5,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',    
    textAlign: 'center',    
  },
  contentCenter: {
    borderColor:'#59FF0090',
    borderWidth:1,
    alignItems: 'center',
    padding:20,
    margin:20,
    flex:1,
  },
  textStyle: {
    fontWeight: 'bold',  
    color: 'white',
    padding:2,
  },
  blurContainer: {
    borderColor:'#59FF0090',
    borderWidth:1,
    alignItems:'center',
    flex: 0.1,
    padding:10,
    justifyContent: 'center',
  },
  blurContainerButtons: {
    margin:10,
    flex:0.5,
    alignItems:'center',
    justifyContent: 'center',
  }
});