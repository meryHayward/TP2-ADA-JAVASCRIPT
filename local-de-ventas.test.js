const vendedoras = ["Ada", "Grace", "Hedy", "Sheryl"];

const ventas = [
    [ 100000000, 4, 2, 2019, 'Grace', 'Centro', ['Monitor GPRS 3000',
    'Motherboard ASUS 1500'] ],
    [ 100000001, 1, 1, 2019, 'Ada', 'Centro', ['Monitor GPRS 3000',
    'Motherboard ASUS 1500'] ],
    [ 100000002, 2, 1, 2019, 'Grace', 'Caballito', ['Monitor ASC 543',
    'Motherboard MZI', 'HDD Toyiva'] ],
    [ 100000003, 10, 1, 2019, 'Ada', 'Centro', ['Monitor ASC 543',
    'Motherboard ASUS 1200'] ],
    [ 100000004, 12, 1, 2019, 'Grace', 'Caballito', ['Monitor GPRS 3000',
    'Motherboard ASUS 1200'] ],
    [ 100000005, 21, 3, 2019, 'Hedy', 'Caballito', ['Monitor ASC 543',
    'Motherboard ASUS 1200', 'RAM Quinston'] ]
]

const precios = [
    [ 'Monitor GPRS 3000', 200 ],
    [ 'Motherboard ASUS 1500', 120 ],
    [ 'Monitor ASC 543', 250 ],
    [ 'Motherboard ASUS 1200', 100 ],
    [ 'Motherboard MZI', 30 ],
    [ 'HDD Toyiva', 90 ],
    [ 'HDD Wezter Dishital', 75 ],
    [ 'RAM Quinston', 110 ],
    [ 'RAM Quinston Fury', 230 ]
];

const sucursales = ['Centro', 'Caballito'];

/*1. precioMaquina(componentes): recibe un array de componentes y devuelve el
precio de la máquina que se puede armar con esos componentes, que es la suma
de los precios de cada componente incluido.
console.log( precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS
1500"]) ); // 320 ($200 del monitor + $120 del motherboard) */

describe('Precio maquina', () => {
    test('Buscar precio de componente en lista de precios', () => {
      expect(buscarPrecio("Monitor GPRS 3000")).toBe(200);
    });
    test('Tirar error cuando busco precio de componente que no se encuentra en lista de precios', () => {
        expect(() => buscarPrecio("Producto no existente")).toThrow("El componente Producto no existente no se encuentra en la lista de precios");
    });
    test('Calcular precio de lista de componentes', () => {
        expect(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])).toBe(320);
    });
    test('Calcular precio de una lista vacia', () => {
        expect(precioMaquina([])).toBe(0);
    });
    test('Tirar error al calcular precio de maquina cuando el componente no se encuentra en lista de precios', () => {
        expect(() => precioMaquina(["Producto no existente"])).toThrow("El componente Producto no existente no se encuentra en la lista de precios");
    });   
});

const buscarPrecio = (componente) => {
    for (i=0; i < precios.length; i++) {
        if (precios[i][0] === componente) {
            return precios[i][1];
        }
    }
    throw new Error (`El componente ${componente} no se encuentra en la lista de precios`);
}

const precioMaquina = (componentes) => {
    let precio = 0;
    componentes.forEach(componente => { 
        precio += buscarPrecio(componente);
    });
    return precio;
}

/*2. cantidadVentasComponente(componente): recibe el nombre de un componente y
devuelve la cantidad de veces que fue vendido. La lista de ventas no se pasa por
parámetro, se asume que está identificada por la variable ventas.
console.log( cantidadVentasComponente("Monitor ASC 543") ); // 3 */

describe('Cantidad ventas componente', () => {
    test('Obtener cantidad de veces que se vendio un componente', () => {
        expect(cantidadVentasComponente("Monitor ASC 543")).toBe(3);
    });
    test('Tirar error cuando se pasa un componente que no se encuentra a la venta', () => {
        expect(() => cantidadVentasComponente("Producto no existente")).toThrow("El componente Producto no existente no se encuentra a la venta");;
    });
});

const cantidadVentasComponente = (componente) => {
    if (precios.filter(producto => producto[0] === componente).length === 0) {
        throw new Error (`El componente ${componente} no se encuentra a la venta`);
    }
    let cantidadDeVentas = 0;
    ventas.forEach(venta => {
        const productos = venta[6];
        cantidadDeVentas += productos.filter(producto => producto === componente).length;
    });
    return cantidadDeVentas;
}

/*3. ventasVendedora(nombre): recibe por parámetro el nombre de una vendedora y
retorna el importe total de ventas realizadas por dicha vendedora.
console.log( ventasVendedora("Grace") ); // 990 */

/*4. componenteMasVendido(): Devuelve el nombre del componente que más ventas
tuvo históricamente. El dato de la cantidad de ventas es el que indica la función
cantidadVentasComponente
console.log( componenteMasVendido() ); // Monitor GPRS 3000 */

/*5. ventasSucursal(sucursal): recibe por parámetro el nombre de una sucursal y
retorna el importe de las ventas totales realizadas por una sucursal sin límite de
fecha.
console.log( ventasSucursal("Centro") ); // 4195 */

/*6. mejorVendedora(): Devuelve el nombre de la vendedora que más ingresos generó
console.log( mejorVendedora() ); // Grace */

/*7. ventaPromedio(): Debe retornar el importe promedio por venta, como un número
entero sin decimales redondeado siempre para abajo.
console.log( ventaPromedio() ); // 353 */

/*8. obtenerIdVenta(): Tiene que retornar un número aleatorio entre 100000000 y
999999999
console.log( obtenerIdVenta() ); // 386936759 */

describe('Obtener Id venta', () => {
    test('Obtener numero random entre 100000000 y 999999999', () => {
      expect(100000000 < obtenerIdVenta() < 999999999).toBeTruthy();
    });
});

const obtenerIdVenta = () => {
    const nuevoId = parseInt(Math.random() * (999999999 - 100000000) + 100000000);
    return nuevoId;
}

/*9. agregarVenta(dia, mes, anio, vendedora, sucursal, componentes): recibe por
parámetro todos los datos de una venta, y los agrega en el array de ventas. Al igual
que las ventas que ya están previamente creadas, además de estos datos
necesitamos agregar el primer dato que es un identificador de la venta. Para agregar
este dato, tenemos que usar la función desarrollada en el punto anterior
obtenerIdVenta */
