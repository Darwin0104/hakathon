db.createRole({
  role: "Administrador",
  privileges: [
    {
      resource: { db: "CineCampus", collection: "Asiento" },
      actions: ["find", "insert", "update", "remove"]
    },
    {
      resource: { db: "CineCampus", collection: "Cliente" },
      actions: ["find", "insert", "update", "remove"]
    },
    {
      resource: { db: "CineCampus", collection: "Funciones" },
      actions: ["find", "insert", "update", "remove"]
    },
    {
      resource: { db: "CineCampus", collection: "Lugar" },
      actions: ["find", "insert", "update", "remove"]
    },
    {
      resource: { db: "CineCampus", collection: "Peliculas" },
      actions: ["find", "insert", "update", "remove"]
    }
  ],
  roles: [{ role: "dbAdmin", db: "CineCampus" },{ role: "userAdmin", db: "CineCampus" }]
})


db.createRole({
  role: "Usuario Estándar",
  privileges: [
    {
      resource: { db: "CineCampus", collection: "Asiento" },
      actions: ["find"]
    },
    {
      resource: { db: "CineCampus", collection: "Cliente" },
      actions: ["find"]
    },
    {
      resource: { db: "CineCampus", collection: "Funciones" },
      actions: ["find","insert", "update", ]
    },
    {
      resource: { db: "CineCampus", collection: "Lugar" },
      actions: ["find"]
    },
    {
      resource: { db: "CineCampus", collection: "Peliculas" },
      actions: ["find"]
    }
  ],
  roles: []
})

db.createRole({
  role: "Usuario VIP",
  privileges: [
    {
      resource: { db: "CineCampus", collection: "Asiento" },
      actions: ["find"]
    },
    {
      resource: { db: "CineCampus", collection: "Cliente" },
      actions: ["find"]
    },
    {
      resource: { db: "CineCampus", collection: "Funciones" },
      actions: ["find","insert", "update", ]
    },
    {
      resource: { db: "CineCampus", collection: "Lugar" },
      actions: ["find"]
    },
    {
      resource: { db: "CineCampus", collection: "Peliculas" },
      actions: ["find"]
    }
  ],
  roles: []
})