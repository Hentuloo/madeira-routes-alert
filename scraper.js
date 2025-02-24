const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://ifcn.madeira.gov.pt/en/atividades-de-natureza/percursos-pedestres-recomendados/percursos-pedestres-recomendados.html', { waitUntil: 'networkidle2' });
    
    // Wait for #content element to be present
    await page.waitForSelector('#content', { timeout: 10000 });
    
    // Extract HTML content after #content
    const content = await page.$eval('#content', (element) => {
      return element.outerHTML;
    });
    
    fs.writeFileSync('external_content.html', content);
    await browser.close();
    console.log('Content saved successfully');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
