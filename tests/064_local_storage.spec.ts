import { chromium } from "@playwright/test";

async function saveAdminStorage()
{

    let browser = await chromium.launch({headless:false});
    let context = await browser.newContext();
    let page = await context.newPage();

    //Login
    await page.goto('https://sdetqa.vercel.app/login_app');
    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByLabel('Password').fill('admin123');
   
   // await page.getByLabel('🍪 Cookie').check();
    await page.getByLabel('💾 Local').check();
    await page.getByRole('button',{name:'Login'}).click();

    await page.waitForSelector('text= Dashboard Welcome',{state:'visible'});

    //able to capture both cookies storage and local storage
    await context.storageState({ path: './storage_data/admin_data.json'})

    await browser.close();
}


    //Calling the functions

    saveAdminStorage();