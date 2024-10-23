const { allure } = require('allure-playwright');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Module } = require('module');

let pageInstance;

function setPage(page) {
    pageInstance = page;
}

async function enterText(locator, text, elementName) {
    await pageInstance.locator(locator).fill(text);
    await allure.logStep(`TEST STEP - ENTERED TEXT: '${text}' in element : '${elementName}' `);
}
async function click(locator, elementName) {
    await pageInstance.click(locator);
    await allure.logStep(`TEST STEP - CLICKED ON ELEMENT: '${elementName}' `);
}
async function takeFullScreenshot(path) {
    await pageInstance.screenshot({ path: path, fullPage: true });
    await allure.logStep(`TEST STEP - Screenshot is taken and saved at: '${path}' `);
}

async function enterTextAndHitEnter(locator, text, elementName) {
    await pageInstance.locator(locator).fill(text); // Enter the text
    await pageInstance.keyboard.press('Enter'); // Press the Enter key
    await allure.logStep(`TEST STEP - Entered text: '${text}' in element: '${elementName}' and pressed Enter key`);
}

async function generateRandomDigitString() {
    return crypto.randomInt(100000000, 99999999).toString();
}

async function isVisible(seconds, locator, elementName)
{
    const isVisible = await pageInstance.locator(locator).isVisible({timeout: seconds*1000});
    await allure.logStep(`TEST STEP - Element Name: ${elementName}, visiblity is checked and result is: ${isVisible}`);
    return isVisible;
}

async function isClickable(seconds, locator, elementName)
{
    await pageInstance.locator(locator).waitFor({state:'attched', timeout:seconds*1000});
    const isClickable = await pageInstance.locator(locator).isClickable() && await pageInstance.locator(locator).isEnabled();
    await allure.logStep(`TEST STEP - Element Name: ${elementName}, clickability is checked and result is: ${isClickable}`);
}

async function getTitle(expectedTitle)
{
const actaulTitle = await pageInstance.title();
const isMatch = actaulTitle === expectedTitle
await allure.logStep(`TEST STEP - Page title is checked and expected is: ${expectedTitle}, Actual title is: ${actaulTitle} both are matched:? ${isMatch}`);
return isMatch;
}

async function getUrl(expectedUrl)
{
const actualUrl = await pageInstance.url();
const isMatch = actualUrl === expectedUrl
await allure.logStep(`TEST STEP - Page url is checked and expected is: ${expectedUrl}, Actual url is: ${actualUrl} both are matched:? ${isMatch}`);
return isMatch;
}

async function getTextAndCompare(seconds, locator,expectedText)
{
    await pageInstance.locator(locator).waitFor({state:'attched', timeout:seconds*1000});
    const actualText = await pageInstance.locator(locator).texttContent();
    const isMatch = actualText.trim() === expectedText.trim();
    await allure.logStep(`TEST STEP - Fetched text from website is: ${actualText}, Expected text is: ${expectedText} both are matched:? ${isMatch}`);
    return isMatch;
}

async function getAttributeAndCompare(seconds, locator, attributeName,expectedValue, elementName)
{
    await pageInstance.locator(locator).waitFor({state:'visible', timeout:seconds*1000});
    const actualValue = await pageInstance.locator(locator).getAttribute(attributeName);
    const isMatch = actualValue === expectedValue;
    await allure.logStep(`TEST STEP - Attribute Name: ${attributeName} of element name: ${elementName} is successfully matched with expected value`);
    if(!isMatch) 
    {
        throw new Error(`TEST STEP - Attribute value is mismatch,  element mame is: ${elementName}, expected value is: ${expectedValue} and actual received is: ${actualValue}`);
    }
}

async function clickAllAndCheckStatus(locator,elementName)
{
const elements = await pageInstance.locator(locator);
const count = await elements.count();
await allure.logStep(`TEST STEP - Element Name: ${elementName} has matching count: ${count} `);

for(let i=0;i<count;i++)
{
    const element = elements.nth(i);
    await element.click();
    const isVisible = await element.isVisible();
    const isEnabled = await element.isEnabled();
    const status = isVisible && isEnabled? 'OK' : 'Not OK';
    await allure.logStep(`TEST STEP - Element Name: ${elementName} is clicked with index: ${i} and Status is ${status}`);
}

}
module.exports = {
    setPage,
    enterText,
    click,
    takeFullScreenshot,
    enterTextAndHitEnter,
    generateRandomDigitString,
    isVisible,
    clickAllAndCheckStatus,
    getAttributeAndCompare,
    getTextAndCompare,
    getTitle,
    getUrl,
    isClickable
}