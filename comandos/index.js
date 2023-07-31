import { exec } from "child_process";

import util from "util";
import { fetchAll } from "../banco/index.js";
import { git_comandos } from "../git/index.js";

const execAy = util.promisify(exec);

export async function local(caminho) {
    process.chdir(caminho);
}

async function npm(comando) {
    await execAy(`npm ${comando}`);
}

async function node(comando) {
    await execAy(`node ${comando}`);
}

async function cp(comando) {
    await execAy(`cp ${comando}`);
}

async function composer(comando) {
    await execAy(`composer ${comando}`);
}

async function git(comando, dev) {
    const git_ex = git_comandos[comando];
    return await git_ex(dev);
}

const com = {
    npm, cp, local, node, composer, git
}


export async function comando(id) {
    const dados = await fetchAll(`SELECT 
            p.local_dev as dev,
            p.local_prod as prod,
            tc.nome as comando_tipo,    
            c.comando,
            pi.nome 
        FROM projeto_interacao_comando pic 
        join comando c on c.id = pic.comando_id 
        join tipo_comando tc on tc.id = c.tipo_comando_id
        join projeto_interacao pi on pi.id = pic.projeto_interacao_id 
        join projeto p on p.id = pi.projeto_id and pi.id=?
        order by pic.ordem 
    `, [id]);
    const result = [];
    for (let i = 0; i < dados.length; i++) {
        const { dev, prod, comando_tipo, comando, nome } = dados[i];
        const comando_exec = `${comando}`.replace(/{dev}/gi, dev).replace(/{prod}/gi, prod);

        const ex = com[comando_tipo];
        const r = await ex(comando_exec, dev);
        result.push(r);
    }
    console.log(result);
}