import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet,Text, View,SafeAreaView,ImageBackground,TouchableOpacity, TextInput,Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import { getFirestore,collection, doc, setDoc} from 'firebase/firestore';
import AppFirebase from '../firebase/config';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const auth = getAuth(AppFirebase)

const image = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/primeravistaexpo.appspot.com/o/primeravistaExpo%2Fcasa.jpg?alt=media&token=06f7b093-aa89-49df-96e0-f3027be1e00b',
};

export default function LoginScreen({navigation}) {
  const [email,setEmail] = useState('')
  const [pwd,setPwd] = useState('')

  return (
    <ImageBackground
    style={[styles.image,StyleSheet.absoluteFill]}
    source={image}
    resizeMode="stretch">
    <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={()=>{navigation.navigate('WelcomeScreen')}} style={[styles.buttonHome]}>
          <Text style={styles.textStyle}>Home</Text>
    </TouchableOpacity>
      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
      <Text style={styles.title}>
          Hospedaje Primera Vista
        </Text>
        <Text style={styles.textStyle}>
          Iniciar Sesión
        </Text>
      </BlurView>
      <KeyboardAwareScrollView style={{flex:1,}}>
      <BlurView intensity={50} tint="dark" style={styles.contentCenter}>
      <Text style={styles.textStyle}>Email</Text>
      <TextInput onChangeText={(text)=> setEmail(text)} autoCapitalize='none'  style={styles.input} placeholder='juan.perez@primeravista.cl'></TextInput>
      <Text style={styles.textStyle}>Contraseña</Text>
      <TextInput onChangeText={(text)=> setPwd(text)} autoCapitalize='none' secureTextEntry={true} style={styles.input} placeholder='*****'></TextInput>
      <View style={styles.buttonContainers}>
      <TouchableOpacity onPress={()=>{
        signInWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Sesión Iniciada \n'+email)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
       }} style={[styles.button,{backgroundColor:'#59FF0090'}]}>
            <Text style={styles.textStyle}>Iniciar Sesión</Text>
          </TouchableOpacity>

      </View>
      </BlurView>
      </KeyboardAwareScrollView>
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
    alignItems:'center',
    justifyContent:'center',
    flex:0.1,
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
    borderColor:'#59FF0090',
    borderWidth:1,
    padding:20,
    margin:20,
    flex:1,
  },
  textStyle: {
    fontWeight: 'bold',  
    color: 'white',
    padding: 10,
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