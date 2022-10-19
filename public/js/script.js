//Get the button
var goto = document.getElementById("goto");
goto.addEventListener("click", topFunction);
const career = document.querySelector(".nav-career");
console.log(career);

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    goto.style.display = "block";
  } else {
    goto.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onload = function () {
  var el = document.getElementById("career-jobs");
  el.scrollIntoView({
    behavior: "smooth",
  });
};
