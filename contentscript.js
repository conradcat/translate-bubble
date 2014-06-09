// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    sendRequest(e.clientX, e.clientY, selection);
  }
}, false);

// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  bubbleDOM.style.visibility = 'hidden';
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
  bubbleDOM.innerHTML = selection;
  bubbleDOM.style.top = (mouseY-40) + 'px';
  bubbleDOM.style.left = mouseX + 'px';
  bubbleDOM.style.visibility = 'visible';
}

function sendRequest(mouseX, mouseY, selection){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://cdict.net/?q=" + selection, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // innerText does not let the attacker inject HTML elements.
      renderBubble(mouseX, mouseY, xhr.responseText);
    }
  }
  xhr.send();
}
