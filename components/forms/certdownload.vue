<template>
    <button class="btn myBtn">
        <img v-if='img' :src='getImgUrl(img)' alt="">
        <div v-if='loading' class="spinner-border" role="status"></div>
        <span v-else>{{text}}</span>
    </button>
</template>


<script>
export default {
    props: ['text', 'img', 'loading'],
    methods: {
        getImgUrl(pet) {
            var images = require.context('@/assets/images/', false)
            return images('./' + pet)
        },
    }
}
</script>


<style scoped lang="scss">
    .myBtn{
        background: #FF8B0D;
        color: #ffffff;
        font-family: Raleway;
        font-size: 12px;
        font-weight: 600;
        line-height: 14px;
        border-radius: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            margin-right: 10px;
            width: 20px;
            height: 20px;
        }
        &:hover{
            background: #8E5618;
        }
        &:active{
            background: #CD6B00;
        }
    }
</style>
