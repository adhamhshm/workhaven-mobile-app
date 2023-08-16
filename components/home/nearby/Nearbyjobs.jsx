import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

import useFetch from "../../../hook/useFetch";

const NearbyJobs = ({ jobData }) => {

    const router = useRouter();
    // const [jobData, setJobData] = useState([]);

    // Using the useFetch to get data from the API, only used to directly get data from API when the app finish
    const { data, isLoading, error } = useFetch("search", { query: "React Developer", num_pages: 1 });

    // Use as dummy during development
    // const isLoading = false;
    // const error = false;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
                    data?.map((job) => {
                        return (
                            <NearbyJobCard
                                job={job}
                                key={`nearby-job-${job?.job_id}`}
                                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
                            />
                        )
                    })
                )}
            </View>
        </View>
    )
}

export default NearbyJobs;