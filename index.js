const form = document.querySelector('form')
form.addEventListener('click', function(){
  console.log('form clicked')
})

const input = document.querySelector('#add_comment')
input.addEventListener('click', function(event){
  console.log('input button clicked')
  event.stopPropagation()
})

document.querySelector('form').addEventListener('submit', function(){
  event.preventDefault()
})
