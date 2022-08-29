const createHistory = async (cvData) => {
  try {
    axios.post(
      "https://relievedmint.herokuapp.com/history",
      {
        owner: localData.id,
        label: cvData.item,
        image: cvData.url,
        recyclable: cvData.recyclable,
      },
      {
        headers: {
          Authorization: `Bearer ${localData.token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
