import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
/*
Pre-requisite:
Install the csv-parse module to read CSV files:
    npm install csv-parse	
*/


// Reading data from csv
const csvPath = 'testdata/data.csv';
const fileContent = fs.readFileSync(csvPath, 'utf-8');

const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

// Main test
test.describe('Login data driven test', () => {
  for (const data of records) {
    
    test(`test for login "${data.email}" and "${data.password}"`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/login');
      await page.locator('#Email').fill(data.email);
      await page.locator('#Password').fill(data.password);
      await page.locator('.login-button').click();

      if (data.validity === 'valid') {
        // Assert that logout button is visible so its successful login
        const logout = page.locator('.ico-logout');
        await expect(logout).toBeVisible();
      } else {
        // Assert that error msg is visible
        const errorMessage = page.locator('.validation-summary-errors span');
        await expect(errorMessage).toBeVisible();
        // Assert that we are on still login page
        await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
      }
    });
  }
});