const blogs = document.getElementById('blogs')
const filter = document.getElementById('filter')
const sort = document.getElementById('sort')
const search = document.getElementById('search')
const deleteBtn = document.getElementsByClassName('deleteBtn')

// Filter
filter.value = "-"

filter.addEventListener('change', ()=>{
    if(filter.value == "-"){
        Array.from(blogs.children).forEach(child => {
            child.style.display = "flex"
        })
    }
    else if(filter.value == "private"){
        Array.from(blogs.children).forEach(child => {
            child.classList.contains('public')?child.style.display = "none":child.style.display = "flex"
        })
    }
    else if(filter.value == "public"){
        Array.from(blogs.children).forEach(child => {
            child.classList.contains('private')?child.style.display = "none":child.style.display = "flex"
        })
    }
})

// Sort
sort.value = 'latest'
sort.addEventListener('change', ()=>{
    if(sort.value == "latest"){
        blogs.style.flexDirection = "column"
    }
    else if(sort.value == "oldest"){
        blogs.style.flexDirection = "column-reverse"
    }
})

// Search
search.value = ""
search.addEventListener('input', ()=>{
    let inputVal = search.value.toLowerCase()
    if(inputVal.length == ""){
        Array.from(blogs.children).forEach(child => {
            child.style.display = "flex"
        })
    }
    else{
        Array.from(blogs.children).forEach(child=>{
            childTitle = child.children[1].children[0].innerText.toLowerCase()
            if(!childTitle.includes(inputVal)){
                child.style.display = "none"
            }
        })
    }
})

// Delete Button Alert
Array.from(deleteBtn).forEach(e=> {
    e.addEventListener('click', (e)=>{
        let confirmation = confirm('Do you really want to delete the blog? This action cant be reversed')
        console.log(confirmation)
    })
})