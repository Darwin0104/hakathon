import { connect } from "../../helper/db/connect.js";
import { ObjectId } from "mongodb";

export class Movimientos extends connect {
    constructor() {
        if (typeof Movimientos.instance === "object") {
            return Movimientos.instance;
        }
        super();
        this.collection = this.db.collection('Movimiento');
        Movimientos.instance = this;
        return this;
    }
    async findMovimientos() {
        let res = await this.collection.find({}).toArray();
        return res;
    }
}