<template>
    <div id="library">
        <h1>{{msg}}</h1>
        <router-link to="/library">В библиотеку</router-link>
        <div class="error-msg" v-if="errorMsg">{{errorMsg}}</div>
        <div class="library-item" v-else>            
            <!--             {{ $route.params}} -->
            <img :src="book.PICTURE" alt="">
            <div class="book-id ">{{book.ID}}</div>
            <div class="book-autor">{{book.AUTHOR}}</div>            
            <div class="book-name">{{book.NAME}}</div>
            <div class="book-genre">{{book.GENRE}}</div>
            <div class="book-rating">{{book.RATING}}</div>
            <div class="book-type">{{book.TYPE}}</div>
            <div class="book-date">{{book.DARE}}</div>
            <div class="book-booked">{{book.BOOKED}}</div>            
            <div class="book-text">{{book.TEXT}}</div>
            <div class="book-booking-link">{{book.BOOKING_LINK}}</div>
        </div>
    </div>
</template>

<script>
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
        }
    }
</script>

<style>
</style>