let app = new Vue({
    data: {
        query: 'the+lord+of+the+rings',
        bookName: '',
        counter: 0,
        loading: true,
        current: {},
        results: {
            title: '',
            author: '',
            isbn: [],
        },
        numFound: '',
        thumbnails: [],
        isbn: '',
    },
    created() {
        this.goodReads();
    },
    methods: {
        queryBook() {
            console.log("no good: ", query);
            if (this.bookName === '')
                return;

            let searchTerms = this.bookName.split(" ");
            let query = "";
            for (var i = 0; i < searchTerms.length; i++) {

                if (i !== searchTerms.length-1) {
                    query += searchTerms[i].toLowerCase() + "+";
                }
            }
            console.log("the search Term: ", query);
            this.query = query;
        },
        async goodReads() {
            try {
                this.loading = true;
                const response = await axios.get("http://openlibrary.org/search.json?q=" + this.query);
                this.results = response.data.docs;
                // console.log("Response: ", response);

                // console.log("results", this.results);
                
                this.numFound = response.data.numFound;
                

                for (var i = 0; i < this.results.length; i++) {
                    
                    this.counter++;
                    if (this.results[i].isbn) {
                        
                        // for (var y = 0; y < this.results[i].isbn.length; y++) {
                            // console.log("i", i + ". " + this.results[i].isbn[y]);
                            // await this.getThumbnail(this.results[i].isbn[y]);
                            try {
                                const response2 = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN:" + this.results[i].isbn[0] + "&jscmd=viewapi&format=json");
                                const response3 = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN:" + this.results[i].isbn[0] + "&jscmd=data&format=json");
                                var keys = Object.keys(response3.data);
                                
                                var counter = 0;
                                for (var name in response2.data ) {
                                    counter++;

                                    if (response2.data.hasOwnProperty(name))
                                    {
                                        let thumb = response2.data[name].thumbnail_url;
                                        // console.log("author", response2.data[name].author);
                                        if (thumb) {
                                            console.log("Thumb", thumb);
                                            this.thumbnails.push(thumb);
                                        }
                                        
                                    }
                                    
                                }
                                
                                
                                
                                // console.log(this.counter+ "urls: ", response2.data);
                            } catch (err) {
                                console.log(err);
                
                            }
                        // }
                    }
                    
                }

                for (j = 0; j < this.thumbnails.length; j++) {
                    console.log("thumbnails" + j, this.thumbnails[j]);
                }
                this.loading = false;
                console.log(this.loading);
            } catch (err) {
                console.log(err);

            }
            
        },
        async getThumbnail() {
            // try {
            //     const response2 = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN:" + this.isbn + "&jscmd=details&format=json");
                
            //         // console.log("Should be a bunch of images: ", response.data);
                
            //     this.thumbnails.push(response2.data.thumbnail_url);
                   
            // } catch (err) {
            //     console.log(err);

            // }
            
        }
    },
    computed: {

    },
    watch: {
        // query(value, oldvalue) {
        //     if (oldvalue === '') {
                
        //       } else {
        //         this.queryBook(value);
        //         this.goodReads();
        //       }
        // },
    }

});