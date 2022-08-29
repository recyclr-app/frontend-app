import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { colors } from "../globalstyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function UserHistory() {
  const navigation = useNavigation();
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localData, setLocalData] = useState({ token: "", id: "" });

  useEffect(() => {
    const getLocalData = async () => {
      try {
        const fetchStorage = await AsyncStorage.getItem("auth");
        if (fetchStorage) {
          setLocalData(JSON.parse(fetchStorage));
        } else setLocalData({ token: "", id: "" });
      } catch (err) {
        console.log(err);
      }
    };
    getLocalData();
  }, []);

  useEffect(() => {
    console.log(localData); //DELETE LATER
    if (localData.token) {
      async function fetchData() {
        try {
          const res = await axios.get(
            "https://relievedmint.herokuapp.com/users/" + localData.id,
            {
              headers: {
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

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "https://relievedmint.herokuapp.com/history/" + id,
        {
          headers: {
            Authorization: `Bearer ${localData.token}`,
          },
        }
      );
      console.log(res);
      setFilteredDataSource((dataset) =>
        dataset.filter((data) => data._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

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

  if (!localData.token) {
    return (
      <SafeAreaView>
        <View style={styles.loadingPageContainer}>
          <Image
            source={require("../assets/whomp.gif")}
            style={{
              width: 145,
              height: 145,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={{ color: "#777777" }}
          >
            <Text>{"\n"}Log in or Sign up to see User History</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else if (loading) {
    return (
      <SafeAreaView>
        <View style={styles.loadingPageContainer}>
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
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>Your recyclr history</Text>

            {/* Search Function */}
            <TextInput
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              placeholder="Search"
              style={styles.input}
            ></TextInput>
            <TouchableOpacity onPress={() => sortFunction()}>
              <Text style={{ color: "#A9A9A9" }}>sort</Text>
            </TouchableOpacity>

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
                          ? require("../assets/icons/recycle-bin.png")
                          : require("../assets/icons/cancel.png")
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
                      onPress={() => handleDelete(item._id)}
                    >
                      <Text style={{ textAlign: "right" }}>{"\n"}Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loadingPageContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  pageContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
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
    width: "90%",
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
    fontSize: 20,
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