function formatMoney(value){
    const formatedNumber = Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'})
                            .format(value)

    return formatedNumber
}

export {formatMoney}