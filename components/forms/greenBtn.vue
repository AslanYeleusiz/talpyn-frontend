<template>
    <button class="btn cst_bigBtn">
       <img v-if='img' :src='getImgUrl(img)' alt="">
        {{text}}
    </button>
</template>


<script>
export default {
    props: ['text','img'],
    methods: {
        getImgUrl(pet) {
            var images = require.context('@/assets/images/', false)
            return images('./' + pet)
        },
    }
}
</script>


<style scoped lang="scss">
    .cst_bigBtn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        background: linear-gradient(118deg, #03B113 37.72%, rgba(79, 255, 95, 0.8), #03B113 81.57%) #03B113;
        color: #FFFFFF;
        transition: 0.3s;
        background-size: 250%;
        background-position: 0% 50%;
        animation: anime 3s infinite linear;
        &:hover{
            animation: none;
            background: #4FFF5F;
        }
        &:active{
            background: #03B113;
        }
        img{
            margin-right: 10px;
        }
    }
    @keyframes anime {
        0% {background-position: 150% 50%;}
        75% {background-position: 150% 50%;}
        100% {background-position: 0% 50%;}
    }
</style>
