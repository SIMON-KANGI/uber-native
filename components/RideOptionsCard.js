import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInfo } from '../slices/navSlice';

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Uber-Xl-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5W8"
  },
  {
    id: "Uber-LUX-123",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  },
];

const SURGE_CHARGE_RATE = 1.5;

export default function RideOptionsCard() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInfo = useSelector(selectTravelTimeInfo);

  const calculatePrice = (multiplier) => {
    if (!travelTimeInfo) return 0;
    const durationInSeconds = travelTimeInfo?.duration?.value;
    const durationInMinutes = durationInSeconds / 60;
    return (durationInMinutes * SURGE_CHARGE_RATE * multiplier).toFixed(2);
  };

  return (
    <ScrollView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("MapScreen")}
          className="absolute top-3 left-4 rounded-full">
          <FontAwesome name="chevron-left" size={16} />
        </TouchableOpacity>
        <Text className="text-center text-xl font-bold">Select a Ride -{travelTimeInfo?.distance?.text}</Text>
      
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item: { id, title, image, multiplier }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row items-center p-3 ${id === selected?.id ? "bg-gray-200" : ""}`}>
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: image }}
            />
            <View className="ml-4 flex-1">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text className="text-gray-500">{travelTimeInfo?.duration?.text} Travel Time</Text>
            </View>
            <Text className="text-xl">
              {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(calculatePrice(multiplier))}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          className={`bg-black py-3 rounded-full m-3 ${!selected ? "opacity-20" : ""}`}>
          <Text className="text-center text-xl text-white font-bold">Book {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
