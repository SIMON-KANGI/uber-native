import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {MAPS_API_KEY} from "@env"
import { useDispatch } from 'react-redux'
import { setDestination,setOrigin } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
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