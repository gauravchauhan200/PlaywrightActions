import { test, expect } from '@playwright/test'

// Base URLs for the demo application
const BASE_URL = 'https://demowebshop.tricentis.com';
const LOGIN_URL = 'https://demowebshop.tricentis.com/login';
const REGISTER_URL = 'https://demowebshop.tricentis.com/register';
 

//==========================================
// PAGE ASSERTIONS
//==========================================


// Assert that the page title matches the exectly

test('Page Assertion: toHaveTitle',async({ page })=>{
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle('Demo Web Shop');
})

// Assert that the page title is not something else

test ('Page Assertion: not.toHaveTitle',async({ page })=>{
  await page.goto(BASE_URL);
  await expect(page).not.toHaveTitle('Wrong Title');
})

// Assert that the page URL matches exactly

test('Page Assertion: toHaveURL',async({ page }) => {
  await page.goto(LOGIN_URL);
  await expect(page).toHaveURL(LOGIN_URL);
})

// Assert that the page URL is NOT the home page URL

test('Page Assertion: not.toHaveURL',async({ page }) =>{
  await page.goto(LOGIN_URL);
  await expect(page).not.toHaveURL(BASE_URL);
})

//=========================================
// VISIBILITY ASSERTIONS
//=========================================

// Get the registration button - this element exists in the DOM
// Assert that the element is attached to the DOM

test('Visibility Assertion: toBeAttached',async({ page })=>{
  await page.goto(REGISTER_URL);
  const registrationBtn = page.locator('#register-button');
  await expect(registrationBtn).toBeAttached();
})

// Get the email input field
// Assert that the element is visible on the page

test('Visibility Assertion: toBeVisible',async({ page })=>{
  await page.goto(LOGIN_URL);
  const emailInput = page.locator('#Email');
  await expect(emailInput).toBeVisible();
})

// Get the login link - this is visible
// Get the "Please login" message which doesn't exist on home page
// Assert that the login link IS visible
// Assert that the login message is NOT visible

 test('Visibility Assertion: not.toBeVisible',async({ page }) =>{

  await page.goto(LOGIN_URL);
  const loginLink = page.locator('a[href="/login"]');
  await expect(loginLink).toBeVisible();
  const loginMsg = page.locator('.page-title>h1');
  expect(await loginMsg.innerText()).toContain('Welcome, Please Sign In!');
 
})

 test('Visibility Assertion Eg: not.toBeVisible', async ({ page }) => {
   
  await page.goto(BASE_URL);
  // Get the login link - this is visible
  const loginLink = page.locator('a[href="/login"]');
  // Get the "Please login" message which doesn't exist on home page
  const loginMessage = page.locator('text=Please login');
  // Assert that the login link IS visible
  await expect(loginLink).toBeVisible();
  // Assert that the login message is NOT visible
  await expect(loginMessage).not.toBeVisible();

 });

 test('Visibility Assertion for validation error: toBeVisible',async({ page })=>{
  
  await page.goto(LOGIN_URL)
  await page.locator('.login-button').click();
  const loginValidError = page.locator('.validation-summary-errors>span');
  console.log(await loginValidError.innerText());
  await expect(loginValidError).toBeVisible();
 })

  // Get the "Email:" label - this is visible on login page
  // Get the password validation message - this is hidden initially
  // Assert that login message is visible
  // Assert that validation message is hidden

 test('Visibility Assertion: toBeHidden',async({ page }) => {

  await page.goto(LOGIN_URL);
  const emailLabel = page.locator('label[for="Email"]');
  const validationMessage = page.locator('#password-validation');
  await expect(emailLabel).toBeVisible();
  await expect(validationMessage).toBeHidden();
 })

 //=====================================
 // STATE ASSERTIONS
 //=====================================

 // Get the "Remember me" checkbox
 // Check the checkbox
 // Assert that the checkbox is checked

test('State Assertion: toBeChecked',async({ page })=>{
  await page.goto(LOGIN_URL);
  const rememberMeCheckbox = page.locator('#RememberMe');
  await rememberMeCheckbox.check();
  await expect(rememberMeCheckbox).toBeChecked();

})

  // Get the "Remember me" checkbox
  // Ensure it's unchecked
  // Assert that the checkbox is NOT checked

test('State Assertion: not.toBeChecked',async({ page })=>{
  await page.goto(LOGIN_URL);
  const rememberMeCheckbox = page.locator('#RememberMe');
  await rememberMeCheckbox.uncheck();
  await expect(rememberMeCheckbox).not.toBeChecked();

})

  // Get the "Register" button before any input
  // It might not be disabled, so let's find an element that is typically disabled
  // For demonstration, we'll check if there's any disabled element
  // In this demo site, the "Add to cart" button may be disabled for out-of-stock items
  // We'll look for an element with 'disabled' attribute
  // If there's no disabled element, we'll skip this test

