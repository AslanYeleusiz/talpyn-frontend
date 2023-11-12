<template>
    <button class="btn cst_btn" :class="{red:red}">
        <div v-if="loading" class="spinner-border" role="status"></div>
        <span v-else>{{text}}</span>
    </button>
</template>


<script>
    export default {
        props: ['text', 'red', 'loading']
    }

</script>


<style scoped lang="scss">
    .cst_btn {
        padding: 0;
        width: 135px;
        height: 40px;
        border-radius: 99px;
        background: #F9F9F9;
        font-family: Raleway;
        font-size: 12px;
        font-weight: 600;
        line-height: 14px;
        color: #03B113;
        .spinner-border{
            width: 1rem;
            height: 1rem;
        }
        &.red {
            color: #FF0000;
        }

        &:hover {
            background: #03B113;
            color: #ffffff;
        }

        &.red:hover {
            background: #FF0000;
            color: #ffffff;
        }
    }

</style>
