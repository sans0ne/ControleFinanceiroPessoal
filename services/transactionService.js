const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');
const { update } = require('../models/TransactionModel');

module.exports = {
    async allTransactions(req,res){
        const {period} = req.query
        let results = {
            count: null,
            incomes:null,
            outcomes:null,
            balance:null,
            transactions:[]

        }

        if(!period){
            return res.status(500).send(`Favor informar um periodo`)
        }

        try {
            let data  = await TransactionModel.find({yearMonth:period})
            data.map(transaction =>{
                results.transactions.push(transaction)
                if(transaction.type === "-"){
                    results.outcomes += transaction.value
                } else {
                    results.incomes += transaction.value
                }
                results.balance = results.incomes - results.outcomes
                results.count++
            })
            
            return res.json(results)
        } catch (error) {
            return res.status(500).send(`Não foi possível buscar: ${error}`)
        }
        
    },
    async create(req,res){
        try {
            const data = new TransactionModel(req.body)
            await data.save()
            return res.json(data)
        } catch (error) {
            return res.status(500).send(`Não foi possível criar o registro: ${error}`)
        }
    },
    async delete(req,res){
        const id = req.params.id
        
        try {
            await TransactionModel.findOneAndDelete({_id:id})
            return res.send({message: `Registro deletado com sucesso: ${id}`})
        } catch (error) {
            return res.status(500).send(`Não foi possível criar o registro: ${error}`)
        }
    },
    async update(req,res){
        const id = req.params.id
        
        try {
            const data = await TransactionModel.findByIdAndUpdate({_id:id},req.body,{new:true})
            return res.json(data)
        } catch (error) {
            return res.status(500).send(`Não foi possível criar o registro: ${error}`)
        }
    }
}
