// This is a template showing the structure of a Page Object Model (POM) for automated tests.

import { type Locator, type Page } from '@playwright/test';

export class TemplatePage {
    private readonly url = 'https://thefreerangetester.github.io/sandbox-automation-testing/';
    private readonly page: Page;

    // Buttons & messages
    readonly dynamicButton: Locator
    readonly delayedGhostMessage: Locator

    // Text input
    readonly textInput: Locator

    // Checkbox & radio
    readonly heladoCheckBox: Locator
    readonly siRadioButton: Locator

   

    constructor(page: Page) {
        this.page = page;

        //Dynamic button
        this.dynamicButton = page.getByRole('button', { name: 'Hacé click para generar un ID' });
        this.delayedGhostMessage = page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.');

        //Text input
        this.textInput = page.getByRole('textbox', { name: 'Un aburrido texto' });

        // Checkbox & Radio
        this.heladoCheckBox = page.getByLabel('Helado 🍧');
        this.siRadioButton = page.getByLabel('si');

    }

    // Navigation
    async open(): Promise<void> {
        await this.page.goto(this.url);
    }

    //Dynamic ID button
    async clickOnDynamicButton(): Promise<void> {
        await this.dynamicButton.click();
    }


    async fillTextInput(textTyped: string): Promise<void> {
        await this.textInput.fill(textTyped);
    }

    //Checkbox
    async checkHeladoCheckbox(): Promise<void> {
        await this.heladoCheckBox.check();
    }
    async uncheckHeladoCheckbox(): Promise<void> {
        await this.heladoCheckBox.uncheck();
    }

}