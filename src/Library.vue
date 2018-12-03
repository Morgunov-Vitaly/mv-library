<template>
    <div id="library">
        <div class="error-msg" v-if="errorMsg">{{errorMsg}}</div>
        <div class="library-container" v-else>
            <div class="search-line-container">                
                <input type="text" name="" placeholder="Введите название, автора, тему или тип..." v-model="FindCondition"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 mv-search-icon" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
                    <span class="filter-open" @click="filterToggle">
                        <svg aria-hidden="true" data-prefix="fas" data-icon="filter" class="svg-inline--fa fa-filter fa-w-16" v-if="!filterShow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
                        <svg aria-hidden="true" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" v-if="filterShow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                    </span>
            </div>
            <transition name="slide-up">
                <div class="filter-container" v-if="filterShow">
                    <filter-box v-bind:filtered-books="filteredBooks"></filter-box>
                </div>                
            </transition>
            <div class="flex-container">
                <div class="library-item" v-for="book in filteredBooks">
                    <img :src="book.PICTURE" :alt="book.TEXT">
                        <div class="book-id ">{{book.ID}}</div>
                        <div class="book-name">{{book.NAME}}</div>
                        <div class="book-name">{{book.AUTHOR}}</div>
                        <div class="book-genre">{{book.GENRE}}</div>
                        <div class="book-rating">
                            <span class="rating-star" v-for="number in 5">* {{book.RATING}}</span>  <!-- См. https://ru.vuejs.org/v2/guide/migration.html#%D0%94%D0%B8%D0%B0%D0%BF%D0%B0%D0%B7%D0%BE%D0%BD-%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B9-%D0%B2-v-for-%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%BE -->              
                        </div>
                        <div class="book-type">{{book.TYPE}}</div>
                        <div class="book-date">{{book.DARE}}</div>
                        <router-link :to="{name: 'book', params:{id: book.ID} }">Подробнее</router-link>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    import FilterBox from './Filter.vue';
    export default {
        data() {
            return {
                msg: 'Это компонент библиотеки',
                filterShow: false,
                errorMsg: '',
                endpoint: 'https://a98b1f23-6c84-4dfa-b054-b59188510552.mock.pstmn.io/booksList',
                books: [],
                checkedCategory: [],
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
            filterToggle() {
                return this.filterShow = !this.filterShow;
            }
        },
        computed: {
            filteredBooks: function () {
                let self = this;
                let FC = self.FindCondition.toLowerCase();
                if (!self.books)
                    return [];
                if (!self.FindCondition)
                    return self.books;
                return self.books.filter(function (book) {
//                    console.log('book: ');
//                    console.log(book.NAME);
//                    console.log(book.GENRE);
                    book.NAME = book.NAME ? book.NAME : '';
                    book.GENRE = book.GENRE ? book.GENRE : '';
                    book.AUTHOR = book.AUTHOR ? book.AUTHOR : '';
                    book.TYPE = book.TYPE ? book.TYPE : '';
                    if ((book.NAME.toLowerCase().indexOf(FC) + 1) || (book.AUTHOR.toLowerCase().indexOf(FC) + 1) ||
                            (book.GENRE.toLowerCase().indexOf(FC) + 1) || (book.TYPE.toLowerCase().indexOf(FC) + 1)) {
                        return true;
                    }
                    return false;
                });
            },
            categories: function () {
                //Создать массив cj cgbcrjv rfntujhbq categories[0] {id: 0, label}
                let vcat = [];
                let uniq = false;

                /* this.filteredBooks.forEach(function (item, i) { */
                // по идее тут должен быть массив меток    
                for (let i = 0; i < this.filteredBooks.length; i++) {
                    /* if (item.GENRE){ //Если такой записи еще нет в массиве еще добавить условие выбора категории checkedCategory */
                    if (this.filteredBooks[i].GENRE) {
                        uniq = true; // считаем, что значение уникально
                        for (let z = 0; z < vcat.length; z++) { // ищем похожие ключи
                            if (this.filteredBooks[i].GENRE.trim() == vcat[z].trim()) {
                                // уже в списке - не уникально
                                uniq = false;
                            }
                        }
                        if (uniq)
                            vcat.push(this.filteredBooks[i].GENRE.trim());
                        /* if (item.GENRE){ //Если такой записи еще нет в массиве еще добавить условие выбора категории checkedCategory
                         cat[item.GENRE.trim()] = i; */
                    } //добавляем в массив
                    // console.log('item.GENRE');
                    // console.log(item.GENRE);
                }
                console.log('vcat');
                console.log(vcat);
                return vcat;
            }
        },
        created: function () {
            this.getAllbooks();
        },
        components:{
            FilterBox: FilterBox,
        }
                
    }
</script>
<style scoped>
    /*
    * Стиль информации о книгах
    */
    
    .book-genre{
            font-style: italic;
            
    }
    .library-item img {
        max-width: 50%;
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
        height: 405x;        
        line-height: 45px;
        border: none;
        background-color: #F5F5F5;
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

    .flex-container{
        display: flex;
        width: 80%;
        margin: 10px auto;
        flex-flow: row wrap; /* направление и переносы */
        justify-content: space-between; /* выравнивание по осн. оси */
        align-content: flex-start; /* вертикальное выравнивание в контейнере */
        align-items: stretch; /* выравнивание в строках */
    }
    .library-item{
        flex: 1 1 300px; /* {grow shrink basis}  */
        margin: 10px;
        padding: 15px;

    }

    /*
    * Иконки
    */    
    .mv-search-icon{
        color: #ccc;
        width: 20px;
        height: 45px;
        position: absolute;
        right: 80px;
        top: 0;
        bottom: 0;        
    }

    span.filter-open{
        position: absolute;
        display: inline-block;
        background-color: whitesmoke;
        right: 15px;
        top: 0;
        bottom: 0; 
        padding: 0px 5px;
        border: none;
        border-radius: 50px;
        height: 45px;
        width: 45px;
        line-height: 50px;
        cursor: pointer;

    }
    .filter-open svg{
        color: #ccc;
        width: 19px;
        height: 45px;
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