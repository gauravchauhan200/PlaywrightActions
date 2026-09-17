import { test, expect } from '@playwright/test'

const URL = 'https://sdetqa.vercel.app/autoplay';

test.describe('SVG Handling',()=>{

    test.beforeEach(async({page})=>{
        await page.goto(URL);
    })
    test.afterEach(async({page})=>{
        await page.close();
    })

     //1.Click on an SVG circle Icon
     //2.Locate SVG rectangle by ID
     //3.Locate SVG circle using Attributes
     //4.Verify SVG Color
     // 5.Count Multiple SVG Icons

    test('shape tests',async({page})=>{
        const circle = page.locator('svg circle.shape');
        circle.scrollIntoViewIfNeeded();
        await circle.click();

        const rectShape = page.locator('#rect-shape');
        expect(rectShape).toBeVisible();
        await rectShape.click();

        const circleBlue = page.locator('circle[fill="DeepSkyBlue"]');
        expect(circleBlue).toBeVisible();

        const  circleColor = await page.locator('svg circle.shape').getAttribute('fill');
        expect(circleColor).toBe('DeepSkyBlue');

        const shape_count= page.locator('svg .shape');
        console.log(await shape_count.count());
        expect(shape_count).toHaveCount(4);

    })
    
    //   Handle SVG Bar chart
    //1. Click a Specific Bar
    //2. bars & labels counts validations
    //3. Print Label along with Heights
    //4. Verify Highest Bar - expe 70

    test('Handle SVG Bar chart',async({ page })=>{

        await page.locator('svg rect').nth(1).click();
        
        const bars = page.locator('svg').nth(1).locator('rect');
        const bar_count = await bars.count();
        console.log();
        
        const labels =  page.locator('svg').nth(1).locator('text');
        const labelsCount = await labels.count();
        console.log(labelsCount); 

        for(let i=0;i<labelsCount;i++ )
        {
            const label = await labels.nth(i).textContent();
            const height = await bars.nth(i).getAttribute('height');
            console.log(`${ label } : ${ height }`);
        }

        //4. Verify Highest Bar - expe 70
        
        let maxHeight = 0;
       
        for(let i=0;i<bar_count;i++)
        {
           const height = Number(await bars.nth(i).getAttribute('height'));
        
            if(height > maxHeight)
            {
                maxHeight = height
            }
        }
        expect(maxHeight).toBe(70);


    })




})
