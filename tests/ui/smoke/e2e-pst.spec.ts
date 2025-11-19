
import { test, expect, } from '@playwright/test';
import { PSTPage } from '../../page-objects/pst-page';

test.describe('E2E - Purchase flow on Practice Software Testing', () => {
    test('User can complete a purchase flow for a Hammer product', async ({ page }) => {
        const pstPage = new PSTPage(page);

        await test.step('Navigate to Practice Software Testing page', async () => {
            await pstPage.open();
        });

        await test.step('Search products by "Hammer"', async () => {
            await pstPage.fillSearchInput('Hammer');
            await pstPage.clickOnSearchButton();
            await expect(pstPage.searchCaption).toContainText('Hammer');
        });

        await test.step('Select the most expensive Hammer', async () => {
            await pstPage.waitForProductsToLoad();
            await pstPage.selectMostExpensiveItem();
            await expect(pstPage.expensiveItemName).toContainText('Hammer');
        });

        await test.step('Change the Quantity from 1 to 2', async () => {
            await pstPage.increaseQuantity(1);
            await expect(pstPage.quantityInput).toHaveValue('2')
        });

        await test.step('Select “Add to cart”', async () => {
            await pstPage.addItemSelectedToCart();
            await expect(pstPage.addedToCartMessageDisplayed).toHaveText('Product added to shopping cart.');
        });

        await test.step('Go to cart and check the Total price', async () => {
            await pstPage.goToCart();

            const unitPrice = await pstPage.getCartUnitPrice();
            const quantity = await pstPage.getCartQuantity();
            const cartTotal = await pstPage.getCartTotal();

            const expectedTotal = Number((unitPrice * quantity).toFixed(2));

            expect(cartTotal).toBe(expectedTotal);
            const lineTotal = await pstPage.getCartLineTotal();
            expect(lineTotal).toBe(expectedTotal);

            console.log('Final expected total:', expectedTotal);
        });

        await test.step('Select “Proceed to Checkout” and continue as Guest', async () => {
            await pstPage.clickOnCheckoutButton();
            await pstPage.openGuestCheckout();
            await pstPage.fillGuestDetails({
                email: 'luna@example.com',
                firstName: 'Luna',
                lastName: 'Lara',
            });
            await pstPage.submitGuestCheckout();
            await pstPage.clickOnCheckoutButton();
        });

        await test.step('Fill in Billing Address details and proceed to checkout', async () => {
            await pstPage.fillInBillingAddressFields({
                street: 'Moon St 123',
                city: 'Universe',
                state: 'Cosmos',
                country: 'Galaxy',
                postcode: '1111',
            });
            await pstPage.continueToPayment();
        });

        await test.step('Select payment method and confirm payment', async () => {
            await pstPage.choosePaymentMethod('cash-on-delivery');
            await expect(pstPage.paymentMethodSelect).toHaveValue('cash-on-delivery');
            await pstPage.confirmOrder();
            await expect(pstPage.paymentSuccessMessage).toBeVisible();
        });
    });
});