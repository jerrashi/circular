const renderItem = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
  
    const response = await fetch('/items')
    const data = await response.json()
  
    const itemContent = document.getElementById('item-content')
  
    let item
  
    item = data.find(item => item.id === requestedID)
  
    if (item) {
      document.getElementById('image').src = item.image
      document.getElementById('name').textContent = item.name
      document.getElementById('price').textContent = 'Price: $' + item.price
      document.getElementById('compPrice').textContent = 'Compare to: $' + item.compPrice
      document.getElementById('audience').textContent = 'Great For: ' + item.audience
      document.getElementById('description').textContent = item.description
      document.title = `Circular - ${item.name}`
    }
    else {
      const message = document.createElement('h2')
      message.textContent = 'No items Available 😞'
      itemContent.appendChild(message)   
    }
  }
  
  renderItem()