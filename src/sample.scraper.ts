import axios from "axios";
import cheerio from "cheerio";

async function scrapeRaceInfo(url: string) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // ここで必要なデータを抽出します
      const raceName = $(".race_header").find("h1").text();
      const raceDate = $(".race_data").find(".smalltxt").text();

      console.log("レース名:", raceName);
      console.log("レース日:", raceDate);

      // 他のデータを抽出するためのセレクタや処理を追加します
    } else {
      console.log("HTTPリクエストが失敗しました。");
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

const url = "https://db.netkeiba.com/race/202309040411/";
scrapeRaceInfo(url);
