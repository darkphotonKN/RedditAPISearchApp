
// Using Reddit API to make a search function for the application

/*
fetch() method usage NOTES
---------------------------

The "fetch()" method takes one mandatory argument, the path to the resource
you want to fetch. It returns a "Promise" that resolves to the "Response" to that
request, whether or not it is successful. You can optionally pass in an init options 
object as a second argument.

Once a "Response" is retrieved, there are a number of methods available 
to define what the body content is and how it should be handled. 

You can create a request and response directly using the "Request()" and 
"Response" constructors, but are unlikely to do this directly. These are more likely to be 
created as results of other API actions (for example, FetchEvent.respondWidth) from 
service workers).

*/

export default {
    
    search: function(searchTerm, searchLimit, sortBy) {
        fetch(`http://www.reddit.com/search.json?q=${searchTerm}`) // ? - allows use url para parameter, q - query
        .then(res => res.json()) // it gives us the response, we want the response in JSON
        .then(data => console.log(data)); // gives us the data
    }

    // solutions of problem  

    


}