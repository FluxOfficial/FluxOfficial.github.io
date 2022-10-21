
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
window.onclick = function(e) {
  document.getElementById("myUL").style.display = "none";
  if (e.pageY > 122) {
    if (document.getElementsByClassName("dropdown")[0].style.opacity == 1){
      document.getElementById("nav-icon4").classList.toggle("open");
    }
    document.getElementsByClassName("dropdown")[0].style.visibility = "hidden"
    document.getElementsByClassName("dropdown")[0].style.opacity = 0
    document.getElementsByClassName("dropdown")[0].style.transform = "translateY(-100%)"
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
    document.getElementsByClassName("noresults")[0].style.transform = "translateY(50%)"
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
    (document.getElementById("download")).getElementsByTagName("div")[0]?.remove();
    (document.getElementById("download")).getElementsByTagName("script")[0]?.remove();
    const a = document.createElement("a");
    a.href = localStorage.getItem(element.innerText);
    a.download = true;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js";
    script.charset = "utf-8";
    const p = document.createElement("p");
    p.innerText = "loading";
    (document.getElementById("download").appendChild(a));
    (document.getElementById("download").appendChild(script));
    (document.getElementById("download").prepend(p));
    document.getElementById("download").style.display = "block";
    (document.getElementById("download")).getElementsByTagName("svg")[0].style.display = "block";
    setTimeout(async function() {
      (document.getElementById("download")).getElementsByTagName("p")[0]?.remove();
      (document.getElementById("download")).getElementsByTagName("svg")[0].style.display = "none";
    }, 1300);
  }
  else {
    (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("div")[0]?.remove();
    (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("script")[0]?.remove();
    (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("p")[0]?.remove();
    const video = document.createElement("video");
    video.src = localStorage.getItem(element.innerText);
    video.controls = true;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js";
    script.charset = "utf-8";
    const p = document.createElement("p");
    p.innerText = "loading";
    (document.getElementsByClassName("videoplayer")[0].appendChild(video));
    (document.getElementsByClassName("videoplayer")[0].appendChild(script));
    (document.getElementsByClassName("videoplayer")[0].prepend(p));
    document.getElementsByClassName("videoplayer")[0].style.display = "block";
    (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("svg")[0].style.display = "block";
    setTimeout(async function() {
      (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("p")[0].innerText = "Sometimes it can take a couple of minutes to load, if the movie does not want to load you can lower the resolution, sometimes 4K is not so well supported either. (720p loads the fastest)";
      (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("p")[0].style.marginBottom = "10px";
      (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("svg")[0].style.display = "none";
    }, 1800);
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
  $('#nav-icon4').click(function(){
    $(this).toggleClass('open');
  });
});
function alldata(element) {
  var moviename, genre, poster, poster, sypnosis, trailer,quality, hd, fullhd, qhd;
  moviename = element.getElementsByClassName("movienames")[0].innerText;
  genre = (element.getElementsByClassName("genre")[0].innerText).replaceAll(' ', ' / ');
  poster = element.getElementsByClassName("thumbnail")[0].src;
  sypnosis = element.getElementsByClassName("sypnosis")[0].innerText;
  trailer = element.getElementsByClassName("trailer")[0].innerText;
  quality = (element.getElementsByClassName("quality")[0].innerText);
  hd = (element.getElementsByClassName("720p")[0].innerText);
  fullhd = (element.getElementsByClassName("1080p")[0].innerText);
  qhd = (element.getElementsByClassName("4K")[0].innerText);
  localStorage.setItem("quality", quality);
  localStorage.setItem("720p", hd);
  localStorage.setItem("1080p", fullhd);
  localStorage.setItem("4K", qhd);
  localStorage.setItem("moviename", moviename);
  localStorage.setItem("genre", genre);
  localStorage.setItem("poster", poster);
  localStorage.setItem("sypnosis", sypnosis);
  localStorage.setItem("trailer", trailer);
}
function fetchalldata() {
  document.getElementsByClassName("name")[0].innerText = (localStorage.getItem("moviename")).slice(0, -6);
  document.title = localStorage.getItem("moviename");
  document.getElementsByClassName("date")[0].innerHTML = ((localStorage.getItem("moviename")).slice(-5)).slice(0,-1) + "<br>" + localStorage.getItem("genre");
  document.getElementsByClassName("poster")[0].src = localStorage.getItem("poster");
  document.getElementsByClassName("syp")[0].innerText = localStorage.getItem("sypnosis");
  document.getElementsByClassName("trailer")[0].src = localStorage.getItem("trailer");
  for (let i = 0; i < localStorage.getItem("quality").split(" ").length; i ++) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.setAttribute('onclick',"quality(this)");
    const span = document.createElement("span");
    span.innerText = (localStorage.getItem("quality").split(" "))[i];
    (document.getElementsByClassName("selector")[0].appendChild(button)).appendChild(span);
  }
}
window.onload = function() {
  document.getElementById("myUL").style.display = "none";
  localStorage.setItem("genrelast", "");
  localStorage.setItem("qualitylast", "");
  localStorage.setItem("yearlast", "");
  var numb, list, title;
  numb = (((document.getElementsByClassName("recent")[0].childElementCount) * 2) - 2) / 2;
  list = document.getElementById("myUL")
  for (let i = 0; i < numb; i ++) {
    title = ((((document.getElementsByClassName("recent")[0]).getElementsByClassName("item"))[i]).getElementsByClassName("movienames")[0].innerText);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = title;
    a.setAttribute('onclick','((document.getElementsByClassName("recent")[0]).getElementsByClassName("item"))[' + i + '].click()');
    (document.getElementById("myUL").appendChild(li)).appendChild(a);
  }
 }