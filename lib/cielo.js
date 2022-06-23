const fetch = require('node-fetch')
//import fetch from 'node-fetch';

class Cielo {
    static compra(params) {
        fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'MerchantId': '72d1ac85-6944-4972-9a03-7da21351cd9f',
                'MerchantKey': 'VWUWKMLUZLFDPUFLNTOLWLZKTZZXGYAXYRDZBOQG',
            },
        })
        .then(res => res.json())
        //.then(json => console.log(json))
    }
    static captura(paymentId){

        return fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'MerchantId': '72d1ac85-6944-4972-9a03-7da21351cd9f',
                'MerchantKey': 'VWUWKMLUZLFDPUFLNTOLWLZKTZZXGYAXYRDZBOQG',
            },

    })
            .then(res => res.json())
}
module.exports = Cielo