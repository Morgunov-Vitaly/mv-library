<template>
    <div id="library">
        <div class="error-msg" v-if="errorMsg">
            {{errorMsg}}
            <router-link to="/">В библиотеку</router-link>
        </div>
        <div class="book-container" v-else>            
            <div class="book-img"><img :src="book.PICTURE" alt=""></div>
            <div class="book-description">
                <div class="library-link-container">
                    <router-link to="/" class="library-link button">В библиотеку</router-link>
                </div>                
                <div class="book-id ">{{book.ID}}</div>
                <div class="book-author">{{book.AUTHOR}}</div>            
                <div class="book-name">{{book.NAME}}</div>

                <book-rating v-bind:rating="25" v-bind:max-stars="5"></book-rating>
                <div class="book-genre"><i class="fa fa-tags" aria-hidden="true"></i> {{book.GENRE}}</div>
                <div class="book-type">{{book.TYPE}}</div>
                <div class="book-date">{{book.DARE}}</div>
                <div class="book-booked">{{book.BOOKED}}</div>            
                <div class="book-text">{{book.TEXT}}</div>
                <a class="book-booking-link" v-bind:href="book.BOOKING_LINK">Получить книгу</a>
            </div>
        </div>
    </div>
</template>

<script>
    import bookRating from './Rating.vue'
    export default {
        data() {
            return {
                msg: 'Это компонент Книги c id' + this.$route.params.id,
                endpoint: 'https://portal.mc21.ru/srv/bitrix/library/BookInfo?bid=' + this.$route.params.id,
                book: {},
                errorMsg: ''

            }
        },
        methods: {
            getBook: function () {
                this.$http.get(this.endpoint).then(function (responce) {
                    //console.log(responce);
                    this.book = responce.data.result[0];
                    // console.log(this.books);
                    // get body data
                    // this.someData = response.body;
                }, function (error) {
                    //Ошибка
                    this.errorMsg = 'Книгу найти не удалось :(';
                    console.log('Ошибка запроса');
                    console.log(error)
                });
            }
        },
        created: function () {
            this.getBook();
        },
        components:{
            bookRating            
        }
    }
</script>

<style scoped>
    
    .book-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;

    }
     .book-img{
        max-width: 40%;
        flex:0 1 40%
    }
     .book-img img{
        max-width: 80%;
    }
    
    .book-description{
        min-width: 50%;
        text-align: left;
        flex:1 0 50%
    }
    .book-id {
        /* background-color: beige; */
        /* text-align: left; */
        font-size: 70%;
        color: #ccc;
        margin: 15px 0;
    }
    
    .book-genre i{
        color: #ccc;
    }
    .book-author{
        font-size: 20px;
        font-weight: 600;
        margin: 20px 0;
    }
    .book-name{
        font-weight: 600;
    }
    .book-genre{
        font-style: italic;
        margin: 20px 0;
    }
    .book-rating{
    }
    .book-type{
        margin: 20px 0;
    }
    .book-date{
        margin: 20px 0;
    }
    .book-booked{
        margin: 20px 0;
    }
    .book-text{
        margin: 20px 0;
    }
    .library-link-container{
        margin-bottom: 30px;
    }
    .library-link{         
        color: #42b983;
        background-color: #2c82c6;
        padding: 10px 30px;
        border-radius: 50px;                
        color: #fff;
    } 
    .library-link:hover{            
        background-color: #3171a5;
    } 

</style>