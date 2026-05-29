# QA Technical Challenge — SauceDemo & MercadoLibre

Automatización de pruebas para las funcionalidades de **Login** y **Carrito de Compras** de [SauceDemo](https://www.saucedemo.com), más un test de API contra [MercadoLibre](https://www.mercadolibre.com.ar).

**Stack:** Playwright · TypeScript · HTML & JUnit Reports

---

## Requisitos

- Node.js >= 18
- npm >= 9

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/LeoRosendorn/saucedemo-challenge.git
cd saucedemo-challenge

# 2. Instalar dependencias
npm install

# 3. Instalar los navegadores de Playwright
npx playwright install chromium firefox
```

---

## Ejecución de pruebas

```bash
# Ejecutar todos los tests en Chrome y Firefox
npm test

# Solo Chrome
npm run test:chrome

# Solo Firefox
npm run test:firefox

# Solo tests de login
npm run test:login

# Solo tests de carrito
npm run test:cart

# Solo test de API
npm run test:api
```

---

## Reportes

Después de cada ejecución se generan dos reportes:

| Reporte | Ubicación | Comando para abrir |
|---|---|---|
| HTML (visual) | `playwright-report/index.html` | `npm run report` |
| JUnit XML | `test-results/results.xml` | Abrir con cualquier visor XML |

Las **capturas de pantalla** de los tests fallidos se guardan automáticamente en `test-results/` y aparecen embebidas en el reporte HTML.

---

## Estructura del proyecto

```
├── pages/
│   ├── LoginPage.ts        # Page Object - Login
│   ├── InventoryPage.ts    # Page Object - Inventario
│   └── CartPage.ts         # Page Object - Carrito
├── tests/
│   ├── login.spec.ts       # Tests de Login (incluye 1 falla intencional)
│   ├── cart.spec.ts        # Tests de Carrito
│   └── api.spec.ts         # Test de API MercadoLibre
├── test-cases/
│   └── TEST_CASES.md       # Casuística completa (Punto 1 del challenge)
├── playwright.config.ts    # Configuración: Chrome + Firefox, screenshots, reportes
└── README.md
```

---

## Test con falla intencional

**TC_LOGIN_003** en `tests/login.spec.ts` falla intencionalmente para demostrar la captura automática de screenshots. El test valida un mensaje de error inexistente, lo que genera un fallo con su screenshot embebido en el reporte HTML.

---

## Navegadores utilizados

- **Chromium** (Chrome más reciente)
- **Firefox** (Desktop)
