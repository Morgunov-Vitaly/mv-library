<template>
    <div class="library-wrapper">
        <div id="app">
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