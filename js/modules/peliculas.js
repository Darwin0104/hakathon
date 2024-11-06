import { connect } from "../../helper/db/connect.js";
import { ObjectId } from "mongodb";

/**
 * Clase `Peliculas`
 * 
 * Maneja las operaciones relacionadas con las películas y sus funciones en la base de datos MongoDB.
 * 
 * @class
 * @extends connect
 */


export class Peliculas extends connect {
    constructor() {
        if (typeof Peliculas.instance === "object") {
            return Peliculas.instance;
        }
        super();
        this.collection = this.db.collection('Peliculas');
        this.lugarCollection = this.db.collection('Lugar');
        this.funcionesCollection = this.db.collection('Funciones');
        Peliculas.instance = this;
        return this;
    }

        /**
     * Recupera todas las boletas disponibles.
     * 
     * @returns {Promise<Array<Object>>} Un arreglo de objetos con las boletas disponibles.
     */

    async findPeliculas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
 * * API para Listar Películas
 * TODO: Obtener  todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.
 * @returns {Array} 
 *  - Un arreglo de objetos con las funciones de películas disponibles si la operación es exitosa.
 *  - Un objeto con el estado y mensaje de error si ocurre un problema.
 */
 

    async getAllFilmsAvailable() {
    try {
        //* Verificar las películas que estén en cartelera y disponibles.
        const FuncionesDisponibles = await this.funcionesCollection.aggregate([
            {
                $match: {
                    Date_inicio: { $gte: new Date() } // Solo funciones futuras
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
                $unwind: "$Peliculas" // Descompone el array de Peliculas en documentos individuales
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            "$$ROOT", "$Peliculas" // Combina el documento de funciones con el de películas
                        ]
                    }
                }
            },
            {
                $project: {
                    id_lugar: 0, // Excluye el campo id_lugar
                    Peliculas: 0, // Excluye el campo Peliculas
                    Date_fin: 0 // Excluye el campo Date_fin
                }
            }
        ]).toArray();

         //* Retornar las funciones disponibles
         return FuncionesDisponibles;
        } catch (error) {
            //! Captura y retorna errores en la agregación
            let [status, mensaje] = `${error}`.split(": ");
            return { status, mensaje };
        }
    }

    /**
     * Obtiene todos los detalles de una película específica por su id.
     * * API para Obtener Detalles de Película
     * TODO: Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.
     * @param {objectId} id - Identificador único de la película.
     * 
     * @returns {Promise<Object | Object>} 
     * - Un objeto con los detalles de la película si existe.
     * - Un objeto con el estado y mensaje de error si el id no existe.
     * 
     * @throws {Error} Lanza un error si ocurre un problema durante la consulta.
     */
    async getAllDetailsFilms(id) {
        try {
            // Convertir el id a ObjectId
            const objectId = new ObjectId(id);
    
            // Verificar la existencia del id
            const idExistente = await this.collection.findOne({ _id: objectId });
            if (!idExistente) {
                return { status: 'Not Found', mensaje: 'El id_pelicula ingresada no existe, por favor revíselo nuevamente.' };
            }
    
            // Obtener los detalles de la funcion
            const FilmDetail = await this.collection.findOne({ _id: objectId });
            return FilmDetail;
    
        } catch (error) {
            // Captura y retorna errores si ocurre un problema
            return { status: 'Error', mensaje: error.message };
        }
    }
    

}