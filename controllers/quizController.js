const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarQuiz(request, response) {
        try{
            return response.status(200).json ({confirma: 'Quiz'});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
};
