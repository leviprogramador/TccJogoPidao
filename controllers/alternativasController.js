//levi
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarAlternativas(request, response) {
        try{
            const sql = 'SELECT alt_id, perg_id, alternativa, Correta, imagem FROM alternativas;'
            const alternativas = await db.query(sql);

            return response.status(200).json ({confirma: 'Sucesso', nResults: alternativas[0].length, message: alternativas[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
};
