import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

import useFetch from "../../../hook/useFetch";

// This function is made to get the API data to save to local storage, just call it once, and comment it
// setMyDataValue = async () => {

    // fetch the API data
    // const { data, isLoading, error } = useFetch("search", { query: "React Developer", num_pages: 1 });

    // try {
        // Set the data to local storage
        // const jsonValue = JSON.stringify(data);
        // await AsyncStorage.setItem("testData", jsonValue);
        // console.log("Done set data.");

        // Get the data from local storage
        // const readJsonValue = await AsyncStorage.getItem("testData");
        // console.log(readJsonValue);
        // const testDataJSONParse = JSON.parse(readJsonValue);
        // console.log(testDataJSONParse[1].job_description);
    // } 
    // catch(error) {
        // console.log("Error set/get data: " + error.message);
        // return null;
    // }
// };

const Popularjobs = ({ jobData }) => {

    const router = useRouter();
    // const [jobData, setJobData] = useState([]);
    // the fetching data function from the local storage had moved to the homepage

    const [selectedJob, setSelectedJob] = useState();

    const handleCardPress = (item) => {
        router.push(`/job-details/${item.job_id}`);
        setSelectedJob(item.job_id);
    };

    // Using the useFetch to get data from the API, only used to directly get data from API when the app finish
    const { data, isLoading, error } = useFetch("search", { query: "React Developer", num_pages: 1 });

    // Use as dummy during development
    // const isLoading = false;
    // const error = false;
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show All</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <PopularJobCard
                                item={item} 
                                selectedJob={selectedJob}
                                handleCardPress={handleCardPress}
                            />
                        )} 
                        keyExtractor={item => item?.job_id}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal={true}
                    />
                )}
            </View>
        </View>
    )
}

export default Popularjobs;