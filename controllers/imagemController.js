// Lucas
const { json } = require("express");
const db = require("../database/connection");
const { create } = require("./favoritosController");

module.exports ={
    async listarImagem(request, response) {
        try{
            const sql = 'SELECT ImgJogo_id, jogo_id, imagem, ImagemCapa FROM imagem';
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

            const imagem = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: imagem})
        } catch (error) {
            return response.status(500).json({confirma: 'Erro, message: error'})
        }
    }
};

