console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const imageContainer = document.querySelector("#dog-image-container")

const breedContainer = document.querySelector("#dog-breeds")
const breedDropdown = document.querySelector("#breed-dropdown")
const breedArray = []  // for filtering and sorting later. is filled with all dog names

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
function grabDogs() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => parseDogs(json))
}

function parseDogs(json){
  json["message"].forEach(dog => {
    renderDog(dog)
  })
}

function renderDog(dog){
  const img = document.createElement("img")
  img.src = dog
  img.height = '300'
  
  
  imageContainer.appendChild(img)
}
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
function grabBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => parseBreeds(json))
}

function parseBreeds(json){
  Object.keys(json["message"]).forEach(breed => {
    breedArray.push(breed)               // to have an array of ALL dog names, for later sorting
    renderBreed(breed)
  })
}

function renderBreed(breed){
  const li = document.createElement("li")
  li.innerText = breed
  
  li.addEventListener("click", function(event){
    li.style = "color:green"
  })
  
  breedContainer.appendChild(li)
}
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
function filterBreeds(){
  breedDropdown.addEventListener("change", function(event){   // when the dropdown is "changed"

    let newDoggy = breedArray.filter(function(dog){  // create New Array from filtering through BreedArray
      if (dog.startsWith(event.target.value)) {       // if the breed starts with the selection,
        return dog                                 // return that breed to our new Array
      }
    })

    breedContainer.innerHTML = ""    // clear the current breed HTML, before building the new ones from our selected Array

    newDoggy.forEach(function(dog){  // calls our renderBreed, which creates a new <li> and appends each breed
      renderBreed(dog)
    })
  })
}

    ////////////////////////////////////////this was the "older" way to do it //////////////////////////////////////
    //
    //let dogList = document.querySelectorAll("#dog-breeds li")
    //
    // dogList.forEach(dog => {
    //   dog.style = "display:true"
    // })
    // dogList.forEach(dog => {
    //   if (!dog.innerText.startsWith(event.target.value)){
    //     dog.style = "display:none"
    //   }
    // })

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
function main(){
  grabDogs()
  grabBreeds()
  filterBreeds()
}

document.addEventListener("DOMContentLoaded", (event) => {  
  main()
})