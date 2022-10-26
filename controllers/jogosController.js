//levi
const { json } = require("express");
const db = require("../database/connection");

module.exports = {
    async listarJogos(request, response) {
        try{
            const {page = 0, limit = 5} = request.query;
            const inicio = (page -1) * limit;
            const {jogo_id = '%%'} = request.body;
            const {Nome = '%%'} = request.body;
        
            
            const sql = 'select j.jogo_id, j.Informacoes, j.Genero, j.linkvid, j.Nome, j.Sinopse  from jogos j WHERE j.jogo_id like ? AND j.Nome like ? order by j.Nome';
            const values = [ jogo_id, Nome, Sinopse, parseInt(limit) ];
            const jogos = await db.query(sql, values);


            return response.status(200).json ({confirma: 'Sucesso', nResults: jogos[0].length, message: jogos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
    async create (request, response) {
        try {
    const {Informacoes, Genero, linkvid, Nome, Sinopse} = request.body;
    const sql = 'INSERT INTO jogos (Informacoes, Genero, linkvid, Nome, Sinopse) VALUES (?, ?, ?, ?, ?)';
    const values = [Informacoes, Genero, linkvid, Nome, Sinopse];
    const confirmacao = await db.query (sql, values);
    const jogo_id = confirmacao[0].insertId;

    
    return response.status(200).json({confirma: 'Sucesso', message: jogo_id});
        } catch (error) {
            return response.status (500).json({Confirma: 'Erro', message: error});
        }
    },
    async update (request, response) {
        try {
            const { Informacoes, Genero, linkvid, Nome, Sinopse } = request.body;
            const { jogo_id } = request.params;
            const sql = 'UPDATE jogos SET Informacoes = ?, Genero = ?, linkvid = ?, Nome= ?, Sinopse= ? WHERE jogo_id = ?;';
            const values = [Informacoes, Genero, linkvid, Nome, Sinopse, jogo_id];
            const atualizacao = await db.query (sql, values);
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados Atualizados'});

        } catch (error){
            return response.status(500).json ({confirma: 'Erro', message: error});
        }
    },
    

};

//gui passou por aqui