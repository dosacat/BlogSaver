import axios from 'axios'
const baseUrl = 'https://picsum.photos/v2/list'

// To generate placeholder images, the name static is misleading here, I agree.

const getImages = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
  
}

export default { getImages }