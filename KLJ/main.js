function menu () {
    if (document.getElementsByClassName("nav")[0].classList.contains("mobile")) {
        document.getElementById("nav-icon4").classList.remove("open");
        document.getElementsByClassName("nav")[0].classList.remove("mobile");
        document.getElementsByTagName("html")[0].style.overflowY = "scroll"
        document.getElementsByClassName("nav")[0].removeAttribute("onclick");
    }
    else {
        document.getElementsByClassName("nav")[0].classList.add("mobile");
        document.getElementsByClassName("nav")[0].setAttribute("onclick", "menu()");
        document.getElementsByTagName("html")[0].style.overflowY = "hidden"
        document.getElementById("nav-icon4").classList.add("open");
    }
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}