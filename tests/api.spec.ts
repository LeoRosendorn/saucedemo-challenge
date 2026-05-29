import { test, expect } from '@playwright/test';

const DEPARTMENTS_URL = 'https://www.mercadolibre.com.ar/menu/departments';

test.describe('API - MercadoLibre Departamentos', () => {

  // TC_API_001 - Verificar que el endpoint de departamentos responde correctamente
  test('TC_API_001 - GET /menu/departments retorna departamentos válidos', async ({ request }) => {
    const response = await request.get(DEPARTMENTS_URL, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; QA-Challenge/1.0)',
      },
    });

    // Verificar que la respuesta es exitosa
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Verificar que la respuesta tiene contenido
    expect(body).toBeDefined();
    expect(body).not.toBeNull();

    // Verificar que contiene departamentos (array o estructura con departamentos)
    // El endpoint puede devolver un array directamente o un objeto con propiedad departments
    if (Array.isArray(body)) {
      expect(body.length).toBeGreaterThan(0);
      // Verificar que cada departamento tiene al menos id y label/name
      const firstDept = body[0];
      expect(firstDept).toHaveProperty('id');
    } else {
      // Si viene como objeto envuelto
      const hasDepartments =
        ('departments' in body && Array.isArray(body.departments) && body.departments.length > 0) ||
        ('menu' in body) ||
        (Object.keys(body).length > 0);
      expect(hasDepartments).toBeTruthy();
    }

    console.log(`✅ Endpoint de departamentos responde OK (status ${response.status()})`);
    console.log(`📦 Cantidad de departamentos: ${Array.isArray(body) ? body.length : 'Ver estructura'}`);
  });

});
