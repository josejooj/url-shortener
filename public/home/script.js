const button = document.getElementById('send')

button.addEventListener('click', async function() {

    const userId = getCookie('userId')

    const data = {
        url: document.getElementById('url')?.value,
        customUrl: document.getElementById('customurl')?.value || (Math.random() * 1000).toString(36),
    }

    if(!username || !password) return;
    
    fetch(`http://localhost:8080/?attempt=1&url=${Buffer.from(url, '')}&username=${data.username}&password=${data.password}&remember=${data.remember}`)
    .then(d => d.json()
    .then(d => console.log(d)))
})


// função por https://mariovalney.com/como-usar-cookies-com-javascript/


function getCookie(name) {
    var cookies = document.cookie;
    var prefix = name + "=";
    var begin = cookies.indexOf("; " + prefix);
 
    if (begin == -1) {
 
        begin = cookies.indexOf(prefix);
         
        if (begin != 0) {
            return null;
        }
 
    } else {
        begin += 2;
    }
 
    var end = cookies.indexOf(";", begin);
     
    if (end == -1) {
        end = cookies.length;                        
    }
 
    return unescape(cookies.substring(begin + prefix.length, end));
}