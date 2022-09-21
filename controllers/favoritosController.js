// Lucas
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarFavoritos(request, response) {
        try{
            const sql = 'SELECT usu_id, jogo_id, Status FROM favoritos';
            const favoritos = await db.query(sql);

            return response.status(200).json ({confirma: 'Sucesso', nResults: favoritos[0].lenght, message: favoritos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },

    async create(request, response){
        try{
            const {usu_id, jogo_id, Status} = request.body;

            const sql = 'INSERT INTO favoritos(usu_id, jogo_id, Status) VALUES (?, ?, ?)';

            const values = [usu_id, jogo_id, Status];

            const confirmacao = await db.query(sql, values);

            const favoritos = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: favoritos})
        } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
