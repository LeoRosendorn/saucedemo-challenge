import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const VALID_USER = 'standard_user';
const VALID_PASS = 'secret_sauce';
const LOCKED_USER = 'locked_out_user';

test.describe('Login - Inicio de Sesión', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // TC_LOGIN_001 - Login exitoso con credenciales válidas
  test('TC_LOGIN_001 - Login exitoso con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(VALID_USER, VALID_PASS);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  // TC_LOGIN_002 - Login con usuario bloqueado muestra mensaje de error correcto
  test('TC_LOGIN_002 - Login con usuario bloqueado muestra error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(LOCKED_USER, VALID_PASS);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Sorry, this user has been locked out');
    await expect(page).toHaveURL('/');
  });

  // TC_LOGIN_003 - Login con campos vacíos muestra error (FALLA INTENCIONALMENTE)
  // Este test está pensado para fallar y demostrar la captura de screenshot automática.
  // La aserción espera un mensaje incorrecto para forzar el fallo.
  test('TC_LOGIN_003 [FALLA INTENCIONAL] - Login con campos vacíos - aserción incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    const error = await loginPage.getErrorMessage();
    // INCORRECTO A PROPÓSITO: el mensaje real es "Epic sadface: Username is required"
    expect(error).toBe('Este mensaje no existe en la aplicación - FALLA INTENCIONAL');
  });

});
