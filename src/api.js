const baseUrl = "http://apis.data.go.kr/B551015/API8_2/raceHorseInfo_2";
const serviceKey =
  "Y2zUAeVXmIKWdNkUeoLVnA%2BfvwI8M%2B6y6%2FPP6c0pmG4E4Vq87OGJmkC1dWD%2BVb9Ylhxx6QGMSes%2B3%2BXXeGf9hw%3D%3D";

export const fetchAllHorseData = async () => {
  let allData = [];
  const pageNo = 1;
  const numOfRows = 3000;

  try {
    const response = await fetch(
      `${baseUrl}?ServiceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=json`
    );

    const textResponse = await response.text();
    // console.log("Raw Response Text:", textResponse);
    try {
      const data = JSON.parse(textResponse);

      if (data?.response?.body?.items?.item) {
        allData = data.response.body.items.item;
      } else {
        console.warn("No valid data received.");
        return [];
      }
    } catch (jsonError) {
      console.error("JSON 변환 실패:", jsonError);
      throw new Error("Invalid JSON Response");
    }

    const filteredData = allData.filter((item) => item.meet === "부산경남");
    console.log("필터링된 데이터:", filteredData);

    return filteredData;
  } catch (error) {
    console.error("Error fetching horse data:", error);
    return [];
  }
};
