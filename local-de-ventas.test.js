const vendedoras = ["Ada", "Grace", "Hedy", "Sheryl"];

const ventas = [
    [100000000, 4, 2, 2019, 'Grace', 'Centro', ['Monitor GPRS 3000',
        'Motherboard ASUS 1500']],
    [100000001, 1, 1, 2019, 'Ada', 'Centro', ['Monitor GPRS 3000',
        'Motherboard ASUS 1500']],
    [100000002, 2, 1, 2019, 'Grace', 'Caballito', ['Monitor ASC 543',
        'Motherboard MZI', 'HDD Toyiva']],
    [100000003, 10, 1, 2019, 'Ada', 'Centro', ['Monitor ASC 543',
        'Motherboard ASUS 1200']],
    [100000004, 12, 1, 2019, 'Grace', 'Caballito', ['Monitor GPRS 3000',
        'Motherboard ASUS 1200']],
    [100000005, 21, 3, 2019, 'Hedy', 'Caballito', ['Monitor ASC 543',
        'Motherboard ASUS 1200', 'RAM Quinston']]
]

const precios = [
    ['Monitor GPRS 3000', 200],
    ['Motherboard ASUS 1500', 120],
    ['Monitor ASC 543', 250],
    ['Motherboard ASUS 1200', 100],
    ['Motherboard MZI', 30],
    ['HDD Toyiva', 90],
    ['HDD Wezter Dishital', 75],
    ['RAM Quinston', 110],
    ['RAM Quinston Fury', 230]
];

const sucursales = ['Centro', 'Caballito'];

// FUNCIONES AUXILIARES // 

const buscarPrecio = (componente) => {
    // Toma un componente y devuelve el precio del mismo //
    for (i = 0; i < precios.length; i++) {
        if (precios[i][0] === componente) {
            return precios[i][1];
        }
    }
    throw new Error(`El componente ${componente} no se encuentra en la lista de precios`);
}

const obtenerComponentesVendidos = (indice, filtro) => {
    // Funcion para obtener componentes vendidos. Si indice = 4 filtra por vendedora, si indice = 5 filtra por sucursal//
    const ventasFiltradas = ventas.filter(venta => venta[indice] === filtro);
    let componentesVendidos = [];
    ventasFiltradas.forEach(venta => componentesVendidos.push(venta[6]));
    return componentesVendidos.flat();
}

const validarVendedora = (nombre) => {
    if (vendedoras.filter(vendedora => vendedora === nombre).length !== 1) {
        throw new Error(`${vendedora} no pertenece a nuestro equipo de trabajo`);
    }
}

const validarSucursal = (sucursal) => {
    if (sucursales.filter(tienda => tienda === sucursal).length !== 1) {
        throw new Error(`${sucursal} no es una sucursal valida`);
    }
}

const validarDatos = (nombre, sucursal) => {
    validarVendedora(nombre);
    validarSucursal(sucursal);
}

/*1. precioMaquina(componentes): recibe un array de componentes y devuelve el
precio de la máquina que se puede armar con esos componentes, que es la suma
de los precios de cada componente incluido.*/

/*describe('Precio maquina', () => {
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
});*/

const precioMaquina = (componentes) => {
    let precio = 0;
    componentes.forEach(componente => {
        precio += buscarPrecio(componente);
    });
    return precio;
}

// console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])) // 320

/*2. cantidadVentasComponente(componente): recibe el nombre de un componente y
devuelve la cantidad de veces que fue vendido. La lista de ventas no se pasa por
parámetro, se asume que está identificada por la variable ventas.*/

/*describe('Cantidad ventas componente', () => {
    test('Obtener cantidad de veces que se vendio un componente', () => {
        expect(cantidadVentasComponente("Monitor ASC 543")).toBe(3);
    });
    test('Tirar error cuando se pasa un componente que no se encuentra a la venta', () => {
        expect(() => cantidadVentasComponente("Producto no existente")).toThrow("El componente Producto no existente no se encuentra a la venta");;
    });
});*/

const cantidadVentasComponente = (componente) => {
    if (precios.filter(producto => producto[0] === componente).length === 0) {
        throw new Error(`El componente ${componente} no se encuentra a la venta`);
    }
    let cantidadDeVentas = 0;
    ventas.forEach(venta => {
        const productos = venta[6];
        cantidadDeVentas += productos.filter(producto => producto === componente).length;
    });
    return cantidadDeVentas;
}

// console.log(cantidadVentasComponente("Monitor ASC 543")); // 3 

/*3. ventasVendedora(nombre): recibe por parámetro el nombre de una vendedora y
retorna el importe total de ventas realizadas por dicha vendedora. */

const ventasVendedora = (nombre) => {
    validarVendedora(nombre);
    return obtenerComponentesVendidos(4, nombre).reduce((acumulador, componente) => {
        return acumulador + buscarPrecio(componente);
    }, 0);
}

// console.log(ventasVendedora("Grace")); // 990 

/*4. componenteMasVendido(): Devuelve el nombre del componente que más ventas
tuvo históricamente. El dato de la cantidad de ventas es el que indica la función
cantidadVentasComponente */

const componenteMasVendido = () => {
    let vendidos = [];
    for (venta of ventas) {
        for (i = 0; i < venta[6].length; i++) {
            const componente = venta[6][i]
            vendidos.push(componente);
        };
    };
    for (i = 0; i <= vendidos.length; i++) {
        let componente = vendidos[i];
        if (componente === cantidadVentasComponente(vendidos[i]));
        return componente;
    }
};

