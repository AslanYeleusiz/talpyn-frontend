<template>
    <button :style="style" class="btn cst_btn">
        <edit v-if="img==1" />
        <destroy v-if="img==2" />
        <importer v-if="img==3" />
        <info v-if="img==4" />
        {{text}}
    </button>
</template>


<script>
    import edit from '@/components/svg/edit.vue'
    import destroy from '@/components/svg/destroy.vue'
    import importer from '@/components/svg/importer.vue'
    import info from '@/components/svg/info.vue'

export default {
    components: {
        edit,
        destroy,
        importer,
        info
    },
    props: ['text', 'img'],
    methods: {
        getImgUrl(pet) {
            var images = require.context('@/assets/images/', false)
            return images('./' + pet)
        },
    },
    computed: {
      style () {
        return 'max-width: ' + this.size;
      }
    },
}
</script>


<style scoped lang="scss">
    .cst_btn{
        width: 100%;
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 12px;
        font-weight: 600;
        color: #1E63E9;
        background: #F9F9F9;
        border-radius: 99px;
        svg{
            stroke: #1E63E9;
            transition: all 0.2s;
        }
        &:hover{
            background: #0045CB;
            color: #ffffff;
            svg{stroke: #ffffff;}
        }
        &:active{
            background: #0037A1;
            color: #ffffff;
            svg{stroke: #ffffff;}
        }
    }
</style>
