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
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { colors } from "../globalstyles";

export default function UserHistory() {
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(userId = "630992c820fc61d17c3faf20") {
      try {
        const res = await axios.get(
          "https://relievedmint.herokuapp.com/users/" + userId
        );
        setMasterDataSource(res.data.history);
        setFilteredDataSource(res.data.history);
      } catch (err) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

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
  
  if (loading) {
    return (
      <SafeAreaView>
        <View>
          <Text>Loading...</Text>
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
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.detailLabel}>
                      {item.label.slice(0, 1).toUpperCase() +
                        item.label.slice(1).toLowerCase()}
                    </Text>
                    <Text>Created on {item.createdAt.slice(0, 10)}</Text>
                    <Text>
                      {"\n"}
                      {/* {"\n"}Delete Button Placeholder */}
                    </Text>
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
});
