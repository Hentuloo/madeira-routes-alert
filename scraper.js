// https://ifcn.madeira.gov.pt/en/atividades-de-natureza/percursos-pedestres-recomendados/percursos-pedestres-recomendados.html
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
  try {
    // 1. Fetch HTML
    const response = await axios.get(
      "https://ifcn.madeira.gov.pt/en/atividades-de-natureza/percursos-pedestres-recomendados/percursos-pedestres-recomendados.html"
    );

    // 2. Load HTML into Cheerio
    const $ = cheerio.load(response.data);

    // 3. Extract content after #content element
    const content = $("#content").html();

    if (!content) {
      throw new Error("#content element not found");
    }

    // 4. Save to file
    fs.writeFileSync("external_content.html", content);
    console.log("Content updated successfully");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();
