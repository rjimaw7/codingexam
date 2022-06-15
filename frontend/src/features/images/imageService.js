import axios from "axios";

const API_URL = "https://source.unsplash.com/random";

// Get user trades
const getImages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const imageService = {
  getImages,
};

export default imageService;
