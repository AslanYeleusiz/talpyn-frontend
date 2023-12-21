<template>
    <div>
        <cstHeader />
        <confirmedPopup />
        <Nuxt />
    </div>
</template>


<script>
    import confirmedPopup from '@/components/popups/confirmedPopup.vue'
    //import Header from '@/components/Header.vue'
    export default {
        components: {
            //Header,
            confirmedPopup
        },
        
    }
</script>