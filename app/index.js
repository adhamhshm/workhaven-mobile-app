import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from "../components";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [jobData, setJobData] = useState([]);

    // This is used only to fetch from the local storage that have been saved after calling the API data
    // Refer to the commmented code in the "components/home/popular/Popularjobs.jsx"
    // useEffect(() => { 
    //     async function fetchData() {
    //         try {
    //             const readJsonValue = await AsyncStorage.getItem("testData");
    //             const testDataJSONParse = JSON.parse(readJsonValue);
    //             // As the { data } from API not being used, we create our own state of jobData
    //             setJobData(testDataJSONParse);
    //         } catch (error) {
    //             console.log("Error fetching data from local storage: " + error.message);
    //         }
    //     }
    //     fetchData();
    // }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    // headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                    headerTitle: "",
                }} 
            />

            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }} 
                    />
                    <Popularjobs jobData={jobData} />
                    <Nearbyjobs jobData={jobData} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;