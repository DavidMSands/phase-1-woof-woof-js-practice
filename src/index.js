const dogUrl = 'http://localhost:3000/pups'

fetch(dogUrl)
.then(res => res.json())
.then(dogs => {
    dogs.forEach(dog => {
        const dogBar = document.getElementById('dog-bar')
        const dogSpan = document.createElement('span')
        dogSpan.innerText = dog.name
        dogBar.appendChild(dogSpan)

        dogSpan.addEventListener('click', (e) => {
            const selectedDogInfo = document.getElementById('dog-info')
            const selectedDogImage = document.createElement('img')
            const selectedDogName = document.createElement('h2')
            const goodBoyButton = document.createElement('button')


            selectedDogImage.setAttribute('src', dog.image)
            selectedDogName.innerText = dog.name
            if(dog.isGoodDog === true) {
                goodBoyButton.innerText = 'Good Dog!'
            } else {
                goodBoyButton.innerText = "Bad Dog!"
            }
            while(selectedDogInfo.lastElementChild){
                selectedDogInfo.removeChild(selectedDogInfo.lastElementChild)
            }

            selectedDogInfo.append(selectedDogImage, selectedDogName, goodBoyButton)
            goodBoyButton.addEventListener('click', () => {
                fetch(`http://localhost:3000/pups/${dog.id}`)
                .then(res => res.json())
                .then(dog => {
                if(dog.isGoodDog === true) {
                goodBoyButton.innerText = "Bad Dog!"
                fetch(`http://localhost:3000/pups/${dog.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        isGoodDog: false,
                    }),
                    headers: {
                      'Content-type': 'application/json'
                    },
                })
                .then(res => res.json())
                .then(data => console.log(data))
            } else {
                goodBoyButton.innerText = "Good Dog!"
                fetch(`http://localhost:3000/pups/${dog.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        isGoodDog: true,
                    }),
                    headers: {
                      'Content-type': 'application/json'
                    },
                })
                .then(res => res.json())
                .then(data => console.log(data))
            
          }
        })
      })    
    })
  })
})