<template>
    <button class="btn back d-f a-c">
        <arrowLeft class="arrow" />
        <span class="backtext">Артқа қайту</span>
    </button>
</template>


<script>
    import arrowLeft from '@/components/svg/arrow-left.vue'

    export default {
        components: {
            arrowLeft
        }
    }

</script>


<style scoped lang="scss">
    .back {
        border: 1px solid #3E6CED;
        border-radius: 4px;
        font-weight: 600;
        line-height: 20px;
        color: #3E6CED;
        white-space: nowrap;
        transition: 0.2s;

        .arrow {
            stroke: #1E63E9;
            transition: 0.2s;
        }

        .backtext {
            @media all and (max-width: 767px) {
                display: none;
            }

        }

        &:hover {
            color: #FFFFFF;
            background: #0045CB;
            .arrow{
                stroke: #FFFFFF;
            }
        }
        &:active{
            background: #0037A2;
        }
    }

</style>
