document.getElementById("save").addEventListener("click", () => {
  const token = document.getElementById("token").value;
  chrome.storage.sync.set({ notionApiToken: token }, () => {
    alert("Token saved!");
  });
});
