<template>
    <button class="btn text-light cstBtn">
        {{text}}
    </button>
</template>


<script>
    //import Header from '@/components/Header.vue'
    export default {
        props: ['text'],
        components: {
            //Header,
        },
        
    }
</script>

<style lang="scss">
    .cstBtn {
        background: #481EC0;
        padding: 20px 70px;
        color: #FFFFFF;
        font-size: 20px;
        font-weight: 600;
        line-height: 23px;
        border-radius: 5px;
    }
</style>