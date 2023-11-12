<template>
    <div class="FAQ">
        <faqs />
    </div>
</template>


<script>
    //import Header from '@/components/Header.vue'
    import faqs from '@/components/materials/my_olimpiada/faqs.vue'
    export default {
        components: {
            //Header,
            faqs,
        },
        
    }
</script>

<style lang="scss" scoped>
    .FAQ {
        padding: 0 0 150px 0;
    }
</style>