
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
        $('#header').addClass('fixed');
    } else {
        $('#header').removeClass('fixed');
    }
});

//=============================== mega menu js below 
document.addEventListener("click", function (e) {

  const toolsBtn = e.target.closest("#toolsBtn");
  const blogBtn = e.target.closest("#blogBtn");

  const toolsItem = document.getElementById("toolsItem");
  const blogItem = document.getElementById("blogItem");

  const toolsMenu = document.getElementById("toolsMenu");
  const blogMenu = document.getElementById("blogMenu");

  if (toolsBtn) {

    e.preventDefault();

    const open = toolsMenu.classList.contains("open");

    toolsMenu.classList.remove("open");
    blogMenu.classList.remove("open");

    toolsItem.classList.remove("open");
    blogItem.classList.remove("open");

    if (!open) {
      toolsMenu.classList.add("open");
      toolsItem.classList.add("open");
    }

    return;
  }

  if (blogBtn) {

    e.preventDefault();

    const open = blogMenu.classList.contains("open");

    toolsMenu.classList.remove("open");
    blogMenu.classList.remove("open");

    toolsItem.classList.remove("open");
    blogItem.classList.remove("open");

    if (!open) {
      blogMenu.classList.add("open");
      blogItem.classList.add("open");
    }

    return;
  }

  if (
    !e.target.closest("#toolsBtn") &&
    !e.target.closest("#blogBtn") &&
    !e.target.closest("#toolsMenu") &&
    !e.target.closest("#blogMenu")
  ) {
    toolsMenu.classList.remove("open");
    blogMenu.classList.remove("open");

    toolsItem.classList.remove("open");
    blogItem.classList.remove("open");
  }
});


document.addEventListener("click", function (e) {

  const hamburger = e.target.closest("#hamburger");

  if (hamburger) {

    hamburger.classList.toggle("open");

    document
      .getElementById("mobileMenu")
      ?.classList.toggle("open");

    return;
  }

  if (e.target.closest("#mToolsTitle")) {

    e.target
      .closest("#mToolsTitle")
      .classList.toggle("expanded");

    document
      .getElementById("mToolsBody")
      ?.classList.toggle("open");

    return;
  }

  if (e.target.closest("#mBlogTitle")) {

    e.target
      .closest("#mBlogTitle")
      .classList.toggle("expanded");

    document
      .getElementById("mBlogBody")
      ?.classList.toggle("open");

    return;
  }

});

// End mega menu


// ==================back to tp started
function backToTopFunction() {

  const backToTop = document.getElementById('backToTop');

  if (!backToTop) return;

  window.addEventListener('scroll', function () {

    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }

  });

  backToTop.addEventListener('click', function (e) {

    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

}

document.addEventListener('DOMContentLoaded', backToTopFunction);



// End back to top

// // coockies js
function cookieConsentFunction() {

  const cookieBanner = document.getElementById("cookieConsent");
  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("declineCookies");

  if (!cookieBanner || !acceptBtn || !declineBtn) return;

  const consent = localStorage.getItem("cookieConsent");

  if (consent) {
    cookieBanner.style.display = "none";
  }

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    cookieBanner.style.display = "none";
  });

  declineBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "declined");
    cookieBanner.style.display = "none";
  });

}
// End Cooclies JS

$(document).ready(function () {
  $("#header").load("/master/header.html", function () { });
  $("#footer").load("/master/footer.html", function () {

    backToTopFunction();
    cookieConsentFunction();

  });
});


 
