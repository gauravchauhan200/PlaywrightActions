import {test,expect} from "@playwright/test"
    
/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

*/

test("Verify Playwright Locator",async({page})=>{


   // await page.goto("https://www.w3schools.com/html/html_tables.asp");
    await page.goto("http://localhost/opencart/upload/");
   
    await  expect( page.getByText('Featured')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Featured' })).toBeVisible();
    //await page.getByText('MacBook').click();
    await page.getByRole('link', { name: 'MacBook' }).first().click(); //two element found so used first()
    await expect( page.getByText('Built-in iSight camera')).toBeVisible();
    await expect(page.getByText('Sleek, 1.08-inch-thin design')).toBeVisible();
    await page.getByRole('link',{name:'Specification'}).isVisible();

    await expect( page.getByRole('link',{name:'Specification'})).toHaveText(/Specification/);
    await page.getByRole('link',{name:'Specification'}).click();

    await expect (page.getByRole('cell', { name: 'test 1' })).toHaveText(/test 1/);
    console.log(await page.getByRole('cell', { name: 'test 1' }).allInnerTexts());

});

test("Verify LocatorsText",async({page})=>{

    await page.goto("http://localhost/opencart/upload/");

    await expect(page.getByRole('link',{name:'About Us'})).toHaveText('About Us');
    await expect(page.getByAltText('Your Store')).toContainClass('img-responsive');

    const myAccount = page.getByTitle('My Account');
    await expect(myAccount).toBeVisible();

    const searchBox = page.getByPlaceholder('Search');
    await expect(searchBox).toBeEditable();
    await expect(searchBox).toBeVisible();
    await searchBox.fill("p");
   // await searchBox.press('Enter');

    const searchButton = page.locator("//button[@class='btn btn-default btn-lg']")
    await searchButton.click();

    const searchResult = page.locator('div.product-thumb').locator('div').nth(1);
    expect(searchResult).toHaveText(/Apple */);
    await expect(myAccount).toBeVisible();

});