import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async getItemPrice(productName: string): Promise<string> {
    const item = this.page.locator('.cart_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
    return await item.locator('.inventory_item_price').innerText();
  }

  async removeItem(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
