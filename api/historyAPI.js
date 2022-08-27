export const createHistory = (cvData) => {
    const userId = "630992c820fc61d17c3faf20";
    axios.post("https://relievedmint.herokuapp.com/history", {
      owner: userId,
      label: cvData.item,
      image: cvData.url,
      recycable: cvData.recycable,
    });
  };
