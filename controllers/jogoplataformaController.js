// Lucas
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarJogoPlataforma(request, response) {
        try{
            const sql = 'plataforma_Id, jogo_Id, Data_Jogo,;'
            const jogoplataforma = await db.query(sql);

            return response.status(200).json ({confirma: 'Sucesso', nResults: jogoplataforma[0].length, message: jogoplataforma[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
    async create (request, response) {
        try {
            const {plataforma_Id, jogos_Id, Data_Jogo} = request.body;
            const sql = 'INSERT INTO jogoplataforma(plataforma_id, jogo_Id, Data_Jogo) VALUES ( ?, ?, ?)';
            const values = [plataforma_Id, jogos_Id, Data_Jogo];
            const confirmacao = await db.query (sql, values);
            const jogoplataforma = confirmacao[0].insertId;

            
            return response.status(200).json({confirma: 'Sucesso', message: jogoplataforma});
        } catch (error) {
            return response.status (500).json({Confirma: 'Erro', message: error});
        }
    },

    async update(request, response) { 
        try {
                // parâmtros passados via corpo da requisição
            const {Data_Jogo, plataforma_Id} = request.body;
                // parâmetro passado via url na chamada da api pelo front-end
            const { jogo_id} = request.params; 
                // instrução sql para atualização
            const sql = 'UPDATE jogoplataforma SET Data_jogo = ?, plataforma_Id = ? WHERE jogo_Id = ? ;';  
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [Data_Jogo, plataforma_Id];   
                // executa a instrução de atualização no banco de dados    
            const atualizacao = await db.query(sql, values);
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};
