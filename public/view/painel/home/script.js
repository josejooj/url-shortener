const { data, location: local } = window

document.getElementById('home-ghosturl').innerHTML = `<a href='http://localhost:8080/${data.customUrl}'>http://localhost:8080/${data.customUrl}</a>`
document.getElementById('home-accessurl').innerHTML = `<a href='${local.href}'>Esse site mesmo :p</a>`
document.getElementById('home-acessos').innerHTML = `<a href='${local.href}'>${data.connections.length} Acessos</a>`

