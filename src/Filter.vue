<template>    
    <div class="filter-container">
        <p class="catHeader">Рубрики:</p>
        <label class="mv-cat-checkbox" v-for="(key, value, index) in categories">
            <input type="checkbox" v-bind:id="'mv-mv-cat-checkbox-' + index" v-model="checkedCategory" v-bind:value="value"><span>{{ value }} <i class="mv-qty">{{key}}</i></span>
        </label>
        <p class="typeHeader">Тип носителя:</p>
        <label class="mv-type-checkbox" v-for="(key,value,index) in bookTypes">
            <input type="checkbox" v-bind:id="'mv-mv-type-checkbox-' + index" v-model="checkedType" v-bind:value="value"><span>{{ value }} <i class="mv-qty">{{key}}</i></span>
        </label>
    </div>
</template>

<script>
    export default {
        props:{
            filteredBooks: Array, /* Массив отфильтрованных книг */
        },    
        data() {
            return {
                checkedCategory: [],
                checkedType: [] 
            }
        },
        methods: {            
            unic: function(arr, key){ /* Находит уникальные свойства и подсчитывает кол-во их повторений */
                var result = {};
                arr.forEach(function(a){
                result[a[key]] = result[a[key]] + 1 || 1;
                });
                return result;
            }
        },
        computed: {
            categories: function () {
                //Создать массив со списком категорий categories[ {label: qty} ]  рубрика: количество книг}
                
                return this.unic(this.filteredBooks, 'GENRE');
            },
            bookTypes(){
                //Создать массив со списком типов носителей книг bookTypes[ {label: qty} ]  рубрика: количество книг}
                return this.unic(this.filteredBooks, 'TYPE');
            }
        }
    }
</script>
<style scoped>
 /*
 * стили списков фильтра
 */
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
        border: 1px dashed #03bd98;
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
        color: #ae6ab0;;
        border: 1px dashed #ae6ab0;     
    }
    .mv-type-checkbox input:checked + span { /* выделенная категория */
        background-color: #ae6ab0;
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
    .mv-cat-checkbox input,
    .mv-type-checkbox input {
        display: none;
    }     
    
    *{
        box-sizing: border-box;
    }
    .filter-container{
        width: 80%;
        margin: 45px auto;
        padding-right: 65px;
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
        color: #ccc;
        font-size: 22px;
        font-weight: 200;
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