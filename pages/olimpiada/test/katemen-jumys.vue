<template>
    <div>
        <kateSurakPopup :isOpen="appeals_active" @closePopup="appeals_active=0" @sendAppeals="sendAppeals" />
        <div class="test">
            <div class="wrap">
                <div class="header">
                    <div class="cst-ct">
                        <button @click='gotoBack' class="btn back">
                            <img src="~assets/images/arrow-left-blue.svg" alt="">
                            <span class="backtext">Артқа қайту</span>
                        </button>
                        <div class="title-wrap">
                            <img src="~assets/images/kitap.svg" alt="">
                            <div class="title">{{katysushy.bagyty.bagyt}}</div>
                        </div>
                    </div>
                </div>
                <div class="body cst-ct">
                    <div class="questions">
                        <template v-for="n in suraktar.length">
                            <qBtn
                                   :mode="
                                    currentQuestion+1==n ? 3 :
                                    checVariant(suraktar[n-1].zhauap) ? 1 : 2"
                                    :num=n
                                    @click.native="setQuestion(n)" />
                        </template>
                    </div>
                    <div class="hr"></div>
                    <div class="question">
                        <div class="surak-wrap">
                            <div class="num">Сұрақ №{{currentQuestion+1}}</div>
                            <div @click="appeals_active=1" class="kate">Аппеляцияға беру</div>
                        </div>
                        <div class="question-title" v-html="suraktar[currentQuestion].surak.surak"></div>
                        <div class="answers">
                            <template v-for="zhauap in suraktar[currentQuestion].surak.zhauap">
                                <label class="answer" :class="checThisAnswer(zhauap)">
                                    <input type="radio"><span>{{zhauap.variant}}</span>
                                </label>
                            </template>
                        </div>
                    </div>
                    <div class="pagination">
                        <div class="paginate">
                            <button @click="prevTo" class="btn paginate-btn left"></button>
                            <div class="str">{{currentQuestion+1}} / 20</div>
                            <button @click="nextTo" class="btn paginate-btn right"></button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
    import qBtn from '@/components/forms/qBtn.vue'
    import kateSurakPopup from '@/components/popups/kateSurakPopup.vue'

    export default {
        middleware: ['auth'],
        head() {
            return {
                title: 'Зияткерлік олимпиада | Қатемен жұмыс',
                meta: [{
                    hid: 'description',
                    name: 'description',
                    content: 'Олимпиадаларға барлық ұстаздар, тәрбиешілер, білім бөлімдерінің мамандары және мектепалды даярлық, балабақша, мектеп оқушылары, гимназия, лицей оқушылары, студенттер барлық қолданушылар қатыса алады.'
                }, {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'онлайн олимпиадалар, зияткерлік олимпиада, қазақстандық интернет олимпиадалар, қазахстанские интернет олимпиады, кио, cdo kz, оқушыларға арналған интернет олимпиада, қашықтық олимпиада, тегін олипиадалар, клевер олимпиада'
                }, ],
                link: [{
                    rel: 'canonical',
                    href: this.$store.state.appUrl + this.$route.path
                }]
            }
        },
        components: {
            qBtn,
            kateSurakPopup
        },
        layout: 'second',
        data() {
            return {
                appeals_active: 0,
                currentQuestion: 0,
            }
        },
        async asyncData({$axios, query}){
            let res = await $axios.$get('/olimpiada/test/katemen-zhumys', {
                params: {
                    user_code: query.user_code,
                    code: query.code
                }
            })
            return {
                suraktar: res.data.test,
                katysushy: res.data.o_user,
            }
        },
        
        methods: {
            nextTo() {
                if (this.currentQuestion < 19) this.currentQuestion++
            },
            prevTo() {
                if (this.currentQuestion > 0) this.currentQuestion--
            },
            setQuestion(e) {
                this.currentQuestion = e - 1;
            },
            gotoBack() {
                this.$router.go(-1);
            },
            checVariant(zhauap) {
                if(zhauap == null) return 0
                else if(zhauap.zhauap_id == 1) return 1
                return 0
            },
            checThisAnswer(zhauap) {
                if(zhauap.surak_id == this.suraktar[this.currentQuestion].surak_id){
                    if(zhauap.zhauap_id == 1) return 'success'
                    else if(zhauap.id == this.suraktar[this.currentQuestion].zhauap_id)
                    return 'error'
                }
                return ''
            },
            sendAppeals(variable, text) {
                this.$api.post('/olimpiada/appeals/create', {
                    variable: variable,
                    text: text,
                    code: this.katysushy.o_tizim.code,
                    surak: this.suraktar[this.currentQuestion].surak
                }).then((res) => {
                    if (res.data.status == true) {
                        console.log(res)
                        this.$bus.$emit('notification', {
                            text: 'Аппеляция сәтті жіберілді',
                            status: 'success',
                        })
                        this.$bus.$emit('successPopup')
                        this.appeals_active = 0
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
        },
    }

</script>


<style scoped lang="scss">
    .test {
        width: 100vw;
        background: #F9F9F9;
        height: 100vh;

        .wrap {
            height: 100vh;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            padding: 0 0 40px;
            grid-gap: 20px;
        }

        .header {
            .cst-ct{
                display: grid;
                grid-template-columns: auto 1fr;
                grid-gap: 30px;
                align-items: center;
                min-height: 66px;
            }
            background: #ffffff;
            border-bottom: 1px solid #D6D6D6;

            .back {
                border: 1px solid #3E6CED;
                border-radius: 4px;
                font-weight: 600;
                line-height: 20px;
                color: #3E6CED;
            }

            .title-wrap {
                display: grid;
                grid-template-columns: auto 1fr;
                grid-gap: 10px;
                align-items: center;
                width: 100%;
                max-width: 540px;

            }

            .header-timer-wrap {
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
                grid-gap: 20px;
            }

            .title {
                font-size: 16px;
                font-weight: 700;
                line-height: 19px;
                color: #363636;
            }

            .timer {
                font-size: 16px;
                font-weight: 700;
                line-height: 19px;
                color: #03B113;
            }

            .cst_btn {
                width: 200px;
                height: 40px;
                background: #363636;
                border-radius: 6px;
                color: #ffffff;
                font-weight: 600;
            }

        }

        .body {
            position: relative;
            z-index: 3;
            background: #FFFFFF;
            box-shadow: 0px 4px 54px rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            padding: 40px 40px 0;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 0px;
            }

            &::-webkit-scrollbar-track {
                background: #F0F0F0;
            }

            &::-webkit-scrollbar-thumb {
                background: #888888;
            }




            .question {
                padding-bottom: 50px;
            }

            .questions {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                grid-gap: 10px;
            }

            .hr {
                margin: 40px 0 30px;
                width: 100%;
                border-top: 1px solid #D6D6D6;
            }

            .surak-wrap {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .num {
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 23px;
                    letter-spacing: 0.05em;
                    color: #888888;
                    text-transform: uppercase;

                }

                .kate {
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 19px;
                    color: #888888;
                    cursor: pointer;

                    &:hover {
                        text-decoration: underline;
                    }

                }
            }

            .question-title {
                font-size: 18px;
                font-weight: 600;
                line-height: 21px;
                margin-top: 30px;
            }

            .answers {
                margin-top: 20px;
            }

            .answer {
                padding: 15px 10px;
                display: flex;
                gap: 10px;
                align-items: center;
                font-size: 18px;
                line-height: 21px;
                color: #000000;
                margin: 0;
                border-bottom: 1px solid #F0F0F0;

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
                    border: 1px solid #1E63E9;
                    border-radius: 50%;
                }

                &.success{
                    span::before{
                        background-image: url(~/assets/images/krestSuccess.svg);
                        background-color: rgba(3, 177, 19, 0.4);
                        border: 1px solid #03B113;
                    }
                    background: #EFFAF6;
                }

                &.error {
                    span::before{
                        background-image: url(~/assets/images/krest.svg);
                        background-color: rgba(255, 0, 0, 0.4);
                        border: 1px solid #FF0000;
                    }
                    background: #FFEFF0;
                }

/*
                input:checked+span::before {
                    background-image: url(~/assets/images/nike.svg);
                    background-color: #1E63E9;
                }
*/


            }

            .pagination {
                position: sticky;
                bottom: 0;
                width: 100%;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 10%, rgb(255, 255, 255) 40%);
            }

            .paginate {
                width: 300px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0 27px;
            }

            .paginate-btn {
                padding: 0;
                width: 50px;
                height: 50px;
                background-color: #363636;
                border-radius: 6px;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                background-size: 60%;
                background-image: url(~/assets/images/arrow-left-white.svg);

                &.right {
                    background-image: url(~/assets/images/arrow-right-white.svg);
                }
            }


        }
    }

    @media all and (max-width: 883px) {
        .test .header {
            grid-template-columns: auto;
        }

        .test .header .timer {
            grid-area: b;
        }

        .test .header .cst_btn {
            grid-area: c;
        }

        .test .header .header-timer-wrap {
            grid-template-columns: auto auto 1fr;
            grid-template-areas: 'a b c';
        }
    }

    @media all and (max-width: 767px) {
        .test .wrap[data-v-279a75d1] {
            padding: 20px 0 0px;
        }

        .test .body .paginate[data-v-279a75d1] {
            padding: 20px 0 40px;
        }
    }

</style>
