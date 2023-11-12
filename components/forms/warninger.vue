<template>
    <div @focus="visibility()" @focusout="inVisibility()" tabindex="1" class="block">
        <div class="position">
            <transition name="categories">
                <div v-show="visible == 1" class="text">
                    {{text}}
                </div>
            </transition>
        </div>
        <div class="warning aj-c">
            ?
        </div>
    </div>
</template>


<script>
    export default {
        props: ['text'],
        data() {
            return {
                visible: 0,
            }
        },
        methods: {
            visibility() {
                this.visible = 1
            },
            inVisibility() {
                this.visible = 0
            }
        }
    }

</script>


<style scoped lang="scss">
    .categories-enter-active,
    .categories-leave-active {
        transition: 0.3s;
    }

    .categories-enter,
    .categories-leave-to {
        opacity: 0;
        transform: translateY(-15px);
        transition: 0.3s;
    }

    .block {
        display: inline-block;
    }

    .warning {
        display: inline-flex;
        font-family: Gilroy;
        font-size: 12px;
        font-weight: 700;
        line-height: 15px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #D6D6D6;
        cursor: pointer;
    }

    .position {
        position: absolute;
        margin-left: 30px;
        margin-right: 20px;
        transform: translateY(-30px);
    }

    .text {
        position: relative;
        background: #FFFFFF;
        box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.08);
        border-radius: 6px;

        padding: 15px;
        background: #ffffff;
        font-size: 13px;
        font-weight: 400;
        line-height: 15px;

        &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            border-radius: 6px;
            background: #03B113;

        }
    }

</style>
