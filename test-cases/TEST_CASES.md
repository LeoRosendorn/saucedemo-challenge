# Casos de Prueba — SauceDemo
**URL:** https://www.saucedemo.com  
**Fecha:** Mayo 2026  
**Autor:** Leonardo Rosendorn

---

## Funcionalidad 1: Inicio de Sesión (Login)

---

### TC_LOGIN_001 — Login exitoso con credenciales válidas

| Campo | Detalle |
|---|---|
| **Prioridad** | Alta |
| **Estado** | ✅ Automatizado |

**Precondiciones:** El usuario está en la página de login (`/`).

**Pasos:**
1. Ingresar `standard_user` en el campo de usuario.
2. Ingresar `secret_sauce` en el campo de contraseña.
3. Hacer clic en el botón "Login".

**Resultado esperado:** El usuario es redirigido a `/inventory.html` y se visualiza el listado de productos.

---

### TC_LOGIN_002 — Login con usuario bloqueado muestra mensaje de error

| Campo | Detalle |
|---|---|
| **Prioridad** | Alta |
| **Estado** | ✅ Automatizado |

**Precondiciones:** El usuario está en la página de login.

**Pasos:**
1. Ingresar `locked_out_user` en el campo de usuario.
2. Ingresar `secret_sauce` en el campo de contraseña.
3. Hacer clic en el botón "Login".

**Resultado esperado:** Se muestra el mensaje de error `"Sorry, this user has been locked out."` y el usuario permanece en la página de login.

---

### TC_LOGIN_003 — Login con campos vacíos muestra error de validación ⚠️ FALLA INTENCIONAL

| Campo | Detalle |
|---|---|
| **Prioridad** | Media |
| **Estado** | ❌ Automatizado (falla intencional para demo de captura de pantalla) |

**Precondiciones:** El usuario está en la página de login.

**Pasos:**
1. Dejar vacíos los campos de usuario y contraseña.
2. Hacer clic en el botón "Login".

**Resultado esperado real:** Se muestra el mensaje `"Epic sadface: Username is required"`.  
**Resultado esperado en test (incorrecto a propósito):** El test busca un mensaje que no existe, provocando fallo con captura de pantalla.

---

### TC_LOGIN_004 — Login con contraseña incorrecta

| Campo | Detalle |
|---|---|
| **Prioridad** | Alta |
| **Estado** | No automatizado |

**Precondiciones:** El usuario está en la página de login.

**Pasos:**
1. Ingresar `standard_user` en el campo de usuario.
2. Ingresar `contraseña_incorrecta` en el campo de contraseña.
3. Hacer clic en el botón "Login".

**Resultado esperado:** Se muestra el mensaje de error `"Epic sadface: Username and password do not match any user in this service"` y el usuario permanece en la página de login.

---

### TC_LOGIN_005 — Login con usuario incorrecto

| Campo | Detalle |
|---|---|
| **Prioridad** | Alta |
| **Estado** | No automatizado |

**Precondiciones:** El usuario está en la página de login.

**Pasos:**
1. Ingresar `usuario_inexistente` en el campo de usuario.
2. Ingresar `secret_sauce` en el campo de contraseña.
3. Hacer clic en el botón "Login".

**Resultado esperado:** Se muestra el mensaje de error `"Epic sadface: Username and password do not match any user in this service"`.

---

### TC_LOGIN_006 — Cerrar mensaje de error con botón X

| Campo | Detalle |
|---|---|
| **Prioridad** | Baja |
| **Estado** | No automatizado |

**Precondiciones:** El usuario realizó un intento de login inválido y el mensaje de error es visible.

**Pasos:**
1. Hacer clic en el botón "X" dentro del mensaje de error.

**Resultado esperado:** El mensaje de error desaparece sin recargar la página.

---

### TC_LOGIN_007 — Login con solo contraseña vacía

| Campo | Detalle |
|---|---|
| **Prioridad** | Media |
| **Estado** | No automatizado |

**Precondiciones:** El usuario está en la página de login.

**Pasos:**
1. Ingresar `standard_user` en el campo de usuario.
2. Dejar vacío el campo de contraseña.
3. Hacer clic en el botón "Login".

**Resultado esperado:** Se muestra el mensaje `"Epic sadface: Password is required"`.

---

### TC_LOGIN_008 — Login con usuario de rendimiento lento (performance_glitch_user)

| Campo | Detalle |
|---|---|
| **Prioridad** | Baja |
| **Estado** | No automatizado |

**Precondiciones:** El usuario está en la página de login.

**Pasos:**
1. Ingresar `performance_glitch_user` en el campo de usuario.
2. Ingresar `secret_sauce` en el campo de contraseña.
3. Hacer clic en el botón "Login".

