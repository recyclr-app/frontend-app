import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
            <Text>History Title Placeholder</Text>

            {/* Search Function */}
            <TextInput
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              placeholder="Search"
            ></TextInput>

            {filteredDataSource.map((item) => (
              <View key={item._id}>
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View>
                  <Text>{item.label}</Text>
                  <Text>{item.createdAt}</Text>
                  <Text>{item.label}</Text>
                  <Text>Delete Placeholder</Text>
                </View>
              </View>
            ))}
            <Text>Clear History Placeholder</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
