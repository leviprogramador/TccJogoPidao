// Paulo
const { json } = require("express");
const db = require("../database/connection");

module.exports ={
    async listarTblLike(request, response) {
        try{
            const sql = 'select usu_id, coment_id FROM tbllike';
            const tbllike = await db.query(sql);
            return response.status(200).json ({confirma: 'TblLike', nResults: tbllike[0].leght, message: tbllike[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});

        }

    },
    async create (request, response) {
        try {
            const {usu_id, coment_id} = request.body;
            const sql = 'INSERT INTO tbllike (usu_id, coment_id) VALUES (?, ?)';
            const values = [usu_id, coment_id];
            const confirmacao = await db.query (sql, values);
            const tbllike = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'sucesso', message: tbllike});
        } catch (error) {
            return response.status(500).json({confirma: 'erro', message: error});
        }
    },

    async update(request, response) { 
        try {
                
            const { comen_id } = request.body;
               
            const { usu_id } = request.params; 
              
            const sql = 'UPDATE tbllike SET coment_id = ? WHERE usu_id = ?;';   
                
            const values = [usu_id, comen_id];   
              
            const atualizacao = await db.query(sql, values);
               
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },

    async delete(request, response) { 
        try {
               
            const { usu_id } = request.params;    
               
            const sql = 'DELETE FROM tbllike WHERE usu_id = ?'; 
                
            const values = [usu_id];
                   
            await db.query(sql, values);  
               
            return response.status(200).json({confirma: 'Sucesso', message:'tbllike com id ' + mes_id + ' excluída com sucesso'}); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
};
