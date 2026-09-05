import { test, expect } from '@playwright/test'

const pageUrl = 'https://sdetqa.vercel.app/autoplay.html';

test.describe('Handling dropDown',()=>{


    test.beforeEach( async({page})=>{
        await page.goto(pageUrl);
        await expect(page.getByText('AutoPlay')).toBeVisible();
    });

    test('single select DropDown',async({page})=>{
        const countrySelect = page.locator('#country');
        await expect(countrySelect).toBeVisible();

        //Default Selection should be India
        await expect(countrySelect).toHaveValue('india');
       

        // Ways to select options from dropdown 3
        //1. using label
        //2. using attribute (if it is available in the dom)
        //3. using index

        //selectOption() --> select option from the dropdown

        //select by visible label  - (Preference)
        await countrySelect.selectOption({label:'USA'});
        await expect(countrySelect).toHaveValue('usa');
        await expect(countrySelect.locator('option:checked')).toHaveText('USA');  //Check by Text

        //Select by attribute
        await countrySelect.selectOption({value:'uk'});
        await expect(countrySelect).toHaveValue('uk');

        //Select by Index
        await countrySelect.selectOption({index:3});
        await expect(countrySelect).toHaveValue('germany');

        //Select by combination of value and label
        await countrySelect.selectOption({label:'USA',value:'usa'});

        //Validate dropdown options count
        //1. chaining locator
       
        const options = countrySelect.locator("option");
        await expect(options).toHaveCount(5);
        
        //2. directly capturing options using CSS
        const option_multiple = page.locator('#country option');
        await expect(option_multiple).toHaveCount(5);

        //3. we can use this to check how many options are there if dont know
        
        const drpcount = await page.locator('#country option').count();
        console.log(drpcount);
        expect(drpcount).toBe(5);

        //Validate options contaning Germany

        const allTextoption = await options.allTextContents(); //array variable
        expect(allTextoption).toContain("Germany");  //to conatin use for array text

        //Printing option texts
        for(const option of allTextoption)
        {
            console.log(option);
        }

    });

    test('Handling multiSelect dropDown',async({page})=>{

        const colorSelect = await page.locator('#colors');
        await expect(colorSelect).toBeVisible();

        //The initial selected value should include blue as the first selected option
        await expect(colorSelect).toHaveValue('blue');

        //Select multiple options by label - Preferable
     //   await colorSelect.selectOption([{label:'Red'},{label:'Blue'},{label:'Green'}]);

        //Select multiple options by values
     //   await colorSelect.selectOption([{value:'red'},{value:'blue'},{value:'green'}]);
        
        //Select multiple options by index
        await colorSelect.selectOption([{index:0},{index:1},{index:2}]);

    });
    
test('Sorted dropDown',async({page})=>{

        const colorOptionslist = await page.locator('#colors option').allTextContents();
        const sortedlist = [...colorOptionslist].sort();

        console.log(colorOptionslist);
        console.log(sortedlist);

        expect(colorOptionslist).not.toEqual(sortedlist);


    })

    test('bootStrap dropDown',async({page})=>{

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByText('PIM').first().isVisible();

        const drop = page.locator('i.oxd-icon.bi-caret-up-fill.oxd-select-text--arrow');
        await drop.click(); 

        const listText = await page.locator('div[role="listbox"] span').allTextContents();
        
        for(let item of listText)
        {console.log(item)}

    })

        test.only('flipkart search options',async({page})=>{

            await page.goto('https://www.flipkart.com/');
            await page.getByText('✕').click();
            await page.locator('input:visible').first().fill('mob');

            await page.waitForTimeout(2000);

            const searchContentlocator =  page.locator('form a>div:nth-child(2)');
            const searchItem  = await searchContentlocator.allTextContents();
            
            for(let item of searchItem)
            {console.log(item)}
    
            for(let i=0;i<= searchItem.length;i++)
            {
                if(searchItem[i] === 'mobile under 10000')
                    {
                        await searchContentlocator.nth(i).click();
                        console.log('clicked item..');
                        console.log(searchItem[i]);
                        break;
                    }
            }

    await page.waitForTimeout(5000);

    })





})
