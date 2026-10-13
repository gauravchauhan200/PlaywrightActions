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

// 5. screenshot of specific element

test('Element Screenshot',async({ page })=>{

        const logo = page.locator('.navbar__brand');    //logo 
        await logo.screenshot({path: 'screenshots/05-logo.png'});
    })

//6. Screenshot after scrolling

test('Screenshot after scrolling',async({ page })=>{

    await page.evaluate(()=> window.scrollBy(0,600));
    await page.screenshot({ path: 'screenshots/06-scroll.png'});
})

//7. Mask Sensitive Elements

test('Screenshot with Mask', async ({ page }) => {

  const searchBox = page.locator('.DocSearch-Button');

  await page.screenshot({
    path: 'screenshots/07-mask.png',
    mask: [searchBox]
  })
})


// 8. hide Caret
// Usefull while capturing forms.

test('Hide Caret',async({ page })=>{

    await page.keyboard.press('/');
    await page.screenshot({path:'screenshots/08-hide-Caret.png',caret: 'hide'})
})

//9. Omit Background
//works with PNG only.
//Transparent Background.

test('Transparent background',async({ page })=>{

    await page.screenshot({
        path:'screenshots/09-transparent.png',
        omitBackground:true
    })
})


//10. Disable Animations

test('Disable Animation ',async({ page })=>{
    
    await page.screenshot({ path:'screenshots/10-no-animation.png',
    animations: 'disabled'     
    })
})

//11. Full Page + Mask + Disabled Animation
//Multiple Options Together

test('Multiple screenshot options',async({ page })=>{

    const searchBox = page.locator('.DocSearch-Button');

    await page.screenshot({ path: 'screenshots/13-combined.png',
        fullPage: true,
        animations: 'disabled',
        mask: [searchBox]
  });
})

//12. Save screen shots with time stamps (Dynamic) - Preserves old screenshots

test('Dynamic Name',async({ page },testInfo)=>{

    const timestamp = Date.now();

    // Method 1: Adding current Milliseconds
    //  let fileName = `screenshots/homepage_${timestamp}.png`
    //  await page.screenshot({path:fileName});

    // Method 2: Include Test Name + Timestamp
        let fileName =`screenshots/${testInfo.title}_${timestamp}.png`
        await page.screenshot({path:fileName});
})

//13. Capture Screenshot into Buffer

// (No file created)

test('Screenshot Buffer',async({ page })=>{

    const imageBuffer = await page.screenshot();
    console.log(`Buffer Size = ${imageBuffer.length}bytes`);
})

// 14. Attach screenshot to the html report
test('Attach Screenshot to report',async({ page },testInfo)=>{

    //Capture screenshot as Buffer , No file is created
    const screenshot = await page.screenshot();

    // Attach to HTML report
    await testInfo.attach('Homepage screenshot',{
        body: screenshot,
        contentType: 'image/png'
    })
})

//15. Save screenshot First, then Attach to html report

test('Attach saved screenshot',async({ page},testInfo)=>{

    const fileName = `screenshots/home_${Date.now()}.png`;
    await page.screenshot({path: fileName});
    await testInfo.attach('homepage screenshot',{
        path: fileName,
        contentType: 'image/png'
    });
})
