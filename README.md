# Ferretería Los Maestros

Tienda online para la Ferretería Los Maestros, negocio familiar de La Serena (Región de Coquimbo) con 22 años de trayectoria en materiales de construcción, herramientas y ferretería general.

Proyecto de la asignatura **Desarrollo FullStack II** — Duoc UC. Evaluación Parcial 1.

## Equipo

| Integrante | GitHub | Responsable de |
|---|---|---|
| Giulianno Inostroza | [@GiuliannoInostroza](https://github.com/GiuliannoInostroza) | Base del sitio, Home, Productos, Detalle y Carrito (localStorage) |
| Agustín Pérez | [@AgustinPerez] | Nosotros, Blogs y detalles, Contacto |
| Nicolás Pérez | @NicolasPerez | Registro, Módulo Administrador (productos y usuarios) |

## Tecnologías

- **HTML5** — estructura semántica (header, nav, main, section, footer)
- **CSS3** — hoja de estilos externa, variables CSS, Flexbox, Grid y diseño responsive (mobile first)
- **JavaScript** — DOM, eventos, validaciones de formularios y persistencia con localStorage
- **Iconos:** [Lucide](https://lucide.dev) (licencia ISC)
- **Fotografías:** [Unsplash](https://unsplash.com) y Openverse (CC0 / dominio público)

## 📁 Estructura del proyecto

```
ferreteria-los-maestros/
├── assets/
│   ├── css/
│   │   └── styles.css      # Hoja de estilos única (variables + componentes)
│   ├── img/
│   │   └── logo.svg        # Logo de la marca
│   └── js/
│       └── app.js          # Comportamiento del sitio
├── index.html              # Home
├── productos.html          # Catálogo
├── producto.html           # Detalle de producto
├── carrito.html            # Carrito de compras
├── nosotros.html           # La empresa y el equipo
├── blogs.html              # Noticias (y detalles en blog-detalle-1/2.html)
├── contacto.html           # Formulario de contacto
├── registro.html           # Registro de usuario
├── login.html              # Inicio de sesión
└── README.md
```

## ▶️ Cómo ejecutar

1. Clonar el repositorio: `git clone https://github.com/GiuliannoInostroza/ferreteria-los-maestros.git`
2. Abrir la carpeta en Visual Studio Code.
3. Abrir `index.html` con la extensión **Live Server** (clic derecho → *Open with Live Server*), o simplemente abrir el archivo en el navegador.

No requiere instalación de dependencias ni servidor: es un sitio estático.

## Diseño responsive

El sitio está construido con enfoque **mobile first**: los estilos base están pensados para celular (360 px) y se agregan mejoras con media queries para tablet (768 px) y escritorio (1280 px).


