const productos = [
  // Materiales de Construcción
  { codigo: "MC001", imagen: "assets/img/productos/MC001.jpg", nombre: "Cemento Polpaico gris 25 kg", marca: "Polpaico", categoria: "Materiales de Construcción", precio: 5990, stock: 80, stockCritico: 20, descripcion: "Cemento gris de uso general para hormigones y morteros." },
  { codigo: "MC007", imagen: "assets/img/productos/MC007.jpg", nombre: "Ladrillo fiscal N°5", marca: "Local", categoria: "Materiales de Construcción", precio: 380, stock: 500, stockCritico: 100, descripcion: "Ladrillo cerámico fiscal para muros y tabiques." },
  { codigo: "MC009", imagen: "assets/img/productos/MC009.jpg", nombre: "Bloque de hormigón 19x19x39 cm", marca: "Volcán", categoria: "Materiales de Construcción", precio: 1200, stock: 200, stockCritico: 50, descripcion: "Bloque de hormigón para albañilería de muros." },

  // Pinturas
  { codigo: "PT001", imagen: "assets/img/productos/PT001.jpg", nombre: "Pintura látex interior 1 galón blanco", marca: "Sipa", categoria: "Pinturas", precio: 9990, stock: 40, stockCritico: 10, descripcion: "Látex lavable de alta cobertura para muros interiores." },
  { codigo: "PT004", imagen: "assets/img/productos/PT004.jpg", nombre: "Esmalte sintético 1/4 litro (varios col.)", marca: "Sipa", categoria: "Pinturas", precio: 4290, stock: 50, stockCritico: 15, descripcion: "Esmalte sintético brillante, varios colores." },
  { codigo: "PT007", imagen: "assets/img/productos/PT007.jpg", nombre: "Rodillo lana 23 cm con mango", marca: "Wurth", categoria: "Pinturas", precio: 3990, stock: 30, stockCritico: 10, descripcion: "Rodillo de lana para pinturas al agua." },

  // Herramientas Manuales
  { codigo: "HM001", imagen: "assets/img/productos/HM001.jpg", nombre: "Martillo carpintero 500g", marca: "Stanley", categoria: "Herramientas Manuales", precio: 7990, stock: 20, stockCritico: 5, descripcion: "Martillo de carpintero con mango de fibra." },
  { codigo: "HM002", imagen: "assets/img/productos/HM002.jpg", nombre: "Alicate universal 8\"", marca: "Stanley", categoria: "Herramientas Manuales", precio: 7290, stock: 15, stockCritico: 5, descripcion: "Alicate universal con corte, 8 pulgadas." },
  { codigo: "HM003", imagen: "assets/img/productos/HM003.jpg", nombre: "Destornillador plano 6x100mm", marca: "Stanley", categoria: "Herramientas Manuales", precio: 1990, stock: 30, stockCritico: 10, descripcion: "Destornillador plano aislado de 100 mm." },
  { codigo: "HM008", imagen: "assets/img/productos/HM008.jpg", nombre: "Nivel de burbuja 60 cm", marca: "Stanley", categoria: "Herramientas Manuales", precio: 10490, stock: 8, stockCritico: 3, descripcion: "Nivel de aluminio con 3 burbujas." },

  // Herramientas Eléctricas
  { codigo: "HE001", imagen: "assets/img/productos/HE001.jpg", nombre: "Taladro percutor 650W 13mm", marca: "Makita", categoria: "Herramientas Eléctricas", precio: 79990, stock: 8, stockCritico: 2, descripcion: "Taladro percutor reversible con maletín." },
  { codigo: "HE003", imagen: "assets/img/productos/HE003.jpg", nombre: "Amoladora angular 4.5\" 800W", marca: "Makita", categoria: "Herramientas Eléctricas", precio: 54990, stock: 8, stockCritico: 2, descripcion: "Amoladora angular compacta para corte y desbaste." },

  // Gasfitería
  { codigo: "GS001", imagen: "assets/img/productos/GS001.jpg", nombre: "Cañería PVC 1/2\" x 6m", marca: "Tigre", categoria: "Gasfitería", precio: 5490, stock: 30, stockCritico: 10, descripcion: "Cañería PVC clase 10 para agua fría." },

  // Electricidad
  { codigo: "EL001", imagen: "assets/img/productos/EL001.jpg", nombre: "Cable unipolar 1.5mm² (por metro)", marca: "Condulac", categoria: "Electricidad", precio: 590, stock: 100, stockCritico: 30, descripcion: "Cable unipolar NH-80 para instalaciones empotradas." },
  { codigo: "EL004", imagen: "assets/img/productos/EL004.jpg", nombre: "Enchufe empotrar 16A c/tierra (schuko)", marca: "Bticino", categoria: "Electricidad", precio: 3690, stock: 50, stockCritico: 15, descripcion: "Enchufe schuko empotrar con toma de tierra." },
  { codigo: "EL011", imagen: "assets/img/productos/EL011.jpg", nombre: "Ampolleta LED 9W E27 luz fría", marca: "Philips", categoria: "Electricidad", precio: 3990, stock: 60, stockCritico: 20, descripcion: "Ampolleta LED 9W equivalente a 60W incandescente." },

  // Tornillería
  { codigo: "TR001", imagen: "assets/img/productos/TR001.jpg", nombre: "Tornillo autoperf. 8x1\" caja 100 unid.", marca: "Hilti", categoria: "Tornillería", precio: 2990, stock: 40, stockCritico: 12, descripcion: "Tornillos autoperforantes para metal, caja de 100." },
  { codigo: "TR004", imagen: "assets/img/productos/TR004.jpg", nombre: "Taco fisher S6 bolsa 100 unid.", marca: "Fischer", categoria: "Tornillería", precio: 3190, stock: 35, stockCritico: 10, descripcion: "Tacos de expansión S6 con bolsa de 100 unidades." },

  // Madera
  { codigo: "MD002", imagen: "assets/img/productos/MD002.jpg", nombre: "Pino cepillado 2x4\" x 3m", marca: "Local", categoria: "Madera", precio: 7490, stock: 30, stockCritico: 10, descripcion: "Pino cepillado estructural para cadenas y techumbres." },
  { codigo: "MD006", imagen: "assets/img/productos/MD006.jpg", nombre: "Volcanita estándar 10mm 1.2x2.4m", marca: "Volcán", categoria: "Madera", precio: 8990, stock: 30, stockCritico: 8, descripcion: "Plancha de yeso cartón 1.2 x 2.4 m para tabiques." },

  // Seguridad
  { codigo: "SE001", imagen: "assets/img/productos/SE001.jpg", nombre: "Casco seguridad blanco", marca: "3M", categoria: "Seguridad", precio: 6990, stock: 15, stockCritico: 5, descripcion: "Casco dieléctrico con arnés ajustable." },
  { codigo: "SE002", imagen: "assets/img/productos/SE002.jpg", nombre: "Guantes de cuero talla L", marca: "3M", categoria: "Seguridad", precio: 3690, stock: 20, stockCritico: 6, descripcion: "Guantes de cuero vacuno para trabajos generales." },
  { codigo: "SE003", imagen: "assets/img/productos/SE003.jpg", nombre: "Antiparras de seguridad clear", marca: "3M", categoria: "Seguridad", precio: 2490, stock: 25, stockCritico: 8, descripcion: "Antiparras con protección UV y antirrayado." },

  // Jardín
  { codigo: "JA001", imagen: "assets/img/productos/JA001.jpg", nombre: "Manguera riego 3/4\" x 25m", marca: "Tigre", categoria: "Jardín", precio: 22990, stock: 6, stockCritico: 2, descripcion: "Manguera reforzada de 3 capas con fitting." },
  { codigo: "JA004", imagen: "assets/img/productos/JA004.jpg", nombre: "Pala punta redonda #2 con mango", marca: "Corona", categoria: "Jardín", precio: 10990, stock: 8, stockCritico: 2, descripcion: "Pala de acero templado con mango de madera." }
];
