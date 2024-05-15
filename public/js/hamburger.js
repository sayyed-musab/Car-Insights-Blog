const nav = document.getElementById('nav')
const hamburger = document.getElementById('hamburger')
const navLinksSecton = document.getElementById('nav-right')

// Hamburger Menu Lines
const line1 = hamburger.children[0]
const line2 = hamburger.children[1]
const line3 = hamburger.children[2]

hamburger.addEventListener('click', ()=>{
    if(navLinksSecton.style.display === "none"){
        // Making Hamburger Icon Cross
        line1.style.transform = "rotate(45deg)"
        line1.style.top = "4px"
        line2.style.display = "none"
        line3.style.transform = "rotate(-45deg)"
        line3.style.bottom = "4px"

        // Show Links
        nav.style.height = "100vh"
        navLinksSecton.style.top = "8vh"
        navLinksSecton.style.display = "inline-block"
    }
    else{
        line1.style.transform = "rotate(0)"
        line1.style.top = ""
        line2.style.display = "block"
        line3.style.transform = "rotate(0)"
        line3.style.bottom = ""   

        nav.style.height = "auto"
        navLinksSecton.style.display = "none"
    }
})