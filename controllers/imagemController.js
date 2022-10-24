// Lucas
const { json } = require("express");
const db = require("../database/connection");
const { create } = require("./favoritosController");

module.exports ={
    async listarImagem(request, response) {
        try{
            
            const { jogo_Id ='%%'} =request.body;
            
            const { page = 1, limit = 5 } =request.query;
            const inicio = (page -1) * limit;

            
            const sql = 'SELECT im.ImgJogo_id, im.jogo_Id, img, ImagemCapa  From imagem im INNER JOIN jogos j  ON im.jogo_id = j.jogo_id  WHERE im.ImgJogo_id LIKE ? AND im.jogo_Id Like ? AND im.img LIKE ? AND im.ImagemCapa LIKE  ?;'


            const values = [ jogo_Id, parseInt(limit)];
            const imagem = await db.query(sql);

            return response.status(200).json ({confirma: 'Sucesso', nResults: imagem[0].lenght, message: imagem[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },

    async create(request, response){
        try{
            const {ImgJogo_id, jogo_id, imagem, ImagemCapa} =request.body

            const sql = 'INSERT INTO imagem (ImgJogo_id, jogo_id, imagem, ImagemCapa) VALUES (?,?, ?)';

            const values = [ImgJogo_id, jogo_id, imagem, ImagemCapa];

            const confirmacao = await db.query(sql,values);

            const imagem_tabela = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: imagem_tabela})
        } catch (error) {
            return response.status(500).json({confirma: 'Erro, message: error'})
        }
    },

    async update(request, response) { 
        try {
                // parâmtros passados via corpo da requisição
            const {ImgJogo_id, imagem, ImagemCapa } = request.body;
                // parâmetro passado via url na chamada da api pelo front-end
            const { jogo_id } = request.params; 
                // instrução sql para atualização
            const sql = 'UPDATE imagem SET ImgJogo_id = ? imagem = ?, ImagemCapa = ? WHERE jogo_id = ? ;';  
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [ImgJogo_id,imagem, ImagemCapa];   
                // executa a instrução de atualização no banco de dados    
            const atualizacao = await db.query(sql, values);
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};

