const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const netSpeed = 1.5 * 1000

exports.citiAutoApply = async (url) => {
    console.log('Execution started');
    const options = new chrome.Options();
    options.addArguments('--headless');        // Run in headless mode
    options.addArguments('--no-sandbox');      // Needed on some Linux servers
    options.addArguments('--disable-gpu');     // Optional but common
    options.addArguments('--disable-dev-shm-usage'); // Fix for limited memory environments
    // let driver = await new Builder().forBrowser(Browser.CHROME).build()
    const driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build()
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
        await howDidYouHearInput.sendKeys('Citi Jobs Career Site');
        await howDidYouHearInput.sendKeys(Key.ENTER);
        await driver.sleep(1 * netSpeed);
        console.log('Personal Info complete');


        const nextButton = await driver.findElement(By.css('[data-automation-id="pageFooterNextButton"]'));
        await driver.wait(until.elementIsVisible(nextButton), 5000);
        await driver.wait(until.elementIsEnabled(nextButton), 5000);
        await nextButton.click()
        await driver.sleep(3 * netSpeed);

        await driver.wait(until.elementIsVisible(nextButton), 5000);
        await driver.wait(until.elementIsEnabled(nextButton), 5000);
        await nextButton.click()
        await driver.sleep(3 * netSpeed);
        // Custom Questions
        // const actions = driver.actions({ async: true });
        
        const q1 = await driver.findElement(By.id('primaryQuestionnaire--a9e583723ab110012f1c25e90a3a0001'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q1);
        await driver.sleep(1 * netSpeed);
        await q1.click();
        await q1.sendKeys("Yes");
        await q1.sendKeys(Key.ENTER);

        await driver.sleep(1 * netSpeed);
        const q11 = await driver.findElement(By.id('primaryQuestionnaire--a9e583723ab110012f1c268407f00002'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q11);
        await driver.sleep(1 * netSpeed);
        await q11.click();
        await q11.sendKeys("Yes");
        await q11.sendKeys(Key.ENTER);

        const q2 = await driver.findElement(By.id('primaryQuestionnaire--a9e583723ab110012f1c268407f00005'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q2);
        await driver.sleep(1 * netSpeed);
        await q2.click();
        await q2.sendKeys("No");
        await q2.sendKeys(Key.ENTER);

        const q3 = await driver.findElement(By.id('primaryQuestionnaire--a9e583723ab110012f1c271dbc670002'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q3);
        await driver.sleep(1 * netSpeed);
        await q3.click();
        await q3.sendKeys("No");
        await q3.sendKeys(Key.ENTER);

        const q4 = await driver.findElement(By.id('primaryQuestionnaire--a9e583723ab110012f1c271dbc670005'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q4);
        await driver.sleep(1 * netSpeed);
        await q4.click();
        await q4.sendKeys("No");
        await q4.sendKeys(Key.ENTER);

        const q5 = await driver.findElement(By.id('primaryQuestionnaire--a9e583723ab110012f1c27b755db0001'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q5);
        await driver.sleep(1 * netSpeed);
        await q5.click();
        await q5.sendKeys("No");
        await q5.sendKeys(Key.ENTER);

        const q6 = await driver.findElement(By.id('primaryQuestionnaire--a9e583723ab110012f1c27b755db0004'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q6);
        await driver.sleep(1 * netSpeed);
        await q6.click();
        await q6.sendKeys("Yes");
        await q6.sendKeys(Key.ENTER);

        await driver.sleep(1 * netSpeed);
        const q7 = await driver.findElement(By.id('primaryQuestionnaire--a9e583723ab110012f1c28537d600001'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q7);
        await driver.sleep(1 * netSpeed);
        // await q7.click();
        await q7.clear();
        await q7.sendKeys("H1B");
        // await q7.sendKeys(Key.ENTER);

        await nextButton.click()
        await driver.sleep(3 * netSpeed);

        // Custom questions 2
        const q21 = await driver.findElement(By.id('secondaryQuestionnaire--b5af492a9d7201ee7c7328fd240e8e1c'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q21);
        await driver.sleep(1 * netSpeed);
        await q21.click();
        await q21.sendKeys("Yes");
        await q21.sendKeys(Key.ENTER);

        await driver.sleep(1 * netSpeed);
        const q22 = await driver.findElement(By.id('secondaryQuestionnaire--b5af492a9d7201e992a528fd240e941c'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q22);
        await driver.sleep(1 * netSpeed);
        await q22.click();
        await q22.sendKeys("No");
        await q22.sendKeys(Key.ENTER);

        await nextButton.click()
        await driver.sleep(3 * netSpeed);

        // Personal Info
        const ethnicityMulti = await driver.findElement(By.id('e32326e1708d01e13044faaeaa002304-ethnicityMulti'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", ethnicityMulti);
        await driver.sleep(1 * netSpeed);
        await ethnicityMulti.click();
        
        const hispanicOrLatino = await driver.findElement(By.id('personalInfoUS--hispanicOrLatino'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", hispanicOrLatino);
        await driver.sleep(1 * netSpeed);
        await hispanicOrLatino.click();
        await hispanicOrLatino.sendKeys("No");
        await hispanicOrLatino.sendKeys(Key.ENTER);

        const gender = await driver.findElement(By.id('personalInfoUS--gender'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", gender);
        await driver.sleep(1 * netSpeed);
        await gender.click();
        await gender.sendKeys("Male");
        await gender.sendKeys(Key.ENTER);

        const veteranStatus = await driver.findElement(By.css('#personalInfoUS--veteranStatus'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", veteranStatus);
        await driver.sleep(1 * netSpeed);
        await veteranStatus.click();
        await veteranStatus.sendKeys("I am not a veteran");
        await veteranStatus.sendKeys(Key.ENTER);
        
        const tnc = await driver.findElement(By.id('termsAndConditions--acceptTermsAndAgreements'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", tnc);
        await driver.sleep(1 * netSpeed);
        await tnc.click();

        await nextButton.click()
        await driver.sleep(3 * netSpeed);

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