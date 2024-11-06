import { connect } from "../../helper/db/connect.js";
import { ObjectId } from "mongodb";

export class Boletas extends connect {
    constructor() {
        if (typeof Boletas.instance === "object") {
            return Boletas.instance;
        }
        super();
        this.collection = this.db.collection('Boletas');
        Boletas.instance = this;
        return this;
    }
    async findBoletas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }
}