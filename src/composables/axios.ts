import axios from 'axios';

export const restApi = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// giphyApi
//   .get<GIFResponse>("/random")
//   .then((response) => {
//     const url = response.data.data.images.original.url;
//     const img = document.createElement("img");
//     img.src = url;
//     document.body.append(img);
//   })
//   .catch((error) => console.log(error));
