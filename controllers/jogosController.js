//levi
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarJogos(request, response) {
        try{
            const sql = 'select jogo_id, Informaçoes, Genero, linkvid, Nome, Sinopse from jogos;'
            const jogos = await db.query(sql);

            return response.status(200).json ({confirma: 'Sucesso', nResults: jogos[0].length, message: jogos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
};
