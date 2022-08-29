export const getAsyncStorage = async () => {
  try {
    const getStorage = await AsyncStorage.getItem("auth");
    return JSON.parse(getStorage)
  } catch (err) {
    console.log(err);
  }
}