test('State Assertion: toBeDisabled',async({ page })=>{
  await page.goto(REGISTER_URL);
  const disabledElement = page.locator('[disabled]').first();

  if(await disabledElement.count()>0){
    await expect(disabledElement).toBeDisabled();
    console.log('inside if condition');
  }
  console.log(await disabledElement.count());
})

// Get the email input field
// Assert that the input field is editable

test('State Assertion: toBeEditable',async({ page })=>{
  await page.goto(LOGIN_URL);
  const emailInput = page.locator('#Email');
  await expect(emailInput).toBeEditable();
})

// Get the login button
// Assert that the button is enabled

test('State Assertion: toBeEnabled',async({ page })=>{
  await page.goto(LOGIN_URL);
  const loginBtn = page.locator('.login-button');
  await expect(loginBtn).toBeEnabled();
})

// Get the email input field and focus on it
// Assert that the email input has focus

test('State Assertion toBeFocused',async({ page })=>{
 await page.goto(REGISTER_URL);
 const emailInput = page.locator('#Email');
 await emailInput.focus();
 await expect(emailInput).toBeFocused();
})

//=======================================
// TEXT ASSERTIONS
//=======================================

// Get the login window label 'Returning Customer'
// Assert that the element contains the text "Customer"

test('Text Assertion: toContainText',async({ page }) => {
  await page.goto(LOGIN_URL);
  const return_cust = page.locator('.returning-wrapper>div>strong');
  await expect(return_cust).toContainText('Returning'); //partial match
})

// Get the heading 'Register'
// Assert that the heading has the exact text "Register"

test('Text Assertion: toHaveText',async({ page }) =>{
  await page.goto(REGISTER_URL);
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Register'); //exact match
})

// Get the email input and fill it
// Assert that the input has the expected value

test('Text Assertion: toHaveValue',async({ page }) =>{
  await page.goto(LOGIN_URL);
  const emailInput =  page.locator('#Email');
  emailInput.fill('Enter email-Id');
  await expect(emailInput).toHaveValue('Enter email-Id');
})

// Get categories
// Assert that 'colors' have specific values
// toHaveValues expects an array of values for the locator array

test('Text Assertion: toHaveValues',async({ page }) => {
  await page.goto('https://sdetqa.vercel.app/autoplay');
  const colors = page.locator('#colors');
  await colors.selectOption(["Red","Green"]);
  await expect(colors).toHaveValues(["red","green"]);
})

//========================================
// ATTRIBUTES & PROPERTIES ASSERTIONS
//========================================

test('Attributes Assertion: toContainClass', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the login button
  const loginButton = page.locator('input[value="Log in"]');
  // Assert that the button contains a specific class
  await expect(loginButton).toContainClass('button-1');
})

test('Attributes Assertion: toHaveClass', async ({ page }) => {
  await page.goto(REGISTER_URL);
  // Get the register button
  const registerButton = page.locator('#register-button');
  // Assert that the button has the exact class
  await expect(registerButton).toHaveClass('button-1 register-next-step-button');
})

// Get the login button
// Assert that the button has a specific attribute with specific value

test ('Attribute Assertion: toHaveAttribute',async({ page }) =>{
  await page.goto(LOGIN_URL);
  const loginBtn = page.locator('.login-button');
  await expect(loginBtn).toHaveAttribute('type','submit');
})

// Get the page header
// Assert that the element has a specific CSS property value

test('Attribute Assertion: toHaveCSS',async({ page }) =>{
  await page.goto(BASE_URL);
  const header = page.locator('.header-logo');
  await expect(header).toHaveCSS('font-size','12px');
})

  // Get the register button
  // Assert that the element has the expected ID

test('Attributes Assertion: toHaveId', async ({ page }) => {
  await page.goto(REGISTER_URL);
  const registerButton = page.locator('#register-button');
  await expect(registerButton).toHaveId('register-button');
});

// ============================================
// COUNT ASSERTIONS
// ============================================

// Get all product items on the home page
// Assert that the number of products matches expected count

test('Count assertion: toHaveCount',async({ page })=>{
  await page.goto(BASE_URL);
  const products =page.locator('.product-item');
  await expect(products).toHaveCount(6);
})

//================================================
// ROLE ASSERTIONS
//================================================

// Get the login button
// Assert that the element has the 'button' role

test('Role Assertion: toHaveRole', async ({ page }) => {
  await page.goto(LOGIN_URL);
  const loginButton = page.locator('input[value="Log in"]');
  await expect(loginButton).toHaveRole('button');
})

// Additional test to demonstrate role assertion with a different element

// Get the registration link
// Assert that the element has the 'link' role

test('Role Assertion: toHaveRole with link', async ({ page }) => {
  await page.goto(BASE_URL);
  const registerLink = page.locator('a[href="/register"]');
  await expect(registerLink).toHaveRole('link');

  await page.close();
})


