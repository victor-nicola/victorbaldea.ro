var nav = document.getElementById("navbar");
var content = document.getElementById("myModal");
var arrows = document.getElementsByClassName("arrow-holder")[0];
var img = document.getElementById("expandedPreview");
var previews = document.getElementsByClassName("myImg");
var array = [];
var path;

var slideIndex = 1;
window.addEventListener("resize", function resize() {
  content.style.marginTop = nav.clientHeight + "px";
  img.style.height = content.clientHeight - nav.clientHeight - 20 + "px";
  arrows.style.marginTop = img.clientHeight / 2 - 16 + "px";
});

function openModal() {
  content.style.marginTop = nav.clientHeight + "px";
  content.style.display = "block";
  console.log(document.getElementById("nav-wrapper").clientHeight);
}

function closeModal() {
  content.style.display = "none";
  img.src = "";
}

function centerArrows() {
  arrows.style.marginTop = img.clientHeight / 2 - 16 + "px";
}

getOrderOfPics();

function getOrderOfPics() {
  path = previews[0].src.substring(0, previews[0].src.indexOf(".jpg") - 1);
  if ('0' <= path[path.length - 1] && path[path.length - 1] <= '9')
    path = path.substring(0, path.length - 1);
  for ( var i = 0; i < previews.length / 2; i ++ ) {
    var str = previews[i].src.substring(0, previews[i].src.indexOf(".jpg"));
    if ('0' <= str[str.length - 2] && str[str.length - 2] <= '9')
      array[i] = (str[str.length - 2] - '0') * 10 + (str[str.length - 1] - '0');
    else
      array[i] = str[str.length - 1] - '0';
  }
}

function plusSlides(n) {
  if (slideIndex + n > previews.length / 2) {slideIndex = 1 - n}
  if (slideIndex + n < 1) {slideIndex = previews.length / 2 - n}
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  if (n > previews.length / 2) {n = 1}
  if (n < 1) {n = previews.length / 2}
  img.src = path + array[n - 1] + "-max.jpg";
  img.style.height = content.clientHeight - nav.clientHeight - 20 + "px";
  img.style.marginTop = (content.clientHeight - nav.clientHeight - img.clientHeight) / 2 + "px";
}