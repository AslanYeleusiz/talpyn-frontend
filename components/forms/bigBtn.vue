<template>
    <button class="btn cst_bigBtn" :class="{square:square}">
        <div v-if='loading' class="spinner-border" role="status"></div>
        <div class="content aj-c" v-else>
            <img v-if="img" :src="getImgUrl(img)" alt="">
            {{text}}
        </div>
    </button>
</template>


<script>
export default {
    props: ['text','img','loading', 'square'],
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
        width: 100%;
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(118deg, #1C77FD 75.72%, rgba(255,255,255,0.75), #1C77FD 91.57%) #0045CB;
        color: #FFFFFF;
        background-size: 150%;
        background-position: 0% 50%;
        animation: anime 3s infinite linear;
        &:hover{
            animation: none;
            background: #0045CB;
        }
        &:active{
            background: #0037A1;
        }
        &.square{
            border-radius: 6px;
        }
        .content{
            display: flex;
            flex-wrap: nowrap;
            gap: 10px;
        }
    }
    .spinner-border{
        font-size: 14px;
        width: 20px;
        height: 20px;
    }
    @keyframes anime {
        0% {background-position: 290% 50%;}
        75% {background-position: 290% 50%;}
        100% {background-position: 0% 50%;}
    }
</style>
