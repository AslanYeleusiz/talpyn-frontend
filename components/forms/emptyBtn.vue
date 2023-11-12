<template>
    <button class="btn cst_btn" :class="{radian:radian}">
        {{text}}
        <img v-if='imgToRight' :src='getImgUrl(imgToRight)' class="right" alt="">
    </button>
</template>


<script>
export default {
    props: ['text', 'radian', 'imgToRight'],
    methods: {
        getImgUrl(pet) {
            var images = require.context('@/assets/images/', false)
            return images('./' + pet)
        },
    }
}
</script>


<style scoped lang="scss">
    .cst_btn{
        width: 100%;
        height: 50px inherit;
        border: 1px solid #1E63E9;
        border-radius: 10px;
        font-family: Raleway;
        font-size: 16px;
        font-weight: 500;
        line-height: 23px;
        transition: 0.2s;
        color: #1E63E9;
        padding: 10px 0;
        &:hover{
            color: #ffffff;
            background: #0045CB;
        }
        &.radian{
            border-radius: 99px;
        }

    }
</style>
