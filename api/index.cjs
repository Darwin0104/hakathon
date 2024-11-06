// server/js/modules/connect.js
const { MongoClient } = require('mongodb');

module.exports = class Connect {
    user;
    port;
    #pass;
    #host;
    #cluster;
    #dbName;
    static instance;
    constructor() {
        if (typeof Connect.instance === 'object') {
            return Connect.instance;
        }
        this.user = process.env.VITE_MONGO_USER;
        this.port = process.env.VITE_MONGO_PORT;
        this.setPass = process.env.VITE_MONGO_PWD;
        this.setHost = process.env.VITE_MONGO_HOST;
        this.setCluster = process.env.VITE_MONGO_CLUSTER;
        this.setDbName = process.env.VITE_MONGO_DB;
        this.#open();
        this.db = this.conexion.db(this.getDbName);
        Connect.instance = this;
        return this;
    }

    set setPass(pass) {
        this.#pass = pass;
    }

    set setHost(host) {
        this.#host = host;
    }

    set setCluster(cluster) {
        this.#cluster = cluster;
    }

    set setDbName(dbName) {
        this.#dbName = dbName;
    }

    get getPass() {
        return this.#pass;
    }

    get getHost() {
        return this.#host;
    }

    get getCluster() {
        return this.#cluster;
    }

    get getDbName() {
        return this.#dbName;
    }

    async reconnect() {
        await this.#open();
    }
/* 
    async #open() {
        if (this.user !== 'root') {
            this.conexion = new MongoClient(`${this.getHost}${this.user}:${this.getPass}@${this.getCluster}/${this.getDbName}`, {
            });
        } else if (this.port) {
            this.conexion = new MongoClient(`mongodb://${this.user}:${this.getPass}@${this.getCluster}:${this.port}/${this.getDbName}`);
        } else {
            this.conexion = new MongoClient(`mongodb://${this.user}:${this.getPass}@${this.getCluster}/${this.getDbName}`, {

            });
        }
        await this.conexion.connect();
        console.log('Conectado');
    } */
    async #open() {
        if (this.user !== 'mongo') {
            this.conexion = new MongoClient(`${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}/${this.getDbName}`);
        } else {
            this.conexion = new MongoClient(`${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}`);
        }
        await this.conexion.connect();
        console.log('Conectado');}
    async close() {
        await this.conexion.close();
    }
}