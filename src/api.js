const fetch = require("node-fetch");

const baseUrl = "https://apis.data.go.kr/B551015/API8_2";
const options = {
  method: "get",
  headers: {
    accept: "application/json",
    Authorization:
      "Y2zUAeVXmIKWdNkUeoLVnA+fvwI8M+6y6/PP6c0pmG4E4Vq87OGJmkC1dWD+Vb9Ylhxx6QGMSes+3+XXeGf9hw==",
  },
};
export const horseData = fetch(`${baseUrl}/raceHorseInfo_2`, options).then(
  (res) => res.json()
);

export const searchHorse = (keyword) => {
  const searchUrl =
    baseUrl + `search/movie?query=${keyword}&include_adult=true&language=ko-kr`;
  return fetch(searchUrl, options).then((res) => res.json());
};
