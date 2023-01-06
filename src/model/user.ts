import Client from "../client";
import * as bcrypt from 'bcrypt';
// Create a type for user (prototype);
export type User={
    id?:string;
    username:string;
    password:string;
};

const pepper:string = process.env.PEPPER as string;
const saltRound:number = +(process.env.SALT_ROUNDS as string)


// implement the User Class here:
export class UserClass{
    async index():Promise<User | any[]>{
        const _conn = await Client.connect();
        const _sql = "SELECT * FROM users ;";
        const _result = await _conn.query(_sql);
        _conn.release();
        return _result.rows
    };


    async create(user:User):Promise<User>{
        const _conn = await Client.connect();
        const _sql = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;";
        const _hash = bcrypt.hashSync(user.password + pepper , saltRound);
        const _result = await _conn.query(_sql, [user.username, _hash]);
        _conn.release();
        return _result.rows[0];
    };

    async authenticate(username: string, password:string):Promise<User>{
        const _conn = await Client.connect();
        const _sql = "SELECT * FROM users WHERE username=($1);";
        const _result = await _conn.query(_sql,[username]);
        _conn.release();
        return _result.rows[0];
    }


    async update(user:User):Promise<User>{
        const _conn = await Client.connect();
        const _sql = "UPDATE users SET username='($1)', password='($2)' WHERE id=($3);";
        const _hash = bcrypt.hashSync(user.password + pepper, saltRound);
        const _result = await _conn.query(_sql, [user.username, _hash, user.id]);
        _conn.release();
        return _result.rows[0];
    };

    async oneUser(username:string):Promise<User>{
        try {
            const _conn = await Client.connect();
            const _sql = `SELECT * FROM users Where username=($1)`;;
            const _result = await _conn.query(_sql,[username]);
            _conn.release();
            return _result.rows[0]
        } catch (error) {
            console.log(error);
            
            throw error
        }

    }
};

