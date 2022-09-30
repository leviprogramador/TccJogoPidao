//Vi
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarPlataforma(request, response) {
        try{
            const sql = 'SELECT plataforma_id, NomePlataforma, Empresa FROM plataforma;';  
            const plataforma = await db.query(sql); 
            return response.status(200).json({confirma: 'Sucesso', nResults: plataforma[0].length, message: plataforma[0]});  
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    }, 
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { NomePlataforma, Empresa } = request.body;  
                // instrução sql para inserção
            const sql = 'INSERT INTO plataforma (plataforma_id, NomePlataforma, Empresa) VALUES (?, ? )'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [NomePlataforma, Empresa]; 
                // executa a instrução de inserção no banco de dados       
            const confirmacao = await db.query(sql, values);
                // Exibe o id do registro inserido
            const plataforma_id = confirmacao[0].insertId; 
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: plataforma_id});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    }, 


};