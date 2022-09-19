//Levi
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarUsuario(request, response) {
        try{
            const sql = 'select usu_id, Nome, email, senha, data_nasc, TipoUsu, Pontuacao, QtdQuiz FROM usuario;'
            const usuario = await db.query(sql)
            return response.status(200).json ({confirma: 'Sucesso', nResults: usuario[0].length, message: usuario[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
    async create (request, response) {
        try {
            const {Nome, email, senha, data_nasc, TipoUsu, Pontuacao, QtdQuiz} = request.body;
            const sql = 'INSERT INTO usuario (Nome, email, senha, data_nasc, TipoUsu, Pontuacao, QtdQuiz) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [Nome, email, senha, data_nasc, TipoUsu, Pontuacao, QtdQuiz];
            const confirmacao = await db.query (sql, values);
            const usu_id = confirmacao[0].insertId;

            
            return response.status(200).json({confirma: 'Sucesso', message: usu_id});
        }catch (error) {
                return response.status(500).json({confirma: 'Erro', message: error});
            }
        },
    };