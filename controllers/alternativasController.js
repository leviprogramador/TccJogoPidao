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
    async create (request, response) {
        try {
            const {perg_id, alternativa, correta, imagem} = request.body;
            const sql = 'INSERT INTO alternativas (perg_id, alternativa, correta, imagem) VALUES (?, ?, ?, ?)';
            const values = [perg_id, alternativa, correta, imagem];
            const confirmacao = await db.query (sql, values);
            const alt_id = confirmacao[0].insertId;

            
            return response.status(200).json({confirma: 'Sucesso', message: alt_id});
        }catch (error) {
                return response.status(500).json({confirma: 'Erro', message: error});
            }
        },
        
    };

