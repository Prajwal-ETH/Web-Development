
const count = document.querySelector('.count')
const decrementBtn = document.querySelector('.decrement')
const incrementBtn = document.querySelector('.increment')
const changeBy = document.querySelector('#changeBy')
const resetBtn = document.querySelector('.reset-btn')

decrementBtn.addEventListener('click', () => {
    const countVal = parseInt(count.innerText)
    const changeByValue = parseInt(changeBy.value)
    count.innerText = countVal - changeByValue
})

incrementBtn.addEventListener('click', () => {
    const countVal = parseInt(count.innerText)
    const changeByValue = parseInt(changeBy.value)
    count.innerText = countVal + changeByValue
})

resetBtn.addEventListener('click', () => {
    count.innerText = '0'
})
