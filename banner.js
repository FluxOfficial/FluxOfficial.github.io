document.write(`
<div class="banner"></div>
<nav class="homebuttons">
    <a href="../index.html">Home</a>
    <a href="../browse.html">Browse</a>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdzEgol-sxPErk3VISbWtyme0CJLHpy1vfXYljVY49jxgmhCA/viewform?usp=sf_link" target="_blank">Requests</a>
</nav>
<div class="browsebutton">
    <div id="nav-icon4" onclick="menu()">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div class="dropdown">
    <a href="../index.html">Home</a>
    <a href="../browse.html">Browse</a>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdzEgol-sxPErk3VISbWtyme0CJLHpy1vfXYljVY49jxgmhCA/viewform?usp=sf_link" target="_blank">Requests</a>
  </div>
  <button class="topjumper" onclick="topFunction()" title="Go to top"><i class="arrow up"></i></button>
<a href="../index.html" class="title">FL<span style="
    background-image: linear-gradient(5deg, #111010, #ca3025);
    background-size: 100%;
    -webkit-background-clip: text;
  -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
    filter: drop-shadow(0 0mm 1mm rgb(0, 0, 0));"
    >U</span>X</a>
<img class="logo" src="../logo 2.0.png">
<div class="shadow"></div>
<div class="bottomcontainer">
    <a class="form" href="https://docs.google.com/forms/d/e/1FAIpQLSeDwzTaWZXFKM8wFAJj5uINJbr0LSCCy9lbH4nnpviGJeCoNw/viewform?usp=sf_link" target="_blank">
    Feedback</a>
    <footer class="footer">&copy;Copyright 2022 RT-Productions</footer>
    <section>
      <p onclick='showcontact()'>contact</p>
      <p>info</p>
      <p>donate</p>
    </section>
    </div>
    <form class="contact"  action="https://formsubmit.co/213153c9e78cadd2bd1a111bc371d0fd" method="POST" target="_blank" >
    <h1>Contact Us</h1>
    <p>We'd Love To Hear From You!</p>
    <div class="inputcontainer">
      <input type="text" id="name" name="Name" placeholder="Name" required>
      <input type="text" id="mail" name="E-mail" placeholder="E-mail" required>
      <textarea type="text" id="msg" name="Message" placeholder="Message" required></textarea>
    </div>
    <button type="submit" >Send</button>
  </form>
`);