# CS 260  Midterm 1

For this midterm you will have 3 hours (in class - Thursday 12pm-3pm - anything submitted after this time will not go towards your points earned) to complete the following prompt.  You will be allowed to use the internet to complete this project - you may not copy any code online that is not your own - you can google things to understand how certain pieces of Vue/Javascript/CSS/etc work.

You will be creating a simplified Goodreads application using Vue.  If you have never used Goodreads before it is a place for users to record and review books they have read and would like to read.  You will be using the OpenLibrary API - which provides lots of information about different books and allows you to search keywords by different fields.  

You will be required to:
- create a webpage using Vue that allows the user to search for a specific book or books
- allow the user to type a word/phrase/title of book into a search field and on submit, display all the results
- display a loading symbol or screen while data is loading
- for each book found, display the title, author, publish date, cover image, and an option to "favorite" that book (not all books have information for each field, so if the book does not have on of the fields, just do not display anything)
- In a separate location on the page (or on another page) display all the "favorited" books.  You should retain the master list of books searched.  If the user unfavorites a book in the list, remove it from the favorites list
- Host and deploy your site on firebase


Some API calls that will helpful:
- 'http://openlibrary.org/search.json?q=the+lord+of+the+rings' will search in all fields for any books matching "the"+"lord"+"of"+"the"+"rings".  This call returns json that has many different fields, including an isbn field that is an array (some books do not have this field).  Use the first item in this list as a parameter to call the other API and retrieve the thumbnail to display.  

- once you have the ISBN number of a book you use can use this call to get the "thumbnail_url" to display the image with the ISBN number:9780980200447
'https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=details&format=json'

See https://openlibrary.org/dev/docs/api/search or https://openlibrary.org/dev/docs/api/books for more information about these endpoints.




Behavior | Estimated Point Value
--- | ---
Create a web page made with Vue | 20
Uses the specified API to retrieve the correct data on search | 10
Displays the required information about the book in a visually asthethic manner | 30
Section to display all the favorited books - updates correctly and is visually appealing | 20
There is some button that allows the user to favorite and unfavorite books in the searched list and in the favorite list | 5
Hosted and deployed on firebase | 5
Your page looks really good. This is subjective, so wow us. | 10
Using any website besides the API documentation as a resource during the test | -30
