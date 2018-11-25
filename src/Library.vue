<template>
    <div id="library">
        <h1>{{msg}}</h1>
        <div class="error-msg" v-if="errorMsg">{{errorMsg}}</div>
        <div class="library-item" v-else v-for="book in books">
            <img :src="book.PICTURE" :alt="book.TEXT">
            <div class="book-id ">{{book.ID}}</div>
            <div class="book-name">{{book.NAME}}</div>
            <div class="book-genre">{{book.GENRE}}</div>
            <div class="book-rating">{{book.RATING}}</div>
            <div class="book-type">{{book.TYPE}}</div>
            <div class="book-date">{{book.DARE}}</div>
            <router-link :to="{name: 'book', params:{id: book.ID} }">Подробнее</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Это компонент библиотеки',
                endpoint: 'https://portal.mc21.ru/srv/bitrix/library/BooksList',
                books: [],
                genres:[], //список всех жанров
                types:[], // список всех типов книг
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
        created: function () {
            this.getAllbooks();
        }
    }
</script>
<style>
</style>