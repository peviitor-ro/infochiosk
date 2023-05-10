const { Builder } = require('selenium-webdriver');
const axios = require('axios');
const chrome = require('chromedriver');

async function openWebsitesFromAPI(browser) {
    const limit = 100;
    let start = 0;

    while (true) {

        const response = await axios.get(`https://api.peviitor.ro/v4/jobs/?start=${start}`);
        const entries = response.data.response.docs;

        if (entries.length === 0) {
            start = 0;
            continue;
        }

        for (let entry of entries) {
            let driver = await new Builder()
                .forBrowser(browser)
                .setChromeOptions(new chrome.Options().setChromeBinaryPath('/usr/bin/chromium-browser').headless().windowSize({ width: 1920, height: 1080 }))
                .build();

            await driver.get(entry.job_link[0]);

            await driver.sleep(10000);

            await driver.quit();
        }

        start += limit;
    }
}

openWebsitesFromAPI('chrome');
