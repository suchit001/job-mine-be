const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const netSpeed = 1.5 * 1000

exports.adobeAutoApply = async (url) => {
    console.log('Execution started');
    const options = new chrome.Options();
    options.addArguments('--headless');        // Run in headless mode
    options.addArguments('--no-sandbox');      // Needed on some Linux servers
    options.addArguments('--disable-gpu');     // Optional but common
    options.addArguments('--disable-dev-shm-usage'); // Fix for limited memory environments
    const driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build()
    // let driver = await new Builder().forBrowser(Browser.CHROME).build()
    try {
        await driver.get(url)
        await driver.manage().window().maximize()

        await driver.wait(until.elementLocated(By.css('[data-automation-id="utilityButtonSignIn"]')), 5000);
        const signInButton = await driver.findElement(By.css('[data-automation-id="utilityButtonSignIn"]'));
        await signInButton.click()
        await driver.sleep(1 * netSpeed);
        // Login Page
        // await driver.wait(until.elementLocated(By.css('[data-automation-id="click_filter"]')), 5000);
        const usernameField = await driver.findElement(By.css('[data-automation-id="email"]'));
        const passwordField = await driver.findElement(By.css('[data-automation-id="password"]'));
        await usernameField.clear();
        await usernameField.sendKeys('guptasuchit000@gmail.com');
        await passwordField.clear();
        await passwordField.sendKeys('America@101');
        const signInFormButton = await driver.findElement(By.css('[data-automation-id="click_filter"]'));
        await signInFormButton.click();


        await driver.sleep(3 * netSpeed);
        console.log('Signup complete');
        // // Click on apply button
        await driver.wait(until.elementLocated(By.css('[data-automation-id="adventureButton"]')), 5000);
        const applyButton = await driver.findElement(By.css('[data-automation-id="adventureButton"]'));
        await applyButton.click()
        
        await driver.wait(until.elementLocated(By.css('[data-automation-id="useMyLastApplication"]')), 5000);
        const userLastApplicationButton = await driver.findElement(By.css('[data-automation-id="useMyLastApplication"]'));
        await userLastApplicationButton.click()

        await driver.sleep(5 * netSpeed);
        
        await driver.wait(until.elementLocated(By.css('[data-automation-id="multiselectInputContainer"]')), 5000);
        const howDidYouHear = await driver.findElement(By.css('[data-automation-id="multiselectInputContainer"]'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", howDidYouHear);
        await driver.sleep(1 * netSpeed);
        await howDidYouHear.click()
        const howDidYouHearInput = await driver.findElement(By.css('[data-automation-id="searchBox"]'));
        await howDidYouHearInput.sendKeys('Adobe.com');
        await howDidYouHearInput.sendKeys(Key.ENTER);
        await driver.sleep(1 * netSpeed);
        
        const nextButton = await driver.findElement(By.css('[data-automation-id="pageFooterNextButton"]'));
        await driver.wait(until.elementIsVisible(nextButton), 5000);
        await driver.wait(until.elementIsEnabled(nextButton), 5000);
        await nextButton.click()
        await driver.sleep(3 * netSpeed);
        console.log('Personal Info complete');

        await driver.wait(until.elementIsVisible(nextButton), 5000);
        await driver.wait(until.elementIsEnabled(nextButton), 5000);
        await nextButton.click()
        await driver.sleep(3 * netSpeed);

        console.log('Work History complete');
        // Custom Questions
        // const actions = driver.actions({ async: true });
        
        const q1 = await driver.findElement(By.id('primaryQuestionnaire--305a1163be7301083ded7092b201bf8a'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q1);
        await driver.sleep(1 * netSpeed);
        await q1.click();
        await q1.sendKeys("Yes");
        await q1.sendKeys(Key.ENTER);

        await driver.sleep(1 * netSpeed);
        const q11 = await driver.findElement(By.id('9821e4ba31f01013ec650c35a7ed0c36-305a1163be7301dceb027192b201c28a'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q11);
        await driver.sleep(1 * netSpeed);
        await q11.click();
        // await q11.sendKeys("Yes");
        // await q11.sendKeys(Key.ENTER);

        const q2 = await driver.findElement(By.id('primaryQuestionnaire--305a1163be7301b985577192b201c88a'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q2);
        await driver.sleep(1 * netSpeed);
        await q2.click();
        await q2.sendKeys("Yes");
        await q2.sendKeys(Key.ENTER);

        const q3 = await driver.findElement(By.id('primaryQuestionnaire--305a1163be7301c9e1697192b201cb8a'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q3);
        await driver.sleep(1 * netSpeed);
        await q3.click();
        await q3.sendKeys("Yes");
        await q3.sendKeys(Key.ENTER);

        const q4 = await driver.findElement(By.id('primaryQuestionnaire--305a1163be73017aae7b7192b201ce8a'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q4);
        await driver.sleep(1 * netSpeed);
        await q4.click();
        await q4.sendKeys("Yes");
        await q4.sendKeys(Key.ENTER);

        const q5 = await driver.findElement(By.id('primaryQuestionnaire--305a1163be7301787b8d7192b201d18a'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q5);
        await driver.sleep(1 * netSpeed);
        await q5.click();
        await q5.sendKeys("Yes");
        await q5.sendKeys(Key.ENTER);


        await nextButton.click()
        await driver.sleep(3 * netSpeed);
        console.log('Primary Questionaire complete');

        // Personal Info
        const veteranStatus = await driver.findElement(By.css('#personalInfoUS--veteranStatus'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", veteranStatus);
        await driver.sleep(1 * netSpeed);
        await veteranStatus.click();
        await veteranStatus.sendKeys("I am not a veteran");
        await veteranStatus.sendKeys(Key.ENTER);

        const gender = await driver.findElement(By.id('personalInfoUS--gender'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", gender);
        await driver.sleep(1 * netSpeed);
        await gender.click();
        await gender.sendKeys("Male");
        await gender.sendKeys(Key.ENTER);

        const ethnicity = await driver.findElement(By.css('#personalInfoUS--ethnicity'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", ethnicity);
        await driver.sleep(1000);
        await ethnicity.click();
        await ethnicity.sendKeys("Asian");
        await ethnicity.sendKeys(Key.ENTER);

        const tnc = await driver.findElement(By.id('termsAndConditions--acceptTermsAndAgreements'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", tnc);
        await driver.sleep(1 * netSpeed);
        await tnc.click();

        await nextButton.click()
        await driver.sleep(3 * netSpeed);

        console.log('personalinfoUS complete');
        // Self Identify
        const name = await driver.findElement(By.id('selfIdentifiedDisabilityData--name'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", name);
        await driver.sleep(1 * netSpeed);
        await name.sendKeys("Suchit Gupta");


        const dateButton = await driver.findElement(By.css('[data-automation-id="dateIcon"]'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", dateButton);
        await dateButton.click()
        await driver.sleep(1 * netSpeed);
        const todayDateButton = await driver.findElement(By.css('[data-automation-id="datePickerSelectedToday"]'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", todayDateButton);
        await todayDateButton.click()

        const disabilityStatus = await driver.findElement(By.id('64cbff5f364f10000aeec521b4ec0000-disabilityStatus'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", disabilityStatus);
        await driver.sleep(1 * netSpeed);
        await disabilityStatus.click();

        await nextButton.click()
        await driver.sleep(3 * netSpeed);
        
        console.log('Self identify complete');
        await nextButton.click()
        await driver.sleep(5 * netSpeed);

        console.log('Execution complete');
        await driver.sleep(3 * netSpeed)
        await driver.quit();
    } catch (err) {
        console.log('Error occured while applying to job', err);
        await driver.quit();
        throw new Error(err);
    }
}