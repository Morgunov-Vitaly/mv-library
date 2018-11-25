import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';

/* Мне не нравится, что по-сути глобально? регистрируем элементы? */
import Library from './Library.vue';
import Book from './Book.vue';

Vue.use(VueRouter); /* см. здесь https://ru.vuejs.org/v2/guide/plugins.html#%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD%D0%BE%D0%B2  */

Vue.use(VueResource); //Подключаем плагин для работы с удаленными серверами по API 

/* Создаем экземпляр объекта */
var router = new VueRouter({
    routes: [
        {path: '/library', component: Library},
        {path: '/book/:id', name: 'book', component: Book}
    ]
});


new Vue({
    el: '#app',
    router,
    render: h => h(App)
}).$mount('#app');