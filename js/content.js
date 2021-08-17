var img = `<img id="ico-log" src="${chrome.runtime.getURL("img/logs32.png")}" alt="" />`;


function createAddButoon() {
  if ($("#comment-popup").length > 0 && $("#addDescription").length <= 0) {
    var span = document.createElement("span");
    span.setAttribute("id", "addDescription");
    span.innerHTML = img;
    $("#comment-popup").after(span);
    span.addEventListener("click", function() {
      chrome.storage.sync.get("description", function (data) {
        if (data && data.description) {
          var desc = data.description;
          var val = `${desc.action} [ ${desc.func_name} ] <${desc.testcase}> <${desc.bug}>`;
          $("#comment-popup").val(val);
        }
      });
    })
  }

}

$(document).ready(function() {
  setInterval(function() {
    createAddButoon();
  }, 1000)
})