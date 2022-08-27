import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserHistory() {
  const [historyData, setHistoryData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(userId = "630992c820fc61d17c3faf20") {
      try {
        const res = await axios.get(
          "https://relievedmint.herokuapp.com/users/" + userId
        );
        setHistoryData(res.data.history);
        console.log(res.data.history);
        console.log(Math.random() * 100);
        setLoading(false);
        console.log("------------------------------");
      } catch (err) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

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
            {historyData.map((item) => (
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
