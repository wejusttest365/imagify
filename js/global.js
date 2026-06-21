
$(window).on('scroll', function () {
  if ($(this).scrollTop() > 100) {
    $('#header').addClass('fixed');
  } else {
    $('#header').removeClass('fixed');
  }
});

//=============================== unified nav menu
var isMobile = function () { return window.innerWidth <= 900; };

var dropConfigs = [
  { btnId: "toolsBtn", itemId: "toolsItem", menuId: "toolsMenu" },
  { btnId: "utilityBtn", itemId: "utilityItem", menuId: "utilityMenu" },
  { btnId: "resourcesBtn", itemId: "resourcesItem", menuId: "resourcesMenu" }
];

function closeAll() {
  dropConfigs.forEach(function (c) {
    var item = document.getElementById(c.itemId);
    var menu = document.getElementById(c.menuId);
    if (item) item.classList.remove("open");
    if (menu) menu.classList.remove("open");
  });
}

function openDrop(itemId, menuId) {
  closeAll();
  var item = document.getElementById(itemId);
  var menu = document.getElementById(menuId);
  if (item) item.classList.add("open");
  if (menu) menu.classList.add("open");
}

function initNavMenu() {
  // Click: toggle on mobile, toggle on desktop
  document.addEventListener("click", function (e) {
    // hamburger toggles the nav
    var hamburger = e.target.closest("#hamburger");
    if (hamburger) {
      hamburger.classList.toggle("open");
      var nav = document.getElementById("mainNav");
      if (nav) nav.classList.toggle("open");
      return;
    }

    // dropdown buttons
    for (var i = 0; i < dropConfigs.length; i++) {
      var c = dropConfigs[i];
      if (e.target.closest("#" + c.btnId)) {
        e.preventDefault();
        var menu = document.getElementById(c.menuId);
        var isOpen = menu && menu.classList.contains("open");
        closeAll();
        if (!isOpen) openDrop(c.itemId, c.menuId);
        return;
      }
    }

    // click outside closes all (desktop only)
    if (!isMobile()) {
      var insideAny = dropConfigs.some(function (c) {
        return e.target.closest("#" + c.menuId);
      });
      if (!insideAny) closeAll();
    }
  });

  // Hover: desktop only
  dropConfigs.forEach(function (c) {
    var itemEl = document.getElementById(c.itemId);
    var menuEl = document.getElementById(c.menuId);
    if (!itemEl || !menuEl) return;

    function openThis() {
      if (isMobile()) return;
      openDrop(c.itemId, c.menuId);
    }

    function tryClose() {
      if (isMobile()) return;
      setTimeout(function () {
        if (!menuEl.matches(":hover") && !itemEl.matches(":hover")) closeAll();
      }, 100);
    }

    itemEl.addEventListener("mouseenter", openThis);
    menuEl.addEventListener("mouseenter", openThis);
    itemEl.addEventListener("mouseleave", tryClose);
    menuEl.addEventListener("mouseleave", tryClose);
  });
}
// End nav menu


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
  $("#header").load("https://webtoolocean.com/master/header.html", function () {
    initNavMenu();
  });
  $("#footer").load("https://webtoolocean.com/master/footer.html", function () {

    backToTopFunction();
    cookieConsentFunction();

  });
});



