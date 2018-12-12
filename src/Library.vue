<template>
    <div id="library">
        <div class="error-msg" v-if="errorMsg">{{errorMsg}}</div>
        <div class="library-container" v-else>
            <div class="search-line-container">                
                <input type="text" name="" placeholder="Введите название, автора или тему..." v-model="FindCondition"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 mv-search-icon" v-if="!FindCondition" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
                    <svg aria-hidden="true" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11 mv-clear-search-icon" v-if="FindCondition" @click="mv_clear_search_line" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                    <span class="filter-open" @click="filterToggle">
                        <svg aria-hidden="true" data-prefix="fas" data-icon="filter" class="svg-inline--fa fa-filter fa-w-16" v-if="!filterShow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
                        <svg aria-hidden="true" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" v-if="filterShow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                    </span>
            </div>
            <transition name="slide-up">
                <div class="filter-container" v-if="filterShow">
                    <filter-box v-bind:filtered-books="filteredBooks" @filter-types-done="filterTypes" @filter-cat-done="filterCat"></filter-box>
                </div>                
            </transition>
            <div class="flex-container">
                <div class="library-item" v-for="book in filteredBooks">
                    <img :src="book.PICTURE" :alt="book.TEXT">
                        <book-rating v-bind:rating="book.RATING*20" v-bind:maxStars="5"></book-rating>                        
                        <!-- <div class="book-id ">{{book.ID}}</div> -->
                        <div class="book-name">{{book.NAME}}</div>
                        <div class="book-autor">{{book.AUTHOR?book.AUTHOR:''}}</div>
                        <p v-if="book.BOOKED" class="mv_booked">
                            <i class="fas fa-book-reader" title="На бумажном носителе временно недоступна"></i>&nbsp;
                            <i class="far fa-clock" title="На бумажном носителе временно недоступна"></i>
                        </p>
                        <div class="book-genre" v-if="book.GENRE">
                            <span v-for="genre in book.GENRE">{{genre}}</span>
                        </div>
                        <div class="book-type" v-if="book.TYPE">
                            <span v-for="type in book.TYPE">{{type}}</span>
                        </div>
                        <!-- <div class="book-date">{{book.DATE}}</div> -->
                        <router-link :to="{name: 'book', params:{id: book.ID} }" class="book-link">Подробнее...</router-link>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    import FilterBox from './Filter.vue';
    import BookRating from './Rating.vue';
    export default {
        data() {
            return {
                msg: 'Это компонент библиотеки',
                filterShow: false,
                errorMsg: '',
                endpoint: 'https://bb4e7545-4dfc-4090-88ca-1b889ea65ea5.mock.pstmn.io/BookList', /* 'https://portal.mc21.ru/srv/bitrix/library/BooksList', 'https://a98b1f23-6c84-4dfa-b054-b59188510552.mock.pstmn.io/booksList', */
                books: [],
                checkedCategories: [],
                checkedTypes: [],
                FindCondition: ''
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
            },
            mv_clear_search_line(){
                this.FindCondition ='';
            },
            filterToggle() {
                if (this.filterShow) {
                // Обнуляем фильтр каким-то непостижимым способом это СБРасывает выбранные фильтры!
                this.checkedCategories = [];
                this.checkedTypes = [];
                }
                return this.filterShow = !this.filterShow;
            },  
            filterCat(checkedCategories){
                // console.log('получил Categories'); console.log(checkedCategories);
                this.checkedCategories = checkedCategories;
                return this.filteredBooks;
            },
            filterTypes(checkedTypes){
                // console.log('получил types'); console.log(checkedTypes);
                this.checkedTypes = checkedTypes;
            },
            isGenreChecked(arrF, arrB){ /* присутствует ли в arrF (опции фильтра) элементы arrB (опции книги) вариант ИЛИ для варианта И - true только если все выбранные рубрики указаны в книге  */
                            let mv_has = true; /* условие для ИЛИ false; */
                           /* let arrBstr = arrB.join('~').toLowerCase(); */ /* превращаем массив в строку и затем переводим в нижний регистр */
                            let arrBarr = arrB.join('~').toLowerCase().split('~'); /* превращаем обратно строку в массив */
                            for (let i=0; i < arrF.length; i++){
                                /* условие для ИЛИ */
                                /* if (arr2.includes(arr1[i].toLowerCase())) {
                                mv_has = true;
                                break;
                                } */
                                /* условие для И */
                               if (!arrBarr.includes(arrF[i])) {
                                mv_has = false;
                                break;
                                } 
                            }
                            return mv_has;
                    },
            isTypeChecked(arrF, mv_obj){ /* присутствует ли в arr1 элементы arr2 */
                            let mv_has = true; /* условие для ИЛИ false; */
                            let arrB ='';
                            /* создадим строку-массив */
                            for (let b in mv_obj){ /* b принимает значения ключей "1099","1100" и т.д.*/
                                arrB = arrB + mv_obj[b].toLowerCase() + '~';                                 
                            };
                            let arrBarr = arrB.toLowerCase().split('~'); /* превращаем обратно строку в массив */
                            for (let i=0; i < arrF.length; i++){
                                if (!arrBarr.includes(arrF[i])) {
                                mv_has = false;
                                break;
                                } 
                            }
                            return mv_has;
                    },
        },        
        computed: {
            filteredBooks: function () {
                let self = this;
                let FC = self.FindCondition.toLowerCase(); /* строка поиска в нижнем регистре */
                if (!self.books)
                    return [];
                if ( (!self.FindCondition) && (self.checkedTypes.length == 0) &&(self.checkedCategories.length == 0) )
                    return self.books; // Если нет никаких фильтров
                return self.books.filter(function (book) { /* перебираем исходный массив книг и смотрим по каждой книге
                                                             условно book ={ 'ID': 0001, 'GANRE':[], 'TYPE':{'001':'электронная', '002':'бумажная'} } */
//                    console.log('book: ');
//                    console.log(book.NAME);
//                    console.log(book.GENRE);
                    let isGenreFind = 1; /* присутствует ли у данной книги набранный в строке поиска жанр book.GENRE.toLowerCase().indexOf(FC) + 1 */
                    let isTypeFind = 1; /* присутствует ли у данной книги набранный в строке поиска тип носителя book.TYPE.toLowerCase().indexOf(FC) + 1) */                    
                    book.NAME = book.NAME ? book.NAME : '';
                    book.GENRE = book.GENRE ? book.GENRE : '';
                    book.AUTHOR = book.AUTHOR ? book.AUTHOR : '';
                    book.TYPE = book.TYPE ? book.TYPE : '';
                    /* if ( ((book.NAME.toLowerCase().indexOf(FC) + 1) 
                            || (book.AUTHOR.toLowerCase().indexOf(FC) + 1) 
                            || (isGenreFind) 
                            || (isTypeFind))
                            && (( isGenreChecked ) || (self.checkedCategories.length == 0))
                            && (( isTypeChecked )|| (self.checkedTypes.length == 0) ) ) { */
        /* важно решить какая логика правильнее строка поиска и одна(любая) из категорий или строка поиска и все выбранные категории? */
                      if (
                            (
                            (book.NAME.toLowerCase().indexOf(FC) + 1) 
                            || (book.AUTHOR.toLowerCase().indexOf(FC) + 1)
                            || (book.GENRE.join('').toLowerCase().indexOf(FC) + 1)
                            ) 
                            && (self.isGenreChecked(self.checkedCategories, book.GENRE) || (self.checkedCategories.length == 0))
                            && ((self.isTypeChecked(self.checkedTypes, book.TYPE))||(self.checkedTypes.length == 0))
                            ){
                        return true;
                    }
                    return false;
                });
            }
        },
        created: function () {
            this.getAllbooks();
            //Добавляем event listeners
//            eventHub.$on('filter-cat-done', this.filterCat);
//            eventHub.$on('filter-types-done', this.filterTypes);
        },
        beforeDestroy: function () {
            //Удаляем event listeners
//            eventHub.$off('filter-cat-done', this.filterCat); 
//            eventHub.$off('filter-types-done', this.filterTypes);
        },
        components:{
            FilterBox: FilterBox,
            BookRating: BookRating
        }
                
    }
