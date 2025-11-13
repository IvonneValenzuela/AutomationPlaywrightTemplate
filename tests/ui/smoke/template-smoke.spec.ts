
import { test, expect } from '@playwright/test';
import { TemplatePage } from '../../page-objects/template-page';

test.describe('Template - Smoke (POM)', () => {
    let templatePage : TemplatePage;   

    test.beforeEach(async ({ page }) => {
        templatePage = new TemplatePage(page);
        await templatePage.open();
    });

    test('Dynamic ID button reveals hidden element', async ({}) => {

        await templatePage.clickOnDynamicButton();
        await expect(templatePage.delayedGhostMessage).toBeVisible();
    })

    test('Text input should work correctly', async ({}) => {
        
        await templatePage.fillTextInput('Testing ♥');
        await expect(templatePage.textInput).toHaveValue('Testing ♥');
    })

    test('Checkbox selection should work correctly', async ({}) => {
        
        await templatePage.checkHeladoCheckbox();
        await expect(templatePage.heladoCheckBox, 'The checkbox is not selected').toBeChecked();
        
        await templatePage.uncheckHeladoCheckbox();
        await expect(templatePage.heladoCheckBox, 'The checkbox is selected').not.toBeChecked();
    })

});




