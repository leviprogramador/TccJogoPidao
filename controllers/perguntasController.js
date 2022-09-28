//Vi
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarPerguntas(request, response) {
        try{
            const sql = 'perg_id, Pergunta, quiz_Id, Imagem;'
            const listarPerguntas = await db.query(sql);

            return response.status(200).json ({confirma: 'Sucesso', nResults: listarPerguntas[0].length, message: listarPerguntas[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
    async create (request, response) {
        try {
    const {quiz_Id, Pergunta, Imagem} = request.body;
    const sql = 'INSERT INTO perguntas(quiz_Id, Pergunta, Imagem) VALUES ( ?, ?, ?)';
    const values = [quiz_Id, Pergunta, Imagem];
    const confirmacao = await db.query (sql, values);
    const perguntas = confirmacao[0].insertId;

    
    return response.status(200).json({confirma: 'Sucesso', message: perguntas});
        } catch (error) {
            return response.status (500).json({Confirma: 'Erro', message: error});
        }
    },

    async update(request, response) { 
        try {
                // parâmtros passados via corpo da requisição
            const {quiz_Id, Pergunta, Imagem} = request.body;
                // parâmetro passado via url na chamada da api pelo front-end
            const { perg_Id } = request.params; 
                // instrução sql para atualização
            const sql = 'UPDATE perguntas SET quiz_Id = ?, Pergunta = ?, Imagem = ? WHERE perg_Id = ? ;';  
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [quiz_Id, Pergunta, Imagem];   
                // executa a instrução de atualização no banco de dados    
            const atualizacao = await db.query(sql, values);
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};
