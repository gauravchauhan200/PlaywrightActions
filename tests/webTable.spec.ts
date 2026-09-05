import { test, expect } from '@playwright/test'

test('Validate Static Webtable',async({page})=>{

    await page.goto('https://sdetqa.vercel.app/autoplay');

    // 1. Count number of rows in the table → Expected: 4
    // 2. Count number of columns in the table → Expected: 5
    
    const table = page.locator('table').first();
    const tableHeader = table.locator('thead th');
    const tableRow = table.locator('tbody tr');

    await expect(tableHeader).toHaveCount(5);
    await expect(tableRow).toHaveCount(4);

    // 3. Read all data from 2nd row (index 2 → 3rd row including header) → Expected: Keyboard |
    // Electronics | $79 | 0 | Out of Stock

    const rowCells= tableRow.nth(2).locator('td');
    const cellText = await rowCells.allTextContents();    
    
    console.log(cellText);

    // 4. Read all data from the table (excluding header) → Expected: 4 rows of product data

    const rowCount = await tableRow.count();
    console.log(rowCount);
    console.log("---- Printing rows-----");

    const tabledata:string[][]=[];

        for(let i=0;i<rowCount;i++)
        {
            const cellValues= await tableRow.nth(i).locator('td').allInnerTexts();
            tabledata.push(cellValues);
            console.log(cellValues);
        }
    // 5. Print all product names → Expected: Laptop, Mouse, Keyboard, Monitor

        const productNames = [];
        for(let i=0;i<tabledata.length;i++)
        {
            productNames.push(tabledata[i][0])
        }
        console.log("----Printing all product names----");
        console.log(productNames)
   
    // 6. Print products where Stock = 0 → Expected: Keyboard
        console.log("----Validating outOfStock product ----");

        const outOfStock =[];

        for(let i=0;i<tabledata.length;i++)
        {
            if(tabledata[i][3]==='0')
            {
                     outOfStock.push(tabledata[i][0])
            }
        }
        expect(outOfStock).toEqual(['Keyboard']);

    // 7. Print products where Status = "In Stock" → Expected: Laptop, Mouse, Monitor

        const instock =[];
            
        for(let i=0;i<tabledata.length;i++)
            {
                if(tabledata[i][4]==='In Stock')
                {
                    instock.push(tabledata[i][0]);
                }
            }
        expect(instock).toEqual(['Laptop', 'Mouse', 'Monitor']);


    // 8.  Count number of products "In Stock" → Expected: 3
    // 9.  Count number of products "Out of Stock" → Expected: 1
   
        expect(instock.length).toBe(3);
        expect(outOfStock.length).toBe(1);

    // 10. Get price of a specific product (e.g., Mouse) → Expected: $29
        console.log('----Get price of a specific product (e.g., Mouse)----');

        let productPrice;

        for(let i=0;i<tabledata.length;i++)
        {
            if(tabledata[i][0]==='Mouse')
            {
                productPrice = tabledata[i][2];
            }
        }

        console.log(productPrice);
        expect(productPrice).toBe('$29');



// 11. Calculate total price of all products → Expected: 999 + 29 + 79 + 349 = 1456
        console.log('----total price of products----');
        console.log('---- printing array table----');
        
        console.table(tabledata);

        let total=0;
        for(let i=0;i<tabledata.length;i++)
        {
            total = total + Number(tabledata[i][2].replace('$',''));
        }
        console.log(total);

// 12. Find product with highest price → Expected: Laptop ($999)
        console.log('-----product with highest price----');

        let pdPrice:number[]=[];

        for(let i=0;i<tabledata.length;i++)
        {
            pdPrice.push(Number(tabledata[i][2].replace('$','')))
        }
        
        let highestPrice = Math.max(...pdPrice);
        let highestPriceSt :string = `$${highestPrice}` 
       
        for(let i=0;i<tabledata.length;i++)
        {
            if(tabledata[i][2]=== highestPriceSt)
            {
                console.log(tabledata[i][0]);
                break;
            }
        }


// 13. Find product with lowest price → Expected: Mouse ($29)
// 14. Print products with price greater than $100 → Expected: Laptop, Monitor
        
        console.log('----products with price greater than $100 -----');

        for(let i=0;i<pdPrice.length;i++)
        {
            if(pdPrice[i]>100)
            {
               console.log(tabledata[i][0])
            }
        }











        // 12 & 13. Highest and Lowest price
          let maxPrice = Number(tabledata[0][2].replace('$', '')); // Initialize maxPrice with the price of the first product
          let minPrice = Number(tabledata[0][2].replace('$', '')); // Initialize minPrice with the price of the first product
        
          for (let i = 1; i < tabledata.length; i++) {
            const price = Number(tabledata[i][2].replace('$', '')); // Convert the price string to a number
        
            if (price > maxPrice) {
              maxPrice = price;
            }
        
            if (price < minPrice) {
              minPrice = price;
            }
          }
        
          expect(maxPrice).toBe(999);
          expect(minPrice).toBe(29);
        
          // 14. Products above $100
          const expensiveProducts = [];
        
          for (let i = 0; i < tabledata.length; i++) {
            const price = Number(tabledata[i][2].replace('$', '')); // Convert the price string to a number
        
            if (price > 100) {
              expensiveProducts.push(tabledata[i][0]);
            }
          }
        
          expect(expensiveProducts).toEqual(['Laptop', 'Monitor']);
        
          await page.close()
        
    });
