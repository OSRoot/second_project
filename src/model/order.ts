import Client from "../client";

// define the order type here:
export type Order = {
    id?:string;
    status:string;
    user_id:string;
};



// implement the Order Class here:
export class OrderClass{
    async index():Promise<Order|any[]>{
        const _conn = await Client.connect();
        const _sql = "SELECT * FROM orders;";
        const _result = await _conn.query(_sql);
        _conn.release();
        return _result.rows
    };

    async show(id:string):Promise<Order>{
        const _conn = await Client.connect();
        const _sql = "SELECT * FROM orders WHERE id=($1);";
        const _result = await _conn.query(_sql, [id]);
        _conn.release();
        return _result.rows[0];
    };

    async create(o:Order):Promise<Order>{
        const _conn = await Client.connect();
        const _sql = "INSTERT INTO products (status, user_id) VALUES (($1), ($2)) RETURNING *;";
        const _result = await _conn.query(_sql, [o.status, o.user_id]);
        _conn.release();
        return _result.rows[0];
    };

    
    async delete(id:string):Promise<Order>{
        const _conn = await Client.connect();
        const _sql = "DELETE FROM orders WHERE id=($1);";
        const _result = await _conn.query(_sql, [id]);
        _conn.release();
        return _result.rows[0];
    };

    
}