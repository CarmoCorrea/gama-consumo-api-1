const express = require('express');
const router = express.Router();
var cielo = require('../lib/cielo')

const cielo = require('../lib/cielo.js');

/* POST criação de compra */
router.post('/', function(req, res, next) {

    //res.send(cielo.compra(req.body));

  cielo.compra(req.body).then((result) => {
    const paymentId = result.Payment.PaymentId
    cielo.captura(paymentId)
        .then((result)  => {
          if(result.Status == 2){
            res.status(201).send ({
              "Status": "Sucesso",
              "Message": "Compra realizada com sucesso",
              "CompraId": paymentId
            })
          }
          else{
            res.status(402).send({
                "Status": "Falhou",
                "Message": "Compra não realizada. Problema na cobrança do cartão",
            })
          }
        })
        .catch((err) => {
            console.error(err)
        })
  })
});

/* GET status de compra */
router.get('/:compra_id/status', function(req, res, next) {
  //res.send('Rodando Status...');
    cielo.consulta(req.params.compra_id)
        .then((result) => {
            let message = {}
            switch (result.Payment.Status) {
                case 1:
                    message = {
                        'Status': 'Pagamento autorizado!'
                    }
                    break
                case 2:
                    message = {
                        'Status': 'Pagamento realizado!'
                    }
                    break
                case 12:
                    message = {
                        'Status': 'Pagamento pendente!'
                    }
                    break
                default:
                    message = {
                        'Status': 'Pagamento falhou!'
                    }
            }
            res.send(message)
        })
});

module.exports = router;
