// fill out menu items
(function() {
    console.log("Filling out menu with", menu.length, "items");
    html = "";
    for (var i=0; i<menu.length; i+=2) {
      html = html.concat(" <li class=\"pure-menu-item\"><a href=\"" + menu[i+1] +
          "\" class=\"pure-menu-link\">" + menu[i] + "</a></li>");
    }
    document.getElementById("menu-list").innerHTML = html;
    v = document.getElementById("version");
    if (v != null) { v.innerHTML = version; }
}());

(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };

}(this, this.document));

function showWarning(text) {
  var el = $("#warning");
  el.innerHTML = text;
  el.removeAttribute('hidden');
}
function hideWarning(text) {
  el = $("#warning").setAttribute('hidden', '');
}
function showNotification(text) {
  var el = $("#notification");
  el.innerHTML = text;
  el.removeAttribute('hidden');
  setTimeout(function() { el.setAttribute('hidden', ''); }, 4000);
}

function ajaxReq(method, url, ok_cb, err_cb) {
  var xhr = j();
  xhr.open(method, url);
  var timeout = setTimeout(function() {
    xhr.abort();
    err_cb(599, "Request timeout");
  }, 20000);
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) { return; }
    clearTimeout(timeout);
    if (xhr.status >= 200 && xhr.status < 300) {
      ok_cb(xhr.responseText);
    } else {
      err_cb(xhr.status, xhr.statusText);
    }
  }
  xhr.send();
}

function ajaxJson(method, url, ok_cb, err_cb) {
  ajaxReq(method, url, function(resp) { ok_cb(JSON.parse(resp)); }, err_cb);
}

function ajaxSpin(method, url, ok_cb, err_cb) {
  $("#spinner").removeAttribute('hidden');
  console.log("starting spinner");
  ajaxReq(method, url, function(resp) {
      $("#spinner").setAttribute('hidden', '');
      ok_cb(resp);
    }, function(status, statusText) {
      $("#spinner").setAttribute('hidden', '');
      showWarning("Request error: " + statusText);
      err_cb(status, statusText);
    });
}

function ajaxJsonSpin(method, url, ok_cb, err_cb) {
  ajaxSpin(method, url, function(resp) { ok_cb(JSON.parse(resp)); }, err_cb);
}


