
import { test, expect } from '@playwright/test';
import { FRSandboxPage } from '../Pageobjects/FRSandboxPage';

test.describe('FreeRange Sandbox - Smoke (POM)', () => {
    let frSandboxPage : FRSandboxPage;   

    test.beforeEach(async ({ page }) => {
        frSandboxPage = new FRSandboxPage(page);
        await frSandboxPage.open();
    });

    test('Dynamic ID button reveals hidden element', async ({}) => {

        await frSandboxPage.clickOnDynamicButton();
        await expect(frSandboxPage.delayedGhostMessage).toBeVisible();
    })

    test('Text input should work correctly', async ({}) => {
        
        await frSandboxPage.fillTextInput('Testing ♥');
        await expect(frSandboxPage.textInput).toHaveValue('Testing ♥');
    })

    test('Checkbox selection should work correctly', async ({}) => {
        
        await frSandboxPage.checkHeladoCheckbox();
        await expect(frSandboxPage.heladoCheckBox, 'The checkbox is not selected').toBeChecked();
        
        await frSandboxPage.uncheckHeladoCheckbox();
        await expect(frSandboxPage.heladoCheckBox, 'The checkbox is selected').not.toBeChecked();
    })

    test('Radio button selection should work correctly', async ({}) => {
        
        await frSandboxPage.selectSiRadioButton();
        await expect(frSandboxPage.siRadioButton).toBeChecked();    
    })

    test('Dropdown selection should work correctly', async ({}) => {
        
        await frSandboxPage.selectTennisOption();
        await expect(frSandboxPage.tennisDropdownOption).toHaveValue('Tennis');
    })

    test.fail('Day selection from dropdown menu should work correctly', async ({}) => {
      
        await frSandboxPage.selectDay('Martes');
        await expect(frSandboxPage.martesDropdown).toContainText("Martes"); // heads-up: Here the test will fail
    })

    test('Popup validation should work correctly', async ({}) => {
        
        await frSandboxPage.openPopupMessage();
        await expect(frSandboxPage.popupMessage).toHaveText('¿Viste? ¡Apareció un Pop-up!');
        await frSandboxPage.closePopupMessage();   
    })
});




