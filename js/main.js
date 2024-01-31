(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  // Get the services-container element
  var servicesContainer = document.getElementById("services-container");

  // Get all service links
  var serviceLinks = document.querySelectorAll("nav a");

  // Add click event listener to each service link
  serviceLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // Prevent default link behavior
      event.preventDefault();

      // Get the href attribute of the clicked link
      var href = link.getAttribute("href").substring(1); // Remove the leading "/"

      // Remove the "active" class from all service links
      serviceLinks.forEach(function (serviceLink) {
        serviceLink.classList.remove("active");
      });

      // Add the "active" class to the clicked link
      link.classList.add("active");

      // Fetch and display the corresponding service content
      fetchServiceContent(href);
    });
  });

  // Function to fetch and display service content
  function fetchServiceContent(service) {
    // Assuming you have separate HTML files for each service (service1.html, service2.html, etc.)
    fetch(`/service/${service}.html`)
      .then((response) => response.text())
      .then((html) => {
        // Set the innerHTML of services-container to the fetched HTML
        servicesContainer.innerHTML = html;

        // Add the "active" class to the corresponding service content
        servicesContainer.querySelector(`#${service}`).classList.add("active");
      })
      .catch((error) =>
        console.error("Error fetching service content:", error)
      );
  }
});
