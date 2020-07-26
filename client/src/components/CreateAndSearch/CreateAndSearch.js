import React from 'react'
import './styles.scss'

export default function CreateAndSearch({isDisabled,onHandleClick,onHandleInput}) {

    const handleInput = (e) =>{
        onHandleInput(e.target.value)
    }

    const handleClick = () =>{
        onHandleClick()
    }

    return (
        <div className='main-createAndSearch'>
            <button disabled={isDisabled} onClick={handleClick} className='waves-effect waves-light btn'>
                <i className="material-icons left">add</i>
                NOVO LANÇAMENTO
            </button>
            <div className="input-field">
                <input id="filtro" type="text" onChange={handleInput}/>
                <label hmtlfor="filtro">Filtro</label>
            </div>
        </div>
    )
}
