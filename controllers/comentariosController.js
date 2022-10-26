//levi
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarComentarios(request, response) {
        try{
            const {page = 0, limit = 5} = request.query;
            const inicio = (page -1) * limit;
            const {jogo_id = '%%'} = request.body;
            const {usu_id = '%%'} = request.body;
            const {coment_id = '%%'} = request.body; 
            const {comentariofeito = '%%'} = request.body;
            
            const sql = 'SELECT c.coment_id, c.usu_id, c.jogo_id, c.comentariofeito, c.ContadorLIke, c.Resposta FROM comentarios c INNER JOIN usuario u ON c.usu_id = u.usu_id INNER JOIN jogos j ON c.jogo_id = j.jogo_id WHERE c.coment_id like ? AND u.usu_id like  ? AND j.jogo_id like ? AND c.comentariofeito like ? order by c.coment_id ASC';
        
           


            const values = [coment_id, usu_id, jogo_id, comentariofeito, inicio, parseInt(limit) ];
            const comentarios = await db.query(sql, values);

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
                const sql = 'UPDATE comentarios SET usu_id = ?, jogo_id = ?, comentariofeito = ?, ContadorLIke= ?, Resposta= ? WHERE coment_id = ?;';
                const values = [usu_id, jogo_id, comentariofeito,ContadorLIke, Resposta, coment_id];
                const atualizacao = await db.query (sql, values);
                return response.status(200).json({confirma: 'Sucesso', message: 'Dados Atualizados'});
    
            } catch (error){
                return response.status(500).json ({confirma: 'Erro', message: error});
            }
        },

    };


