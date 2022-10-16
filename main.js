
function search() {
  document.getElementById("myUL").style.display = "block";
  var input, filter, ul, li, a, i, txtValue;
  var empty = 0;
  input = document.getElementById("myInput");
  localStorage.setItem("input", input.value);
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  localStorage.count = 0;
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      localStorage.count = Number(localStorage.count)+1;
    } else {
      li[i].style.display = "none";
      empty += 1;
    }
    if (empty === li.length) {
      document.getElementById("notfound").style.display = "block";
      document.getElementById("myUL").style.height = "70px";
    }else{
      document.getElementById("notfound").style.display = "none";
      document.getElementById("myUL").style.height = "40%";
    }
  }
}
function remove() {
  document.getElementById("notfound").style.display = "none";
  document.getElementById("myUL").style.display = "none";
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    li[i].style.display = "none";
  }
}
function keypress(e) {
  if(e.keyCode === 13){
    var ul , li;
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
      if (li[i].style.display != "none") {
       var el = ul.querySelectorAll("a")[i].href;
       window.open(el);
       break;
      }
  } 
}
}
function refresh() {
  localStorage.setItem("genrelast", "");
  localStorage.setItem("qualitylast", "");
  localStorage.setItem("yearlast", "");
}

function result(filter, type) {
  if (filter == undefined){
    filter = "";
  }
  if (type == undefined){
    type = "";
  }
  if (localStorage.getItem("input") == undefined) {
    localStorage.setItem("input", "");
  }
  document.getElementById("myInput").value = localStorage.getItem("input");
  if (localStorage.getItem("count") == null){
    document.getElementById("browseres").innerHTML = "Results for: ";
  }
  else {
    document.getElementById("browseres").innerHTML = "Results for: " + '"' + localStorage.getItem("input") + '"' + " (" + localStorage.getItem("count") + ")";
  }
  var search = (localStorage.getItem("input")).toLowerCase();
  var numb = ((document.getElementById("recent").childElementCount) * 2) - 2;
  var title, genre, quality, year, counter;
  if (type == "quality") {
    localStorage.setItem("qualitylast", filter);
  }
  if (type == "genre") {
    localStorage.setItem("genrelast", filter);
  }
  if (type == "year") {
    localStorage.setItem("yearlast", filter);
  }
  if (localStorage.getItem("qualitylast") == undefined){
    localStorage.setItem("qualitylast", "");
  }
  if (localStorage.getItem("genrelast") == undefined){
    localStorage.setItem("genrelast", "");
  }
  if (localStorage.getItem("yearlast") == undefined){
    localStorage.setItem("yearlast", "");
  }
  //if (type == undefined) {
  //  for (let i = 0; i < numb; i += 2) {
  //    ((document.getElementById("recent")).getElementsByTagName("div"))[i].style.display = "block"
  //  }
  //}
  counter = 0;
  for (let i = 0; i < numb; i += 2) {
    title = ((((document.getElementById("recent")).getElementsByTagName("div"))[i]).getElementsByClassName("movienames")[0].innerText).toLowerCase();
    genre = ((((document.getElementById("recent")).getElementsByTagName("div"))[i]).getElementsByClassName("genre")[0].innerText).toLowerCase();
    quality = ((((document.getElementById("recent")).getElementsByTagName("div"))[i]).getElementsByClassName("quality")[0].innerText).toLowerCase();
    year = ((((((document.getElementById("recent")).getElementsByTagName("div"))[i]).getElementsByClassName("movienames")[0].innerText).toLowerCase()).slice(-5)).slice(0, -1);
    if (title.includes(search)) {
      if (genre.includes(localStorage.getItem("genrelast")) && quality.includes(localStorage.getItem("qualitylast"))) {
        if (year >= Number(localStorage.getItem("yearlast")) && year < (Number(localStorage.getItem("yearlast")) + 10) || localStorage.getItem("yearlast") == "") {
          ((document.getElementById("recent")).getElementsByTagName("div"))[i].style.display = "block"
        }
        else {
          ((document.getElementById("recent")).getElementsByTagName("div"))[i].style.display = "none"
        }
      }
      else {
        ((document.getElementById("recent")).getElementsByTagName("div"))[i].style.display = "none"
      }
    }
    else {
      ((document.getElementById("recent")).getElementsByTagName("div"))[i].style.display = "none"
    }
    if (((document.getElementById("recent")).getElementsByTagName("div"))[i].style.display == "none") {
      counter += 1;
    }
  }
  if (counter == (numb/2)) {
    document.getElementsByClassName("noresults")[0].style.visibility = "visible"
    document.getElementsByClassName("noresults")[0].style.opacity = 1
    document.getElementsByClassName("noresults")[0].style.transform = "translateY(0)"
  }
  else {
    document.getElementsByClassName("noresults")[0].style.visibility = "hidden"
    document.getElementsByClassName("noresults")[0].style.opacity = 0
    document.getElementsByClassName("noresults")[0].style.transform = "translateY(100%)"
  }
}
function specify(element){
  var src = element.parentNode.id;
  (document.getElementById(src)).getElementsByTagName("a")[0].innerText = element.innerText;
  if (element.innerText == "All") {
    result("",src)
  }
  else {
    if (src == "year"){
      if (element.innerText == "70s"){
        result(Number("1970"),src);
      }
      else if (element.innerText == "80s") {
        result(Number("1980"),src);
      }
      else if (element.innerText == "90s") {
        result(Number("1990"),src);
      }
      else if (element.innerText == "2000s") {
        result(Number("2000"),src);
      }
      else if (element.innerText == "2010s") {
        result(Number("2010"),src);
      }
      else if (element.innerText == "2020s") {
        result(Number("2020"),src);
      }
      else if (element.innerText == "New") {
        result(Number(new Date().getFullYear()),src);
      }
    }
    else {
      result((element.innerText).toLowerCase(),src);
    }
  }
}
function off() {
  document.getElementById("overlay").style.display = "none";
}
function watch() {
  localStorage.setItem("last", "watch");
  document.getElementById("overlay").style.display = "block"
  document.getElementsByClassName("videoplayer")[0].style.display = "none"
  document.getElementById("download").style.display = "none"
}
function down() {
  localStorage.setItem("last", "download");
  document.getElementById("overlay").style.display = "block"
  document.getElementsByClassName("videoplayer")[0].style.display = "none"
  document.getElementById("download").style.display = "none"
}
function quality(element){
  if (localStorage.getItem("last") == "download") {
    document.getElementById("download").style.display = "block"
  }
  else {
    document.getElementsByClassName("videoplayer")[0].style.display = "block";
    (document.getElementById("player")).getElementsByTagName("iframe")[0].setAttribute("sandbox","allow-scripts")
  }
}
function menu () {
  if (document.getElementsByClassName("dropdown")[0].style.visibility == "hidden" || document.getElementsByClassName("dropdown")[0].style.visibility == ""){
  document.getElementsByClassName("dropdown")[0].style.visibility = "visible"
  document.getElementsByClassName("dropdown")[0].style.opacity = 1
  document.getElementsByClassName("dropdown")[0].style.transform = "translateY(0)"
  }
  else {
  document.getElementsByClassName("dropdown")[0].style.visibility = "hidden"
  document.getElementsByClassName("dropdown")[0].style.opacity = 0
  document.getElementsByClassName("dropdown")[0].style.transform = "translateY(-100%)"
  }
}
$(document).ready(function(){
  $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
    $(this).toggleClass('open');
  });
});