import { validarProducto } from "./validaciones";

describe("validarProducto", () => {
  const datos = {
    codigo: "MC001",
    nombre: "Cemento",
    marca: "Polpaico",
    categoria: "Materiales de Construcción",
    precio: "5990",
    stock: "80",
    stockCritico: "20",
  };

  it("rechaza un código repetido, un precio en cero y cantidades negativas", () => {
    const productos = [{ codigo: "MC001" }];
    const invalidos = { ...datos, precio: "0", stock: "-1", stockCritico: "-2" };

    const errores = validarProducto(invalidos, productos, "");

    expect(errores.codigo).toBe("Ya existe un producto con ese código");
    expect(errores.precio).toBe("El precio debe ser mayor que 0");
    expect(errores.stock).toBe("El stock no puede ser negativo");
    expect(errores.stockCritico).toBe("El stock crítico no puede ser negativo");
  });

  it("pide los campos obligatorios cuando vienen vacíos y acepta datos correctos", () => {
    const vacios = {
      codigo: "",
      nombre: "",
      marca: "",
      categoria: "",
      precio: "",
      stock: "",
      stockCritico: "",
    };

    const errores = validarProducto(vacios, [], "");

    expect(errores.codigo).toBe("Código obligatorio");
    expect(errores.nombre).toBe("Nombre obligatorio");
    expect(errores.stock).toBe("El stock es obligatorio");
    expect(errores.stockCritico).toBe("El stock crítico es obligatorio");
    expect(validarProducto(datos, [], "")).toEqual({});
  });
});
