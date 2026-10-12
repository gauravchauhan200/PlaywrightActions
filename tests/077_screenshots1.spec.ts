import { test } from '@playwright/test'

test.beforeEach(async({ page })=>{

    await page.goto('https://playwright.dev/');
})

// 1. Screenshot of the only visible viewport (Default)

test('Viewport screenshot ',async({ page })=>{

    await page.screenshot({ path: 'screenshots/01-viewport.png'});
})

// 2. Full Page Screenshot
test ('FullPage screenshot',async({ page })=>{

    await page.screenshot({ path:'screenshots/02-fullPage.png',fullPage:true})
})

// 3. JPEG screen shot with quality
// Quality works only with JPEG

test('JPEG Screenshot',async ({ page })=>{

    await page.screenshot({path:'screenshots/03-quality.jpg',
        type: 'jpeg',
        quality:70
    });
})

// 4. Capture specific area (clip)

test('Clip Screenshot',async({ page })=>{

    await page.screenshot({
        path: 'screenshots/04-clip.png',
        clip: {
            x: 100,
            y: 100,
            width: 700,
            height:400
        }
    });

    

})

