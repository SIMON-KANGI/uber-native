import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import NavOptions from '../components/navOptions'

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-white h-full">
    <View className="p-5">
        <Image
            source={{uri:"https://links.papareact.com/gzs"}}
            style={{width: 100, height: 100, resizeMode: 'contain', marginBottom: 20}}
        />
      <NavOptions/>   
    </View>
   
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    
});