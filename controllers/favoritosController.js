const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarFavoritos(request, response) {
        try{
            return response.status(200).json ({confirma: 'Favoritos'});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
};
