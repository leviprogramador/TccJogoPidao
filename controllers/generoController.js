// Paulo
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarGenero(request, response) {
        try{
            const sql = 'select genero_id, Nome_Genero FROM genero';
            const genero = await db.query(sql);
            return response.status(200).json ({confirma: 'Sucesso', nResults: genero[0].leght, message: genero[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
    async create (request, response) {
        try {
            const {Nome_Genero} = request.body;
            const sql = 'INSERT INTO genero (Nome_Genero) VALUES (?)';
            const values = [Nome_Genero];
            const confirmacao = await db.query (sql, values);
            const genero_id = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'sucesso', message: genero_id});
        } catch (error) {
            return response.status(500).json({confirma: 'erro', message: error});
        }
    },

    async update(request, response) { 
        try {
                
            const { Nome_Genero } = request.body;
               
            const { Genero_id } = request.params; 
              
            const sql = 'UPDATE genero SET Nome_Genero = ? WHERE Genero_id = ?;';   
                
            const values = [Nome_Genero, Genero_id];   
              
            const atualizacao = await db.query(sql, values);
               
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};

