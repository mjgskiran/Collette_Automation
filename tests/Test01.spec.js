const { test, expect } = require('@playwright/test');
const { setPage, click,takeFullScreenshot,enterTextAndHitEnter } = require('./Helper');


test.skip('has title', async ({ page }) => {
    setPage(page);
    await page.goto('https://www.google.com/');
    await enterTextAndHitEnter("xpath=//textarea[@name='q']", "Playwright", "Search Box");
    await click("xpath=//h3[contains(text(),'Playwright: Fast and reliable')]","Playwright Website");
    await takeFullScreenshot('Screenshots/Home.png');
});