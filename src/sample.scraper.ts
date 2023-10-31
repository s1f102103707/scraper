const fetch = require("node-fetch");
import * as cheerio from "cheerio";
import * as fs from "fs";

async function fetchAndParseTables(url: string): Promise<void> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const tables = $("table");

    const tableData: { rowsData: string[][] }[] = [];

    tables.each((index, table) => {
      const rows = $(table).find("tr");

      const tableObj: { rowsData: string[][] } = {
        rowsData: [],
      };

      rows.each((_, row) => {
        const rowData: string[] = [];

        const columns = $(row).find("td, th");
        columns.each((_, column) => {
          rowData.push($(column).text().trim());
        });

        tableObj.rowsData.push(rowData);
      });

      tableData.push(tableObj);
    });

    // ここで得た情報をJSONファイルに保存する
    fs.writeFileSync("tables.json", JSON.stringify(tableData, null, 2));
  } catch (error) {
    console.error("エラー:", error);
  }
}

const url = "https://db.netkeiba.com/race/201901010101";
fetchAndParseTables(url);
