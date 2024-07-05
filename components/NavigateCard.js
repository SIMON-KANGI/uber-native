import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {MAPS_API_KEY} from "@env"
import { useDispatch } from 'react-redux'
import { setDestination,setOrigin } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { TouchableOpacity } from 'react-native'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
const NavigateCard = () => {
    const dispatch=useDispatch()
    const navigation= useNavigation()
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-center text-xl">Simon Mwangi</Text>
      <View className="border-t border-gray-200 flex-shrink ">
<View>
    <GooglePlacesAutocomplete
        placeholder='Where to?'
        debounce={400}
        styles={toInputBoxStyles}
        nearbyPlacesAPI='GooglePlacesSearch'
        fetchDetails={true}
        returnKeyType={"search"}
        onPress={(data, details=null)=>{
            dispatch(setDestination({
                location:details.geometry.location,
                description:data.description
            }))   
            navigation.navigate('RideOptionsCard')
        }}
    
        minLength={2}
        query={{
            key:MAPS_API_KEY,
            language: 'en',
            types: '(cities)',
          
          }}
    />
</View>
<NavFavourites/>
      </View>
      <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
        <TouchableOpacity
        onPress={()=>navigation.navigate('RideOptionsCard')}
         className="flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full">
            <FontAwesome name="cab" size={24} color="white"/>
            <Text className="text-white text-center">Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex justify-between flex-row  w-24 px-4 py-3 rounded-full">
            <FontAwesome6 name="plate-wheat" size={24} color="black"/>
            <Text className="text-black text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        paddingTop:20,
        flex:0
    },
    textInput:{
        backgroundColor:"#DDDDDF",
        borderRadius:0,
        height:50,
        fontSize:18
    }
});