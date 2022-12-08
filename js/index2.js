let sections = document.getElementsByTagName("section");
let page = document.getElementsByTagName("section");

for(let section of sections){
    section.addEventListener("click", clickSection, false);
}

function clickSection(){
    let sectionId = this.id;
    
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
