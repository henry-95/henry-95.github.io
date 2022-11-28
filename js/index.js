import navigation from '/js/templates/navigation.js';
import footer from '/js/templates/footer.js';

document.getElementById("header").append(navigation);
document.getElementById("main").append(footer);

let scrollThresholdPx;
let scrollThresholdMobile = 16;
let scrollThresholdDesktop = 15;
let maxMobileWidth = 600;

const hamburgerMenu = document.getElementById("hamburger-menu");
const navigationMenu = document.querySelector("nav");

if(window.innerWidth < maxMobileWidth)
{
    scrollThresholdPx = scrollThresholdMobile;
}else
{
    scrollThresholdPx = scrollThresholdDesktop;
}

//
//----Fixes header to top of window when scrolling down
//
document.addEventListener("scroll", (e) =>{
    if(!document.getElementById("header").classList.contains("fixed-top-navigation") && window.scrollY >= scrollThresholdPx)
    {
        document.getElementById("header").classList.add("fixed-top-navigation");
        document.getElementById("homesection").classList.add("fixed-top-padding");
    }else if(window.scrollY < scrollThresholdPx)
    {
        document.getElementById("header").classList.remove("fixed-top-navigation");
        document.getElementById("homesection").classList.remove("fixed-top-padding");
    }
});

hamburgerMenu.addEventListener("click", () =>{
    navigationMenu.classList.toggle("open");
    hamburgerMenu.classList.toggle("clicked");
});

//
//----Adjusts fixed header for mobile/desktop
//
addEventListener("resize", (e) =>{
    if(window.innerWidth < maxMobileWidth && scrollThresholdPx == scrollThresholdDesktop)
    {
        scrollThresholdPx = scrollThresholdMobile;
    }else if(window.innerWidth > maxMobileWidth && scrollThresholdPx == scrollThresholdMobile)
    {
        navigationMenu.classList.remove("open");
        scrollThresholdPx = scrollThresholdDesktop;
    }
});