// This is a template showing the structure of a Page Object Model (POM) for automated tests.

import { type Locator, type Page } from '@playwright/test';
import { GuestUser, BillingAddress } from '../types/form-data-types';

export class PSTPage {
    private readonly url = 'https://www.practicesoftwaretesting.com/';
    private readonly page: Page;

    private parsePrice(text: string | null): number { //TODO: text price 
        const cleaned = text?.replace(/[^0-9.]/g, '') ?? '0';  // deja solo dígitos y punto
        return Number(cleaned);
    }

    private async getPriceFromLocator(locator: Locator): Promise<number> {
        const text = await locator.textContent();
        return this.parsePrice(text);
    }

    // Search 
    readonly searchField: Locator
    readonly searchButton: Locator
    readonly searchCaption: Locator

    //Product listing (results)
    readonly productCards: Locator;
    readonly expensiveItemName: Locator;

    //Increase Quantity
    readonly changeQuantityButton: Locator
    readonly quantityInput: Locator

    //Add to cart
    readonly addToCartButton: Locator
    readonly addedToCartMessageDisplayed: Locator

    //Go to cart and check the price
    readonly cartButton: Locator
    readonly cartUnitPrice: Locator;
    readonly cartQuantityInput: Locator;
    readonly cartLineTotal: Locator
    readonly cartTotalPrice: Locator

    //Checkout and login
    readonly checkoutButton: Locator
    readonly continueAsGuestButton: Locator
    readonly emailAddressInput: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly continueAsGuestSubmitButton: Locator

    //Billing Address details
    readonly userAddressStreet: Locator
    readonly userAddressCity: Locator
    readonly userAddressState: Locator
    readonly userAddressCountry: Locator
    readonly userAddressPostcode: Locator

    //payment method
    readonly paymentMethodSelect: Locator
    readonly confirmButton: Locator
    readonly paymentSuccessMessage: Locator



    constructor(page: Page) {
        this.page = page;

        //Search section
        this.searchField = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.getByRole("button", { name: 'Search' });
        this.searchCaption = page.locator('[data-test="search-caption"]');

        //Obtein the most expensive item      
        this.productCards = page.locator('[data-test="search_completed"] a.card');
        this.expensiveItemName = page.locator('[data-test="product-name"]');

        //Increase Quantity
        this.changeQuantityButton = page.getByRole("button", { name: 'Increase quantity' });
        this.quantityInput = page.locator('[data-test="quantity"]');

        //Add to cart
        this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
        this.addedToCartMessageDisplayed = page.getByRole("alert", { name: 'Product added to shopping cart.' });

        //Checking cart info
        this.cartButton = page.locator('[data-test="nav-cart"]');
        this.cartUnitPrice = page.locator('[data-test="product-price"]');
        this.cartQuantityInput = page.locator('[data-test="product-quantity"]');
        this.cartLineTotal = page.locator('[data-test="line-price"]');
        this.cartTotalPrice = page.locator('[data-test="cart-total"]');

        //Checkout
        this.checkoutButton = page.getByRole('button', { name: 'Proceed to checkout' });

        //Continue as Guest
        this.continueAsGuestButton = page.getByRole('tab', { name: 'Continue as Guest' });
        this.emailAddressInput = page.locator('[data-test="guest-email"]');
        this.firstNameInput = page.locator('[data-test="guest-first-name"]');
        this.lastNameInput = page.locator('[data-test="guest-last-name"]');
        this.continueAsGuestSubmitButton = page.locator('[data-test="guest-submit"]');

        //Billing Address Info
        this.userAddressStreet = page.locator('[data-test="street"]');
        this.userAddressCity = page.locator('[data-test="city"]');
        this.userAddressState = page.locator('[data-test="state"]');
        this.userAddressCountry = page.locator('[data-test="country"]');
        this.userAddressPostcode = page.locator('[data-test="postal_code"]');

        //select Payment Method
        this.paymentMethodSelect = page.locator('[data-test="payment-method"]');
        this.confirmButton = page.getByRole("button", { name: 'Confirm' });
        this.paymentSuccessMessage = page.locator('[data-test="payment-success-message"]');

    }

