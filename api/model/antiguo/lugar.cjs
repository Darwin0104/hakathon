import { connect } from "../../helper/db/connect.js";
import { ObjectId } from "mongodb";

export class Lugares extends connect {
    constructor() {
        if (typeof Lugares.instance === "object") {
            return Lugares.instance;
        }
        super();
        this.collection = this.db.collection('Lugar');
        Lugares.instance = this;
        return this;
    }
    async findSalas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }
}