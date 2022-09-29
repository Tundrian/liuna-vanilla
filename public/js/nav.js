let clicked = false

const navClicked = () => {
    console.log('clicked')
    clicked = !clicked
    if(clicked){
        document.querySelector('#navbar-mobile').classList.remove('hidden')
    }else{
        document.querySelector('#navbar-mobile').classList.add('hidden')
    }
}

document.querySelector('#nav-menu').addEventListener('click', navClicked)

