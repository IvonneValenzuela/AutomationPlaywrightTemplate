import { type Locator, type Page } from '@playwright/test';
import { GuestUser, BillingAddress } from '../types/form-data-types';
import { getPriceFromText } from '../helpers/price-helper';

export class PSTPage {
    private readonly url = 'https://www.practicesoftwaretesting.com/';
    private readonly page: Page;

    // Search 
    readonly searchField: Locator;
    readonly searchButton: Locator;
    readonly searchCaption: Locator;

    //Product listing (results)
    readonly productCards: Locator;
    readonly expensiveItemName: Locator;

    //Increase Quantity
    readonly changeQuantityButton: Locator;
    readonly quantityInput: Locator;

    //Add to cart
    readonly addToCartButton: Locator;
    readonly addedToCartMessageDisplayed: Locator;

    //Go to cart and check the price
    readonly cartButton: Locator;
    readonly cartUnitPrice: Locator;
    readonly cartQuantityInput: Locator;
    readonly cartLineTotal: Locator;
    readonly cartTotalPrice: Locator;

    //Checkout and login
    readonly checkoutButton: Locator;
    readonly continueAsGuestButton: Locator;
    readonly emailAddressInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly continueAsGuestSubmitButton: Locator;

    //Billing Address details
    readonly billingStreetInput: Locator;
    readonly billingCityInput: Locator;
    readonly billingStateInput: Locator;
    readonly billingCountryInput: Locator;
    readonly billingPostcodeInput: Locator;

    //payment method
    readonly paymentMethodSelect: Locator;
    readonly confirmButton: Locator;
    readonly paymentSuccessMessage: Locator;


    constructor(page: Page) {
        this.page = page;

        //Search section
        this.searchField = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.getByRole("button", { name: 'Search' });
        this.searchCaption = page.locator('[data-test="search-caption"]');

        //Obtain the most expensive item      
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
        this.billingStreetInput = page.locator('[data-test="street"]');
        this.billingCityInput = page.locator('[data-test="city"]');
        this.billingStateInput = page.locator('[data-test="state"]');
        this.billingCountryInput = page.locator('[data-test="country"]');
        this.billingPostcodeInput = page.locator('[data-test="postal_code"]');

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
    async searchFor(text: string): Promise<void> {
        await this.searchField.fill(text);
        await this.searchButton.click();
    }

    //Select most expensive item
    async waitForProductsToLoad(): Promise<void> {
        await this.productCards.first().waitFor({ state: 'visible', timeout: 5000 });
    }

    async selectMostExpensiveItem(): Promise<void> {
        const cards = this.productCards;
        const count = await cards.count();

        if (count === 0) {
            throw new Error('No products found to select most expensive item.');
        }

        let mostExpensivePrice = -1;
        let mostExpensiveIndex = 0;

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            const priceLocator = card.locator('[data-test="product-price"]');
            const textPrice = await priceLocator.textContent();
            const numericPrice = await getPriceFromText(textPrice);

            if (numericPrice > mostExpensivePrice) {
                mostExpensivePrice = numericPrice;
                mostExpensiveIndex = i;
            }
        }

        await cards.nth(mostExpensiveIndex).click();
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
        return getPriceFromText(await this.cartUnitPrice.textContent());
    }

    async getCartQuantity(): Promise<number> {
        const value = await this.cartQuantityInput.inputValue();
        return Number(value);
    }

    async getCartLineTotal(): Promise<number> {
        return getPriceFromText(await this.cartLineTotal.textContent());
    }

    async getCartTotal(): Promise<number> {
        return getPriceFromText(await this.cartTotalPrice.textContent());
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

    async checkoutAsGuest(user: GuestUser): Promise<void> {
        await this.clickOnCheckoutButton();
        await this.openGuestCheckout();
        await this.fillGuestDetails(user);
        await this.submitGuestCheckout();
        await this.clickOnCheckoutButton();
    }

    async fillInBillingAddressFields(address: BillingAddress): Promise<void> {
        await this.billingStreetInput.fill(address.street);
        await this.billingCityInput.fill(address.city);
        await this.billingStateInput.fill(address.state);
        await this.billingCountryInput.fill(address.country);
        await this.billingPostcodeInput.fill(address.postcode);
    }

    async completeBillingAddress(address: BillingAddress): Promise<void> {
        await this.fillInBillingAddressFields(address);
        await this.clickOnCheckoutButton();
    }


    async choosePaymentMethod(method: string): Promise<void> {
        await this.paymentMethodSelect.selectOption(method);
    }

    async confirmOrder(): Promise<void> {
        await this.confirmButton.click();
    }
}