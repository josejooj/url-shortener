const url = window.location.href.split('/').reverse()[0]

async function main() {

    let ip;
    try {
        ip = await fetch('http://ip-api.com/json/');
        ip = await ip.json();
        ip.status = undefined;
        ip.isp = undefined;
        ip.org = undefined;
        ip.zip = undefined;
    } catch (e) {
        ip = { status: 1 };
    }

    let url = await fetch('http://localhost:8080/set?url=' + JSON.stringify(ip), { method: 'POST', })
    url = await url.json()

    window.location.href = url.url

}

main()