    // Navigation
    async open(): Promise<void> {
        await this.page.goto(this.url);
    }

    //Search item
    async fillSearchInput(text: string): Promise<void> {
        await this.searchField.fill(text);
    }
    async clickOnSearchButton(): Promise<void> {
        await this.searchButton.click();
    }

    //Select most expensive item
    async waitForProductsToLoad(): Promise<void> {
        await this.page.waitForSelector('[data-test="search_completed"] a.card', { timeout: 5000 });
    }

    async selectMostExpensiveItem(): Promise<void> {
        const cards = this.productCards;
        const count = await cards.count();

        if (count === 0) {
            throw new Error('No products found to select most expensive item.');
        }

        let maxPrice = -1;
        let maxIndex = 0;

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            const priceText = await card.locator('[data-test="product-price"]').textContent();
            // Example convert text to number $20.14 --> 20.14

            // const cleaned = priceText?.replace(/[^0-9.]/g, '') ?? '0';     // "20.14"
            // const numericPrice = Number(cleaned);

            const numericPrice = this.parsePrice(priceText);
            //const numericPrice = Number(priceText?.replace(/[^0-9.]/g, '') ?? '0');

            if (numericPrice > maxPrice) {
                maxPrice = numericPrice;//most expensive price
                maxIndex = i;// most expensive index
            }
        }

        await cards.nth(maxIndex).click();
    }

    //Change quantity
    async increaseQuantity(times: number = 1): Promise<void> {
        for (let i = 0; i < times; i++) {
            await this.changeQuantityButton.click();
        }
    }

    //Add to cart
    async addItemSelectedToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    //Go to cart
    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }

    //check the price
    async getCartUnitPrice(): Promise<number> {
        return this.getPriceFromLocator(this.cartUnitPrice);

        /* const text = await this.cartUnitPrice.textContent();      // "$20.14"
        const cleaned = text?.replace(/[^0-9.]/g, '') ?? '0';     // "20.14"
        return Number(cleaned); */
    }

    async getCartQuantity(): Promise<number> {
        const value = await this.cartQuantityInput.inputValue();  // "2"
        return Number(value);
    }

    async getCartLineTotal(): Promise<number> {

        return this.getPriceFromLocator(this.cartLineTotal);

        /* const text = await this.cartLineTotal.textContent();      // "$40.28"
        const cleaned = text?.replace(/[^0-9.]/g, '') ?? '0';
        return Number(cleaned); */
    }

    async getCartTotal(): Promise<number> {

        return this.getPriceFromLocator(this.cartTotalPrice);

        /* const text = await this.cartTotalPrice.textContent();    // "$40.28"
        const cleaned = text?.replace(/[^0-9.]/g, '') ?? '0';
        return Number(cleaned); */
    }

    //Checkout and login
    async clickOnCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
    }

    async openGuestCheckout(): Promise<void> {
        await this.continueAsGuestButton.click();
    }

    async fillGuestDetails(user: GuestUser): Promise<void> {
        await this.emailAddressInput.fill(user.email);
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
    }

    async submitGuestCheckout(): Promise<void> {
        await this.continueAsGuestSubmitButton.click();
    }

    async fillInBillingAddressFields(address: BillingAddress): Promise<void> {
        await this.userAddressStreet.waitFor({ state: 'visible' }) //TODO delete this line
        await this.userAddressStreet.fill(address.street);
        await this.userAddressCity.fill(address.city);
        await this.userAddressState.fill(address.state);
        await this.userAddressCountry.fill(address.country);
        await this.userAddressPostcode.fill(address.postcode);
    }

    async continueToPayment(): Promise<void> {
        await this.checkoutButton.click();
    }

    async choosePaymentMethod(method: string): Promise<void> {
        await this.paymentMethodSelect.selectOption(method);
    }

    async confirmOrder(): Promise<void> {
        await this.confirmButton.click();
    }
}