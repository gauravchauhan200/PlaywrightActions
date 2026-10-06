import { test, expect } from '@playwright/test'
import fs from 'fs';

//Reading data from json
const jsonPath="testdata/data.json";
const loginData:any = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

test.describe('Login data driven test',async()=>{

for(const {email, password,validity } of loginData)
{
    test(`test for login ${email} and ${password}`,async({ page })=>{

        await page.goto('https://demowebshop.tricentis.com/login');
        await page.locator('#Email').fill(email);
        await page.locator('#Password').fill(password);
        await page.locator('.login-button').click();

        if(validity.toLowerCase() === 'valid')
        {   //Assert that logout button is visible so its successful login
            const logout  = page.locator('.ico-logout');
            await expect(logout).toBeVisible();
        }
        else
        {   //Assert that error msg is visible
            const errorMessage = page.locator('.validation-summary-errors span');
            await expect(errorMessage).toBeVisible();
            //Assert that we are on still login page
            await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
        }
    })
}
})