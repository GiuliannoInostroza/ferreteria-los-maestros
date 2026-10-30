# Ferretería Los Maestros

Tienda online desarrollada para Ferretería Los Maestros.

Proyecto del ramo Desarrollo FullStack II (DSY1104) de Duoc UC. En la Evaluación Parcial 2 el sitio fue migrado a React y se incorporaron componentes reutilizables, navegación, persistencia local, administración y pruebas unitarias.

## Equipo

| Integrante          | Área principal                                                         |
| ------------------- | ---------------------------------------------------------------------- |
| Giulianno Inostroza | Carrito, checkout, login, roles y persistencia                         |
| Agustín Pérez       | Base React, inicio, catálogo, categorías, ofertas, detalle y contenido |
| Nicolás Pérez       | Administración de productos y usuarios, y registro                     |

## Tecnologías

- Node.js 20
- React con Vite
- React Bootstrap y Bootstrap
- React Router
- localStorage
- Vitest
- React Testing Library
- jsdom

## Cómo ejecutar

Entorno utilizado: Node.js 20.

```bash
git clone https://github.com/GiuliannoInostroza/front-ferreteria-los-maestros.git
cd front-ferreteria-los-maestros
npm install
npm run dev
```

La aplicación se abrirá normalmente en:

```text
http://localhost:5173
```

Para generar la versión de producción:

```bash
npm run build
```

## Pruebas

Para ejecutar las pruebas:

```bash
npm run test:run
```

Para ejecutar las pruebas con cobertura:

```bash
npm run coverage
```

Resultado final:

- 21 de 21 archivos de prueba aprobados.
- 30 de 30 pruebas aprobadas.
- 10 pruebas por integrante.

Cobertura final:

| Indicador  | Cobertura |
| ---------- | --------: |
| Statements |   86,68 % |
| Branches   |   82,26 % |
| Functions  |   89,84 % |
| Lines      |   86,14 % |

Las pruebas utilizan `vi.fn`, `vi.spyOn`, `mockRestore` y `mockResolvedValue` según el caso.

## Usuarios de prueba

El inicio de sesión es simulado y no almacena contraseñas. Para la demostración puede utilizarse la contraseña `1234`.

| Usuario             | Correo                  | Rol           |
| ------------------- | ----------------------- | ------------- |
| Agustín Pérez       | agu.perez@duocuc.cl     | Administrador |
| Giulianno Inostroza | giu.inostroza@duocuc.cl | Vendedor      |
| Nicolás Pérez       | na.perezg@duocuc.cl     | Cliente       |

### Permisos

- Cliente: navegación y compra.
- Vendedor: navegación, compra y administración de productos.
- Administrador: navegación, compra, administración de productos y administración de usuarios.

## Funcionalidades principales

- Inicio y catálogo de productos.
- Detalle de productos.
- Filtro por categorías.
- Vista de ofertas.
- Productos destacados.
- Carrito de compras.
- Modificación y eliminación de productos del carrito.
- Checkout simulado.
- Validación de formularios.
- Control y actualización de stock.
- Registro de clientes.
- Inicio y cierre de sesión.
- Roles Cliente, Vendedor y Administrador.
- Administración de productos.
- Administración de usuarios.
- Persistencia mediante `localStorage`.
- Diseño responsive.

## Estructura principal

```text
src/
├── components/   componentes reutilizables
├── pages/        vistas de la aplicación
│   └── admin/    administración de productos y usuarios
├── data/         datos iniciales
├── services/     servicios
├── utils/        funciones, validaciones y persistencia
├── test/         configuración de pruebas
├── App.jsx       rutas y estado compartido
└── main.jsx      punto de entrada
```

## Rutas principales

| Ruta                 | Vista                       |
| -------------------- | --------------------------- |
| `/`                  | Inicio                      |
| `/productos`         | Catálogo                    |
| `/productos/:codigo` | Detalle de producto         |
| `/categorias`        | Categorías                  |
| `/ofertas`           | Ofertas                     |
| `/carrito`           | Carrito                     |
| `/checkout`          | Finalizar compra            |
| `/login`             | Inicio de sesión            |
| `/registro`          | Registro                    |
| `/nosotros`          | Nosotros                    |
| `/blogs`             | Blogs                       |
| `/contacto`          | Contacto                    |
| `/admin/productos`   | Administración de productos |
| `/admin/usuarios`    | Administración de usuarios  |

## Diseño responsive

La aplicación utiliza Bootstrap para adaptarse a dispositivos móviles, tablet y escritorio.

El menú cambia a navegación colapsada bajo el breakpoint `xl` de Bootstrap y se revisó el sitio entre 320 px y 1920 px sin desplazamiento horizontal significativo.

## Despliegue

La versión final está publicada en AWS EC2 utilizando Nginx:

http://54.88.103.128

## Alcance

Esta evaluación corresponde al frontend de la aplicación.

Los datos se almacenan localmente en el navegador mediante `localStorage`.

No se incluye backend, base de datos, pagos reales ni autenticación segura con JWT.
