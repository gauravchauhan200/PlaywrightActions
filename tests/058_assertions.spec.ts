import { test, expect } from '@playwright/test'

// Base URLs for the demo application
const BASE_URL = 'https://demowebshop.tricentis.com';
const LOGIN_URL = 'https://demowebshop.tricentis.com/login';
const REGISTER_URL = 'https://demowebshop.tricentis.com/register';

// PAGE ASSERTIONS

// Assert that the page title matches the exectly

test('Page Assertion: toHaveTitle',async({ page })=>{
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle('Demo Web Shop');
    })

// Assert that the page title is not something else

test ('Page Assertion: not.toHaveTitle',async({ page })=>{
    await page.goto(BASE_URL);
    await expect(page).not.toHaveTitle('Wrong Title');
})

  // Assert that the page URL matches exactly

  test('Page Assertion: toHaveURL',async({ page }) => {
    await page.goto(LOGIN_URL);
    await expect(page).toHaveURL(LOGIN_URL);

  })