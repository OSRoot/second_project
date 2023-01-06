import Client from "../client";

// define the Product type here
export type Product = {
    id?:string;
    name:string;
    price:string;
}


// implement the Product Class here:
export class ProductClass {
    async index():Promise<Product|any[]>{
        const _conn = await Client.connect();
        const _sql = "SELECT * FROM products;";
        const _result = await _conn.query(_sql);
        _conn.release();
        return _result.rows
    };

    async show(id:string):Promise<Product>{
        const _conn = await Client.connect();
        const _sql = "SELECT * FROM products WHERE id=($1);";
        const _result = await _conn.query(_sql, [id]);
        _conn.release();
        return _result.rows[0];
    };

    async create(p:Product):Promise<Product>{
        const _conn = await Client.connect();
        const _sql = "INSTERT INTO products (name, price) VALUES (($1), ($2)) RETURNING *;";
        const _result = await _conn.query(_sql, [p.name, p.price]);
        _conn.release();
        return _result.rows[0];
    };

    async delete(id:string):Promise<Product>{
        const _conn = await Client.connect();
        const _sql = "DELETE FROM users WHERE id=($1);";
        const _result = await _conn.query(_sql, [id]);
        _conn.release();
        return _result.rows[0];
    };
}