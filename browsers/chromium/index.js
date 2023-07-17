const { Builder, Capabilities } = require('selenium-webdriver');
const chrome = require('chromedriver');
const firefox = require('geckodriver');
const axios = require('axios');

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
                .setChromeOptions(new Capabilities().setBrowserName('chrome').set('chromeOptions', { args: ['--headless', '--disable-gpu'], binary: '/usr/bin/chromium-browser' }))
                .build();
            console.log('Browser launched');
            await driver.get(entry.job_link[0]);
            console.log('Website loaded');
            await driver.sleep(10000);

            await driver.quit();
            console.log('Driver closed');
        }

        start += limit;
    }
}

openWebsitesFromAPI('chrome');
