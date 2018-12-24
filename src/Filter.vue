<template>    
    <div class="filter-container">
        <p class="catHeader">Рубрики:</p>
        <label class="mv-cat-checkbox" v-for="(key, value, index) in categories">
            <input type="checkbox" v-bind:id="'mv-mv-cat-checkbox-' + index" v-model="checkedCategories" v-bind:value="value" @change="filterCatDone"><span>{{ value?value:'' }} <i class="mv-qty">{{key}}</i></span>
        </label>
        <p class="typeHeader">Тип носителя:</p>
        <label class="mv-type-checkbox" v-for="(key,value,index) in bookTypes">
            <input type="checkbox" v-bind:id="'mv-mv-type-checkbox-' + index" v-model="checkedTypes" v-bind:value="value" @change="filterTypesDone"><span>{{ value?value:'' }} <i class="mv-qty">{{key}}</i></span>
        </label>
        <p class="typeHeader">Сортировка:</p>
        <label class="mv-books-sort"><input type="radio" name="mv-books-sort" value="newfirst" @change="sortBooksDone" v-model="checkedSort">
            <span>Новые сверху</span>
        </label>
        <label class="mv-books-sort"><input type="radio" name="mv-books-sort" value="oldfirst" @change="sortBooksDone" v-model="checkedSort">
            <span>Старые сверху</span>
        </label>
        <label class="mv-books-sort"><input type="radio" name="mv-books-sort" value="namea-z" @change="sortBooksDone" v-model="checkedSort">
            <span>Название А-Я</span>
        </label>        
        <label class="mv-books-sort"><input type="radio" name="mv-books-sort" value="namez-a" @change="sortBooksDone" v-model="checkedSort">
            <span>Название Я-А</span>
        </label>        
        <label class="mv-books-sort"><input type="radio" name="mv-books-sort" value="authora-z" @change="sortBooksDone" v-model="checkedSort">
            <span>Автор А-Я</span>
        </label>        
        <label class="mv-books-sort"><input type="radio" name="mv-books-sort" value="authorz-a" @change="sortBooksDone" v-model="checkedSort">
            <span>Автор Я-А</span>
        </label>        
    </div>
</template>

<script>
    function unic(arr, key){ /*  Вспомогательная функция Находит уникальные свойства и подсчитывает кол-во их повторений */
        // console.log('unic');
        let result = {}; 
        /*  создадим объект со свойствами - жанрами вида 
            { 
                'личностное развитие': 2,
                'медицина': 3,
                ...
              } 
        */
        arr.forEach(function(a){ /* Условно a = book[0..n] */
            /* условно book[0].GENRE = ["Личностное развитие", "Медицина"]  перебираем массив и заполняем result */
            a[key].forEach(function(b){ /* условно b = book[0].GENRE[0] = "Личностное развитие" */
                result[b.toLowerCase()] = result[b.toLowerCase()] + 1 || 1;  /* условно { "личностное развитие" : 2} */
            });
        });
        return result;
    };
            
    function unic_type(arr, key){ /*  Вспомогательная функция Находит уникальные свойства тип аносителя и подсчитывает кол-во их повторений */
       // console.log('unic_type');
        let result = {}; 
        /*  создадим объект со свойствами - жанрами вида 
            { 
                'электронная': 2,
                'бумажная': 3,
                ...
              } 
        */
        arr.forEach(function(a){ /* Условно a = book[0..n] */
            /* условно book[0].TYPE = {
                    "1099": "Бумажная",
                    "1100": "Электронная
                    }  перебираем объект и заполняем result */
            for (let b in a[key]){ /* условно b = "1099","1100" и т.д. - ключи */
                result[a[key][b].toLowerCase()] = result[a[key][b].toLowerCase()] + 1 || 1;  /* условно { "бумажная" : 2} */
            };
        });
        return result;
    };
            
    export default {
        props:{
            filteredBooks: Array, /* Массив отфильтрованных книг */
        },    
        data() {
            return {
                checkedCategories: [],
                checkedTypes: [],
                checkedSort: '' /* newfirst, oldfirst, namea-z, namez-a, authora-z,authorz-a */
            }
        },
        methods: {                     
            filterCatDone: function() {
                // генерируем событие 'filter-cat-done' и передаём массив выбранных категорий
               // console.log('checkedCategories'); console.log(this.checkedCategories);
                this.$emit('filter-cat-done', this.checkedCategories);
            },
            filterTypesDone: function() {
                // генерируем событие 'filter-types-done' и передаём массив выбранных типов
               // console.log('checkedTypes'); console.log(this.checkedTypes);
                this.$emit('filter-types-done', this.checkedTypes);
            },
            sortBooksDone: function() {
                // генерируем событие 'sortBooksDone' и передаём значение фильтра сортировки
                // console.log('checkedSort'); console.log(this.checkedSort);
                this.$emit('sortBooksDone', this.checkedSort);
            }              
        },
        computed: {
            categories: function () {
                //Создать массив со списком категорий categories[ {label: qty} ]  рубрика: количество книг}
                //Алгориитм сначала создать массив со всеми ключами, а потом отфильтровать только уникальные д.б. быстрее но без подсчета кол-ва
                return unic(this.filteredBooks, 'GENRE');
            },
            bookTypes(){
                //Создать массив со списком типов носителей книг bookTypes[ {label: qty} ]  рубрика: количество книг}
                return unic_type(this.filteredBooks, 'TYPE');
            }
        }
    }
