import { test, expect } from '@playwright/test'

const loginTestData: string[][] = [
    ["laura.taylor1234@example.com", "test123", "valid"],
    ["invaliduser@example.com", "test321", "invalid"],
    ["validuser@example.com", "testxyz", "invalid"],
    ["", "", "invalid"],
];

for(const [email, password,validity] of loginTestData)
{

test.describe('Login data driven test',async()=>{

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
})
}