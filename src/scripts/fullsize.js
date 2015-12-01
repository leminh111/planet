export default function(selector) {
  // on event resize and load
  // find all .fluid and set width height attribute for each
  function setFullsize() {
    var els = document.querySelectorAll(selector);
    for (var i=0; i<els.length; i++) {
      var el = els[i];

      // Canvas need width&height attr so the ratio remains 1:1
      if (el.nodeName == 'CANVAS') {
        el.setAttribute('width', window.innerWidth);
        el.setAttribute('height', window.innerHeight);
      }

      el.style.width = window.innerWidth + 'px';
      el.style.height = window.innerHeight + 'px';

    }
  }

  window.addEventListener('resize', setFullsize, false);
  document.addEventListener('DOMContentLoaded', setFullsize, false);
}
