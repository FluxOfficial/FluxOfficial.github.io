const observer = new IntersectionObserver((entries) => {
 entries.forEach((entry) => {
    if (entry.isIntersecting) {
        entry.target.classList.add('show');
    } else {
        entry.target.classList.remove('show');
    }
 });
});
// const containerobserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//        if (entry.isIntersecting) {
//            entry.target.classList.add('show');
//        } else {
//            entry.target.classList.remove('show');
//        }
//     });
//    });

// const hiddenElements = document.querySelectorAll('.recent');
// hiddenElements.forEach((el) => containerobserver.observe(el));