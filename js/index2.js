let pageLinks = document.querySelectorAll("#home, #projects, #contact");
let pages = document.getElementsByClassName("page");


for(let page of pages){
    page.querySelector("h3").addEventListener("click", clickSection, false);
}

document.getElementById("toggle-lights").addEventListener("click", toggleLights, false);

function toggleLights(){
    this.children[0].classList.toggle("lights-off");
    this.children[0].classList.toggle("fa-sun");
    this.children[0].classList.toggle("fa-moon");
}

function clickSection(){
    let pageId = this.parentElement.id;
    
    for(let page of pages){
        if(pageId != page.id)
        {
            page.classList.remove("selected");
            page.getElementsByClassName("content")[0].classList.add("hide");
        }else{
            page.classList.toggle("selected");
            //this.classList.remove("page");
            page.getElementsByClassName("content")[0].classList.toggle("hide");
        }
    }
}
