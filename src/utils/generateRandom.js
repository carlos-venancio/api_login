function generateRandomUnit(){
    return Math.floor(Math.random() * 10);
}

function generateArrayRandomUnit(amount = 0, array = ''){
    return array.length === amount  ? array
                                    : generateArrayRandomUnit(amount, array + generateRandomUnit())
}

module.exports = {
    generateRandomUnit,
    generateArrayRandomUnit
}