// This is a template showing the structure of a Page Object Model (POM) for automated tests.

import { type Locator, type Page } from '@playwright/test';
import { userEmail, userPassword, userFirstName, userLastName, userStreet, userCity, userState, userCountry, userPostcode } from '../constants/common';

export class PSTPage {
    private readonly url = 'https://www.practicesoftwaretesting.com/';
    private readonly page: Page;

    // Search 
    readonly searchField: Locator
    readonly searchButton: Locator
    readonly searchCaption: Locator

    //Select product
    readonly selectedItem: Locator
    readonly productName: Locator

    //Increase Quantity
    readonly changeQuantityButton: Locator
    readonly quantityInput: Locator

    //Add to cart
    readonly addToCartButton: Locator
    readonly addedToCartMessageDisplayed: Locator

    //Go to cart and check the price
    readonly cartButton: Locator
    readonly checkTotalPrice: Locator

    //Checkout and login
    readonly checkoutButton: Locator
    //readonly emailInput: Locator
    //readonly passwordInput: Locator
    //readonly loginButton: Locator
    //readonly loginMessage: Locator
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

        //StextSearchedForHammerelect Product
        this.selectedItem = page.locator('a.card', { hasText: 'Fiberglass' }); 
        

        //try to obtain all a.card items in a list of locators, the calculate which's the most expensive one and return the locator item       
        
        
        this.productName = page.locator('[data-test="product-name"]');

        //Increase Quantity
        this.changeQuantityButton = page.getByRole("button", { name: 'Increase quantity' });
        this.quantityInput = page.locator('[data-test="quantity"]');

        //Add to cart
        this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
        this.addedToCartMessageDisplayed = page.getByRole("alert", { name: 'Product added to shopping cart.' });

        //Go to cart and check total
        this.cartButton = page.locator('[data-test="nav-cart"]');
        this.checkTotalPrice = page.locator('[data-test="cart-total"]');

        //Checkout
        this.checkoutButton = page.getByRole('button', { name: 'Proceed to checkout' });


        /* //login
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.getByRole("button", { name: 'Login' });
        this.loginMessage = page.getByText('you are already logged in'); */

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

    //Select item
    async selectMostExpensiveItem(): Promise<void> {
        await this.selectedItem.click();
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

    //Checkout and login
    async clickOnCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
    }
    /* async login() {
        await this.emailInput.fill(userEmail);
        await this.passwordInput.fill(userPassword);
        await this.loginButton.click();
    } */
    async openGuestCheckout(): Promise<void> {
        await this.continueAsGuestButton.click();
    }

    async fillGuestDetails(): Promise<void> {
        await this.emailAddressInput.fill(userEmail);
        await this.firstNameInput.fill(userFirstName);
        await this.lastNameInput.fill(userLastName);
    }

    async submitGuestCheckout(): Promise<void> {
        await this.continueAsGuestSubmitButton.click();
        await this.checkoutButton.click();
    }

    async fillInBillingAddressFields(): Promise<void> {
        await this.userAddressStreet.fill(userStreet);
        await this.userAddressCity.fill(userCity);
        await this.userAddressState.fill(userState);
        await this.userAddressCountry.fill(userCountry);
        await this.userAddressPostcode.fill(userPostcode);
    }
    async continueToPayment(): Promise<void> {
        await this.checkoutButton.click();
    }

    async choosePaymentMethod(method: string): Promise<void> {
        await this.paymentMethodSelect.selectOption(method);
    }

    async confirmOrder (): Promise<void> {
        await this.confirmButton.click();
    }







}