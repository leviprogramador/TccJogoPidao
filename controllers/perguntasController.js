//Vi
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarPerguntas(request, response) {
        try{
            const sql = 'SELECT perg_id, Pergunta, quiz_id, Imagem FROM perguntas;';  
            const perguntas = await db.query(sql); 
            return response.status(200).json({confirma: 'Sucesso', nResults: perguntas[0].length, message: perguntas[0]});  
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { Pergunta, quiz_id, Imagem} = request.body;  
                // instrução sql para inserção
            const sql = 'INSERT INTO perguntas (Pergunta, quiz_Id, Imagem) VALUES (?, ?, ?)'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [Pergunta, quiz_id, Imagem]; 
                // executa a instrução de inserção no banco de dados       
            const confirmacao = await db.query(sql, values);
                // Exibe o id do registro inserido
            const perg_id = confirmacao[0].insertId; 
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: perg_id});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    },

         
};