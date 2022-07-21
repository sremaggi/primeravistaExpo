import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,ImageBackground, ScrollView,Dimensions,Image, TouchableOpacity, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';

const image = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/primeravistaexpo.appspot.com/o/primeravistaExpo%2Fcasa.jpg?alt=media&token=06f7b093-aa89-49df-96e0-f3027be1e00b',
};

export default function SigninScreen({navigation}) {
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
      <ScrollView style={{flex:1,}}>
      <BlurView intensity={50} tint="dark" style={styles.contentCenter}>
      <Text style={styles.textStyle}>Nombre</Text>
      <TextInput style={styles.input} placeholder='Juan'></TextInput>
      <Text style={styles.textStyle}>Apellido</Text>
      <TextInput style={styles.input} placeholder='Perez'></TextInput>
      <Text style={styles.textStyle}>Telefono</Text>
      <TextInput style={styles.input} placeholder='986021433'></TextInput>
      <Text style={styles.textStyle}>Email</Text>
      <TextInput style={styles.input} placeholder='juan.perez@primeravista.cl'></TextInput>
      <Text style={styles.textStyle}>Contraseña</Text>
      <TextInput secureTextEntry={true} style={styles.input} placeholder='*****'></TextInput>
      <View style={styles.buttonContainers}>
      <TouchableOpacity onPress={()=>{navigation.navigate('LoginScreen')}} style={[styles.button,{backgroundColor:'#59FF0090'}]}>
            <Text style={styles.textStyle}>Registrar Usuario</Text>
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
    fontSize: 30,
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
    padding:20,
    justifyContent: 'center',
  },
  blurContainerButtons: {
    margin:10,
    flex:0.5,
    alignItems:'center',
    justifyContent: 'center',
  }
});