const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

exports.nvidiaAutoApply = async (url) => {
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

        // const url = "https://salesforce.wd12.myworkdayjobs.com/en-US/External_Career_Site/job/California---San-Francisco/Data-Scientist_JR279514";

        await driver.get(url)
        await driver.manage().window().maximize()

        await driver.wait(until.elementLocated(By.css('[data-automation-id="utilityButtonSignIn"]')), 5000);
        const signInButton = await driver.findElement(By.css('[data-automation-id="utilityButtonSignIn"]'));
        await signInButton.click()
        await driver.sleep(1000);
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


        await driver.sleep(2000);
        console.log('Signup complete');
        
        // // Click on apply button
        await driver.wait(until.elementLocated(By.css('[data-automation-id="adventureButton"]')), 5000);
        const applyButton = await driver.findElement(By.css('[data-automation-id="adventureButton"]'));
        await applyButton.click()
        
        await driver.wait(until.elementLocated(By.css('[data-automation-id="useMyLastApplication"]')), 5000);
        const userLastApplicationButton = await driver.findElement(By.css('[data-automation-id="useMyLastApplication"]'));
        await userLastApplicationButton.click()

        await driver.sleep(5000);
        
        await driver.wait(until.elementLocated(By.css('[data-automation-id="multiselectInputContainer"]')), 5000);
        const howDidYouHear = await driver.findElement(By.css('[data-automation-id="multiselectInputContainer"]'));
        await howDidYouHear.click()
        const howDidYouHearInput = await driver.findElement(By.css('[data-automation-id="searchBox"]'));
        await howDidYouHearInput.sendKeys('NVIDIA.COM');
        await howDidYouHearInput.sendKeys(Key.ENTER);
        console.log('Personal Info complete');


        const nextButton = await driver.findElement(By.css('[data-automation-id="pageFooterNextButton"]'));
        await driver.wait(until.elementIsVisible(nextButton), 5000);
        await driver.wait(until.elementIsEnabled(nextButton), 5000);
        await nextButton.click()
        await driver.sleep(3000);

        await driver.wait(until.elementIsVisible(nextButton), 5000);
        await driver.wait(until.elementIsEnabled(nextButton), 5000);
        await nextButton.click()
        await driver.sleep(3000);
        // Custom Questions
        // const actions = driver.actions({ async: true });
        
        const q1 = await driver.findElement(By.id('primaryQuestionnaire--3403860341171001f57d5c603f290001'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q1);
        await driver.sleep(1000);
        await q1.click();
        await q1.sendKeys("Yes");
        await q1.sendKeys(Key.ENTER);
        
        const q2 = await driver.findElement(By.id('primaryQuestionnaire--3403860341171001f57d5cf9af3d0001'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", q2);
        await driver.sleep(1000);
        await q2.click();
        await q2.sendKeys("Yes");
        await q2.sendKeys(Key.ENTER);

        await nextButton.click()
        await driver.sleep(3000);

        // Personal Info
        const ethnicity = await driver.findElement(By.css('#personalInfoUS--ethnicity'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", ethnicity);
        await driver.sleep(1000);
        await ethnicity.click();
        await ethnicity.sendKeys("Asian");
        await ethnicity.sendKeys(Key.ENTER);

        const gender = await driver.findElement(By.css('#personalInfoUS--gender'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", gender);
        await driver.sleep(1000);
        await gender.click();
        await gender.sendKeys("Male");
        await gender.sendKeys(Key.ENTER);

        const veteranStatus = await driver.findElement(By.css('#personalInfoUS--veteranStatus'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", veteranStatus);
        await driver.sleep(1000);
        await veteranStatus.click();
        await veteranStatus.sendKeys("I am not a veteran");
        await veteranStatus.sendKeys(Key.ENTER);

        const tnc = await driver.findElement(By.id('termsAndConditions--acceptTermsAndAgreements'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", tnc);
        await driver.sleep(1000);
        await tnc.click();

        await nextButton.click()
        await driver.sleep(3000);

        // Self Identify
        const name = await driver.findElement(By.id('selfIdentifiedDisabilityData--name'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", name);
        await driver.sleep(1000);
        await name.sendKeys("Suchit Gupta");


        const dateButton = await driver.findElement(By.css('[data-automation-id="dateIcon"]'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", dateButton);
        await dateButton.click()
        await driver.sleep(1000);
        const todayDateButton = await driver.findElement(By.css('[data-automation-id="datePickerSelectedToday"]'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", todayDateButton);
        await todayDateButton.click()

        const disabilityStatus = await driver.findElement(By.id('64cbff5f364f10000aeec521b4ec0000-disabilityStatus'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", disabilityStatus);
        await driver.sleep(1000);
        await disabilityStatus.click();

        await nextButton.click()
        await driver.sleep(3000);

        await nextButton.click()
        await driver.sleep(8000);

        console.log('Execution complete');
        await driver.sleep(5000)
        await driver.quit();
    } catch (err) {
        console.log('Error occured while applying to job', err);
        await driver.quit();
        throw new Error(err);
    }
}