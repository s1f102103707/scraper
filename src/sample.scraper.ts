import axios from "axios";
import cheerio from "cheerio";

async function fetchPageContent(url: string): Promise<string> {
  const response = await axios.get(url);
  return response.data;
}

const url = "https://db.netkeiba.com/horse/2019105219/";
const html = await fetchPageContent(url);

const $ = cheerio.load(html);

// 例: ウェブページからタイトルを取得
const pageTitle = $("title").text();
console.log("ページタイトル:", pageTitle);

const horseName = $("h1").text();
console.log("競走馬の名前:", horseName);
