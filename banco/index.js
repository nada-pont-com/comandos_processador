import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


const db = open({
    filename: 'banco.db',
    driver: sqlite3.Database
})


export async function query(sql, params = []) {
    const banco = await db;
    return await banco.run(sql, ...params);
}


export async function fetchAll(sql, params = []) {
    const banco = await db;
    return await banco.all(sql, ...params);
}