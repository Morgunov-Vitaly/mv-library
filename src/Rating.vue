<template>
    <div class="rating-container">
        <span v-for="star in stars">
            <i class="fa" v-bind:class="star" aria-hidden="true"></i>
        </span>
    </div>
</template>

<script>
    export default {
        props:{
            rating: Number, //Средний рейтинг в процентах
            maxStars: Number //Максимальное количество звезд
        },
/*        data(){
            return{
                stars:[], //Массив классов звездочек
                cR: 0
            }
        },*/
        computed:{
            cR: function(){
                let lcR=0;
                if (!(this.rating)){ // если по каким-то причинам рейтинг оказался ниже 0% или не задан - ограничиваем 0%
                    lcR = 0;
                }else if (this.rating > 100){ // если по каким-то причинам рейтинг оказался больше 100% - ограничиваем 100%
                    lcR = 100;
                } else{
                    lcR = this.rating;
                }
                return lcR; 
            },
            stars: function(){ //массив классов звезд
                let st = [];                
                let pS = 100/(this.maxStars*2); // процентов на звезду
               // console.log('cR: ' + this.cR);
               // console.log('pS: ' + pS);
                let xz=0; // Соотношение диапазона для определения вида звезды
                for (let i = 1; i <= this.maxStars; i++){
                    xz = (this.cR-(i-1)*2*pS)/((i*2*pS)-(i-1)*2*pS);
                  //  console.log('xz: ' + xz);
                    if (xz >= 0.67) { 
                        st.push('fa-star'); // Звездочка включена
                    } else if (xz <= 0.33) {
                        st.push('fa-star off-star');                        
                    } else { // Звездочка вЫключена
                        st.push('fa-star-half-o');
                    }

                }
               // console.log(st);
                return st;
            }
        }
    }
</script>

<style scoped>
    .rating-container{
        display: block;        
        margin: 15px 0;
    }
    .fa-star{
        color:gold;
    }
    .fa-star.off-star{
        color: #ccc;
    }
    .fa-star-half-o { /* fa-star-half */
        color: lemonchiffon;
    }    
</style>