const { ObjectId } = require("mongodb");
const Connect = require("../index.cjs");

module.exports = class Peliculas extends Connect {
    constructor() {
        if (typeof Peliculas.instance === "object") {
            return Peliculas.instance;
        }
        super();
        this.collection = this.db.collection('Peliculas');
        this.funcionesCollection = this.db.collection('Funciones');
        Peliculas.instance = this;
        return this;
    }

    async findAllPeliculas() {
        return await this.collection.find({}).toArray();
    }

    async findPeliculaById(id) {
        return await this.collection.find({ _id: new ObjectId(id) });
    }
    async findPeliculaByName(date){
        return await this.collection.find({"titulo": date})
    }

    async aggregateFunciones() {
        return await this.funcionesCollection.aggregate([
            {
                $match: {
                    Date_inicio: { $gte: new Date() } 
                }
            },
            {
                $lookup: {
                    from: "Peliculas",
                    localField: "id_pelicula",
                    foreignField: "_id",
                    as: "Peliculas"
                }
            },
            {
                $unwind: "$Peliculas"
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$$ROOT", "$Peliculas"]
                    }
                }
            },
            {
                $project: {
                    id_lugar: 0,
                    Peliculas: 0,
                    Date_fin: 0
                }
            }
        ]).toArray();
    }
};
