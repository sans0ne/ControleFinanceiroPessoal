import React,{useState} from 'react'
import axios from '../../db/axios'
import Modal from '../Modal/Modal'
import './transaction.css'
import {formatMoney} from '../../helpers/FormatNumbers'

export default function Transaction({handleSubmitted,data}) {
    const {_id,day,category,description,value,type} = data

    const [isOpen,setIsOpen] = useState(false)

    const handleClick = async () =>{
        await axios.delete(`/${_id}`)
        handleSubmitted((prevState) => !prevState)
    }

    const handleClose = () =>{
        setIsOpen(false)
    }

    return (
        <>
            {isOpen && <Modal
                isOpen={isOpen}
                data={data}
                isEditing={true}
                onClose={handleClose}
                handleSubmitted={() =>handleSubmitted((prevState) => !prevState)}
            />}
            <div style={ type === '+'
                            ? {backgroundColor:'rgb(161,240,220)'}
                            :{backgroundColor:'rgb(240,161,168)'}}
                            className='transacion-grid'
            >
                <span className='strong'>{day}</span>
                <div className='transacion-flex'>
                    <span className='strong'>{category}</span>
                    <span>{description}</span>
                </div>
            <span id='money'>{formatMoney(value)}</span>
            <span><button 
                        onClick={()=> setIsOpen(true)}
                        ><i className='material-icons'>create</i></button></span>
            <span><button 
                        onClick={handleClick}>
                            <i className='material-icons'>delete</i></button></span>
            </div>
        </>
    )
}
