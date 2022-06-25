var token = window.location.href.split('/').reverse()[0]

doIt()

async function doIt() {
    const res = await fetch(`http://localhost:8080/get?token=${token}`)
    window.data = await res.json();

    if (data.code && data.code != 0 || !window.data) return noPassed()
}

function noPassed() {
    execSidebar()
    document.getElementById('R4TkRNNU56Z3dNemsz').style.display = "unset"
    document.getElementById('WpFeU5EYzFOZz09').innerHTML = `<br>Descrição do erro: <b style='color: red'>${data.description}</b><br><marquee behavior="alternate">O nosso estágiário perdeu o que tinha nesta página, desculpe o incômodo<marquee>`
}

const interval = setInterval(() => {
    if (window.data) {
        loadJS('http://localhost:8080/public/view/painel/home/script.js')
        clearInterval(interval)
    }
}, 1000);

function loadJS(src) {
    const x = document.createElement("script")
    x.setAttribute("src", src)
    document.body.appendChild(x)
}

function changePage(page) {
    const classes = [document.getElementsByClassName('home')[0], document.getElementsByClassName('access')[0], document.getElementsByClassName('config')[0]]
    for(let x of classes) {
        if(x.className == page) x.style.display = 'unset'
        else x.style.display = 'none'
    }
}