import React, { useEffect, useState } from 'react';
import './app.css'
import M from 'materialize-css'
import { PERIODS } from '../src/helpers/Periods'

import DateFilter from './components/DateFilter/DateFilter'
import Summary from './components/Summary/Summary';
import CreateAndSearch from './components/CreateAndSearch/CreateAndSearch';
import Transactions from './components/Transactions/Transactions';
import Preloader from './components/Preloader/Preloader';
import Modal from './components/Modal/Modal'



export default function App() {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [currentPeriod, setCurrentPeriod] = useState('2020-07')
  const [isEnabled, setIsEnabled] = useState({ left: false, right: false })
  const [isLoading, setIsLoading] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [summaryObject, setSummaryObject] = useState({ count: 0, incomes: 0, outcomes: 0, balance: 0 })

  useEffect(() => {

    (async () => {
      const url = `http://localhost:3001/api/transaction?period=${currentPeriod}`
      const resource = await fetch(url)
      const json = await resource.json()
      
      json.transactions.sort((a, b) => {
        return a.day - b.day
      })
      
      setTransactions(json.transactions)
      setFilteredTransactions(json.transactions)
      setIsLoading(false)
    })()

    const index = PERIODS.findIndex(period => period === currentPeriod)

    if (index === 0) {
      setIsEnabled({
        left: true,
        right: false
      })
    } else if (index === PERIODS.length - 1) {
      setIsEnabled({
        left: false,
        right: true
      })
    } else {
      setIsEnabled({ left: false, right: false })
    }
  }, [currentPeriod,isSubmitted])

  useEffect(() => {

    const receitas = filteredTransactions.filter(transaction => transaction.type === '+')
      .reduce((acc, cur) => { return acc + cur.value }, 0)

    const despesas = filteredTransactions.filter(transaction => transaction.type === '-')
      .reduce((acc, cur) => { return acc + cur.value }, 0)

    const saldo = receitas - despesas

    setSummaryObject({ count: filteredTransactions.length, incomes: receitas, outcomes: despesas, balance: saldo })

  }, [filteredTransactions])

  useEffect(() => {
    M.AutoInit()
  }, [])

  const handlePeriodChange = (newPeriod) => {
    setIsLoading(true)
    setCurrentPeriod(newPeriod)
  }

  const handleChangeInput = (value) => {

    if(value !== ''){
      setIsDisabled(true)
    } else{
      setIsDisabled(false)
    }
    
    let newArrayTransactions = transactions

    newArrayTransactions = newArrayTransactions.filter(transaction => {
      return transaction.description.indexOf(value) !== -1
    })

    setFilteredTransactions(newArrayTransactions)

  }

  const handleClick = () =>{
    setIsOpen(true)
  }
  
  const handleClose = () =>{
    setIsOpen(false)
  }

  const handleChangeSubmitted  = (value) =>{
    setIsSubmitted(value)
  }

  return (
    <div className="container center">
      <h1><strong>Bootcamp Full Stack - Desafio Final</strong></h1>
      <h2>Controle Financeiro Pessoal</h2>
      {isOpen && <Modal 
                      handleSubmitted={handleChangeSubmitted}
                      onClose={handleClose} 
                      isOpen={isOpen}
                      isEditing={false}
                  />}
      
      <DateFilter
        value={currentPeriod}
        onAlterar={handlePeriodChange}
        Periods={PERIODS}
        isEnabled={isEnabled}
      />
      <Summary summary={summaryObject} />
      <CreateAndSearch
        isDisabled={isDisabled} 
        onHandleClick={handleClick} 
        onHandleInput={handleChangeInput}
      />
      {isLoading ? <Preloader /> :
        <div>
          <Transactions 
            handleSubmitted={handleChangeSubmitted}
            data={filteredTransactions}    
        />
        </div>      
      }
    </div>
  )
}
