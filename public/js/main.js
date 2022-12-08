function onsubmit(e){
    e.preventDefault();

    document.querySelector('#image').src = ''

    const prompt = document.getElementById("prompt").value ;
    const size = document.getElementById("size").value ;

    if(prompt === ''){
        alert("Please enter somthing")
        return ; 
    }

    generateImage(prompt, size)
}

async function generateImage(prompt, size){

    try {
        showSpinner();

        const response =  await fetch("/openai/image", {
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                prompt, 
                size
            })
        })

        if(!response.ok){
            removeSpinner();
            throw new Error("This image canot be proceed ")
        }

        
        const data = await response.json();
        
        const imgUrl = data.data;
        document.querySelector('#image').src = imgUrl;
        
        console.log(data);
        
        removeSpinner();
    } catch (error) {
        console.log(error);
    }
}


function showSpinner(){
    document.querySelector('.body').classList.add('show')
}
function removeSpinner(){
    document.querySelector('.body').classList.remove('show')
}


document.getElementById("form").addEventListener("submit", onsubmit)