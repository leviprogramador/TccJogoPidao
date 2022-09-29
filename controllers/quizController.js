//Vi
const { json } = require("express");
const db = require("../database/connection");


module.exports ={
    async listarQuiz(request, response) {
        try{
            const sql = 'SELECT quiz_id, nomequiz, jogo_id, usu_id FROM quiz;';  
            const quiz = await db.query(sql); 
            return response.status(200).json ({confirma: 'Quiz', nResults: quiz[0].length, message: quiz[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },

 async create (request, response) {
    try {                   
            // parâmtros passados via corpo da requisição
        const { nomequiz, jogo_id, usu_id } = request.body;  
            // instrução sql para inserção
        const sql = 'INSERT INTO quiz (nomequiz, jogo_id, usu_id) VALUES (?, ?, ?)'; 
            // definição de array com os parâmetros que receberam os valores do front-end
        const values = [nomequiz, jogo_id, usu_id]; 
            // executa a instrução de inserção no banco de dados       
        const confirmacao = await db.query(sql, values);
            // Exibe o id do registro inserido
        const quiz_id = confirmacao[0].insertId; 
            // Mensagem de retorno no formato JSON
        return response.status(200).json({confirma: 'Sucesso', message: quiz_id});
    } catch (error) { 
        return response.status(500).json({confirma: 'Erro', message: error});
    } 
}, 

async update(request, response) {​​​​​​​ 
try {​​​​​​​
        // parâmtros passados via corpo da requisição
        const {nomequiz, jogo_id, usu_id} = request.body; 
        // parâmetro passado via url na chamada da api pelo front-end
        const {quiz_id}​​​​​​​ = request.params; 
        // instrução sql para atualização
        const sql = 'UPDATE quiz SET nomequiz = ?, jogo_id = ?, usu_id = ? WHERE quiz_id = ?;';  
        // definição de array com os parâmetros que receberam os valores do front-end
        const values = [nomequiz, jogo_id, usu_id];   
        // executa a instrução de atualização no banco de dados    
        const atualizacao = awaitdb.query(sql, values);
        // Mensagem de retorno no formato JSON
        return response.status(200).json({​​​​​​​confirma:'Sucesso', message:'Dados atualizados'}​​​​​​​);            
        }​​​​​​​ catch (error) {​​​​​​​ 
        return response.status(500).json({​​​​​​​confirma:'Erro', message:error}​​​​​​​);
    }​​ 
},​​
};