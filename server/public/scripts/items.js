const renderItems = async () => {
    
    const response = await fetch('/items')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')

    if (data) {

        data.map(item => {
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            topContainer.style.backgroundImage = `url(${item.image})`

            const name = document.createElement('h3')
            name.textContent = item.name
            bottomContainer.appendChild(name)

            const price = document.createElement('p')
            price.textContent = 'Price: $' + item.price
            bottomContainer.appendChild(price)

            const audience = document.createElement('p')
            audience.textContent = 'Great For: ' + item.audience
            bottomContainer.appendChild(audience)

            const link = document.createElement('a')
            link.textContent = 'Read More >'
            link.setAttribute('role', 'button')
            link.href = `/items/${item.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer) 
            mainContent.appendChild(card)
        })
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Items Available 😞'
        mainContent.appendChild(message)
    }
}

// Conditionally run renderItems only if element with id "main-content" exists
const mainContent = document.getElementById('main-content');
if (mainContent) {
  renderItems();
}