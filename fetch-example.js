

fetch('/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'bobby',
    password: '123'
  })
})
  .then(response => response.json())
  .then(data => {
    const token = data.token
    // token is a jwt

    fetch('/hello', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })

  })




