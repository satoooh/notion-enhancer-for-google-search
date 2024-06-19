document.getElementById("save").addEventListener("click", () => {
  const token = document.getElementById("token").value;
  const titlePropertyName = document.getElementById("titlePropertyName").value;
  chrome.storage.sync.set(
    { notionApiToken: token, notionTitlePropertyName: titlePropertyName },
    () => {
      alert("Settings saved!");
    }
  );
});
