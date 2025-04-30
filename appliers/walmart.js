const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const netSpeed = 1.5 * 1000

exports.walmartAutoApply = async (url) => {
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
        await howDidYouHearInput.sendKeys('Walmart Career Site');
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
        await driver.sleep(4 * netSpeed);
        console.log('Work History complete');
        // Custom Questions
        // const actions = driver.actions({ async: true });
        
        // primaryQuestionnaire--81fd384b8ff9100da1c59efc98970000

        const q1 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2b3da5e40001'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q1);
        await driver.sleep(1 * netSpeed);
        await q1.click();
        await q1.sendKeys("Yes");
        await q1.sendKeys(Key.ENTER);
        
        const q2 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2b3da5e40004'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q2);
        await driver.sleep(1 * netSpeed);
        await q2.click();
        await q2.sendKeys("Opt-In to receive text messages from Walmart");
        await q2.sendKeys(Key.ENTER);
        
        await driver.sleep(1 * netSpeed);
        const q3 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2bd793200000'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q3);
        await driver.sleep(1 * netSpeed);
        // await q3.click();
        await q3.clear();
        await q3.sendKeys("+17162923634");
        // await q3.sendKeys(Key.ENTER);

        const q4 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2bd793200001'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q4);
        await driver.sleep(1 * netSpeed);
        await q4.click();
        await q4.sendKeys("Yes");
        await q4.sendKeys(Key.ENTER);

        const q5 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2bd793200004'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q5);
        await driver.sleep(1 * netSpeed);
        await q5.click();
        await q5.sendKeys("18 years of age and Over");
        await q5.sendKeys(Key.ENTER);

        const q6 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2bd793200008'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q6);
        await driver.sleep(1 * netSpeed);
        await q6.click();
        await q6.sendKeys("Have never been an employee of Walmart Inc or any of its subsidiaries");
        await q6.sendKeys(Key.ENTER);

        const q7 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2c71804f0006'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q7);
        await driver.sleep(1 * netSpeed);
        await q7.click();
        await q7.sendKeys("Yes");
        await q7.sendKeys(Key.ENTER);

        const q8 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2c71804f0009'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q8);
        await driver.sleep(1 * netSpeed);
        await q8.click();
        await q8.sendKeys("Yes");
        await q8.sendKeys(Key.ENTER);

        await driver.sleep(1 * netSpeed);
        const q9 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2d0b730f0002'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q9);
        await driver.sleep(1 * netSpeed);
        await q9.click();
        await q9.sendKeys("OPT/CPT/J-1");
        await q9.sendKeys(Key.ENTER);

        const q10 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2da55acd0003'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q10);
        await driver.sleep(1 * netSpeed);
        await q10.click();
        await q10.sendKeys("No");
        await q10.sendKeys(Key.ENTER);

        const q11 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2ed909ba0003'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q11);
        await driver.sleep(1 * netSpeed);
        await q11.click();
        await q11.sendKeys("No");
        await q11.sendKeys(Key.ENTER);

    
        const q12 = await driver.findElement(By.id('primaryQuestionnaire--6053fc57425a101d610d2ed909ba0009'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q12);
        await driver.sleep(1 * netSpeed);
        await q12.click();
        await q12.sendKeys("No");
        await q12.sendKeys(Key.ENTER);

        await nextButton.click()
        await driver.sleep(3 * netSpeed);
        console.log('Primary Questionaire complete');

        // Personal Info
        const ethnicity = await driver.findElement(By.css('#personalInfoUS--ethnicity'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", ethnicity);
        await driver.sleep(1000);
        await ethnicity.click();
        await ethnicity.sendKeys("Asian");
        await ethnicity.sendKeys(Key.ENTER);

        const gender = await driver.findElement(By.id('personalInfoUS--gender'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", gender);
        await driver.sleep(1 * netSpeed);
        await gender.click();
        await gender.sendKeys("Male");
        await gender.sendKeys(Key.ENTER);
        
        const tnc = await driver.findElement(By.id('termsAndConditions--acceptTermsAndAgreements'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", tnc);
        await driver.sleep(1 * netSpeed);
        await tnc.click();

        await nextButton.click()
        await driver.sleep(3 * netSpeed);
        console.log('personalinfoUS complete');

        // Self Identify
        // const name = await driver.findElement(By.id('selfIdentifiedDisabilityData--name'));
        // await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", name);
        // await driver.sleep(1 * netSpeed);
        // await name.sendKeys("Suchit Gupta");


        // const dateButton = await driver.findElement(By.css('[data-automation-id="dateIcon"]'));
        // await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", dateButton);
        // await dateButton.click()
        // await driver.sleep(1 * netSpeed);
        // const todayDateButton = await driver.findElement(By.css('[data-automation-id="datePickerSelectedToday"]'));
        // await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", todayDateButton);
        // await todayDateButton.click()

        // const disabilityStatus = await driver.findElement(By.id('64cbff5f364f10000aeec521b4ec0000-disabilityStatus'));
        // await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", disabilityStatus);
        // await driver.sleep(1 * netSpeed);
        // await disabilityStatus.click();

        // await nextButton.click()
        // await driver.sleep(3 * netSpeed);

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