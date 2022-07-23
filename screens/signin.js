import React,{useState,useEffect} from 'react';
import { StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,Alert } from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';
import { getFirestore,collection, doc, setDoc} from 'firebase/firestore';
import AppFirebase from '../firebase/config';

const firestore = getFirestore(AppFirebase)
const auth = getAuth(AppFirebase)

const usersRef = collection(firestore, "users");

const image = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/primeravistaexpo.appspot.com/o/primeravistaExpo%2Fcasa.jpg?alt=media&token=06f7b093-aa89-49df-96e0-f3027be1e00b',
};

export default function SigninScreen({navigation}) {

 const [email,setEmail] = useState('')
 const [pwd,setPwd] = useState('')
 const [name,setName] = useState('')
 const [surname,setSurname] = useState('')
 const [phone,setPhone] = useState('')

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
         Registrar Usuario
        </Text>
      </BlurView>
      <KeyboardAwareScrollView style={styles.scrollView}>
      <BlurView intensity={80} tint="dark" style={styles.contentCenter}>

      <Text style={styles.textStyle}>Nombre</Text>
      <TextInput onChangeText={(text)=> setName(text)} style={styles.input} placeholder='Juan'></TextInput>
      <Text style={styles.textStyle}>Apellido</Text>
      <TextInput onChangeText={(text)=> setSurname(text)} style={styles.input} placeholder='Perez'></TextInput>
      <Text style={styles.textStyle}>Telefono</Text>
      <TextInput onChangeText={(text)=> setPhone(text)} style={styles.input} placeholder='986021433'></TextInput>
      <Text style={styles.textStyle}>Email</Text>
      <TextInput onChangeText={(text)=> setEmail(text)} autoCapitalize='none'  style={styles.input} placeholder='juan.perez@primeravista.cl'></TextInput>
      <Text style={styles.textStyle}>Contraseña</Text>
      <TextInput onChangeText={(text)=> setPwd(text)} autoCapitalize='none' secureTextEntry={true} style={styles.input} placeholder='*****'></TextInput>
      <View style={styles.buttonContainers}>
      <TouchableOpacity onPress={()=>{
   
        createUserWithEmailAndPassword(auth,email,pwd)
        .then((userCredential) => {
          const user = userCredential.user;
          setDoc(doc(usersRef, user.uid), {
            name: name, surname: surname, phone: phone,
            email: email}).then(()=>{Alert.alert('User account created & signed in!');})
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          Alert.alert(error);
        });
          } }style={[styles.button,{backgroundColor:'#59FF0090'}]}>
            <Text style={styles.textStyle}>Registrar Usuario</Text>
          </TouchableOpacity>

      </View>
      </BlurView>
      </KeyboardAwareScrollView>

    </SafeAreaView>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollView:{
    flex:1,
  },
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