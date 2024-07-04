import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
    {
        id: "123",
        title: "Get a Ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen"
    },
    {
        id: "456",
        title: "Order Food",
        image: "https://links.papareact.com/28w",
        screen: "MapScreen"
    },
]

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledView = styled(View);

const NavOptions = () => {
    const origin= useSelector(selectOrigin)
    const navigation=useNavigation()
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <StyledTouchableOpacity
                onPress={()=>{
                    navigation.navigate(item.screen)
                }}
                disabled={!origin}
                 className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40">
                    <StyledView className={`${!origin && "opacity-20"}`}>
                        <Image 
                            source={{ uri: item.image }} 
                            style={{ width: 120, height: 120, resizeMode: 'contain', marginHorizontal: 10 }} 
                        />
                        <StyledText className="font-bold mt-2">{item.title}</StyledText>
                        <AntDesign 
                            name="arrowright" 
                            size={22} 
                            color="black" 
                            
                          
                        />
                    </StyledView>
                </StyledTouchableOpacity>
            )}
        />
    )
}

export default NavOptions