/* describe('componenteMasVendido', () => {
    beforeEach(() => {
        vendidos = [];
        componenteMasVendido();
    });

    test('que venta este dentro del array ventas', () => {
        let venta = ventas[3]
        expect(venta).toStrictEqual([100000003, 10, 1, 2019, "Ada", "Centro", ['Monitor ASC 543',
            'Motherboard ASUS 1200']]);
    });
    test('Que busque un componentes dentro de una venta', () => {
        let venta = ventas[3];
        let componente = venta[6];
        expect(componente).toStrictEqual(['Monitor ASC 543',
            'Motherboard ASUS 1200']);
    });
    test('que el array vendidos reciba los componentes de ventas', () => {
        for (venta of ventas) {
            for (i = 0; i < venta[6].length; i++) {
                const componente = venta[6][i]
                vendidos.push(componente);
            };
        };
        expect(vendidos.length).toEqual(14);
    });
    test('que al pasar al pasar varios elementos a vendidos, me devuelva el mas repetido de ese array', () => {
        vendidos = ['Monitor GPRS 3000', 'Monitor GPRS 3000', 'Motherboard MZI', 'RAM Quinston']
        expect(cantidadVentasComponente('Monitor GPRS 3000')).toBe(3);
    });/// este tengo una duda xq me devuelve 3 y no dos

}); */


/*5. ventasSucursal(sucursal): recibe por parámetro el nombre de una sucursal y
retorna el importe de las ventas totales realizadas por una sucursal sin límite de
fecha. */

const ventasSucursal = sucursal => {
    validarSucursal(sucursal);
    return obtenerComponentesVendidos(5, sucursal).reduce((acumulador, componente) => {
        return acumulador + buscarPrecio(componente);
    }, 0);
}

// console.log(ventasSucursal("Centro")); // 990 


const ventasSucursal = sucursal => {
    validarSucursal(sucursal);
    const ventasSucursal = ventas.filter(venta => venta[5] === sucursal);
    let componentes = [];
    ventasSucursal.forEach(venta => componentes.push(venta[6]));
    const componentesVendidos = componentes.flat();
    console.log(componentesVendidos);
    return componentesVendidos.reduce((acumulador, componente) => {
        return acumulador + buscarPrecio(componente);
    }, 0);
}




/*6. mejorVendedora(): Devuelve el nombre de la vendedora que más ingresos generó*/

const mejorVendedora = () => {
    const importesVendidos = vendedoras.map(vendedora => ventasVendedora(vendedora));
    const mayorImporte = Math.max.apply(null, importesVendidos);
    return vendedoras[importesVendidos.indexOf(mayorImporte)];
}

// console.log(mejorVendedora()); // Grace 

/*7. ventaPromedio(): Debe retornar el importe promedio por venta, como un número
entero sin decimales redondeado siempre para abajo.*/

const ventaPromedio = () => {//// Esta ok
    const values = [];
    for (venta of ventas) {
        let precio = 0;
        venta[6].forEach(componente => {
            precio += buscarPrecio(componente);
        });
        values.push(precio)
    }
    let suma = 0;
    for (i = 0; i < values.length; i++) {
        suma += values[i];
    }
    let promedio = suma / values.length;
    return Math.floor(promedio);
}
/* describe('ventaPromedio', () => {
    beforeEach(() => {
        values = [];
        ventaPromedio();
    });

    test('que venta este dentro del array ventas', () => {
        let venta = ventas[3]
        expect(venta).toStrictEqual([100000003, 10, 1, 2019, "Ada", "Centro", ['Monitor ASC 543',
            'Motherboard ASUS 1200']]);
    });
    test('Que busque un componentes dentro de una venta', () => {
        let venta = ventas[3];
        let componente = venta[6];
        expect(componente).toStrictEqual(['Monitor ASC 543',
            'Motherboard ASUS 1200']);
    });
    test('que el array values reciba el precios totales de los componentes', () => {
        for (venta of ventas) {
            let precio = 0;
            venta[6].forEach(componente => {
                precio += buscarPrecio(componente);
            });
            values.push(precio)
        }
        expect(values).toEqual([320, 320, 370, 350, 300, 460]);
    });
});  */

/*8. obtenerIdVenta(): Tiene que retornar un número aleatorio entre 100000000 y
999999999
 
/*describe('Obtener Id venta', () => {
    test('Obtener numero random entre 100000000 y 999999999', () => {
      expect(100000000 < obtenerIdVenta() < 999999999).toBeTruthy();
    });
});*/

const obtenerIdVenta = () => {
    const nuevoId = parseInt(Math.random() * (999999999 - 100000000) + 100000000);
    return nuevoId;
}

// console.log(obtenerIdVenta()); // 386936759

/*9. agregarVenta(dia, mes, anio, vendedora, sucursal, componentes): recibe por
parámetro todos los datos de una venta, y los agrega en el array de ventas. Al igual
que las ventas que ya están previamente creadas, además de estos datos
necesitamos agregar el primer dato que es un identificador de la venta. Para agregar
este dato, tenemos que usar la función desarrollada en el punto anterior
obtenerIdVenta */

const agregarVenta = (dia, mes, anio, vendedora, sucursal, componentes) => {
    validarDatos(vendedora, sucursal);
    const nuevaVenta = [obtenerIdVenta(), dia, mes, anio, vendedora, sucursal, componentes];
    ventas.push(nuevaVenta);
}

