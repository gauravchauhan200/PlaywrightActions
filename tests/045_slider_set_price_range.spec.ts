import { test, expect } from '@playwright/test'

test('Set price range from 100 to 300',async({ page })=>{

    await page.goto('https://sdetqa.vercel.app/autoplay');
    
    const slider = page.locator('#priceSlider');
    const sliderValue = 30;

    await slider.focus();
    await page.keyboard.press('Home');
   
    //  Move the slider to 70
    
    for(let i=0;i<=sliderValue;i++)
    {
        if(i!==sliderValue)
            {
                 await page.keyboard.press('ArrowRight')    
            }
    }
  //  await page.waitForTimeout(4000);
})

    // Select price range 200 to 400

    test('Min and Max value Slider',async({ page })=>{
        
        await page.goto('https://sdetqa.vercel.app/autoplay');

        const minSlider = page.locator('#slider-range span').first();
        const maxSlider = page.locator('#slider-range span').last();
    
        const priceRange = page.locator('#amount');

        await maxSlider.focus();
        await page.keyboard.press('End');

        await minSlider.focus();
        await page.keyboard.press('Home');
       
        

        for(let i=0;i< 200;i++)
        {
            const currentValue = await priceRange.inputValue();
            const minPrice = currentValue.split(' - ')[0];

            if(minPrice == '$200')
            {
                break;
            }
            await page.keyboard.press('ArrowRight');
        }
            
            await maxSlider.focus();
        
         for(let i=0;i<200;i++)
         {
            const currentValue = await priceRange.inputValue();
            const maxValue =  currentValue.split(' - ')[1];
            
            if(maxValue== '$400')
            {break;}

            await page.keyboard.press('ArrowLeft');

        }
        
        await page.waitForTimeout(4000)
        expect(priceRange).toHaveValue('$200 - $400');

    })
