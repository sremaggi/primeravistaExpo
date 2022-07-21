import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,ImageBackground, ScrollView,Dimensions,Image, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';


const handleError = (e) => { console.log(e.nativeEvent.error); };

const image = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/primeravistaexpo.appspot.com/o/primeravistaExpo%2Fcasa.jpg?alt=media&token=06f7b093-aa89-49df-96e0-f3027be1e00b',
};


export default function WelcomeScreen({navigation}) {
  return (
    <ImageBackground
      style={[styles.image,StyleSheet.absoluteFill]}
      source={image}

      resizeMode="stretch">
      <SafeAreaView style={styles.container}>
        <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
        <Text style={styles.title}>
            Hospedaje Primera Vista
          </Text>
        </BlurView>
        
        <View style={styles.buttonContainers}>
        <TouchableOpacity onPress={()=>{navigation.navigate('LoginScreen')}} style={[styles.button,{backgroundColor:'#59FF0090'}]}>
            <Text style={styles.textStyle}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('SigninScreen')}}  style={[styles.button,{backgroundColor:'#009BFF90'}]}>
            <Text style={styles.textStyle}>Registrar Usuario</Text>
          </TouchableOpacity>
        </View>


     
      </SafeAreaView>
    </ImageBackground>
      
  );
}
const styles = StyleSheet.create({
  buttonContainers:{
    flexDirection:'row',
    flex:0.2,

  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    flex:0.5,
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
    fontSize: 35,
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
    marginTop:50,
    alignItems:'center',
    flex: 0.3,
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