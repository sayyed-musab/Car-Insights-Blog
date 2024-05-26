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
});