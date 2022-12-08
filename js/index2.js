let sections = document.getElementsByTagName("section");
let page = document.getElementsByTagName("section");

for(let section of sections){
    section.addEventListener("click", clickSection, false);
}

document.getElementById("toggle-lights").addEventListener("click", toggleLights, false);

function toggleLights(){
    this.children[0].classList.toggle("lights-off");
    this.children[0].classList.toggle("fa-sun");
    this.children[0].classList.toggle("fa-moon");
}

function clickSection(){
    let sectionId = this.id;
    console.log(this);
    
    for(let section of sections){
        if(sectionId != section.id)
        {
            section.classList.remove("selected");
            section.getElementsByClassName("content")[0].classList.add("hide");
        }else{
            section.classList.toggle("selected");
            section.getElementsByClassName("content")[0].classList.toggle("hide");
        }
    }
}
