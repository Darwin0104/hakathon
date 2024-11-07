{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'generacion',
      'asignatura',
      'ejecutorTecnico',
      'ejecutorIngles',
      'ejecutorHabilidades',
      'coordinador',
      'mentor',
      'monitor',
      'salon',
      'sede',
      'ciudad',
      'grupo',
      'fechaInicio',
      'horasIngles',
      'horasDesarrollo',
      'horasHabilidades'
    ],
    properties: {
      generacion: {
        bsonType: 'int'
      },
      asignatura: {
        bsonType: 'objectId'
      },
      ejecutorTecnico: {
        bsonType: 'objectId'
      },
      ejecutorIngles: {
        bsonType: 'objectId'
      },
      ejecutorHabilidades: {
        bsonType: 'objectId'
      },
      coordinador: {
        bsonType: 'objectId'
      },
      mentor: {
        bsonType: 'objectId'
      },
      monitor: {
        bsonType: 'objectId'
      },
      salon: {
        bsonType: 'objectId'
      },
      sede: {
        bsonType: 'objectId'
      },
      ciudad: {
        bsonType: 'objectId'
      },
      grupo: {
        bsonType: 'objectId'
      },
      fechaInicio: {
        bsonType: 'date'
      },
      horasIngles: {
        bsonType: 'int'
      },
      horasDesarrollo: {
        bsonType: 'int'
      },
      horasHabilidades: {
        bsonType: 'int'
      }
    }
  }
}