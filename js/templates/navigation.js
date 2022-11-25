const navigation = document.createElement("nav");
const title = document.title;
navigation.innerHTML = '<ul><li><a href="index.html" class="' + (title == "index" ? "active" : "" ) + '">Home</a></li><li><a href="projects.html" class="' + (title == "projects" ? "active" : "" ) + '">Projects</a></li></ul>';

export default navigation;

