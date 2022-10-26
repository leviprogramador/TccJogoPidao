//levi
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarAlternativas(request, response) {
        try{
            const { page = 1, limit = 5} = request.query;
            const inicio = (page -1) * limit;

            const { perg_id = '%%' } = request.body
            const sql = 'SELECT a.alt_id, a.perg_id, a.alternativa, a.Correta, a.imagem FROM alternativas a INNER JOIN perguntas p ON a.perg_id = p.perg_id WHERE a.alt_id like ? AND a.perg_id like ? ORDER BY a.correta ASC LIMIT ?, ?;'
            
            const values = [perg_id, inicio, parseInt(limit) ];
            const alternativas = await db.query(sql, values);
            return response.status(200).json ({confirma: 'Sucesso', nResults: alternativas[0].length, message: alternativas[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
    async create (request, response) {
        try {
            const {perg_id, alternativa, correta, imagem} = request.body;
            const sql = 'INSERT INTO alternativas (perg_id, alternativa, correta, imagem) VALUES (?, ?, ?, ?)';
            const values = [perg_id, alternativa, correta, imagem];
            const confirmacao = await db.query (sql, values);
            const alt_id = confirmacao[0].insertId;

                                          
            return response.status(200).json({confirma: 'Sucesso', message: alt_id});
        }catch (error) {
                return response.status(500).json({confirma: 'Erro', message: error});
            }
        },
        async update (request, response) {
            try {
                const { perg_id, alternativa, correta, imagem} = request.body;
                const { alt_id } = request.params;
                const sql = 'UPDATE alternativas SET perg_id = ?, alternativa = ?, correta = ?, imagem= ? WHERE alt_id = ?;';
                const values = [perg_id, alternativa, correta, imagem];
                const atualizacao = await db.query (sql, values);
                return response.status(200).json({confirma: 'Sucesso', message: 'Dados Atualizados'});
    
            } catch (error){
                return response.status(500).json ({confirma: 'Erro', message: error});
            }
        },
        
    };

