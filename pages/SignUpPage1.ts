import { Page, Locator } from '@playwright/test'

export class SignUpPage{

// Define properties
private readonly page: Page;
private readonly signUpLink: Locator;
private readonly usernameInput: Locator;
private readonly userpassword: Locator;
private readonly signUpButton: Locator;



// Initilize page context and elements
constructor(page: Page){
    this.page = page;
    this.signUpLink = this.page.getByRole('link', { name: 'Sign up' });
    this.usernameInput = this.page.locator('#sign-username');
    this.userpassword = this.page.getByLabel('Password:');
    this.signUpButton = this.page.getByRole('button', { name: 'Sign up' });
}


// Create reusable user action

async navigateToSignUp(){
    await this.signUpLink.click();
}

async fillUsername(username:string){
   await this.usernameInput.clear();
   await this.usernameInput.fill(username);
} 

async fillPassword(password:string){
   await this.userpassword.clear();
   await this.userpassword.fill(password);
}

async submitSignUp(){
    await this.signUpButton.click();
}

async signUp(username:string,password:string): Promise<string>{
    await this.navigateToSignUp();
    await this.fillUsername(username);
    await this.fillPassword(password);
    
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.submitSignUp();

    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();

    return message;
}



}