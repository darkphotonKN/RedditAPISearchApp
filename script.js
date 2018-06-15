// js file using reddit api
import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.search-input');

// 'submit' - if form is submitted, perform callback 
searchForm.addEventListener('submit', (e) => {
    // get search term g
    const searchTerm = searchInput.value;
    // get radio check boxes
    const sortBy = document.querySelector('input[class="sort"]:checked').value;
    // get limit
    const searchLimit = document.getElementById('limit').value;

    // check search field is not empty
    if(searchTerm==="") {

        showMessage('Please add search term!', 'alert-messages');
    }

    // clear search input
    searchInput.value = "";
    e.preventDefault();
    // search Reddit using Reddit API, separate JS file
    // returns a promise (code in written in redditapi.js) so use .then() to get the data
    reddit.search(searchTerm, searchLimit, sortBy).then(res => console.log(res));
    



    // testing
    // console.log();
});


function showMessage(message, className) {
    
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
}