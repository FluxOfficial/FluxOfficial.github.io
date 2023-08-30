document.write(`
<div class="banner"></div>
<nav class="homebuttons">
    <a href="../index.html">Home</a>
    <a href="../browse.html">Browse</a>
    <a href="../watchlist.html">Watchlist</a>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdzEgol-sxPErk3VISbWtyme0CJLHpy1vfXYljVY49jxgmhCA/viewform?usp=sf_link" target="_blank">Requests</a>
</nav>
<div class="browsebutton">
    <div id="nav-icon4" onclick="menu()">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <ul class="dropdown">
    <li><a href="../index.html">Home</a></li>
    <li><a href="../watchlist.html">Watchlist</a></li>
    <li><a href="../browse.html">Browse</a></li>
    <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdzEgol-sxPErk3VISbWtyme0CJLHpy1vfXYljVY49jxgmhCA/viewform?usp=sf_link" target="_blank">Requests</a></li>
    <li><button class="signin" onclick="window.location.href = '../signin.html';">Sign In</button></li>
  </ul>
  <button class="topjumper" onclick="topFunction()" title="Go to top"><i class="arrow up"></i></button>
  <a href="../index.html" class="title">FL<span class="letteru">U</span>X</a>
<img class="logo" src="../images/logo 2.0.png">
<div class="shadow"></div>
<div class="bottomcontainer">
    <a class="form" href="https://docs.google.com/forms/d/e/1FAIpQLSeDwzTaWZXFKM8wFAJj5uINJbr0LSCCy9lbH4nnpviGJeCoNw/viewform?usp=sf_link" target="_blank">
    Feedback</a>
    <footer class="footer">&copy;Copyright 2022 RT-Productions</footer>
    <section>
      <a onclick='showcontact()'>contact</a>
      <a href="../about.html">about</a>
      <a>donate</a>
      <a href="../roadmap.html">roadmap</a>
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