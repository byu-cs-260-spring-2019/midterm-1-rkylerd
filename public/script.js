let app = new Vue({
    el: '#app',
    data: {
        query: '',
        bookName: '',
        counter: 0,
        loading: true,
        current: {},
        results: [{
            title: '',
            author: '',
            isbn: [],
        }],
        pastFavorites: [],
        numFound: '',
        thumbnails: [],
        isbn: '',
        save: false,
        tempFavorites: [],
    },
    created() {
        // this.goodReads();
    },
    methods: {
        saveChanges() {
            this.pastFavorites.push(...this.tempFavorites);
        },
        queryBook() {
            this.results = [];

            
            if (this.bookName === '')
                return;

            let searchTerms = this.bookName.split(" ");
            let query = "";
            for (var i = 0; i < searchTerms.length; i++) {

                query += searchTerms[i].toLowerCase();

                if (i !== searchTerms.length-1) {
                    query += "+";
                }
            }
            
            this.query = query;
            this.goodReads();
        },
        async goodReads() {
            try {
                this.loading = true;
                const response = await axios.get("https://openlibrary.org/search.json?q=" + this.query);
                let queryResults = response.data.docs;
                
                this.numFound = response.data.numFound;
                // console.log("Response num 1: ", queryResults);
                
                let resultsCounter = 0;
                for (var i = 0; i < queryResults.length; i++) {
                    
                    if (queryResults[i].isbn && queryResults[i].title && queryResults[i].publish_date && queryResults[i].author_name) {
                        
                            try {
                                const response2 = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN:" + queryResults[i].isbn[0] + "&jscmd=viewapi&format=json");

                                for (var name in response2.data ) {

                                    if (response2.data.hasOwnProperty(name)) {
                                        let thumb = response2.data[name].thumbnail_url;

                                        // title, author, publish date, cover image,
                                        if (thumb) {
                                            this.addBook(thumb, queryResults[i], resultsCounter++);
                                        }
                                        
                                    }
                                    
                                }
                                                
                            } catch (err) {
                                console.log(err);
                            }
                    } 
                    
                }

                this.numFound = resultsCounter;

                this.loading = false;
            } catch (err) {
                console.log(err);
            }
            
        },
        addBook(bookCover, bookInfo, index) {
            if (!(index in this.results)) {
                let pubDate = null;

                if (bookInfo.author_name.length > 1) {
                    var authString = "";
                    for (var i = 0; i < bookInfo.author_name.length; i++) {
                        if (i == bookInfo.author_name.length - 2) {
                            authString += bookInfo.author_name[i] + " & " + bookInfo.author_name[++i];
                            break;
                        }
                        authString += bookInfo.author_name[i] + ", ";
                    }
                    bookInfo.author_name = authString;
                } else {
                    bookInfo.author_name = bookInfo.author_name[0];
                }

                Vue.set(this.results, index, {title: bookInfo.title, author: bookInfo.author_name, publishDate: bookInfo.publish_date[0], bookCover: bookCover, favorited: false});
            }
        },
    },
    computed: {
            favorites() {
               

                
              return this.pastFavorites.filter(book => {
                
                return book.favorited;
              });
            },
    },
    watch: {
        favorites (newVal, oldVal) {
            this.tempFavorites = newVal;

            if (newVal.length == 0 &&oldVal.length ==0 && this.save) {
                newVal = this.tempFavorites;
                this.save = false;
            }

            console.log("oldValue: ", oldVal);
            console.log("new value: ", newVal);

            
          },
          results: {
            handler: function (newResults, oldResults) {
                console.log("oldResultsue: ", newResults);
                console.log("new Resulst: ", oldResults);
                for (var i = 0; i < newResults.length; i++) {
                    var found = false;
                    // for (var x = 0; x < oldResults.length; x++) {
                    //     if (newResults[i].title != oldResults[x].title || newResults[i].author != newResults[x].author || newResults[i].bookCover != oldResults[x].bookCover || newResults[i].publishDate != oldResults[i].publishDate) {
                            
                            if (newResults[i].favorited && !this.pastFavorites.includes(newResults[i])) {
                                
                                console.log(newResults[i]);
                                this.pastFavorites.push(newResults[i]);
                            }
                            
                    //     }
                    // }
                    // if (oldResults.length == 0) {
                    //     console.log(newResults[i]);
                    //     this.pastFavorites.push(newResults[i]);
                    // }
                }
            },
            deep: true
            },
        }
          
        //   watch the results and cycle through to find the one that's new, then add to the pastFavoites which is what's displayed on the screen

});