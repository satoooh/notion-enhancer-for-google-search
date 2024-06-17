const searchQuery = new URL(window.location.href).searchParams.get("q");

function showNotionResults(results) {
  const resultsContainer = document.createElement("div");
  resultsContainer.className = "notion-search-results";

  resultsContainer.innerHTML = `
    <h2>Notion Search Results</h2>
    ${
      results.length
        ? results
            .map(
              (result) => `
      <a href="${result.url}" target="_blank">
        ${result.properties["名前"].title[0].plain_text}
      </a><br />
    `
            )
            .join("")
        : "<p>No results found</p>"
    }
  `;

  const rhs = document.getElementById("rhs");
  const rcnt = document.getElementById("rcnt");

  if (rhs) {
    rhs.prepend(resultsContainer);
  } else if (rcnt) {
    const newRhs = document.createElement("div");
    newRhs.setAttribute("id", "rhs");
    rcnt.appendChild(newRhs);
    newRhs.prepend(resultsContainer);
  } else {
    console.error(
      "Unable to find the target element to append the search results."
    );
  }
}

if (searchQuery) {
  chrome.storage.sync.get("notionApiToken", (data) => {
    const NOTION_API_TOKEN = data.notionApiToken;
    if (NOTION_API_TOKEN) {
      chrome.runtime.sendMessage(
        {
          action: "fetchData",
          url: "https://api.notion.com/v1/search",
          token: NOTION_API_TOKEN,
          body: {
            query: searchQuery,
            sort: {
              direction: "ascending",
              timestamp: "last_edited_time",
            },
          },
        },
        (response) => {
          if (response.error) {
            console.error(response.error);
          } else {
            console.log(response.data);
            showNotionResults(response.data.results);
          }
        }
      );
    } else {
      console.error("Notion API Token is not set.");
    }
  });
}
