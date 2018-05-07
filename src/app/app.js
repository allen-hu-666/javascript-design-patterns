//import './app.scss';
import '../utils/document-ready.js';


window.switchNavTab = function (id) {
  const activeDOM = document.getElementById(id + '-nav-tab');
  if(!activeDOM) return;
  const brothers = activeDOM.parentNode.childNodes;

  for (const item of brothers) {
    if (item.classList && item.classList.remove) {
      item.classList.remove("active");
    }
  }
  activeDOM.classList.add("active");
}

document.ready(function () {
  //console.log("asdsa")
  //console.log(window.location.hash)
  var hash = window.location.hash;
  if(!!hash) {
    window.switchNavTab(hash.replace(/#/,''))
  }

  // 让md里的链接打开新的tab页
  var aTagArr = [].slice.apply(document.getElementsByTagName("a"));
  
  aTagArr.forEach(function (e, i) {
    e.href.indexOf("_blank") > -1 ? e.target = "_blank" : null;
    e.href = e.href.replace(/\?_blank/,'');
  });
});
