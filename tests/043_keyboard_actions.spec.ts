import { test, expect } from '@playwright/test'

test('Keyboard actions',async({ page })=>{

    await page.goto('https://gotranscript.com/text-compare');

    const inputBox1 = page.getByPlaceholder('Paste one version of the text here.');
    const inputBox2 = page.getByPlaceholder('Paste another version of the text here.');

    //Focus on box
    await inputBox1.focus();
    page.keyboard.insertText('hello welcome'); //one shot
   //await page.keyboard.type("Welcome") // character by character

    await  inputBox2.focus();
    await inputBox2.fill('hello');  // First Preference

    await inputBox1.focus();
    await expect(inputBox1).toHaveValue('hello welcome');

    await page.waitForTimeout(3000);

})
