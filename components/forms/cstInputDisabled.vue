<template>
    <div>
        <label v-if='stringName'>{{stringName}}</label>
        <div class="disabled-input">
            <div class="text">{{text}}</div>
            <button @click="$emit('openLogin')" class="btn">Өзгерту</button>
        </div>
    </div>
</template>


<script>
    export default {
        props: ['text', 'stringName'],
    }

</script>


<style scoped lang="scss">
    label {
        margin-bottom: 5px;
        color: #888888;
        font-family: Raleway;
        font-size: 16px;
        font-weight: 400;
        line-height: 23px;
    }

    .disabled-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 15px 14px 20px;
        height: 50px;

        background: #FAFAFA;
        /* Line */

        border: 1px solid #C7C7C7;
        border-radius: 6px;

        .text {
            color: #888888;
            font-family: 'Lato-Regular';
            font-size: 16px;
            font-weight: 500;
            line-height: 23px;
        }

        button {
            font-family: Raleway;
            font-size: 16px;
            font-weight: 600;
            line-height: 23px;
            color: #1E63E9;
            padding: 0;

            &:hover {
                text-decoration: underline;
            }
        }
    }

</style>