</script>
<style scoped>
    /* карточка книги */
    .flex-container{
        display: flex;
        width: 100%;
        margin: 10px auto;
        flex-flow: row wrap; /* направление и переносы */
        justify-content: space-between; /* выравнивание по осн. оси */
        align-content: flex-start; /* вертикальное выравнивание в контейнере */
        align-items: stretch; /* выравнивание в строках */
    }
    .library-item{
        flex: 1 1 300px; /* {grow shrink basis}  */ 
        max-width: 400px;
        margin: 10px;
        padding: 15px;
        box-shadow: 0px 2px 8px #c4bbce52;
        border-radius: 3px;
        text-align: center;
    }
    .library-item:hover{
        box-shadow: 0px 2px 8px #c4bbce;
    }    
    
    /*
    * Стиль информации о книгах
    */
    .library-item img {
        /* max-width: 50%; */
        width: 130px;
        margin: 10px 15px 15px;
        box-shadow: -2px 1px 7px #bfb7be73;
    } 
    .library-item:hover img {
        /* opacity: 0.7; */
        transform: scale(1.1,1.1);
        -webkit-transition: 2s;
        transition: 2s;
    }
    .book-id {
        font-size: 12px;
        color: #ccc;
        margin: 0 15px 7px;
    }
    .book-name {
        margin: 0 auto 15px;
        font-weight: 600;
        max-width: 80%;
        text-align: center;
        color: #5a6876;
    } 
    .book-autor {
        margin: 15px auto;
        text-align: center;
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
/*    .rating-star{
            font-size: 18px;
            font-weight: 600;
            color: gold;
    }*/
    a.book-link {
        color: #fff;
        margin: 15px 15px 20px;
        display: inline-block;
        background-color: #35c486;
        padding: 8px 25px;
        border-radius: 50px;
        /* background-color: #4271b9; */
        /* width: 70%; */
        text-decoration: none;
    }    
    a.book-link:hover {
        color: #fff;
        background-color: #16ac79;      
    }
     
    
    *{
        box-sizing: border-box;
    }
    .search-line-container,
    .filter-container{
        width: 80%;
        margin: 45px auto;
        padding-right: 65px;
    }
    .search-line-container {        
        position: relative;
    }

    .search-line-container input[type="text"] {
        height: 45px;        
        line-height: 45px;
/*        border: none;
        background-color: #F5F5F5; */
        box-shadow: none;
        background-color: #fff;
        border: 2px solid #35c486;        
        border-radius: 50px;
        width: 100%;
        padding: 0 30px;
        font-size: 16px;        
    }    
    ::-webkit-input-placeholder {
        color: #9e9e9e;
    }
    *:active,
    *:focus {
        outline: none;
        box-shadow: none;
    }

    /*
    * Иконки
    */   
    .mv_booked{
        color: #ff5b62;
        font-size: 18px;
        text-align: center; 
    }
    .mv-search-icon{
        color: #ccc;
        width: 20px;
        height: 45px;
        position: absolute;
        right: 80px;
        top: 0;
        bottom: 0;        
    }
    .mv-clear-search-icon{
        color: #ccc;
        width: 15px;
        height: 45px;
        position: absolute;
        right: 80px;
        top: 0;
        bottom: 0;
        cursor: pointer;
    }

    span.filter-open{
        position: absolute;
        display: inline-block;
        right: 15px;
        top: 0;
        bottom: 0; 
        text-align: center;
/*        padding: 0px 5px;
        background-color: whitesmoke;
        border: none; */
        background-color: #fff;
        border: 2px solid #35c486;
        border-radius: 50px;
        height: 45px;
        width: 45px;
        line-height: 50px;
        cursor: pointer;
        box-sizing: border-box;

    }
    .filter-open svg{
        color: #ccc;
        width: 19px;
        height: 42px;
    }



    /*
    * Анимации
    */
    /* fade */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
    /* slide-fade */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

    /* slide-up */
    .slide-up-enter-active {
        transition: all .3s ease;
    }
    .slide-up-leave-active {
        transition: all .8s ease;
    }
    .slide-up-enter, .slide-up-leave-to
    /* .slide-up-leave-active до версии 2.1.8 */ {
        transform: translateY(-50px); /* scaleY(0.5) */
        opacity: 0;
    }
</style>