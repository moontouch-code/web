
const baseSize = 16;
function setRem() {
  if (window.screen.height / window.screen.width <= 1.78 && window.screen.height / window.screen.width > 1) {
    document.documentElement.getElementsByTagName("body")[0].classList.add("short");
  } else {
    document.documentElement.getElementsByTagName("body")[0].classList.remove("short");
  }
  const scale = document.documentElement.clientWidth / 1920;
  if (document.documentElement.clientWidth < 1100) {
    document.documentElement.style.fontSize = document.documentElement.clientWidth * 16 / 390 + 'px'
  } else {
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
  }
}
// window.onresize = function () {
//   setRem();
//   if(live2dLoader.LAppDelegate.getInstance().initialize() == true){
//        live2dLoader.resizeL12d()
//   }
// }
function debounce(fn){
  let timer;
  return function(){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      fn();
    },200)
  }

}
function resizeView(){
  setRem();
  live2dLoader.resizeL12d();
}
// window.addEventListener("resize", debounce(resizeView))
window.addEventListener("resize",resizeView)
window.addEventListener('load', setRem, false);
document.addEventListener('DOMContentLoaded', setRem, false);
window.onload = function () {
  var lastTouchEnd = 0;
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });

  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
}

