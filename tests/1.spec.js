const {test, expect} = require('@playwright/test');

test('TVP Itinerary Regression',async({page})=>{

await page.goto('https://tpp-web-qa.agreeablecliff-bddc3132.eastus.azurecontainerapps.io/en-US/login?callbackUrl=%2Fhome');
await page.locator('xpath=//input[@type="text"]').fill("kmandapaka+agent@collette.com");
await page.locator('xpath=//input[@type="password"]').fill("Xinthe@1234");
await page.locator("xpath=//button[@type='submit']").click();
//await page.waitForTimeout(10000);
await page.locator("xpath=(//span[text()='My Tours']/parent::div/parent::button)[1]").click();


await page.locator("xpath=(//a[@href='/my-tours/itinerary'])[1]").click();
await page.waitForTimeout(10000);

//await page.locator("xpath=//div[@data-testid='content-stack']/div").isVisible({timeout:1*15000});
const totalPatagraphs = await page.locator("xpath=//div[@data-testid='content-stack']/div").count();
console.log("Total Tiles in the Itinerary are: "+totalPatagraphs+"");

const totalImages = await page.locator("xpath=//div[contains(@class,'MuiBox')]/img").count();
console.log("Total Images inside Tiles are: "+totalImages+"");


//const divclass = '.MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom mui-1e00kft';
//const divtext = await page.locator(divclass).textContent();
//console.log('Text in div: $(divtext)');

});