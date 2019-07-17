//Imports
const fs = require('fs');
const axios = require('axios');
const puppeteer = require('puppeteer');
const util = require('util');

//Promisifying node's readFile function
const readFile = util.promisify(fs.readFile);

//Function returns config details from config.json
async function getConfig() {
  let config = await readFile('./config.json', 'utf8');
  config = JSON.parse(config);
  return config;
}

//Function makes HTTP requests at set interval
async function reqStandard(url, freq) {

  setInterval(async function () {
    let httpResp = await axios.get(url);

    if (httpResp.status == 200){
      console.log("200 - Standard request completed successfully");
    }
  }, freq);

}

//Function makes requests at set interval via simulated browser (headless Chromium)
async function reqBrowserSim(url, freq) {
  var browser = await puppeteer.launch({ headless: true });

  setInterval(async function () {
    var page = await browser.newPage();

    //Allowed time before request timeout
    // page.setDefaultTimeout(30*1000)

    var [response] = await Promise.all([
      page.waitForNavigation({timeout: 30*1000, waitUntil: 'networkidle2' }),
      await page.goto(url)
    ]);

    if (response.status() == 200){
      console.log("200 - Browser simulated request completed successfully");
    }
    await page.close();

  }, freq);

}

//Main function, called immediately when script executes
async function main() {
  var config = await getConfig();
  config.RequestFrequency = config.RequestFrequency * 60000;

  if (config.SimulateBrowser == "true") {
    reqBrowserSim(config.TargetAddress, config.RequestFrequency);
  }
  else {
    reqStandard(config.TargetAddress, config.RequestFrequency);
  }

}

main();