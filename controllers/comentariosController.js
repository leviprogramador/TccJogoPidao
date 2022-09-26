//levi
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarComentarios(request, response) {
        try{
            const sql = 'SELECT coment_id, usu_id, jogo_id, comentariofeito, ContadorLIke, Resposta FROM comentarios;'
            const jogos = await db.query(sql);

            return response.status(200).json ({confirma: 'Sucesso', nResults: comentarios[0].length, message: comentarios[0]});
           
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
    async create (request, response) {
        try {
            const {usu_id, jogo_id, comentariofeito, ContadorLIke, Resposta} = request.body;
            const sql = 'INSERT INTO comentarios (usu_id, jogo_id, comentariofeito, ContadorLIke, Resposta) VALUES (?, ?, ?, ?, ?)';
            const values = [usu_id, jogo_id, comentariofeito, ContadorLIke, Resposta];
            const confirmacao = await db.query (sql, values);
            const coment_id = confirmacao[0].insertId;

            
            return response.status(200).json({confirma: 'Sucesso', message: coment_id});
        }catch (error) {
                return response.status(500).json({confirma: 'Erro', message: error});
            }
        },
        async update (request, response) {
            try {
                const { usu_id, jogo_id, comentariofeito, ContadorLIke, Resposta} = request.body;
                const { coment_id } = request.params;
                const sql = 'UPDATE comentarios SET usu_id = ?, jogo_id = ?, comentariofeito = ?, ContadorLIke= ?, Resposta= ? WHERE conent_id = ?;';
                const values = [usu_id, jogo_id, comentariofeito,ContadorLIke, Resposta];
                const atualizacao = await db.query (sql, values);
                return response.status(200).json({confirma: 'Sucesso', message: 'Dados Atualizados'});
    
            } catch (error){
                return response.status(500).json ({confirma: 'Erro', message: error});
            }
        },
    };


