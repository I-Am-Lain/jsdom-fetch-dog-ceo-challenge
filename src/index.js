console.log('%c HI', 'color: firebrick')


const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'


////////////////////////////
///////////////////////////
function grabImages(url) {
    fetch(url)
  .then(resp => resp.json())
  .then(json => parseImages(json));
} 

function parseImages(jsonObject) {
    let ourArray = jsonObject['message']
    ourArray.forEach(image => {
        const img = document.createElement('img')
        img.setAttribute("src", image)

        document.querySelector("#dog-image-container").append(img)

    })
}
/////////////////////////////
/////////////////////////////
function grabBreeds(url) {
    fetch(url)
  .then(resp => resp.json())
  .then(json => parseBreeds(json));
} 

function parseBreeds(jsonObject) {
    let ourArray = Object.keys(jsonObject['message'])
    ourArray.forEach(breed => {
        breedArray.push(breed)
        const li = document.createElement('li')
        li.innerText = breed

        li.addEventListener("click", function(event){
            li.setAttribute("style", "color:red")
        })

        li.addEventListener("mouseover", function(event){
            li.setAttribute("style", "color:blue")
        })

        document.querySelector("#dog-breeds").append(li)

    })
}

////////////////////////////////////
////////////////////////////////////

function addSortingFunctionality(){
    const dropDown = document.querySelector('#breed-dropdown')



    dropDown.addEventListener("change", function(event){
        const dogList = document.querySelectorAll("#dog-breeds li")
        dogList.forEach(dog => {
            dog.setAttribute("style", "display:block")

        })


        const currentSelect = event.target.value
        console.log(currentSelect)


        dogList.forEach(dog => {
            if (!dog.innerText.startsWith(currentSelect)) {
                dog.setAttribute("style", "display:none")
            }
        })
    })
}


////////////////////////////////////
////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
    grabImages(imgUrl)
    grabBreeds(breedUrl)
    addSortingFunctionality()
})
