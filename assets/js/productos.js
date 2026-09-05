// Productos de Ferretería Los Maestros
// Datos reales del catálogo entregado por el profesor (muestra representativa).
// Cada producto es un objeto con sus propiedades; juntos forman el arreglo
// que la tienda recorre para mostrar las tarjetas (patrón Guía 7).

const productos = [
  // Materiales de Construcción
  { codigo: "MC001", nombre: "Cemento Polpaico gris 25 kg", marca: "Polpaico", categoria: "Materiales de Construcción", precio: 5990, stock: 80, stockCritico: 20, imagen: "🧱", descripcion: "Cemento gris de uso general para hormigones y morteros." },
  { codigo: "MC007", nombre: "Ladrillo fiscal N°5", marca: "Local", categoria: "Materiales de Construcción", precio: 380, stock: 500, stockCritico: 100, imagen: "🧱", descripcion: "Ladrillo cerámico fiscal para muros y tabiques." },
  { codigo: "MC009", nombre: "Bloque de hormigón 19x19x39 cm", marca: "Volcán", categoria: "Materiales de Construcción", precio: 1200, stock: 200, stockCritico: 50, imagen: "🧱", descripcion: "Bloque de hormigón para albañilería de muros." },

  // Pinturas
  { codigo: "PT001", nombre: "Pintura látex interior 1 galón blanco", marca: "Sipa", categoria: "Pinturas", precio: 9990, stock: 40, stockCritico: 10, imagen: "🎨", descripcion: "Látex lavable de alta cobertura para muros interiores." },
  { codigo: "PT004", nombre: "Esmalte sintético 1/4 litro", marca: "Sipa", categoria: "Pinturas", precio: 4290, stock: 50, stockCritico: 15, imagen: "🖌️", descripcion: "Esmalte sintético brillante, varios colores." },
  { codigo: "PT007", nombre: "Rodillo lana 23 cm con mango", marca: "Wurth", categoria: "Pinturas", precio: 3990, stock: 30, stockCritico: 10, imagen: "🖌️", descripcion: "Rodillo de lana para pinturas al agua." },

  // Herramientas Manuales
  { codigo: "HM001", nombre: "Martillo carpintero 500 g", marca: "Stanley", categoria: "Herramientas Manuales", precio: 7990, stock: 20, stockCritico: 5, imagen: "🔨", descripcion: "Martillo de carpintero con mango de fibra." },
  { codigo: "HM002", nombre: "Alicate universal 8\"", marca: "Stanley", categoria: "Herramientas Manuales", precio: 7290, stock: 15, stockCritico: 5, imagen: "🔧", descripcion: "Alicate universal con corte, 8 pulgadas." },
  { codigo: "HM003", nombre: "Destornillador plano 6x100 mm", marca: "Stanley", categoria: "Herramientas Manuales", precio: 1990, stock: 30, stockCritico: 10, imagen: "🪛", descripcion: "Destornillador plano aislado de 100 mm." },
  { codigo: "HM008", nombre: "Nivel de burbuja 60 cm", marca: "Stanley", categoria: "Herramientas Manuales", precio: 10490, stock: 8, stockCritico: 3, imagen: "📐", descripcion: "Nivel de aluminio con 3 burbujas." },

  // Herramientas Eléctricas
  { codigo: "HE001", nombre: "Taladro percutor 650W 13 mm", marca: "Makita", categoria: "Herramientas Eléctricas", precio: 79990, stock: 8, stockCritico: 2, imagen: "⚡", descripcion: "Taladro percutor reversible con maletín." },
  { codigo: "HE003", nombre: "Amoladora angular 4.5\" 800W", marca: "Makita", categoria: "Herramientas Eléctricas", precio: 54990, stock: 8, stockCritico: 2, imagen: "⚙️", descripcion: "Amoladora angular compacta para corte y desbaste." },

  // Gasfitería
  { codigo: "GS001", nombre: "Cañería PVC 1/2\" x 6 m", marca: "Tigre", categoria: "Gasfitería", precio: 5490, stock: 30, stockCritico: 10, imagen: "🚰", descripcion: "Cañería PVC clase 10 para agua fría." },

  // Electricidad
  { codigo: "EL001", nombre: "Cable unipolar 1.5 mm² (por metro)", marca: "Condulac", categoria: "Electricidad", precio: 590, stock: 100, stockCritico: 30, imagen: "⚡", descripcion: "Cable unipolar NH-80 para instalaciones empotradas." },
  { codigo: "EL004", nombre: "Enchufe empotrar 16A c/tierra", marca: "Bticino", categoria: "Electricidad", precio: 3690, stock: 50, stockCritico: 15, imagen: "🔌", descripcion: "Enchufe schuko empotrar con toma de tierra." },
  { codigo: "EL011", nombre: "Ampolleta LED 9W E27 luz fría", marca: "Philips", categoria: "Electricidad", precio: 3990, stock: 60, stockCritico: 20, imagen: "💡", descripcion: "Ampolleta LED 9W equivalente a 60W incandescente." },

  // Tornillería
  { codigo: "TR001", nombre: "Tornillo autoperforante 8x1\" caja 100", marca: "Hilti", categoria: "Tornillería", precio: 2990, stock: 40, stockCritico: 12, imagen: "🔩", descripcion: "Tornillos autoperforantes para metal, caja de 100." },
  { codigo: "TR004", nombre: "Taco fisher S6 bolsa 100", marca: "Fischer", categoria: "Tornillería", precio: 3190, stock: 35, stockCritico: 10, imagen: "🔩", descripcion: "Tacos de expansión S6 con bolsa de 100 unidades." },

  // Madera
  { codigo: "MD002", nombre: "Pino cepillado 2x4\" x 3 m", marca: "Local", categoria: "Madera", precio: 7490, stock: 30, stockCritico: 10, imagen: "🪵", descripcion: "Pino cepillado estructural para cadenas y techumbres." },
  { codigo: "MD006", nombre: "Volcanita estándar 10 mm", marca: "Volcán", categoria: "Madera", precio: 8990, stock: 30, stockCritico: 8, imagen: "🪵", descripcion: "Plancha de yeso cartón 1.2 x 2.4 m para tabiques." },

  // Seguridad
  { codigo: "SE001", nombre: "Casco de seguridad blanco", marca: "3M", categoria: "Seguridad", precio: 6990, stock: 15, stockCritico: 5, imagen: "⛑️", descripcion: "Casco dieléctrico con arnés ajustable." },
  { codigo: "SE002", nombre: "Guantes de cuero talla L", marca: "3M", categoria: "Seguridad", precio: 3690, stock: 20, stockCritico: 6, imagen: "🧤", descripcion: "Guantes de cuero vacuno para trabajos generales." },
  { codigo: "SE003", nombre: "Antiparras de seguridad clear", marca: "3M", categoria: "Seguridad", precio: 2490, stock: 25, stockCritico: 8, imagen: "🥽", descripcion: "Antiparras con protección UV y antirrayado." },

  // Jardín
  { codigo: "JA001", nombre: "Manguera de riego 3/4\" x 25 m", marca: "Tigre", categoria: "Jardín", precio: 22990, stock: 6, stockCritico: 2, imagen: "🚿", descripcion: "Manguera reforzada de 3 capas con fitting." },
  { codigo: "JA004", nombre: "Pala punta redonda #2 con mango", marca: "Corona", categoria: "Jardín", precio: 10990, stock: 8, stockCritico: 2, imagen: "⛏️", descripcion: "Pala de acero templado con mango de madera." }
];
