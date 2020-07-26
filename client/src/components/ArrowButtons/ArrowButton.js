import React from 'react'

export default function ArrowButton({isEnabled,Periods,type,onClickButton,value}) {
    
    const {left,right} = isEnabled
    
    const handleClick  = () =>{
        const index = Periods.findIndex(period => period === value)
        
        if(type === 'left')  onClickButton(Periods[index-1])
    
        if(type === 'right') onClickButton(Periods[index+1])
    }
    return (
        <button style={{zIndex:'0'}}
        className="waves-effect waves-light btn"
        onClick={handleClick}
        disabled={type === 'left' ? left : right}
        >
        {type === 'left' ? 
            <i className="material-icons">arrow_left</i>
            :
            <i className="material-icons">arrow_right</i>}
        </button>
    )
}
