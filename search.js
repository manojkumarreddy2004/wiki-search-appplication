let searchInputEle = document.getElementById("searchInput");
let searchResultsEle = document.getElementById("searchResults");
let spinnerEle = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;

    //create result item container
    let resultItemEle = document.createElement("div");
    resultItemEle.classList.add("result-item");
    searchResultsEle.appendChild(resultItemEle);

    //creating anchor title element
    let resultTitleEle = document.createElement('a');
    resultTitleEle.classList.add("result-title");
    resultTitleEle.textContent = title;
    resultTitleEle.setAttribute("href", link);
    resultTitleEle.setAttribute("target", "_blank");
    resultItemEle.appendChild(resultTitleEle);

    //create title break element
    let titleBreakEle = document.createElement("br");
    resultItemEle.appendChild(titleBreakEle);

    //create url element
    let urlEle = document.createElement("a");
    urlEle.classList.add("result-url");
    urlEle.href = link;
    urlEle.textContent = link;
    urlEle.target = "_blank";
    resultItemEle.appendChild(urlEle);

    //create break element
    let urlBreakEle = document.createElement("br");
    resultItemEle.appendChild(urlBreakEle);

    //create description element
    let descEle = document.createElement("p");
    descEle.textContent = description;
    descEle.classList.add("link-description");
    resultItemEle.appendChild(descEle);
}

function displayResults(searchResults) {
    spinnerEle.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function getResult(event) {
    if (event.key === "Enter") {
        searchResultsEle.textContent = "";
        spinnerEle.classList.toggle("d-none");
        let searchText = searchInputEle.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + 
searchText;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEle.addEventListener("keydown", getResult);
