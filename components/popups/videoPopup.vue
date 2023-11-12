<template>
    <transition name="fadePopup">
        <div v-show='isOpen' class="popupBg" @click="$emit('closePopup')">
            <transition name="fade">
                <div v-show='isOpen' class="popupBlock" @click.stop>
                    <div class="exitBtn">
                        <button @click="$emit('closePopup')" class="btn exit"><img src="~assets/images/exitBtn.svg" alt=""></button>
                    </div>
                    <div class="cst-pd">
                        <template v-if="isOpen && youtube">
                            <vue-plyr>
                                <div class="plyr__video-embed">
                                    <iframe :src="youtube" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </vue-plyr>
                        </template>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>


<script>
    export default {
        props: ['isOpen', 'youtube'],
    }

</script>


<style scoped lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: .5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-15%);
        transition: 0.5s;
    }

    .fadePopup-enter-active,
    .fadePopup-leave-active {
        transition: .5s;
    }

    .fadePopup-enter,
    .fadePopup-leave-to {
        opacity: 0;
        transition: 0.3s;
    }

    .myBtn {
        background: #1E63E9;
        border-radius: 26px;
        width: 100%;
        max-width: 250px;
        height: 50px;
        color: #ffffff;
    }

    .popupBg {
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 20;
        background: rgba(0, 0, 0, 0.6);

        .popupBlock {
            width: 100%;
            max-width: 700px;
            background: #ffffff;
            max-height: 100vh;
            border-radius: 6px;

            .exitBtn {
                display: flex;
                justify-content: flex-end;
                width: 100%;
                padding: 10px 10px 14px 0;

                .exit {
                    padding: 0;
                }
            }

            .cst-pd {
                padding: 0 50px 50px;
            }
        }
    }

</style>
