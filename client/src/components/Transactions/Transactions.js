import React from 'react'
import Transaction from '../Transaction/Transaction'


export default function Transactions({handleSubmitted,data}) {
    
    let previousDay = '1'

    return (
        <div>
            {data.map(data =>{
                if(previousDay !== data.day){
                    previousDay = data.day
                    return (
                        <div style={{marginTop:'20px'}} key={data._id}>
                            <Transaction 
                                handleSubmitted={handleSubmitted}
                                data={data}
                            />
                        </div>
                    )
                                 
                }
                return (
                    <div key={data._id}>
                        <Transaction
                         handleSubmitted={handleSubmitted}   
                         data={data}/>
                    </div>
                )
            })}
        </div>
    )
}
