import './app.scss';
import '../utils/document-ready.js';

document.ready(function () {
  //console.log("asdsa")
});

window.switchNavTab = function (id) {
  const activeDOM = document.getElementById(id + '-nav-tab');
  const brothers = activeDOM.parentNode.childNodes;

  for (const item of brothers) {
    if (item.classList && item.classList.remove) {
      item.classList.remove("active");
    }
  }
  activeDOM.classList.add("active");
}
