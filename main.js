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
  let context = ul;
  let instance = new Mark(context);
  instance.unmark();
  let options = {
    "caseSensitive": false
  }
  let keyword = input.value;

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;

    let context = a;
    let instance = new Mark(context);
    instance.mark(keyword , options);

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
      document.getElementById("myUL").style.height = "40vh";
    }
  }
}
window.onclick = function(e) {
  // should be fixed
  let context = document.getElementById("myUL");
  let instance = new Mark(context);
  instance.unmark();
  document.getElementById("myUL").style.display = "none";
}
function keypress(e) {
  if(e.keyCode === 13){
    var ul , li;
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
      if (li[i].style.display != "none") {
        let el = li[i].getElementsByTagName("a")[0];
        el.click();
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
    // should be fixed
    document.getElementById("browseres").innerHTML = "Results for: ";
  }
  else {
    // should be fixed
    document.getElementById("browseres").innerHTML = "Results for: " + '"' + localStorage.getItem("input") + '"' + " (" + localStorage.getItem("count") + ")";
  }
  let search = (localStorage.getItem("input")).toLowerCase();
  let numb = document.getElementsByClassName("recent")[0].childElementCount;
  let children  = document.getElementsByClassName("recent")[0].children;
  let title, genre, quality, year, counter;
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
  for (let i = 0; i < numb; i ++) {
    title = ((children.item(i)).getElementsByClassName("movienames")[0].innerText).toLowerCase();
    genre = ((children.item(i)).getElementsByClassName("genre")[0].innerText).toLowerCase();
    quality = ((children.item(i)).getElementsByClassName("quality")[0].innerText).toLowerCase();
    year = ((((children.item(i)).getElementsByClassName("movienames")[0].innerText).toLowerCase()).slice(-5)).slice(0, -1);
    if (title.includes(search)) {
      if (genre.includes(localStorage.getItem("genrelast")) && quality.includes(localStorage.getItem("qualitylast"))) {
        if (year >= Number(localStorage.getItem("yearlast")) && year < (Number(localStorage.getItem("yearlast")) + 10) || localStorage.getItem("yearlast") == "") {
          children.item(i).style.display = "block"
        }
        else {
          children.item(i).style.display = "none"
        }
      }
      else {
        children.item(i).style.display = "none"
      }
    }
    else {
      children.item(i).style.display = "none"
    }
    if (children.item(i).style.display == "none") {
      counter += 1;
    }
  }
  if (counter == numb ) {
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
function specify(element) {
  var src = element.parentNode.id;
  (document.getElementById(src)).getElementsByTagName("a")[0].innerText = element.innerHTML;
  let innercontent = element.innerHTML
  if (innercontent == "All") {
    result("",src);
  }
  else {
    if (src == "year"){
      if (innercontent == "70s"){
        result(Number("1970"),src);
      }
      else if (innercontent == "80s") {
        result(Number("1980"),src);
      }
      else if (innercontent == "90s") {
        result(Number("1990"),src);
      }
      else if (innercontent == "2000s") {
        result(Number("2000"),src);
      }
      else if (innercontent == "2010s") {
        result(Number("2010"),src);
      }
      else if (innercontent == "2020s") {
        result(Number("2020"),src);
      }
      else if (innercontent == "New") {
        result(Number(new Date().getFullYear()),src);
      }
    }
    else {
      result((innercontent).toLowerCase(),src);
    }
  }
}
window.onblur = function() {
  off();
}
function off() {
  document.getElementById("overlay").style.background = 'rgba(0, 0, 0, 0.48)'
  document.getElementById("nav-icon4").classList.remove("open");
  document.getElementById("overlay").style.display = "none";
  if (document.getElementsByClassName("contact")[0].classList.contains('appearc')) {
    document.getElementsByClassName("contact")[0].classList.remove('appearc');
  }
  document.getElementsByTagName("html")[0].style.overflowY = "scroll"
  document.getElementsByClassName("dropdown")[0].style.visibility = "hidden"
  document.getElementsByClassName("dropdown")[0].style.opacity = 0
  document.getElementsByClassName("dropdown")[0].style.transform = "translateY(-100%)"
  if(document.getElementsByClassName("list")[0]){
    document.getElementsByClassName("list")[0].innerHTML = '';
    document.getElementsByClassName("list")[0].style.display = "none"
  }
  if (document.getElementsByClassName("selector")[0]) {
    document.getElementsByClassName("selector")[0].style.display = "none"
  }
}
function watch() {
  localStorage.setItem("last", "watch");
  document.getElementById("overlay").style.display = "block"
  document.getElementById("overlay").style.background = 'rgba(0, 0, 0, 0.65)'
  document.getElementsByClassName("selector")[0].style.display = "block"
  document.getElementsByTagName("html")[0].style.overflowY = "hidden"
}
function down() {
  localStorage.setItem("last", "download");
  document.getElementById("overlay").style.display = "block"
  document.getElementById("overlay").style.background = 'rgba(0, 0, 0, 0.65)'
  document.getElementsByClassName("selector")[0].style.display = "block"
  document.getElementsByTagName("html")[0].style.overflowY = "hidden"
}
function sort(element) {
  if (window.innerWidth < 500) {
    document.getElementsByClassName("list")[0].style.display = "flex"
    document.getElementById("overlay").style.display = "block"
    document.getElementById("overlay").style.background = 'rgba(0, 0, 0, 0.8)'
    document.getElementsByTagName("html")[0].style.overflowY = "hidden"
    for (let i = 0; i < (element.getElementsByClassName("listcontainer")[0]).getElementsByTagName("p").length; i ++) {
      const p = document.createElement("p");
      p.innerText = (element.getElementsByClassName("listcontainer")[0]).getElementsByTagName("p")[i].innerText;
      p.setAttribute('onclick','((document.getElementById("' + element.id + '")).getElementsByClassName("listcontainer")[0]).getElementsByTagName("p")[' + i + '].click()');
      document.getElementsByClassName("list")[0].append(p);
    }
  }
}
function showcontact() {
  document.getElementById("overlay").style.display = "block"
  document.getElementById("overlay").style.background = 'rgba(0, 0, 0, 0.48)'
  document.getElementsByClassName("contact")[0].classList.add("appearc");
  document.getElementsByTagName("html")[0].style.overflowY = "hidden"
}
function quality(element){
  scrollBy(0,500)
  off();
  let quality = element.innerHTML.toString().toLowerCase().replaceAll('&nbsp;', '');
  quality = (quality.slice(6)).slice(0, -7);
  if (localStorage.getItem("last") == "download") {
    (document.getElementById("download")).getElementsByTagName("div")[0]?.remove();
    (document.getElementById("download")).getElementsByTagName("script")[0]?.remove();
    (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("div")[0]?.remove();
    (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("script")[0]?.remove();
    (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("p")[0]?.remove();
    const a = document.createElement("a");
    a.href = localStorage.getItem(quality);
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
    video.src = localStorage.getItem(quality);
    video.controls = true;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js";
    script.charset = "utf-8";
    const p = document.createElement("p");
    const i = document.createElement("i");
    i.setAttribute("class", "fa fa-info-circle")
    p.innerText = "loading";
    (document.getElementsByClassName("videoplayer")[0].appendChild(video));
    (document.getElementsByClassName("videoplayer")[0].appendChild(script));
    (document.getElementsByClassName("videoplayer")[0].prepend(p));
    document.getElementsByClassName("videoplayer")[0].style.display = "block";
    (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("svg")[0].style.display = "block";
    setTimeout(async function() {
      (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("p")[0].innerText = "  Sometimes it can take a couple of minutes to load, if the movie does not want to load you can lower the resolution, sometimes 4K is not so well supported either. (720p loads the fastest) It's also recommended to install and use an adblocker.";
      p.prepend(i);
      (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("p")[0].style.marginBottom = "10px";
      (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("svg")[0].style.display = "none";
      (document.getElementsByClassName("videoplayer")[0]).getElementsByTagName("div")[0].style.display = "block";
      document.getElementsByTagName("iframe")[0].setAttribute("sandbox", "allow-scripts allow-forms allow-same-origin allow-popups=false");
    }, 1900);
  }
}
function menu () {
  if (document.getElementsByClassName("dropdown")[0].style.visibility == "hidden" || document.getElementsByClassName("dropdown")[0].style.visibility == ""){
  document.getElementsByClassName("dropdown")[0].style.visibility = "visible"
  document.getElementsByClassName("dropdown")[0].style.opacity = 1
  document.getElementsByClassName("dropdown")[0].style.transform = "translateY(0)"
  document.getElementById("overlay").style.display = "block"
  if (document.getElementById("overlay").style.background != 'rgba(0, 0, 0, 0.8)') {
    document.getElementById("overlay").style.background = 'rgba(0, 0, 0, 0.48)'
  }
  // else {
    
  // }
  document.getElementsByTagName("html")[0].style.overflowY = "hidden"
  document.getElementById("nav-icon4").classList.add("open");
  }
  else {
  off();
  }
}
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
  hdweb = (element.getElementsByClassName("720pweb")[0].innerText);
  fullhdweb = (element.getElementsByClassName("1080pweb")[0].innerText);
  qhdweb = (element.getElementsByClassName("4Kweb")[0].innerText);
  localStorage.setItem("quality", quality);
  
  localStorage.setItem("720p", hd);
  localStorage.setItem("1080p", fullhd);
  localStorage.setItem("4k", qhd);

  localStorage.setItem("720pweb", hdweb);
  localStorage.setItem("1080pweb", fullhdweb);
  localStorage.setItem("4kweb", qhdweb);

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
  let name = document.title;
  let button = document.getElementById("clean");
  if (localStorage.getItem("favorites") != null || undefined) {
    if (localStorage.getItem("favorites").includes(name)) {
      button.innerText = "Unfavorite";
      let i = document.createElement("i");
      i.setAttribute("class","fa fa-trash");
      button.appendChild(i);
    }
    else {
      button.innerText = "Add to favorites";
      let i = document.createElement("i");
      i.setAttribute("class","fal fa-star");
      button.appendChild(i);
    }
  }
  else {
    button.innerText = "Add to favorites";
    let i = document.createElement("i");
    i.setAttribute("class","fal fa-star");
    button.appendChild(i);
  }
  for (let i = 0; i < localStorage.getItem("quality").split(" ").length; i ++) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.setAttribute('onclick',"quality(this)");
    const span = document.createElement("span");
    span.innerText = (localStorage.getItem("quality").split(" "))[i];
    ((document.getElementsByClassName("selector")[0]).getElementsByClassName("qcontainer")[0].appendChild(button)).appendChild(span);
  }
}
window.onload = function() {
  document.getElementsByClassName('logo')[0].classList.add("animated");
  document.getElementById("myUL").style.display = "none";
  localStorage.setItem("genrelast", "");
  localStorage.setItem("qualitylast", "");
  localStorage.setItem("yearlast", "");
  if (document.title == "Flux - Watchlist") {
    checkfavorites();
  }
}
function itemfix() {
  let numb = document.getElementsByClassName("recent")[0].childElementCount;
  let children = document.getElementsByClassName("recent")[0].children;
  for (let x = 0; x < numb; x ++) {
    children.item(x).setAttribute("onclick","alldata(this)");
    (children.item(x)).firstElementChild.setAttribute("onclick","location.href='./movies/dynamic.html'");
    let a = document.createElement("a");
    a.innerText = "View Details"
    a.setAttribute("class","viewdetails");
    ((children.item(x)).firstElementChild).appendChild(a);
    let div = document.createElement("div");
    div.setAttribute("class","star");
    div.setAttribute("onclick","star(this)");
    let i = document.createElement("i");
    i.setAttribute("class","fal fa-star");
    let span = document.createElement("span");
    span.setAttribute("class","texttip");
    div.appendChild(i);
    div.appendChild(span);
    (children.item(x)).prepend(div);
  }
}
function searchlist() {
  let iframe = document.getElementById('database');
  let iframecontent = iframe.contentDocument || iframe.contentWindow.document;
  let content = (iframecontent.getElementsByTagName("html")[0]).getElementsByTagName("body")[0];
  let childs = content.children;
  let numb = content.childElementCount;
  let ul = document.getElementById("myUL");
  let sortmovies = [];
  for (let i = 0; i < numb; i ++) {
    let title = (childs.item(i)).getElementsByClassName("movienames")[0].innerText;
    sortmovies.push(title);
  }
  sortmovies = sortmovies.sort();
  for (let i = 0; i < numb; i ++) {
    let movielist = content.querySelectorAll('.movienames');
    for (let x = 0; x < movielist.length; x ++) {
      if (movielist[x].textContent.toLowerCase().includes(sortmovies[i].toLowerCase())) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const span = document.createElement("span");
      const img = document.createElement("img");
      a.innerHTML = movielist[x].innerText.slice(0,-7) + "<br>";
      span.innerText = ((movielist[x].innerText).slice(-5)).slice(0,-1);
      li.setAttribute('onclick','openitem(this)');
      img.src = (movielist[x].parentNode).getElementsByClassName("thumbnail")[0].src;
      (ul.appendChild(li)).appendChild(img);
      ((ul.appendChild(li)).appendChild(a)).appendChild(span);
      }
    }
  }
}
function openitem(element) {
  let iframe = document.getElementById('database');
  let iframecontent = iframe.contentDocument || iframe.contentWindow.document;
  let content = (iframecontent.getElementsByTagName("html")[0]).getElementsByTagName("body")[0];
  let childs = content.children;
  let numb = content.childElementCount;
  let itemtitle = (element.getElementsByTagName("a")[0].textContent);
  itemtitle = (itemtitle.slice(0, -4) + " (" + itemtitle.slice(-4) + ")").toLowerCase();
  for (let i = 0; i < numb; i ++) {
    if (itemtitle == childs.item(i).getElementsByClassName("movienames")[0].innerText.toLowerCase()) {
      alldata(childs.item(i));
      location.href='./movies/dynamic.html'
    }
  }
}
window.onscroll = function() {
  let mybutton = document.getElementsByClassName("topjumper")[0];
  let searchbar = document.getElementsByClassName("search")[0];
  let banner = document.getElementsByClassName("banner")[0];
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    mybutton.style.display = "block"
  } else {
    mybutton.style.display = "none";
  }
  // if (document.title == "Flux - Browse") {
  //   if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
  //     searchbar.style.position = "fixed";
  //     searchbar.style.top = "800px";
  //     document.getElementById("myUL").style.position = "fixed";
  //     document.getElementById("myUL").style.top = "122px";
  //   } else {
  //     searchbar.style.position = "relative";
  //     searchbar.style.top = "0px";
  //     document.getElementById("myUL").style.position = "relative";
  //     document.getElementById("myUL").style.top = "213px";
  //   } 
  // }
  if (document.title == "Flux - Home") {
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    banner.style.background = "rgba(17, 17, 17, 0.6)";
  }
  else {
    banner.style.background = "rgba(17, 17, 17, 0)";
  }
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
$(".logo").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
  $(this).removeClass("animated")  
})
$(".logo").hover(function(){
  $(this).addClass("animated");     
})
function loadfavbutton() {
  let name = document.title;
  let button = document.getElementById("clean");
  if (localStorage.getItem("favorites") != null || undefined) {
    if (localStorage.getItem("favorites").includes(name)) {
      button.innerText = "Unfavorite";
      let i = document.createElement("i");
      i.setAttribute("class","fa fa-trash");
      button.appendChild(i);
    }
    else {
      button.innerText = "Add to favorites";
      let i = document.createElement("i");
      i.setAttribute("class","fal fa-star");
      button.appendChild(i);
    }
  }
  else {
    button.innerText = "Add to favorites";
    let i = document.createElement("i");
    i.setAttribute("class","fal fa-star");
    button.appendChild(i);
  }
}
function mark(element) {
  let name, index, moviename;
  name = document.title;
  moviename = document.getElementsByClassName("name")[0].innerText;
  if (element.getElementsByTagName("i")[0].classList.contains("fa-star")) {
    list.push(name);
    localStorage.setItem("favorites", JSON.stringify(list));
    alert(moviename + " is added to your favorites!")
    loadfavbutton();
  }
  else {
    index = list.indexOf(name);
    list.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(list));
    alert(moviename + " is removed from your favorites!")
    loadfavbutton();
  }
}
function star(element){
  element.getElementsByClassName('fa-star')[0].classList.toggle("fa-solid");
  let parent, name, index, span;
  parent = element.parentNode;
  name = parent.getElementsByClassName("movienames")[0].innerText;
  span = element.getElementsByClassName("texttip")[0];
  if (element.getElementsByClassName("fa-solid")[0]){
    span.textContent = "Unmark as favourite";
    list.push(name);
    localStorage.setItem("favorites", JSON.stringify(list));
  }
  else {
    span.textContent = "Mark as favourite";
    index = list.indexOf(name);
    list.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(list));
  }
}
if (localStorage.getItem('favorites') == "" || localStorage.getItem('favorites') == undefined ) {
  var list = new Array();
}
else {
  var list = JSON.parse(localStorage.getItem('favorites'));
}
function loadfavorite() {
  let numb = document.getElementsByClassName("recent")[0].childElementCount;
  let children = document.getElementsByClassName("recent")[0].children;
  for (let i = 0; i < numb; i ++) {
    let title = (children.item(i)).getElementsByClassName("movienames")[0].innerText;
    let span = (children.item(i)).getElementsByClassName('texttip')[0];
    if (list.includes(title)) {
      (children.item(i)).getElementsByClassName('fa-star')[0].classList.toggle("fa-solid");
      span.textContent = "Unmark as favourite";
    }
    else {
      span.textContent = "Mark as favourite";
    }
  }
  const hiddenElements = document.querySelectorAll('.item');
  hiddenElements.forEach((el) => observer.observe(el));
}
function loaddb() {
  loadmovies();
  itemfix();
  searchlist();
  loadfavorite();
  if (document.title == "Flux - Browse") {
  result();
  }
}
function loadmovies() {
  let iframe = document.getElementById('database');
  let iframecontent = iframe.contentDocument || iframe.contentWindow.document;
  let content = (iframecontent.getElementsByTagName("html")[0]).getElementsByTagName("body")[0];
  // if (content.getElementsByTagName('script')[0]) {
  //   var ele = content.getElementsByTagName('script')[0];
  // }
  // if(ele.parentNode){
  //   ele.parentNode.removeChild(ele);
  // }

  let childs = content.children;
  let numb = content.childElementCount;
  let movies = document.getElementsByClassName("recent")[0]
  let sortmovies = [];
  if (document.title != "Flux - Home") {
    for (let i = 0; i < numb; i ++) {
      let title = (childs.item(i)).getElementsByClassName("movienames")[0].innerText;
      sortmovies.push(title);
    }
    sortmovies = sortmovies.sort();
    for (let i = 0; i < numb; i ++) {
      let movielist = content.querySelectorAll('.movienames');
      for (let x = 0; x < movielist.length; x ++) {
        if (movielist[x].textContent.toLowerCase().includes(sortmovies[i].toLowerCase())) {
          let movie = ((movielist[x].parentNode).parentNode).cloneNode(true);
          movies.appendChild(movie);
        }
      }
    }
  }
  else {
    movies.innerHTML = content.innerHTML;
  }
}
function cleanfavorites() {
  if (confirm("Are you sure you want to delete all your favorite movies?")) {
    alert("Your favorite movies are deleted.")
    localStorage.setItem("favorites","");
    list.splice(0, 1);
  }
  location.reload()
}
function checkfavorites() {
  let iframe = document.getElementById('database');
  let iframecontent = iframe.contentDocument || iframe.contentWindow.document;
  let content = (iframecontent.getElementsByTagName("html")[0]).getElementsByTagName("body")[0];
  // if (content.getElementsByTagName('script')[0]) {
  //   var ele = content.getElementsByTagName('script')[0];
  // }
  // if(ele.parentNode){
  //   ele.parentNode.removeChild(ele);
  // }
  let childs = content.children;
  let numb = content.childElementCount;
  let moviedir = document.getElementsByClassName("recent")[0];
  for (let i = 0; i < numb; i ++) {
    let title = ((childs.item(i)).getElementsByClassName("movienames")[0].innerText).toLowerCase();
    if ((list.toString().toLowerCase()).includes(title)) {
      let movie = document.createElement("div");
      movie.setAttribute("class", "item");
      movie.innerHTML = childs.item(i).innerHTML
      moviedir.append(movie);
    }
  }
  if (document.getElementsByClassName("recent")[0].childElementCount == 0 ) {
    document.getElementsByClassName("noresults")[0].style.visibility = "visible"
    document.getElementsByClassName("noresults")[0].style.opacity = 1
    document.getElementsByClassName("noresults")[0].style.transform = "translateY(0)"
  }
  else {
    document.getElementsByClassName("noresults")[0].style.visibility = "hidden"
    document.getElementsByClassName("noresults")[0].style.opacity = 0
    document.getElementsByClassName("noresults")[0].style.transform = "translateY(50%)"
  }
  itemfix();
  searchlist();
  loadfavorite();
}
function scroller() {
  let content = document.getElementById("content").offsetTop;
  window.scrollTo({ top: content, behavior: 'smooth'});
}
// const scrollContainer = document.querySelector(".wrapper");
// scrollContainer.addEventListener("wheel", (evt) => {
//     evt.preventDefault();
//     scrollContainer.scrollLeft += evt.deltaY;
// });