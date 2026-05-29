import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

const VALID_USER = 'standard_user';
const VALID_PASS = 'secret_sauce';
const PRODUCT_1 = 'Sauce Labs Backpack';
const PRODUCT_2 = 'Sauce Labs Bike Light';

test.describe('Cart - Carrito de Compras', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(VALID_USER, VALID_PASS);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  // TC_CART_001 - Agregar un producto al carrito y verificar badge
  test('TC_CART_001 - Agregar un producto actualiza el contador del carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart(PRODUCT_1);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(1);
    await expect(inventoryPage.addToCartButton(PRODUCT_1)).not.toBeVisible();
    await expect(inventoryPage.removeButton(PRODUCT_1)).toBeVisible();
  });

  // TC_CART_002 - Agregar múltiples productos y verificar contador acumulado
  test('TC_CART_002 - Agregar múltiples productos acumula el contador correctamente', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart(PRODUCT_1);
    await inventoryPage.addToCart(PRODUCT_2);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(2);
  });

  // TC_CART_003 - Verificar que el producto aparece en el carrito con nombre y precio correctos
  test('TC_CART_003 - Producto agregado aparece en el carrito con datos correctos', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const priceInInventory = await inventoryPage.getProductPrice(PRODUCT_1);
    await inventoryPage.addToCart(PRODUCT_1);
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart\.html/);
    const cartPage = new CartPage(page);
    const names = await cartPage.getItemNames();
    expect(names).toContain(PRODUCT_1);
    const priceInCart = await cartPage.getItemPrice(PRODUCT_1);
    expect(priceInCart).toBe(priceInInventory);
  });

  // TC_CART_004 - Remover producto desde el carrito y verificar que desaparece
  test('TC_CART_004 - Remover producto desde el carrito lo elimina correctamente', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart(PRODUCT_1);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.removeItem(PRODUCT_1);
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(0);
  });

});
