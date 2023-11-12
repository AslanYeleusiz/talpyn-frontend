<template>
    <transition name="fade">
        <div v-if="open" class="popup_bg" @mousedown.self="cancel">
            <div class="popup">
                <div class="header d-flex a-c j-b">
                    <div></div>
                    <exitBtn @click.native="cancel" />
                </div>
                <div class="body">
                    <Lottie :width="100" :height="100" :options="defaultOptions" v-on:animCreated="handleAnimation" />
                    <div class="h">{{ message }}</div>
                </div>
                <div class="foot">
                    <div class="wrap">
                        <saveBtn @click.native="confirm" text="Ия" />
                        <saveBtn @click.native="cancel" text="Артқа қайту" red=1 />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
    import Lottie from 'vue-lottie/src/lottie.vue'
    import * as animationData from "@/assets/lottie_files/info_2/animation_kqc42oh6.json"
    import saveBtn from '@/components/forms/saveBtn.vue'
    import exitBtn from '@/components/forms/exitBtn.vue'

    export default {
        components: {
            Lottie,
            saveBtn,
            exitBtn
        },
        data() {
            return {
                open: false,
                Animate: false,
                defaultOptions: {
                    animationData: animationData,
                    loop: true,
                },
                animationSpeed: 1,
                message: '',
                resolver: () => null,
            }
        },
        mounted() {
            this.$nuxt.$on('dialog', this.dialog);
        },
        methods: {
            handleAnimation: function(anim) {
                this.anim = anim;
            },
            confirm() {
                this.resolver(new Promise((resolve) => resolve('confirmed')));
                this.close();
            },
            cancel() {
                this.resolver(new Promise((resolve, reject) => reject(new Error('cancelled'))));
                this.close();
            },
            close() {
                this.open = false;
            },
            dialog({
                message,
                open,
                resolver
            }) {
                this.message = message;
                this.open = open;
                this.resolver = resolver;
            }
        }
    }
</script>


<style scoped lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .header{
        padding: 10px 10px 0;
    }
    .popup_bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        z-index: 20;
    }

    .popup {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 60px;
        width: 100%;
        max-width: 360px;
        background: #ffffff;
        border-radius: 6px;
    }

    .body {
        padding: 0 50px 20px;
        font-size: 21px;
        font-weight: 800;
        line-height: 26px;
        text-align: center;
    }

    .foot {
        padding-bottom: 40px;
    }

    .wrap {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

</style>
