<template>
    <button class="btn cst_certBtn">{{text}}</button>
</template>


<script>
export default {
    props: ['text']
}
</script>


<style scoped lang="scss">
    .cst_certBtn{
        width: 100%;
        height: 100%;
        background: linear-gradient(112deg, #58432C 66.81%, rgba(255,255,255,0.4) 77.45%, #58432C 85.05%) #804B12;
        border-radius: 999px;
        font-size: 14px;
        font-weight: 700;
        line-height: 16px;
        color: #FFFFFF;
        text-transform: uppercase;
        background-size: 150%;
        background-position: 0% 50%;
        animation: anime 3s infinite linear;
        &:hover{
            animation: none;
            background: #804B12;
        }
        &:active{
            background: #714C25;
        }
    }
    @keyframes anime {
        0% {background-position: 260% 50%;}
        75% {background-position: 260% 50%;}
        100% {background-position: 0% 50%;}
    }
</style>
