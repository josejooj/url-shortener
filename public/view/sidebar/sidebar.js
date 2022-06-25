

function closeSidebar() {

    const sidebar = document.getElementsByClassName('sidebar')[0]

    for (let x of sidebar.querySelectorAll('div')) { x.style.display = 'none' }
    for (let x of sidebar.querySelectorAll('button')) { x.style.display = 'none' }
    for (let x of sidebar.querySelectorAll('span')) { x.style.display = 'none' }

    sidebar.style.width = '4%'
    document.getElementsByClassName('sidebar-button-show')[0].style.display = 'unset'
    document.getElementsByClassName('sidebar-button-show')[0].className = 'sidebar-button-hidden'
    document.getElementsByClassName('sidebar-button-hidden')[0].textContent = '☰'

    window.sidebarStatus = 'closed'

    document.getElementsByClassName('painel')[0].style.left = '4%'
}

function execSidebar() {
    
    if(!window.sidebarStatus || window.sidebarStatus == 'open') return closeSidebar()
    
    const sidebar = document.getElementsByClassName('sidebar')[0]

    for (let x of sidebar.querySelectorAll('div')) { x.style.display = 'unset' }
    for (let x of sidebar.querySelectorAll('button')) { x.style.display = 'unset' }
    for (let x of sidebar.querySelectorAll('span')) { x.style.display = 'unset' }

    sidebar.style.width = '15%'
    document.getElementsByClassName('sidebar-button-hidden')[0].textContent = 'x'
    document.getElementsByClassName('sidebar-button-hidden')[0].className = 'sidebar-button-show'
    document.getElementsByClassName('painel')[0].style.left = '15%'
    window.sidebarStatus = 'open'
}