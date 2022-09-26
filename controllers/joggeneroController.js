// Paulo
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarJogGenero(request, response) {
        try{
            const sql = 'select genero_id, jogo_id FROM joggenero';
            const genero = await db.query(sql);
            return response.status(200).json ({confirma: 'sucesso', nResults: joggenero[0].leght, message: joggenero[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
    async create (request, response) {
        try {
            const {genero_id, jogo_id } = request.body;
            const sql = 'INSERT INTO joggenero (genero_id, jogo_id) VALUES (?, ?)';
            const values = [genero_id, jogo_id];
            const confirmacao = await db.query (sql, values);
            const joggenero = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'sucesso', message: joggenero});
        } catch (error) {
            return response.status(500).json({confirma: 'erro', message: error});
        }
    },

    async update(request, response) { 
        try {
                
            const { jogo_id } = request.body;
               
            const { genero_id } = request.params; 
              
            const sql = 'UPDATE joggenero SET jogo_id = ? WHERE genero_id = ?;';   
                
            const values = [jogo_id];   
              
            const atualizacao = await db.query(sql, values);
               
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};
