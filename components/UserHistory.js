import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { colors } from "../globalstyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logout from "./Logout";

export default function UserHistory() {
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localData, setLocalData] = useState({ token: "", id: "" });

  useEffect(() => {
    const getLocalData = async () => {
      try {
        const fetchStorage = await AsyncStorage.getItem("auth");
        setLocalData(JSON.parse(fetchStorage));
      } catch (err) {
        console.log(err);
      }
    };
    getLocalData();
  }, []);

  useEffect(() => {
    console.log(localData);
    if (localData.token) {
      async function fetchData() {
        try {
          const res = await axios.get(
            "https://relievedmint.herokuapp.com/users/" + localData.id,
            {
              headers: {
                // Authorization: `Bearer ${localData.token}`,
                Authorization: `Bearer ${localData.token}`,
              },
            }
          );
          setMasterDataSource(res.data.history);
          setFilteredDataSource(res.data.history);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    }
  }, [localData]);

  const searchFilterFunction = (text) => {
    const newData = masterDataSource.filter((data) =>
      data.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDataSource(newData);
    setSearch(text);
    setLoading(false);
  };

  const sortFunction = () => {
    setFilteredDataSource((data) => data.slice(0).reverse());
  };

  /*  if (!localData || localData === null) {
    return (
      <SafeAreaView>
        <View
          style={{
            // backgroundColor: colors.green1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/whomp.gif")}
            style={{
              width: 145,
              height: 145,
            }}
          />
          <Text style={{ color: "#777777" }}>{"\n"}Sign in to see History</Text>
        </View>
      </SafeAreaView>
    );
  } else */

  if (loading) {
    return (
      <SafeAreaView>
        <View
          style={{
            // backgroundColor: colors.green1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/loading/Ajax-loader.gif")}
            style={{
              width: 45,
              height: 45,
            }}
          />
          <Text style={{ color: "#777777" }}>{"\n"}Loading...</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text style={styles.pageTitle}>Your rcyclr history</Text>
            {/* Search Function */}
            <TextInput
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              placeholder="Search"
              style={styles.input}
            ></TextInput>
            <Button title="Sort by item name" onPress={() => sortFunction()} />
            {/* <Logout /> */}
            {filteredDataSource
              .slice(0)
              .reverse()
              .map((item) => (
                <View key={item._id} style={styles.itemContainer}>
                  <View>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.detailImage}
                    />
                    <Image
                      source={
                        item.recyclable
                          ? require("../assets/history_icons/check.png")
                          : require("../assets/history_icons/xmark.png")
                      }
                      style={styles.historyIcon}
                    />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.detailLabel}>
                      {item.label.slice(0, 1).toUpperCase() +
                        item.label.slice(1).toLowerCase()}
                    </Text>
                    <Text>
                      Created on {item.createdAt.slice(0, 10)} {"\n"}
                    </Text>
                    <TouchableOpacity
                      style={{ fontSize: 2 }}
                      onPress={() => {
                        axios.delete(
                          "https://relievedmint.herokuapp.com/history/" +
                            item._id
                        );
                        setFilteredDataSource((dataset) =>
                          dataset.filter((data) => data._id !== item._id)
                        );
                      }}
                    >
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            {/* <Text>Clear History Button Placeholder</Text> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pageTitle: {
    margin: 16,
    marginTop: 40,
    fontSize: 30,
    fontWeight: "600",
  },
  detailImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  input: {
    height: 40,
    margin: 16,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e1e1e1",
    borderColor: "transparent",
  },
  itemContainer: {
    margin: 16,
    flex: 1,
    flexDirection: "row",
  },
  detailContainer: {
    marginLeft: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  historyIcon: {
    width: 250,
    height: 50,
    aspectRatio: 1,
    position: "relative",
    top: -30,
    left: 60,
  },
});
