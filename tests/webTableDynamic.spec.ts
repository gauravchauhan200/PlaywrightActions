import { test,expect } from "@playwright/test";

test.describe('Dynamic Table',()=>{

    const weburl = 'https://sdetqa.vercel.app/autoplay.html';
    
    test.beforeEach(async({page})=>{
       await page.goto(weburl);
       await expect(page.getByText('AutoPlay')).toBeVisible();
    })

    test('TestCase 1: Chrome CPU Load validation',async({page})=>{

        const rows = await page.locator('#taskTable tbody tr').all(); // 4 Locators
        expect(rows.length).toBeGreaterThan(0);

        for(let row of rows)
        {
            const processName = await row.locator('td').nth(0).innerText();
        
            let cpuLoad;

            if(processName==="Chrome")
            {
                cpuLoad = await row.locator('td',{hasText:'%'}).innerText(); //captured from table
                const expCpuload = await page.locator('strong.chrome-cpu').innerText();
                expect(cpuLoad).toBe(expCpuload);
                break;
            }
        }
    })

    test('TestCase 2: Firefox Memory Usage Validation',async({page})=>{

        const rows = await  page.locator('#taskTable tbody tr').all();
        expect(rows.length).toBeGreaterThan(0);
        
        for(let row of rows)
        {
            const processName = await row.locator('td').nth(0).innerText();
            let memUsage= '';

            if(processName ==='Firefox')
            {
                memUsage= await row.locator('td',{hasText:/MB$/}).innerText();  //text selection format only for MB selection
                const expusage = await page.locator('strong.firefox-memory').innerText();
                expect(expusage).toBe(memUsage);
                break;
            }
        }
    })

    test('Test Case 3: Chrome Network Speed Validation',async({page})=>{

        const rows = await page.locator('#taskTable tbody tr').all();

        let processName;

        for(let row of rows)
        {
           processName = await row.locator('td').nth(0).innerText();
            
           if(processName==='Chrome')
           {
            const network = await row.locator('td',{hasText:/Mbps/}).innerText();
            const expnetwork = await page.locator('strong.chrome-network').innerText();
            expect(network).toBe(expnetwork);
            
            }
        }
    })


    test('Test Case 4: Firefox Disk Space Validation',async({page})=>{

        const rows = await page.locator('#taskTable tbody tr').all();

        let processName ;
        for(let row of rows)
        {
            processName = await row.locator('td').nth(0).innerText();

            if(processName==='Firefox')
            {
              const expected= await row.locator('td',{hasText:'MB/s'}).nth(0).innerText();
              const expect = await page.locator('strong.firefox-disk').innerText();
                console.log(expected);
                console.log(expect);
            }
        }


    })







})