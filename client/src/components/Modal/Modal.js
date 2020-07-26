import React,{useState,useEffect} from 'react'
import Modal from 'react-modal'
import axios from '../../db/axios'
import './modal.css'

Modal.setAppElement('#root')

export default function ModalTransaction({data,isEditing,handleSubmitted,onClose,isOpen}) {
    
    const newTransaction = {
        description:'',
        value:'',
        category:'',
        year:'',
        month:'',
        day:'',
        yearMonth:'',
        yearMonthDay:'',
        type:''
    }
    
    const [transaction,setTransaction] = useState(newTransaction)
    const [isEnable,setIsEnabled] = useState(true)
    const [updatedTransaction,setUpatedTransaction] = useState(data)    

    useEffect(() => {
        const keys = Object.keys(transaction)

            let obj = []

            for(let key of keys){
                if(transaction[key] === '') obj.push(key)
            }

            if(obj.length === 0) {
                setIsEnabled(false)
            } else{
                setIsEnabled(true)
            }
        
    }, [transaction])

    useEffect(() => {

        if(!updatedTransaction) return
        
        const keys = Object.keys(updatedTransaction)

            let obj = []

            for(let key of keys){
                if(updatedTransaction[key] === '') obj.push(key)
            }

            if(obj.length === 0) {
                setIsEnabled(false)
            } else{
                setIsEnabled(true)
            }
        
    }, [updatedTransaction])
    
    if(isEditing === false){

    
        const handleInputChange = (event) =>{
            let month = ''
            let day = ''    
            if(event.target.name === 'yearMonthDay'){
                const data = (event.target.value).split('-')

                if(data[1].startsWith('0')){
                    month = data[1].slice(1)        
                }else{
                    month = data[1]
                }

                if(data[2].startsWith('0')){
                    day = data[2].slice(1)        
                }else{
                    day = data[1]
                }
                
                setTransaction({
                    ...transaction,
                    year:data[0],
                    month,
                    day,
                    yearMonth:`${data[0]}-${data[1]}`,
                    yearMonthDay:`${data[0]}-${data[1]}-${data[2]}`
                })
            } else {
                const {name,value} = event.target
                setTransaction({
                    ...transaction,
                    [name]:value
                })
            }

            
        }

        const handleSubmit = async (event) =>{
            event.preventDefault()

            await axios.post('/',transaction)

            handleSubmitted((prevState) => !prevState)

            onClose()
        }

        return (
            <div>
                <Modal 
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    closeTimeoutMS={500}
                    style={customStyle}
                >
                    <div className='header'>
                        <p>Inclusão de Lançamento</p>
                        <button 
                            className="waves-effect waves-light red btn"
                            onClick={onClose}                   
                        >X
                        </button>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-container">
                                <div className="input-radio">
                                    <label htmlFor='despesa'>
                                        <input 
                                            id='despesa' 
                                            value='-'
                                            onChange={handleInputChange} 
                                            name="type" 
                                            type="radio"
                                        />
                                        <span id='despesa'>Despesa</span>
                                    </label>
                                    <label htmlFor='receita'>
                                        <input 
                                            id='receita' 
                                            value='+'
                                            onChange={handleInputChange}
                                            name="type"
                                            type="radio"
                                        />
                                        <span id='receita'>Receita</span>
                                    </label>
                                </div>
                                <div className="input-field">
                                    <input 
                                        id="description" 
                                        type="text"
                                        name='description'
                                        value={transaction.description}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="description">Descrição</label>
                                </div>
                                <div className="input-field">
                                    <input 
                                        id="category" 
                                        type="text"
                                        name='category'
                                        value={transaction.category}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="category">Categoria</label>
                                </div>
                                <div className="number-date">
                                    <div className="input-field">
                                        <input 
                                            id="value" 
                                            min='0'
                                            type="number"
                                            name='value'
                                            value={transaction.value}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="value">Valor</label>
                                    </div>
                                    <div className="input-field">
                                        <input 
                                            id="date" 
                                            type="date"
                                            name='yearMonthDay'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button 
                                disabled={isEnable}
                                className="waves-effect waves-light btn" 
                                type="submit"
                            >Salvar</button>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    } else{
        
    const {_id} = data

    const handleInputChange = (event) =>{
        let month = ''
        let day = ''    
        if(event.target.name === 'yearMonthDay'){
            const data = (event.target.value).split('-')

            if(data[1].startsWith('0')){
                month = data[1].slice(1)        
            }else{
                month = data[1]
            }

            if(data[2].startsWith('0')){
                day = data[2].slice(1)        
            }else{
                day = data[1]
            }
            
            setUpatedTransaction({
                ...updatedTransaction,
                year:data[0],
                month,
                day,
                yearMonth:`${data[0]}-${data[1]}`,
                yearMonthDay:`${data[0]}-${data[1]}-${data[2]}`
            })
        } else {
            const {name,value} = event.target
            setUpatedTransaction({
                ...updatedTransaction,
                [name]:value
            })
        }
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()

        await axios.put(`/${_id}`,updatedTransaction)

        handleSubmitted((prevState) => !prevState)

        onClose()
    }
    return (
        <div>
            <Modal 
                isOpen={isOpen}
                onRequestClose={onClose}
                closeTimeoutMS={500}
                style={customStyle}
            >
                <div className='header'>
                    <p>Edição de Lançamento</p>
                    <button 
                        className="waves-effect waves-light red btn"
                        onClick={onClose}                   
                    >X
                    </button>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-container">
                            <div className="input-radio">
                                <label htmlFor='despesa'>
                                    <input 
                                        disabled={true}
                                        id='despesa' 
                                        checked={updatedTransaction.type === '-'}
                                        value='-'
                                        onChange={handleInputChange} 
                                        name="type" 
                                        type="radio"
                                        />
                                    <span style={{color:'#D3D3D3'}} id='despesa'>Despesa</span>
                                </label>
                                <label htmlFor='receita'>
                                    <input
                                        disabled={true}
                                        checked={updatedTransaction.type === '+'}
                                        id='receita' 
                                        value='+'
                                        onChange={handleInputChange}
                                        name="type"
                                        type="radio"
                                    />
                                    <span style={{color:'#D3D3D3'}} id='receita'>Receita</span>
                                </label>
                            </div>
                            <div className="input-field">
                                <input 
                                    id="description" 
                                    type="text"
                                    name='description'
                                    value={updatedTransaction.description}
                                    onChange={handleInputChange}
                                />
                                <label className='active' htmlFor="description">Descrição</label>
                            </div>
                            <div className="input-field">
                                <input 
                                    id="category" 
                                    type="text"
                                    name='category'
                                    value={updatedTransaction.category}
                                    onChange={handleInputChange}
                                />
                                <label className='active' htmlFor="category">Categoria</label>
                            </div>
                            <div className="number-date">
                                <div className="input-field">
                                    <input 
                                        id="value" 
                                        min='0'
                                        type="number"
                                        name='value'
                                        value={updatedTransaction.value}
                                        onChange={handleInputChange}
                                    />
                                    <label className='active' htmlFor="value">Valor</label>
                                </div>
                                <div className="input-field">
                                    <input 
                                        id="date" 
                                        type="date"
                                        name='yearMonthDay'
                                        value={updatedTransaction.yearMonthDay}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <button 
                            disabled={isEnable}
                            className="waves-effect waves-light btn" 
                            type="submit"
                        >Salvar</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
}
const customStyle = {
    content:{
        position:'absolute',
        top:'120px',
        margin:'0 auto',
        width:'40%'
    }
}
