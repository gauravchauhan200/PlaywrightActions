import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage1'

test.describe('Demoblaze Tests',()=>{

    const baseUrl = 'https://www.demoblaze.com/index.html';
    const testProduct = 'Nexus 6';
    const testPassword ='Test@1234';
    let signedUpUser: { username:string; password: string } | undefined;

    test.beforeEach(async({ page}) =>{
        await page.goto(baseUrl);
    })

    test.afterEach(async({page})=>{
        await page.close();
    })



    





})