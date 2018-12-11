<template>
    <div id="library" class="flex-container">
        <div class="book-cover flex-item">
            <img :src="book.PICTURE" alt="">
        </div>
        <div class="book-description flex-item">
            <router-link to="/" class="link_to_library">В библиотеку</router-link>
            <div class="error-msg" v-if="errorMsg">{{errorMsg}}</div>
            <div class="library-item" v-else>            
                <!--             {{ $route.params}} -->

                <div class="book-id ">{{book.ID}}</div>
                <div class="book-autor">{{book.AUTHOR}}</div>            
                <div class="book-name">{{book.NAME}}</div>
                <div class="book-genre">{{book.GENRE}}</div>
                <div class="book-rating">{{book.RATING}}</div>
                <div class="book-type">{{book.TYPE}}</div>
                <div class="book-date">{{book.DARE}}</div>
                <div class="book-booked">{{book.BOOKED}}</div>            
                <div class="book-text">{{book.TEXT}}</div>                
                <div class="book-booking-link">
                    <a :href="book.BOOKING_LINK" class="link_to_booking">Получить книгу</a>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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

<style scoped>
    .flex-container{
        display: flex;
        width: 100%;
        margin: 10px auto;
        flex-flow: row wrap; /* направление и переносы */
        justify-content: space-around; /* выравнивание по осн. оси */
        align-content: flex-start; /* вертикальное выравнивание в контейнере */
        align-items: stretch; /* выравнивание в строках */
    }
    .flex-item{
        flex: 1 1 400px; /* {grow shrink basis}  */       
        margin: 10px;
        padding: 15px;
        /* box-shadow: 0px 2px 8px #c4bbce52; 
         border-radius: 3px;
        text-align: center; */
    }
    .link_to_booking{
        color: #fff;
        margin: 15px 15px 20px;
        display: inline-block;
        background-color: #35c486;
        padding: 8px 25px;
        border-radius: 50px;
        text-decoration: none;   
    }
    a.link_to_library{
        color: #fff;
        margin: 15px 15px 20px;
        display: inline-block;
        background-color: #B97EBB;
        padding: 8px 25px;
        border-radius: 50px;
        text-decoration: none;   
    }
    .link_to_library:hover{
        background-color: #ae6ab0;   
        color: #fff;
    }
    .book-cover img{
        max-width: 70%;
    }
</style>