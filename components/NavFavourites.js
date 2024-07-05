import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';

const NavFavourites = () => {
  const data = [
    {
      id: "123",
      icon: "home",
      location: "Home",
      destination: "Kasarani, Nairobi"
    },
    {
      id: "456",
      icon: "briefcase",
      location: "Work",
      destination: "Mombasa, Watamu"
    },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Entypo
              name={icon}
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
          <View>
            <Text style={styles.locationText}>{location}</Text>
            <Text style={styles.destinationText}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
  },
  iconContainer: {
    marginRight: 15,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 50,
  },
  icon: {
    alignSelf: 'center',
  },
  locationText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  destinationText: {
    color: 'gray',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#708090', // slate-500 color
  },
});

export default NavFavourites;
