// js file using reddit api
import reddit from './redditapi';

// primary global variables 
const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.search-input');
const resultArea = document.getElementById('result');

// error status 
let errorStatus = false;

// 'submit' - if form is submitted, perform callback 
searchForm.addEventListener('submit', (e) => {
    
    // get search term
    const searchTerm = searchInput.value;
    // get radio check boxes
    const sortBy = document.querySelector('input[class="sort"]:checked').value;
    // get limit
    const searchLimit = document.getElementById('limit').value;

    // check search field is not empty
    const errMsg = 'Please add search term!';
    const errMsgClass = 'alert-messages';
    if(searchTerm==="") {
        showErrorMessage(errMsg, errMsgClass);
    } 
    else {
        errorStatus = false;
    }

    // clear search input
    searchInput.value = "";
    e.preventDefault();

    // error status is false (no errors) then run search functionality: 
    if(errorStatus==false) {

    // search Reddit u                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            sing Reddit API, separate JS file

        // returns a promise (code in written in redditapi.js) so use .then() to get the data
        reddit.search(searchTerm, searchLimit, sortBy).then
        (res => {
            console.log(res);
            let output = '<div id="results-title">Results</div>'; // initial output title for DOM before adding query results below
            
    // loop through posts 
            res.forEach(post => {
                const searchURL = post.url;

                // get image from reddit api
                let imageURL = '';
                if(post.preview != undefined) {  
                    if(post.preview.images[0].source.url != undefined) {
                        imageURL = post.preview.images[0].source.url;
                    } else {
                        imageURL = 'https://jsdeveloper.io/wp-content/uploads/2017/10/1024px-Reddit_logo_and_wordmark.svg_.png';
                    }
                } else {
                    imageURL = 'https://jsdeveloper.io/wp-content/uploads/2017/10/1024px-Reddit_logo_and_wordmark.svg_.png';
                }
                
                // create output layout
                output += `
                
                <div class="result-wrap">
                    <div class="title">${cutText(post.title, 50)} ..</div>
                    <div id="image-wrap"> <img class="image" src="${imageURL}"> </div>
                    <div class="output">${cutText(post.selftext, 200)} .. <a href="${searchURL}">Read More</a></div>
                    
                </div>
                `;
            });
            
            // hide any previous errors
            const errMsgArea = document.querySelector(`.${errMsgClass}`);
            if(errMsgArea != null) {
                errMsgArea.classList.remove(errMsgClass);
            }

            // show results 
            resultArea.classList.add('show'); // highlight output area
            resultArea.innerHTML = output; // add finalized search results 
        });

    

    
    }

    // testing
    // console.log();
});


// function to show error message if user has not put any search terms
function showErrorMessage(message, className) {
    // remove current results if there are any 
    resultArea.classList.remove('show');
    

    // create div to hold message 
    const div = document.createElement('div');
    
    // insert error message
    div.appendChild(document.createTextNode(message));
    div.classList.add("error-message");
    // insert into DOM
    // get parent
    const errorOutput = document.getElementById('errors');


    // styling to display message
    // clear error box and put "error"
    errorOutput.innerHTML = "Error";
    // append error message into div
    errorOutput.appendChild(div);
    errorOutput.classList.add(className);
       // notify error is true so do not show results
    errorStatus = true;
}

// cuts text down into smaller parts 

function cutText(text, limit) {
    const trimmed = text.indexOf(' ', limit); // trims at the point "limit" 
    if(trimmed==-1) return text; // if indexOf not found it returns -1

    return text.substring(0, trimmed);
}