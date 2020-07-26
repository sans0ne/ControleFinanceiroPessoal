import React from 'react'
import ArrowButton from '../ArrowButtons/ArrowButton'
import './style.css'

export default function DateFilter({isEnabled, value, onAlterar, Periods }) {

    const handleChange = (e) => {
        onAlterar(e.target.value)
    }

    const handleClickButton = (newPeriod) =>{
        onAlterar(newPeriod)
    }

    return (
        <div className='date-filter'>
            <ArrowButton type='left' isEnabled={isEnabled} value={value} Periods={Periods} onClickButton={handleClickButton}/>
            <select className='browser-default' value={value} onChange={handleChange}>
            {Periods.map(period =>{
                return(
                    <option key={period} value={period}>{period}</option>
                    )
                })}
            </select>
            <ArrowButton type='right'isEnabled={isEnabled} value={value} Periods={Periods} onClickButton={handleClickButton}/>
        </div>
    )
}
