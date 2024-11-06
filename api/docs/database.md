## asiento

{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'id_lugar',
      'TipoFila',
      'codigo',
      'aumento'
    ],
    properties: {
      id_lugar: {
        bsonType: 'objectId',
        description: 'Debe ser un ObjectId que representa el ID del lugar.'
      },
      TipoFila: {
        bsonType: 'string',
        'enum': [
          'general',
          'preferencial'
        ],
        description: 'Debe ser una cadena de texto que representa el tipo de fila. Los valores permitidos son \'general\' y \'preferencial\'.'
      },
      codigo: {
        bsonType: 'array',
        description: 'Debe ser un array de objetos que contengan una propiedad \'codigo_asiento\'.',
        items: {
          bsonType: 'object',
          properties: {
            codigo_asiento: {
              bsonType: 'string',
              description: 'Cada objeto en el array debe tener una propiedad \'codigo_asiento\' que sea una cadena de texto.'
            }
          },
          required: [
            'codigo_asiento'
          ],
          additionalProperties: false
        }
      },
      aumento: {
        bsonType: 'int',
        description: 'Debe ser un número entero que representa el aumento que se le hace a la fila según el tipo de fila.'
      }
    }
  }
};

## Cliente:
{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'categoria',
      'nombre',
      'apellido',
      'nickname',
      'email',
      'telefono',
      'descuento'
    ],
    properties: {
      categoria: {
        bsonType: 'string',
        'enum': [
          'Administrador',
          'Usuario Estándar',
          'Usuario VIP'
        ],
        description: 'Debe ser una cadena de texto que representa la categoría del usuario. Los valores permitidos son \'Administrador\', \'Usuario Estándar\', \'Usuario VIP\'.'
      },
      nombre: {
        bsonType: 'string',
        description: 'Debe ser una cadena de texto que representa el nombre del usuario y es obligatorio.'
      },
      apellido: {
        bsonType: 'string',
        description: 'Debe ser una cadena de texto que representa el apellido del usuario y es obligatorio.'
      },
      nickname: {
        bsonType: 'string',
        description: 'Debe ser una cadena de texto que representa el apodo del usuario y es obligatorio.'
      },
      email: {
        bsonType: 'string',
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        description: 'Debe ser una cadena de texto en formato de correo electrónico y es obligatorio.'
      },
      telefono: {
        bsonType: 'string',
        pattern: '^[0-9]{10,15}$',
        description: 'Debe ser una cadena de dígitos con una longitud de entre 10 y 15 caracteres y es obligatorio.'
      },
      descuento: {
        bsonType: 'number',
        minimum: 0,
        maximum: 100,
        description: 'Debe ser un número que representa el porcentaje de descuento aplicable, entre 0 y 100.'
      }
    }
  }
}

## Funciones: {
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'id_pelicula',
      'id_lugar',
      'Date_inicio',
      'Date_fin'
    ],
    properties: {
      id_pelicula: {
        bsonType: 'objectId',
        description: 'Debe ser un ObjectId y es obligatorio'
      },
      id_lugar: {
        bsonType: 'objectId',
        description: 'Debe ser un ObjectId y es obligatorio'
      },
      Date_inicio: {
        bsonType: 'date',
        description: 'Debe ser una fecha y es obligatorio'
      },
      Date_fin: {
        bsonType: 'date',
        description: 'Debe ser una fecha y es obligatorio'
      }
    }
  }
}

## Lugar: 
{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'nombre',
      'precio'
    ],
    properties: {
      nombre: {
        bsonType: 'string',
        description: 'Debe ser una cadena y es obligatorio'
      },
      precio: {
        bsonType: 'number',
        minimum: 0,
        description: 'Debe ser un número no negativo y es obligatorio'
      }
    }
  }
}

## Peliculas

{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'titulo',
      'genero',
      'duracion',
      'sinopsis'
    ],
    properties: {
      titulo: {
        bsonType: 'string',
        description: 'Debe ser una cadena y es obligatorio'
      },
      genero: {
        bsonType: 'string',
        description: 'Debe ser una cadena y es obligatorio'
      },
      duracion: {
        bsonType: 'number',
        minimum: 1,
        description: 'Debe ser un número positivo y es obligatorio'
      },
      sinopsis: {
        bsonType: 'string',
        description: 'Debe ser una cadena y es obligatorio'
      }
    }
  }
}









## Movimiento


{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'codigo_cliente',
      'TipoMovimiento',
      'id_funcion'
    ],
    properties: {
      codigo_cliente: {
        bsonType: 'string',
        description: 'Debe ser una cadena de texto que representa el código del cliente y es obligatorio'
      },
      TipoMovimiento: {
        bsonType: 'string',
        'enum': [
          'reserva',
          'compra',
          'no_apto',
          'rechazado'
        ],
        description: 'Debe ser una cadena de texto que representa el tipo de movimiento. Los valores permitidos son \'efectivo\', \'tarjeta_credito\' y \'tarjeta_debito\' y es obligatorio'
      },
      id_funcion: {
        bsonType: 'objectId',
        description: 'Debe ser un ObjectId que referencia a la función y es obligatorio'
      }
    }
  }
};

## Tarjeta: 
{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'numero',
      'codigo_usuario',
      'fecha_expedicion',
      'estado'
    ],
    properties: {
      numero: {
        bsonType: 'string',
        pattern: '^[0-9]{16}$',
        description: 'Debe ser una cadena de 16 dígitos y es obligatorio'
      },
      codigo_usuario: {
        bsonType: 'objectId',
        description: 'Debe ser un ObjectId que referencia al usuario y es obligatorio'
      },
      fecha_expedicion: {
        bsonType: 'date',
        description: 'Debe ser una fecha y es obligatorio'
      },
      estado: {
        bsonType: 'string',
        'enum': [
          'activo',
          'inactivo',
          'bloqueado'
        ],
        description: 'Debe ser una cadena con uno de los valores permitidos: \'activo\', \'inactivo\', \'bloqueado\' y es obligatorio'
      }
    }
  }
}

## boleta:


  {
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'id_funcion',
      'id_asiento',
      'fechaAdquisicion'
    ],
    properties: {
      id_movimiento: {
        bsonType: 'objectId',
        description: 'Debe ser un ObjectId que representa el ID del movimiento'
      },
      id_asiento: {
        bsonType: 'objectId',
        description: 'Debe ser un ObjectId que representa el ID del asiento'
      },
      fechaAdquisicion: {
        bsonType: 'date',
        description: 'Debe ser una fecha que representa la fecha de adquisición'
      }
    }
  }
},