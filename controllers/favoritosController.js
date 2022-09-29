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
    async update(request, response) { 
        try {
                // parâmtros passados via corpo da requisição
            const {Status} = request.body;
                // parâmetro passado via url na chamada da api pelo front-end
            const { usu_id, jogo_id } = request.params; 
                // instrução sql para atualização
            const sql = 'UPDATE favoritos SET  Status = ?  WHERE usu_id = ? and jogo_id = ? ;';
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [Status];   
                // executa a instrução de atualização no banco de dados    
            const atualizacao = await db.query(sql, values);
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
   
};
