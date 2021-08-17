var actionModal = new bootstrap.Modal(document.getElementById("actionModal"), {
  keyboard: false,
});

document.getElementById("addAction").addEventListener("click", function () {
  actionModal.toggle();
});

function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  chrome.storage.sync.set({ description: formProps }, function () {
    alert('Save success!')
  });
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.getElementById("frm1").addEventListener("submit", submitForm);

    chrome.storage.sync.get("description", function (data) {
      // check if data exists.
      if (data.description) {
        for (const [key, value] of Object.entries(data.description)) {
          document.getElementById(key).value = value;
        }
      }
    });
  },
  false
);
