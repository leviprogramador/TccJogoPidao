// Lucas
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarFavoritos(request, response) {
        try{
            const {usu_Id ='%%'} =request.body;
            const { jogo_Id ='%%'} =request.body;
            
          

            
            const sql = 'SELECT jp.plataforma_Id, jp.jogo_Id, Data_Jogo From jogoplataforma jp INNER JOIN plataforma pl ON jp.plataforma_Id = pl.plataforma_Id INNER JOIN jogos j ON jp.jogo_Id = j.jogo_Id WHERE jp.plataforma_Id LIKE ? AND jp.jogo_Id Like ? ;'


            const values = [ jogo_Id, usu_Id];
            const favoritos = await db.query(sql,values);

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
