import { test , expect} from '@playwright/test'

test.describe('KeyBoard Actions',()=>{

    test.beforeEach(async({page})=>{
        await page.goto('https://sdetqa.vercel.app/keyboard_actions_practice');
        await expect(page.locator('#keyPlaceholder')).toBeVisible();
    })

    test('Press letter A',async({page})=>{
        await page.keyboard.press('a');
        await expect(page.locator('#keyCombo')).toHaveText('A');
    })

    test('Press letter 5',async({page})=>{
        await page.keyboard.press('5');
        await expect(page.locator('#keyCombo')).toHaveText('5');
    })

    test('Press enter',async({page})=>{
        await page.keyboard.press('Enter');
        await expect(page.locator('#keyCombo')).toHaveText('Enter');
    })
    
    test('Press Escape',async({page})=>{
        await page.keyboard.press('Escape');
        await expect(page.locator('#keyCombo')).toHaveText('Escape');
    })

    test('press Tab', async ({ page }) => {
        await page.keyboard.press('Tab');
        await expect(page.locator('#keyCombo')).toHaveText('Tab');
    }); 

    test('press ArrowDown', async ({ page }) => {
        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#keyCombo')).toHaveText('Arrow Down');
    });

//  -----Modifier keys alone----------

    test('Press shift alone',async({ page })=>{
        await page.keyboard.down('Shift');
        await expect(page.locator('#keyCombo')).toHaveText('Shift');
        await page.keyboard.up('Shift');
    })

    test('Ctrl+A',async({page})=>{
        await page.keyboard.down('Control');
        await page.keyboard.press('a');
        await page.keyboard.up('Control');
        await expect(page.locator('#keyCombo')).toHaveText('Ctrl + A');
    })

    test('Ctrl+A together',async({ page }) =>{
        await page.keyboard.press('Control+A');
        await expect(page.locator('#keyCombo')).toHaveText('Ctrl + A');
        await expect(page.locator('#shortcutText')).toHaveText('You pressed Ctrl + A');
    })

    test('Reset button clears everything', async ({ page }) => {
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#historyBody tr:not(.empty-row)')).toHaveCount(2);
    await expect(page.locator('#historyBody tr')).toHaveCount(2);

    await page.locator('#resetBtn').click();

    await expect(page.locator('#historyBody .empty-row')).toBeVisible();
    await expect(page.locator('#keyPlaceholder')).toBeVisible();
    await expect(page.locator('#shortcutEmpty')).toBeVisible();
    // Event info resets to '—'
    await expect(page.locator('#infoKey')).toHaveText('—');
    await expect(page.locator('#infoCode')).toHaveText('—');
  
});

// ---------- 9. Multi‑modifier combo (Ctrl+Alt+Delete) ----------
  test('Ctrl + Alt + Delete', async ({ page }) => {
    await page.keyboard.down('Control');
    await page.keyboard.down('Alt');
    await page.keyboard.press('Delete');
    await expect(page.locator('#keyCombo')).toHaveText('Ctrl + Alt + Delete');
    await expect(page.locator('#shortcutBadge')).toBeVisible();
    await expect(page.locator('#shortcutText')).toHaveText('You pressed Ctrl + Alt + Delete');
    // Clean up
    await page.keyboard.up('Alt');
    await page.keyboard.up('Control');
  });

// ---------- 7. Clear and Reset buttons ----------
  test('Clear button empties history', async ({ page }) => {
    await page.keyboard.press('a');
    await page.keyboard.press('b');
    await expect(page.locator('#historyBody tr:not(.empty-row)')).toHaveCount(2);

    await page.locator('#clearBtn').click();

    await expect(page.locator('#historyBody .empty-row')).toBeVisible();
    await expect(page.locator('#historyBody tr:not(.empty-row)')).toHaveCount(0);
    // Key display resets to placeholder
    await expect(page.locator('#keyPlaceholder')).toBeVisible();
    await expect(page.locator('#keyCombo')).not.toBeVisible();
    // Shortcut clears
    await expect(page.locator('#shortcutEmpty')).toBeVisible();
  });




})