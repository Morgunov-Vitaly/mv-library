<template>
    <div id="library">
        <div class="error-msg" v-if="errorMsg">{{errorMsg}}</div>
        <div class="books-list" v-else>
            <div class="mv-library-filter">
                <input type="text" name="" v-model="bookFilter">
            </div>
            <div class="book-item" v-for="book in books | filterBy="bookFilter in 'book-name'">
                <img :src="book.PICTURE" :alt="book.NAME" :title="book.TEXT" class="book-img">
                <div class="book-id">[{{book.ID}}]</div>
                <div class="book-author">{{book.AUTHOR}}</div>                
                <div class="book-name">{{book.NAME}}</div>
                <div class="book-genre">{{book.GENRE}}</div>
                <div class="book-rating">Рейтинг: {{book.RATING}}</div>
                <div class="book-type">{{book.TYPE}}</div>
                <!-- <div class="book-date">{{book.DATE}}</div> -->
                <router-link :to="{name: 'book', params:{id: book.ID} }" class="book-link button">Подробнее</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                endpoint: 'https://portal.mc21.ru/srv/bitrix/library/BooksList',
                books: [],
                genres: [], //список всех жанров
                types: [], // список всех типов книг
                bookFilter: '',
                errorMsg: ''
            }
        },
        methods: {
            getAllbooks: function () {
                this.$http.get(this.endpoint).then(function (responce) {
                    //console.log(responce);
                    this.books = responce.data.result;
                    // console.log(this.books);
                    // get body data
                    // this.someData = response.body;
                }, function (error) {
                    //Ошибка
                    this.errorMsg = 'Ничего не удалось найти :(';
                    console.log('Ошибка запроса');
                    console.log(error)
                });
            }
        },
        created: function(){
            this.getAllbooks();
        },
        ready: function(){
                        
        }
    }
</script>
<style scoped>

    .books-list{
        justify-content: center;
        align-content: space-around;
        align-items: stretch;
    }
    .book-item{       
        min-width: 300px;
        padding: 10px;
        margin-bottom: 20px;

    }
    .book-img{
        width: auto;
        max-width: 200px;
    }
    .book-id {
        /* background-color: beige; */
        /* text-align: left; */
        font-size: 70%;
        color: #ccc;
        margin: 5px;
    }
    .book-author{
            font-style: italic;
            font-weight: 600;
            margin: 15px;
    }
    .book-name {
        /* max-width: 90%; */
        padding: 0 15px;
        margin: 10px auto;
    }

    .book-type {
        margin: 15px;
        margin-bottom: 20px;
        /* background-color: #a2dcbb; */
        /* font-size: 14px; */
        font-style: italic;
        /* font-weight: 600; */
    }
    .book-link{            
        color: #42b983;
        background-color: #2c82c6;
        padding: 10px 30px;
        border-radius: 50px;
        /* margin: 20px; */
        color: #fff;
    } 
    .book-link:hover{            
        background-color: #3171a5;
    } 
    .mv-library-filter {
        width: 100%; 
        padding: 0 15px;
    }
    .mv-library-filter input{
        width: 100%;
        height: 40px;
        margin: 10px auto;
        border: 2px solid #a2dcbb;
        box-shadow: none;
        border-radius: 5px;
        background-color: #fff;
    }
</style>