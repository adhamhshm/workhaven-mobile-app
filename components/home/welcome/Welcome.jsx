import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants"; 

const jobTypes = ["Full Time", "Part Time", "Contractor", "Internship"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {

  const router = useRouter();
  const [activeJobType, setActiveJobType] =useState("Full Time");

  return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>
                    Welcome to Workhaven
                </Text>
                <Text style={styles.welcomeMessage}>
                    Find your dream jobs!
                </Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    {/* Getting input from user to search */}
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder="Search the perfect job..."
                    />
                </View>
                <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
                    <Image source={icons.search} resizeMode="contain" style={styles.searchBtnImage}/>
                </TouchableOpacity>
            </View>

            {/* VirtualizedLists should never be nested inside plain ScrollViews with the 
            same orientation because it can break windowing and other functionality, 
            use another VirtualizedList-backed container instead. */}

            <View style={styles.tabsContainer}>
                <FlatList
                    // scrollEnabled={false}
                    // An array (or array-like list) of items to render. Other data types can be used by targeting VirtualizedList directly.
                    data={jobTypes} 
                    // Takes an item from data and renders it into the list. 
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.tab(activeJobType, item)}
                            onPress={() => {
                                setActiveJobType(item);
                                router.push(`/search/${item}`);
                            }}
                        >
                            <Text style={styles.tabText(activeJobType, item)} >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    // Used to extract a unique key for a given item at the specified index.
                    keyExtractor={item => item}
                    // These styles will be applied to the scroll view content container which wraps all of the child views.
                    contentContainerStyle={{columnGap: SIZES.small}}
                    // If true, renders items next to each other horizontally instead of stacked vertically.
                    horizontal={true}
                />
            </View>
        </View>
    )
}

export default Welcome