</script>
<style scoped>
 /*
 * стили списков фильтра
 */
    label.mv-books-sort span,
    label.mv-cat-checkbox span,
    label.mv-type-checkbox span{
        padding: 5px 20px;
        border-radius: 50px;
        margin: 10px 2px;
        display: inline-block;
        cursor: pointer;
    }
    
    /*
    * Стили списка категорий 
    */
    label.mv-cat-checkbox span{
        background-color: #fff;
        color: #17ad8f;
        /* border: 1px dashed #03bd98; */
        border: 2px solid #03bd98;
/*        background-color: #ccc;
        border: none;
        color: #fff;*/

    }
    .mv-cat-checkbox input:checked + span { /* выделенная категория */
/*        background-color: #ae6ab0;*/
        background-color: #03bd98;
        color: white;
    }
    
    /*
    * Стили списка типов носителей
    */
    label.mv-type-checkbox span{
        background-color: #fff;
        color: #ae6ab0;
/*        border: 1px dashed #ae6ab0;     */
        border: 2px solid #ae6ab0;  
    }
    .mv-type-checkbox input:checked + span { /* выделенная категория */
        background-color: #ae6ab0;
        color: white;
    }
    /*
    * Стили кновок сортировки
    */
    .mv-books-sort span{
        background-color: #fff;
        color: #2c82c6;
/*        border: 1px dashed #ae6ab0;     */
        border: 2px solid #2c82c6;  
    }
    .mv-books-sort input:checked + span { /* выделенная сортировка */
        background-color: #2c82c6;
        color: white;
    }
    
    i.mv-qty{
        padding: 3px;
        border: none;
        border-radius: 50px;
        font-size: 10px;
        font-style: normal;
        vertical-align: middle;
/*      background-color: gold;
        color: #2c3e50;            */
    }
    
    /* / стили списков*/
    
    /* скрываем инпуты */
    .mv-books-sort input,
    .mv-cat-checkbox input,
    .mv-type-checkbox input {
        display: none;
    }     
    
    *{
        box-sizing: border-box;
    }
    .filter-container{
        width: 100%;
        margin: 45px auto;        
    }
    *:active,
    *:focus {
        outline: none;
        box-shadow: none;
    }
    /*
    * Стили заголовков фильтра: списка категорий 
    */
    .catHeader,
    .typeHeader{
        color: #797979;
        font-size: 18px;
        font-weight: 100;
        margin: 10px 0 0;
    }


    /*
    * Иконки
    */    
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
</style>
