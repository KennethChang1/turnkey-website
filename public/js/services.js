$(() => {
  const urlParams = new URLSearchParams(window.location.search);

  $(".serviceContainer").hide();

  const servicesSwiper = new Swiper(".services-swiper-container", {
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      993: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  if (urlParams.has("service")) {
    const targetService = urlParams.get("service");

    $(`#${targetService}`).show();
    $(`#otherServices .${targetService}`).addClass("active");
    $(`#accordion-${targetService} .accordion-button`).removeClass("collapsed");
    $(`#accordion-${targetService}`)
      .next(".accordion-collapse")
      .addClass("show");

    if (window.innerWidth < 768) {
      $("html").animate(
        {
          scrollTop: $(`#accordion-${targetService}`).offset().top - 50,
        },
        800 //speed
      );
    } else {
      $("html").animate(
        {
          scrollTop: $(`#serviceWrapper`).offset().top - 100,
        },
        800 //speed
      );
    }
  } else {
    $(".serviceContainer").first().show();
    $("#otherServices .cardContainer").first().addClass("active");
  }

  $(".cardContainer").click(function () {
    let targetId = $(this).attr("data-target");

    $("#otherServices .cardContainer").removeClass("active");
    $(".serviceContainer").hide();
    $(this).addClass("active");

    $(`#${targetId}`).fadeIn();
  });

  $(".mobileTabs .btnMain").click(function () {
    let targetId = $(this).attr("data-target");

    $(".mobileTabs .btnMain").removeClass("active");
    $(".serviceContainer").hide();
    $(this).addClass("active");

    $(`#${targetId}`).fadeIn();
  });
});
