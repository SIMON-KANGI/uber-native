import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import NavOptions from '../components/navOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {MAPS_API_KEY} from "@env"
import { useDispatch } from 'react-redux'
import { setDestination,setOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'
const HomeScreen = () => {
  const dispatch= useDispatch()
  return (
    <SafeAreaView className="bg-white h-full">
    <View className="p-5">
        <Image
            source={{uri:"https://links.papareact.com/gzs"}}
            style={{width: 100, height: 100, resizeMode: 'contain', marginBottom: 20}}
        />
        <GooglePlacesAutocomplete
        placeholder='Where from?'
          nearbyPlacesApi="GooglePlacesSearch"
          debounce={400}
          styles={{
            container:{
              flex:0,
            },
            textInput:{
              fontSize:18,
            }
          }}
          onPress={(data,details=null)=>{
    dispatch(setOrigin({
      location:details.geometry.location,
      description:data.description
}))
    dispatch(setDestination(null))
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key:MAPS_API_KEY,
            language: 'en',
            types: '(cities)',
          
          }}
        />
      <NavOptions/>   
      <NavFavourites/>
    </View>
   
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    
});