console.log('Client side js file is loaded')

fetch('http://localhost:8000/weather?address=!').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.summary)
        }
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    messageOne.textContent = 'Loading..';
    messageTwo.textContent = '';

    const location = search.value;
    const url = 'http://localhost:8000/weather?address='+location;
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})