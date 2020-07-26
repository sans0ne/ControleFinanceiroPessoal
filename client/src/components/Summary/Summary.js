import React from 'react'
import {formatMoney} from '../../helpers/FormatNumbers'
import './styles.css'

export default function Summary({summary}) {

    const {count,incomes,outcomes,balance} = summary
    return (
        <div className='main'>
            <span>{`Lançamentos: ${count}`}</span>
            <div>
                <span>Receitas: </span>
                <span id='incomes'>{formatMoney(incomes)}</span>
            </div>
            <div>
                <span>Despesas: </span>
                <span id='outcomes'>{formatMoney(outcomes)}</span>
            </div>
            {balance < 0 ? 
            <div>
                <span>Saldo: </span>
                <span id='balance' style={{color:'red'}}>{formatMoney(balance)}</span>
            </div>
                :
            <div>
                <span>Saldo: </span>
                <span id='balance' style={{color:'#32CD32'}}>{formatMoney(balance)}</span>
            </div>    
                }
        </div>
    )
}
