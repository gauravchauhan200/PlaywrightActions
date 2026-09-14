import { test, expect } from '@playwright/test' ;

test('drag and drop from guru 99',async({ page })=>{

await page.goto('https://demo.guru99.com/test/drag_drop.html');

const from1 = page.locator('#credit2'); //bank
const to1 =page.locator('#bank');

const from2 = page.locator('#fourth').first();
const to2 = page.locator('#amt7')

const from3 = page.locator('#credit1')
const to3 = page.locator('#loan')

const from4 = page.locator('#fourth').first();
const to4 = page.locator('#amt8')

await from1.dragTo(to1);
await from2.dragTo(to2);

await from3.dragTo(to3);
await from4.dragTo(to4);

const verificationMess =page.locator('a:has-text("Perfect!")');
await expect(verificationMess).toBeVisible();



})