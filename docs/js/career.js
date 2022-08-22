const myCarousel = document.getElementById("carouselExampleControls");
const indicator = document.querySelectorAll(".indicator");

myCarousel.addEventListener("slide.bs.carousel", (event) => {
  indicator.forEach((element) => {
    if (event.to + 1 == element.ariaLabel) {
      element.classList.add("highlight");
    } else {
      element.classList.remove("highlight");
    }
  });
  console.log(event.to);
});
