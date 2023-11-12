<template>
    <transition name="fadePopup">
        <div v-show='isOpen' class="popupBg" @mousedown.self="$emit('closePopup')">
            <transition name="fade">
                <div v-show='isOpen' class="popupBlock">
                    <div class="exitBtn">
                        <exitBtn @click.native="$emit('closePopup')" />
                    </div>
                    <div class="body">
                        <div class="h2">Қате түрін таңдаңыз</div>
                        <div class="types">
                            <label class="answer">
                                <input v-model="appeals.variable" value=0 type="radio"><span>Сұрақта грамматикалық қате бар</span>
                            </label>
                            <label class="answer">
                                <input v-model="appeals.variable" value=1 type="radio"> <span>Жауабы қате</span>
                            </label>
                            <label class="answer">
                                <input v-model="appeals.variable" value=2 type="radio"> <span>Сұрақтың мазмұнында қателік бар</span>
                            </label>
                            <label class="answer">
                                <input v-model="appeals.variable" value=3 type="radio"> <span>Жауап нұсқалары бірдей</span>
                            </label>
                            <label class="answer">
                                <input v-model="appeals.variable" value=4 type="radio"> <span>Басқа қателер</span>
                            </label>
                        </div>
                        <transition name="fadeGrade">
                            <cstTextarea placeholder="Егер сіздің қатеңіз тізімде жоқ болса, қатеңізді осы жерге толығырақ жазып беруіңізді сұраймыз..." v-show="appeals.variable == 4" class="textarea" v-model="appeals.text" />
                        </transition>
                        <cstBtn @click.native="$emit('sendAppeals', appeals.variable, appeals.text)" text="Жіберу" class="cst_btn" />
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>


<script>
    import exitBtn from '@/components/forms/exitBtn.vue'
    import cstBtn from '@/components/forms/btn.vue'
    import cstTextarea from '@/components/forms/cstTextarea.vue'

    export default {
        components: {
            exitBtn,
            cstBtn,
            cstTextarea
        },
        props: ['isOpen', 'surak', 'katysushyCode'],
        data() {
            return {
                appeals: {
                    variable: null,
                    text: '',
                }
            }
        },

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

    .fadeGrade-enter-active,
    .fadeGrade-leave-active {
        transition: .3s;
    }

    .fadeGrade-enter,
    .fadeGrade-leave-to {
        opacity: 0;
        transform: translateY(-15%);
        transition: 0.3s;
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

    .popupBg {
        top: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 20;
        background: rgba(0, 0, 0, 0.6);

        .popupBlock {
            position: relative;
            width: 100%;
            max-width: 400px;
            background: #FFFFFF;
            border-radius: 6px;
            padding: 40px 50px 50px;

            .exitBtn {
                position: absolute;
                top: 0;
                right: 0;
                transform: translate(-10px, 10px);
            }

            .cst_btn {
                height: 50px;
            }

            .h2 {
                font-family: 'Exo 2';
                font-size: 24px;
                font-weight: 800;
                line-height: 29px;
            }

            .types {
                margin: 30px 0 30px;
            }

            .answer {
                padding: 7.5px 0;
                display: flex;
                gap: 10px;
                align-items: center;
                font-size: 16px;
                font-weight: 400;
                line-height: 19px;
                color: #888888;
                margin: 0;

                &:first-child {
                    border-top: 1px solid #F0F0F0;
                }

                &:hover {
                    background: #F9FBFF;
                    cursor: pointer;
                }

                input {
                    position: absolute;
                    opacity: 0;
                    z-index: -1;
                }

                span {
                    display: inline-flex;
                    align-items: center;
                    user-select: none;
                }

                span::before {
                    content: '';
                    display: inline-block;
                    position: relative;
                    flex-shrink: 0;
                    flex-grow: 0;
                    margin-right: 10px;
                    background-position: 55% 50%;
                    background-size: 55%;
                    background-repeat: no-repeat;
                    width: 22px;
                    height: 22px;
                    border: 2px solid #888888;
                    border-radius: 50%;
                    transition: 0.1s linear;
                }

                input:checked+span::before {
                    border: 5px solid #1E63E9;
                }


            }

            .textarea {
                margin-bottom: 20px;
            }

        }

    }

    @media all and (max-width: 400px) {
        .popupBg .popupBlock {
            padding: 40px 25px 50px;
        }
    }

</style>
