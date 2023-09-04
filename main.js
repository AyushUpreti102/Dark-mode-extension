// Get heading, toggleButton and toggleSwitch elements from dom
const heading = document.getElementsByClassName("heading").item(0),
      toggleButton = document.getElementsByClassName("toggle-button").item(0),
      toggleSwitch = document.getElementsByClassName("toggle-switch").item(0);

// Get active tab info with chrome tabs api
async function getActiveTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.id;
}

// checks if darkmode is already enabled for the website
async function darkModeAlreadyEnabled() {
  // Executes script on the active tab to check if isDarkMode variable is present inside localstorage
  const fromPageLocalStore = await chrome.scripting.executeScript({
    target: { tabId: await getActiveTabId() },
    function: () => {
      return JSON.stringify(localStorage);
    }
  });
  const localStorageItems = JSON.parse(fromPageLocalStore[0].result);
  return localStorageItems.hasOwnProperty("isDarkMode");
}

// If dark mode is already enabled then applies toggle css
darkModeAlreadyEnabled().then(alreadyEnabled => {
  if(alreadyEnabled) {
    switchActive();
  }
});

// Removes toggle css
function switchDisable() {
  toggleButton.classList.remove("toggle-button-active");
  toggleSwitch.classList.remove("toggle-switch-active");
  heading.innerHTML = "Enable Dark Mode";
}

// Adds toggle css
function switchActive() {
  toggleButton.classList.add("toggle-button-active");
  toggleSwitch.classList.add("toggle-switch-active");
  heading.innerHTML = "Disable Dark Mode";
}

toggleButton.addEventListener("click", async () => {
  // Change's css when the toggle button is enabled or disabled
  toggleButton.classList.contains("toggle-button-active") ? switchDisable() : switchActive();

  // Executes script on the active tab
  chrome.scripting.executeScript({ target: { tabId: await getActiveTabId() }, files: ["toggle.js"] });
})
