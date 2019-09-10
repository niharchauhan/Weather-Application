//Client side JS file is loaded

// fetch('http://puzzle.mead.io/puzzle').then((response) => {   //fetch json data from a url, parse it into javascript object
//     response.json().then((data) => {
//         console.log(data)
//     })
// })       

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e) => {          // EventListener - first arguement-event second-callback function 
    e.preventDefault()                              //prevents on auto refresh of browser
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {      //fetch allows to fetch data from the url
    response.json().then((data) => {
        if(data.error)
        {
            // console.log(data.error)
            messageOne.textContent = data.error;
        }
        else
        {
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})