**Resultado esperado:** El usuario logra ingresar aunque con demora notable (2-5 segundos). La URL final es `/inventory.html`.

---

## Funcionalidad 2: Agregado de Productos al Carrito

---

### TC_CART_001 — Agregar un producto actualiza el contador del carrito

| Campo | Detalle |
|---|---|
| **Prioridad** | Alta |
| **Estado** | ✅ Automatizado |

**Precondiciones:** El usuario está autenticado y en la página de inventario.

**Pasos:**
1. Hacer clic en el botón "Add to cart" del producto "Sauce Labs Backpack".

**Resultado esperado:**
- El contador del ícono del carrito muestra `1`.
- El botón del producto cambia de "Add to cart" a "Remove".

---

### TC_CART_002 — Agregar múltiples productos acumula el contador

| Campo | Detalle |
|---|---|
| **Prioridad** | Alta |
| **Estado** | ✅ Automatizado |

**Precondiciones:** El usuario está autenticado y en la página de inventario.

**Pasos:**
1. Hacer clic en "Add to cart" del producto "Sauce Labs Backpack".
2. Hacer clic en "Add to cart" del producto "Sauce Labs Bike Light".

**Resultado esperado:** El contador del carrito muestra `2`.

---

### TC_CART_003 — Producto en carrito muestra nombre y precio correctos

| Campo | Detalle |
|---|---|
| **Prioridad** | Alta |
| **Estado** | ✅ Automatizado |

**Precondiciones:** El usuario está autenticado y en la página de inventario.

**Pasos:**
1. Verificar el precio del "Sauce Labs Backpack" en el inventario.
2. Hacer clic en "Add to cart" del producto "Sauce Labs Backpack".
3. Hacer clic en el ícono del carrito.

**Resultado esperado:**
- La página de carrito muestra el producto "Sauce Labs Backpack".
- El precio en el carrito coincide con el precio del inventario.

---

### TC_CART_004 — Remover producto desde la página del carrito

| Campo | Detalle |
|---|---|
| **Prioridad** | Alta |
| **Estado** | ✅ Automatizado |

**Precondiciones:** El usuario está autenticado y tiene al menos 1 producto en el carrito.

**Pasos:**
1. Hacer clic en el ícono del carrito para ir a `/cart.html`.
2. Hacer clic en el botón "Remove" del producto "Sauce Labs Backpack".

**Resultado esperado:** El producto desaparece del carrito y el listado queda vacío.

---

### TC_CART_005 — Remover producto desde la página de inventario

| Campo | Detalle |
|---|---|
| **Prioridad** | Media |
| **Estado** | No automatizado |

**Precondiciones:** El usuario tiene el producto "Sauce Labs Backpack" en el carrito.

**Pasos:**
1. Hacer clic en el botón "Remove" del producto "Sauce Labs Backpack" en el inventario.

**Resultado esperado:**
- El contador del carrito disminuye en 1.
- El botón vuelve a mostrar "Add to cart".

---

### TC_CART_006 — Carrito sin badge cuando está vacío

| Campo | Detalle |
|---|---|
| **Prioridad** | Media |
| **Estado** | No automatizado |

**Precondiciones:** El usuario está autenticado. No hay productos en el carrito.

**Pasos:**
1. Observar el ícono del carrito en la barra de navegación.

**Resultado esperado:** No se visualiza ningún badge/contador sobre el ícono del carrito.

---

### TC_CART_007 — El carrito persiste después de navegar al detalle del producto

| Campo | Detalle |
|---|---|
| **Prioridad** | Media |
| **Estado** | No automatizado |

**Precondiciones:** El usuario tiene 1 producto en el carrito.

**Pasos:**
1. Hacer clic en el nombre de otro producto para ir al detalle.
2. Volver al inventario.

**Resultado esperado:** El contador del carrito sigue mostrando `1`.

---

## Funcionalidad 3: API — MercadoLibre Departamentos

---

### TC_API_001 — GET /menu/departments retorna departamentos válidos

| Campo | Detalle |
|---|---|
| **Prioridad** | Alta |
| **Estado** | ✅ Automatizado |
| **Endpoint** | `GET https://www.mercadolibre.com.ar/menu/departments` |

**Precondiciones:** Conexión a internet disponible.

**Pasos:**
1. Realizar una petición HTTP GET al endpoint `https://www.mercadolibre.com.ar/menu/departments`.

**Resultado esperado:**
- El status HTTP de la respuesta es `200 OK`.
- El cuerpo de la respuesta es un JSON válido.
- La respuesta contiene datos de departamentos (array con elementos o estructura con propiedad `departments`/`menu`).
- Cada departamento tiene al menos un identificador (`id`).
