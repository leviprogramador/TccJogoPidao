const express= require('express');
const app = express ();
//const porta = process.env.PORT 3333;
const porta = 3333;

// define a porta do servidor - ou utiliza a oferecida pelo serviço de hospedagem
app.listen(porta, () => {
    console.log ('Servidor iniciado na porta: ' + porta);
}); 