<template>
    <div class="library-wrapper">
        <div id="app">
            <h1>{{msg}}</h1>
            <router-view>
            </router-view>
        </div>
    </div>

</template>

<script>
    import Library from './Library.vue';
    import Book from './Book.vue';
    
    export default {
        name: 'app',
        data(){
            return {
                msg: 'Добро пожаловать в нашу Библиотеку'
            }
        },
        components: {
            AppLibrary: Library,
            AppBook: Book

        }        
    }
</script>

<style>
</style>