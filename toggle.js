function toggle() {
  // Gets the style tag with id dark from dom 
  var q = document.querySelectorAll("#dark"),

  // Gets head tag from dom
      h = document.getElementsByTagName("head")[0],

  // Creates a style tag element
      s = document.createElement("style");
      
  // If style tag with id dark is already present
  if (q.length) {
    // Removes the style tag with id dark for disabling dark mode
    q[0].parentNode.removeChild(q[0]);

    // Removes isDarkMode variable from localstorage
    localStorage.removeItem("isDarkMode");
    return false;
  }
  // Else

  // Sets style tag's type
  s.setAttribute("type", "text/css");

  // Sets style tag's id
  s.setAttribute("id", "dark");

  // Injects Css for dark mode inside style tag
  s.appendChild(
    document.createTextNode(
      "html{ -webkit-filter: invert(100%) hue-rotate(180deg) contrast(70%) !important; background: #fff; } .line-content { background-color: #fefefe; }"
    )
  );

  // Appends the style tag in head tag to apply the css for dark mode on the website
  h.appendChild(s);

  // Sets isDarkmode variable in localstorage to check if dark mode is already enabled on the website when the extension is opened again
  localStorage.setItem("isDarkMode", true);
  return true;
}

var enabled = toggle();
