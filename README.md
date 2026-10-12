# Ferretería Los Maestros

Tienda online para la Ferretería Los Maestros, un negocio familiar de La Serena con 22 años vendiendo materiales de construcción, herramientas y ferretería general.

Proyecto del ramo Desarrollo FullStack II (DSY1104) de Duoc UC. En la Evaluación Parcial 1 hicimos el sitio con HTML, CSS y JavaScript. En la Evaluación Parcial 2 lo pasamos a React y le agregamos pruebas unitarias.

## Equipo

| Integrante | Se encargó de |
|---|---|
| Giulianno Inostroza | Carrito, checkout, login con roles y persistencia |
| Agustín Pérez | Base del proyecto React, inicio, catálogo, detalle, nosotros, blogs y contacto |
| Nicolás Pérez | Administración de productos y de usuarios |

## Tecnologías

- React con Vite
- React Bootstrap y Bootstrap para el diseño responsivo
- React Router para la navegación
- localStorage para guardar carrito, sesión, productos y usuarios
- Vitest y React Testing Library para las pruebas

## Cómo ejecutar

Se necesita Node.js 22 o superior.

```bash
git clone https://github.com/GiuliannoInostroza/ferreteria-los-maestros.git
cd ferreteria-los-maestros
npm install
npm run dev
```

La terminal muestra una dirección como http://localhost:5173 para abrir en el navegador.

## Pruebas

```bash
npm run test:run
npm run coverage
```

El primero ejecuta todas las pruebas una vez. El segundo además genera el informe de cobertura en la carpeta `coverage`.

## Usuarios de prueba

El login es simulado y no guarda contraseñas. Sirve cualquier contraseña de 4 a 10 caracteres.

| Correo | Rol | Puede |
|---|---|---|
| admin@duoc.cl | Administrador | Administrar productos y usuarios |
| vendedor@duoc.cl | Vendedor | Administrar productos |
| cliente@gmail.com | Cliente | Comprar en la tienda |

## Estructura

```
src/
├── components/   piezas que se reutilizan (menú, tarjetas, item del carrito)
├── pages/        vistas con ruta
│   └── admin/    administración de productos y usuarios
├── data/         datos simulados
├── utils/        funciones de precio, carrito y persistencia
├── test/         configuración de las pruebas
├── App.jsx       rutas y estado compartido
└── main.jsx      punto de entrada
```

## Rutas

| Ruta | Vista |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo con filtro por categoría |
| `/productos/:codigo` | Detalle de un producto |
| `/carrito` | Carrito de compras |
| `/checkout` | Datos de entrega y resultado de la compra |
| `/login` | Inicio de sesión |
| `/nosotros`, `/blogs`, `/contacto` | Contenido |
| `/admin/productos` | Productos, para Vendedor y Administrador |
| `/admin/usuarios` | Usuarios, solo para Administrador |

## Diseño responsivo

Usamos la grilla de Bootstrap: las tarjetas se ven en una columna en celular, dos en tablet y tres en escritorio. El menú se convierte en hamburguesa en pantallas chicas.

## Lo que falta

Los datos viven en el navegador con localStorage, así que cada navegador tiene su propia copia. La conexión con el backend queda para la siguiente evaluación.
