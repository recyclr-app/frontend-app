import axios from "axios";

export const getCV = async (
  formData,
  setCvResults,
  localData,
  createHistory
) => {
  try {
    const response = await axios.post(
      "https://relievedmint.herokuapp.com/cv",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setCvResults(response.data);
    // upload to userhistory if logged in
    localData.token !== "" && createHistory(response.data);
  } catch (err) {
    console.log(err);
  }
  try {
    const response = await axios.post(
      "https://relievedmint.herokuapp.com/cv",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setCvResults(response.data);
    // upload to userhistory if logged in
    localData.token !== "" && createHistory(response.data);
  } catch (err) {
    console.log(err);
  }
};
