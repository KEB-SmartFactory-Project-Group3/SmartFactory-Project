import axios from 'axios';

const BASE_URL = 'http://192.168.43.9:5000';

export const fetchLiveTransmission = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get-live-transmission`);
    const data = await response.json();
    return data.image;
  } catch (error) {
    console.error('Error fetching live image:', error);
    throw error;
  }
};

export const captureImage = async (imageData) => {
  try {
    const response = await axios.post(`${BASE_URL}/capture-image`, { liveImage: imageData });
    return response.data;
  } catch (error) {
    console.error('Error capturing image:', error);
    throw error;
  }
};
