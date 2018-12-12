<template>
    <div id="library">
        <div class="book-cover">
            <img :src="book.PICTURE" alt="">
        </div>
        <div class="book-description">
            <router-link to="/" class="link_to_library">В библиотеку</router-link>
            <div class="error-msg" v-if="errorMsg">{{errorMsg}}</div>
            <div class="library-item" v-else>            
                <!--             {{ $route.params}} -->

                <div class="book-id ">{{book.ID}}</div>
                <div class="book-autor">{{book.AUTHOR?book.AUTHOR:''}}</div>
                <div class="book-name">{{book.NAME}}</div>
                <book-rating v-bind:rating="book.RATING*20" v-bind:maxStars="5"></book-rating>                        
                <div class="book-genre" v-if="book.GENRE">
                     <span v-for="genre in book.GENRE">{{genre}}</span>
                </div>
                <div class="book-type" v-if="book.TYPE">
                     <span v-for="type in book.TYPE">{{type}}</span>
                </div>                
                <div class="book-text">{{book.TEXT}}</div>                
                <div class="book-booking-link">
                    <a :href="book.BOOKING_LINK" class="link_to_booking">Получить книгу</a>
                </div>
                <p v-if="book.BOOKED" class ="mv_booked">
                    <i class="fas fa-book-reader" title="На бумажном носителе временно недоступна"></i>&nbsp;
                    <i class="far fa-clock" title="На бумажном носителе временно недоступна"></i>&nbsp;На бумажном носителе временно недоступна
                </p>
            </div>

        </div>
    </div>
</template>

<script>
    import BookRating from './Rating.vue';    
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
        },
        components:{
            BookRating: BookRating
        }
    }
</script>

<style scoped>
    #library{
        display: flex;
        width: 100%;
        margin: 10px auto;
        flex-flow: row wrap; /* направление и переносы */
        justify-content: space-around; /* выравнивание по осн. оси */
        align-content: flex-start; /* вертикальное выравнивание в контейнере */
        align-items: stretch; /* выравнивание в строках */
    }
    .book-description{
        flex: 1 1 600px; /* {grow shrink basis}  */     
    }
    .book-cover{
        flex: 0 1 400px; /* {grow shrink basis}  */       
        margin: 10px;
        padding: 15px;
        /* box-shadow: 0px 2px 8px #c4bbce52; 
         border-radius: 3px;
        text-align: center; */
    }
    .book-cover {
        perspective: 1000px;
    }
    .book-cover img {
        transform: rotateY(0deg) rotateX(0deg);
        transition: 1s;
    }
    .book-cover:hover img {
        transform: rotateY(25deg) rotateX(5deg);
        transition: 1s;
    }
    a.link_to_booking{
        color: #fff;
        margin: 15px 15px 20px;
        display: inline-block;
        background-color: #35c486;
        padding: 8px 25px;
        border-radius: 50px;
        text-decoration: none;   
    }
    a.link_to_booking:hover {
        color: #fff;
        background-color: #16ac79;
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
    a.link_to_library:hover{
        background-color: #ae6ab0;   
        color: #fff;
    }
    .book-cover img{
        max-width: 70%;
    }
    .mv_booked{
        color: #ff5b62;
        font-size: 18px;
        text-align: center; 
    }
    .book-id {
        font-size: 11px;
        color: #ccc;
    }
    .book-autor {
        font-size: 20px;
        font-weight: 600;
    }
    .book-name {
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 25px;
    }
    .book-genre span,
    .book-type span{
        font-size: 14px;
        font-style: italic;
       /* color: #284c5c; */
        padding: 3px 10px;
        border-radius: 50px;
        margin: 5px 3px;
        display: inline-block;
        vertical-align: middle;
    }
    .book-genre span {
/*        background-color: #d9f5f0; */
/*        border: 1px dashed #03bd98;*/
        border: 1px solid #03bd98;
        color: #03bd98;
    }
    .book-type span{
        /* background-color: #f3e9f3; */
/*        border: 1px dashed #ae6ab0;*/
        border: 1px solid #ae6ab0;
        color: #ae6ab0;
    }    
    
</style>