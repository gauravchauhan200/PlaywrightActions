import { Page, Locator } from '@playwright/test';

export class HomePage {


    private readonly page: Page;
    private readonly productLinks: Locator;
    private readonly addToCartButton: Locator;
    private readonly homeLink: Locator;
    private readonly contactLink: Locator;
    private readonly aboutUsLink: Locator;
    private readonly cartLink: Locator;
    private readonly loginLink: Locator;
    private readonly signUpLink: Locator;
    private readonly categoryLinks: Locator;


    constructor(page:Page)
    {
        this.page = page;
        this.productLinks = page.locator('div#tbodyid div.card h4 a');
        this.addToCartButton = page.getByRole('link',{name:'Add to cart'});
        this.homeLink = page.getByRole('link', { name: 'Home (current)' });
        this.contactLink = page.getByRole('link', { name: 'Contact' });
        this.aboutUsLink =  page.getByRole('link', { name: 'About us' });
        this.cartLink =  page.getByRole('link', { name: 'Cart' });
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.categoryLinks = page.locator('.list-group a');
    }

    // Navigation methods

    async navigateToCart(){
        await this.cartLink.click();
    }

    // Product Actions

    async selectProductByName(productName:string){
        const productElements = await this.productLinks.all();
        
        for(const product of productElements){
           const name = await product.textContent();
            if(name?.trim() === productName){
                product.click();
                return;
            }
        }
        throw new Error(`product "${productName}" not found on the page`);

    }

    async addProductToCart(productName: string){
        //click on the product to view its detail
        await this.selectProductByName(productName);
        
        // Handle the dialog that appears after adding to cart
        this.page.once('dialog',async dialog =>{
            if(dialog.message().includes('added')){
                await dialog.accept();
            }
        });
        
        //click the "add to cart" button
        await this.addToCartButton.click();
    }

    // Category filtering

    async selectCategory(categoryName:string){
        const categories = await this.categoryLinks.all()
        
        for(const category of categories)
        { 
            const name = await category.textContent();
            if(name?.trim().toLowerCase() === categoryName.toLowerCase()){
                await category.click();
                await this.page.waitForLoadState('networkidle');
                return;
            }
        }
        throw new Error(`Category "${categoryName}" not found`);
    }

    // verification methods

    async isProductVisible(productName: string){
        const products = await this.productLinks.all();

        for(const product of products){
            const name = await product.textContent();
            if(name?.trim() === productName){
                return true;
            }
        }
        return false;
    }

    // Wait methods
    async waitForProductsToLoad(){
        await this.page.waitForSelector('div#tbodyid div.card');
    }

    


    
}