var actions = [];

// Add a "checked" symbol when clicking on a list item
// var list = document.querySelector("ul");
// list.addEventListener(
//   "click",
//   function (ev) {
//     if (ev.target.tagName === "LI") {
//       ev.target.classList.toggle("checked");
//     }
//   },
//   false
// );

function closeBtn(li) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.addEventListener("click", delAction);
}

function delAction(e) {
  actions = actions.filter(
    (item) => item !== e.target.parentElement.childNodes[0].nodeValue
  );
  // Get Actions
  saveActions();
  getActions();
}

// Create a new list item when clicking on the "Add" button
function newElement(text) {
  var li = document.createElement("li");
  var noteTxt = document.createTextNode(text);
  li.appendChild(noteTxt);
  document.getElementById("lstAction").appendChild(li);
  document.getElementById("myInput").value = "";
  closeBtn(li);
}

function newOptions(value) {
  var options = document.createElement("option");
  var t = document.createTextNode(value);
  options.setAttribute("value", value);
  options.appendChild(t);
  chrome.storage.sync.get("description", function (data) {
    // check if data exists.
    if (data.description && data.description.action === value) {
      options.setAttribute("selected", true);
    }
  });
  document.getElementById("action").appendChild(options);
}

function saveActions() {
  chrome.storage.sync.set({ actions: actions }, function () {
    console.log("Actions set " + actions);
  });
}

function getActions() {
  document.getElementById("lstAction").innerHTML = "";
  document.getElementById("action").innerHTML = "";
  chrome.storage.sync.get("actions", function (data) {
    // check if data exists.
    if (data.actions) {
      actions = data.actions;
      // Create a "close" button and append it to each list item
      for (item of actions) {
        newElement(item);
        newOptions(item);
      }
    }
  });
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Insert actions
    document.querySelector(".addBtn").addEventListener("click", function () {
      var inputValue = document.getElementById("myInput").value;
      if (inputValue === "") {
        alert("You must write something!");
      } else {
        actions = [...actions, inputValue];
        newElement(inputValue);
        newOptions(inputValue);
      }
    });

    // Save actions
    document
      .querySelector(".saveActions")
      .addEventListener("click", function () {
        saveActions();
        actionModal.toggle();
      });

    // Get Actions
    getActions();
  },
  false
);
