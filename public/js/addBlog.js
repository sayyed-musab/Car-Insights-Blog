const title = document.getElementById('title')
const author = document.getElementById('author')
const visibility = document.getElementById('visibility')
const coverImg = document.getElementById('coverImg')
const addBlogSubmitBtn = document.getElementById('addBlog-submit-btn')
const coverImgInput = document.getElementById('coverImg')
const imagePreview = document.getElementById('previewImage');
coverImgInput.value = ""
 

if(coverImgInput.value == ""){
    imagePreview.style.display = "none"
}

coverImgInput.addEventListener('change', ()=>{
    imagePreview.style.display = "block"
    const file = coverImgInput.files[0];
    const reader = new FileReader();
    reader.onload = e => {
        const imageDataUrl = e.target.result;
        imagePreview.src = imageDataUrl;
    }
    reader.readAsDataURL(file);
})


// Initialize Quill editor
const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // custom dropdown

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];
    
const quill = new Quill('#editor', {
    theme: 'snow', // Specify theme in configuration
    modules:{
        toolbar: toolbarOptions
    }
})

// Send Blog to Backend

function checkConditions() {
    if (title.value.length < 5 || author.value.trim() === "" || visibility.value.trim() === "") {
        addBlogSubmitBtn.disabled = true;
    } else {
        addBlogSubmitBtn.disabled = false;
    }
}

// Add event listeners to all input elements
title.addEventListener('change', checkConditions);
author.addEventListener('change', checkConditions);
visibility.addEventListener('change', checkConditions);
coverImg.addEventListener('change', checkConditions);

// Initial check in case the form is pre-filled
checkConditions();

let queryImage;
setImagePath = () => {
    try{
        let reader = new FileReader() 
        reader.readAsDataURL(coverImg.files[0])
        reader.onload = () => {      
            queryImage =  reader.result      
        }
    }
    catch(e){
        queryImage = imagePreview.src
    }
}

if (!location.search.split("=")[0].split("?")[1] === "blog"){
    addBlogSubmitBtn.addEventListener('click', async(e)=>{
        e.preventDefault()
        setImagePath()
        if(queryImage != undefined){
            let response = await fetch('http://localhost:3000/admin/addBlog', {
                method: "POST", 
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify({
                    authToken: localStorage.getItem('auth'),
                    title: title.value,
                    author: author.value,
                    visibility: visibility.value,
                    coverImg: queryImage,
                    blogBody: quill.root.innerHTML
                })
            })

            let res = await response.json()
            if(res.err){
                document.getElementById('err').innerText = res
            }
            else if(res.msg == "saved"){
                location = "/admin"
            }
        }
    })
}

// Edit Blog
const getBlogData = async () => {
    try {
        let response = await fetch('http://localhost:3000/admin/editBlog/data', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                authToken: localStorage.getItem('auth'),
                blogId: location.search.split("=")[1]
            })
        })

        if (!response.ok) {
            location.href = "/"
        }

        let res = await response.json()
        addBlogSubmitBtn.value = "Update Blog"
        setBlogData(res.blog)
        
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

    // Update Edited Blog
if (location.search.split("=")[0].split("?")[1] === "blog") {
    getBlogData()
    addBlogSubmitBtn.addEventListener('click', async(e)=>{
        e.preventDefault()
        setImagePath()
        if(queryImage != undefined){
            let response = await fetch('http://localhost:3000/admin/updateBlog', {
                method: "POST", 
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify({
                    authToken: localStorage.getItem('auth'),
                    blogId: location.search.split("=")[1],
                    title: title.value,
                    author: author.value,
                    visibility: visibility.value,
                    coverImg: queryImage,
                    blogBody: quill.root.innerHTML
                })
            })
    
            let res = await response.json()
            if(res.err){
                document.getElementById('err').innerText = res
            }
            else if(res.msg == "saved"){
                location = "/admin"
            }
        }
    })    
}

const setBlogData = (blog)=>{
    title.value = blog.title
    author.value = blog.author
    visibility.value = blog.visibility    
    imagePreview.src = blog.coverImg
    imagePreview.style.display = "block"
    quill.root.innerHTML = blog.blogBody
}
