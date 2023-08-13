console.log('hi mahmoud ')


const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const firstMessage = document.querySelector('.firstmessage')
const secondMessage = document.querySelector('.secondmessage')

firstMessage.textContent = "LOADING"
secondMessage.textContent = ""
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchInput.value
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            firstMessage.textContent = data.error
        }else {
            firstMessage.textContent = data.location
            secondMessage.textContent = data.forecast
        }
        
    })
})
})