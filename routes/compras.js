const express = require('express');
const router = express.Router();
const pagarme = require('../lib/pagarme.js');

/* POST criação de compra */
router.post('/', function(req, res, next) {

    // pagarme.compra(req.body)
    // res.send('OK')

    pagarme.compra(req.body).then((result) => {
        // console.log(result)
        // return false
        const paymentId = result.data.id
        const amount = result.data.amount


        pagarme.captura(paymentId, amount)
            .then((result)  => {
                if(result.data.status == 'paid'){
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
     }).catch(function(error)  {
            console.error(error)
         })
 });



/* GET status de compra */
router.get('/:compra_id/status', function(req, res, next) {
    pagarme.consulta(req.params.compra_id)
        .then((result) => {

            let message = {}

            switch (result.data.status) {
                case 'authorized':
                    message = {
                        'Status': 'Pagamento autorizado!'
                    }
                    break
                case 'paid':
                    message = {
                        'Status': 'Pagamento realizado!'
                    }
                    break
                case 'processing':
                    message = {
                        'Status': 'Pagamento pendente!'
                    }
                    break
                case 'analyzing':
                    message = {
                        'Status': 'Pagamento em análise!'
                    }
                    break
                default:
                    message = {
                        'Status': 'Pagamento falhou!'
                    }
            }
            res.send(message)
        }) .catch( function (error)  {
        console.error(error)
    })
});

module.exports = router;
