import { test, expect, Frame } from '@playwright/test' ;

test.describe('Frames Example',()=>{

    test('Frame 1 - Fill and verify input field',async({ page })=>{

        await page.goto('https://ui.vision/demo/webtest/frames/');
        const frame1 = page.frameLocator('frame[src="frame_1.html"]');
        await frame1.locator('input[name="mytext1"]').fill('Welcome');
        await expect(frame1.locator('input[name="mytext1"]')).toHaveValue('Welcome');

    })

    test('Frame 2 - Fill and verify input field',async({ page })=>{

        await page.goto('https://ui.vision/demo/webtest/frames/');
        const frame2 = page.frameLocator('frame[src="frame_2.html"]');
        await frame2.locator('input[name="mytext2"]').fill('Hello');
        await expect(frame2.locator('input[name="mytext2"]')).toHaveValue('Hello');

    })

    test('Frame 3 - Handle nested frame and Google Form ',async({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');
        // Parent frame
        const frame3 = page.frameLocator('frame[src="frame_3.html"]');
        await frame3.locator('input[name="mytext3"]').fill('You are in Frame 3 - Teal'); 
        await expect(frame3.locator('input[name="mytext3"]')).toHaveValue('You are in Frame 3 - Teal');

        // Child frame inside Frame 3
        // Nested iframe (Google form )
        const childFrame = frame3.frameLocator('iframe');
        
        // Now we can interact with elements inside the child frame
        await childFrame.getByRole('radio',{name : 'Hi, I am the UI.Vision IDE'}).click();

        // Select checkbox
        await childFrame.getByRole('checkbox',{name: 'Form Autofilling'}).click();

        // Next Button
        await childFrame.getByRole('button',{name: 'Next'}).click();

        await childFrame.getByRole('textbox',{name: 'Enter a short text'}).fill('we are here');
        await childFrame.getByRole('textbox',{name:'Enter a long answer'}).fill('we are inside long text-box');
        await childFrame.getByRole('button',{name: 'Submit'}).click();

        const confirmationText = await childFrame.locator('.vHW8K').innerText();
        expect(confirmationText).toContain('Thank you for testing the UI.Vision');

        

    })

    test('TC012 Frame 4 ',async({ page })=>{

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame4 = page.frameLocator('frame[src="frame_4.html"]');
        await frame4.locator('input[name="mytext4"]').fill('Welcome to frame 4 text box');
        await expect(frame4.locator('input[name="mytext4"]')).toHaveValue('Welcome to frame 4 text box');

    })

    test ('TC013 Frame 5',async({ page })=>{

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame5 = page.frameLocator('frame[src="frame_5.html"]');
        await frame5.locator('input[name="mytext5"]').fill('playwright');
        await expect(frame5.locator('input[name="mytext5"]')).toHaveValue('playwright');

        await page.waitForTimeout(3000);

    })

    test('TC014 Frame 5',async({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame5 = page.frameLocator('frame[src="frame_5.html"]');
        await frame5.locator('a[href="https://a9t9.com"]').click();
        const logo = frame5.getByAltText('Ui.Vision by a9t9 software - Image-Driven Automation');
        await expect(logo).toBeVisible();




    })



})