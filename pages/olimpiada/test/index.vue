<template>
    <div>
        <kateSurakPopup :isOpen="appeals_active" @closePopup="appeals_active=0" @sendAppeals="sendAppeals" />
        <div class="test">
            <div class="cst-ct">
                <div class="wrap">
                    <div class="header">
                        <div class="title-wrap">
                            <img src="~assets/images/kitap.svg" alt="">
                            <div class="title">{{katysushy.bagyty.bagyt}}</div>
                        </div>
                        <div class="header-timer-wrap">
                            <div class="timer">{{cT.minuts}}:{{cT.seconds}}</div>
                            <button @click="testFinish" class="btn cst_btn">Олимпиаданы аяқтау</button>
                        </div>
                    </div>
                    <div class="body">
                        <div class="questions">
                            <template v-for="n in suraktar.length">
                                <qBtn :mode="
                                    currentQuestion+1==n ? 3 :
                                    suraktar[n-1].my_answer != 0 ? 1 : 0" :num=n @click.native="setQuestion(n)" />
                            </template>
                        </div>
                        <div class="hr"></div>
                        <div class="question">
                            <div class="surak-wrap">
                                <div class="num">Сұрақ №{{currentQuestion+1}}</div>
                                <div @click="appeals_active=1" class="kate">Аппеляцияға беру</div>
                            </div>
                            <div class="question-title" v-html="suraktar[currentQuestion].surak"></div>
                            <div class="answers">
                                <label v-for="(zhauap, index) in suraktar[currentQuestion].zhauap" class="answer">
                                    <input v-model="suraktar[currentQuestion].my_answer" :value="zhauap.id" type="radio"> <span v-html="zhauap.variant"></span>
                                </label>
                            </div>
                        </div>
                        <div class="pagination">
                            <div class="paginate">
                                <button @click="prevTo" class="btn paginate-btn left"></button>
                                <div class="str">{{currentQuestion+1}} / 20</div>
                                <button @click="nextTo" class="btn paginate-btn right"></button>
                            </div>
                        </div>
                        <div class="framer">
                            <iframe class="w-100" src="https://www.programiz.com/python-programming/online-compiler/" frameborder="0"></iframe>
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
                title: 'Зияткерлік олимпиада | Тест',
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
                question: {
                    my_answer: null,
                },
                appeals_active: 0,
                timer: null,
                suraktar: [{
                    my_answer: 0,
                    surak: '',
                    zhauap: [],
                }],
                katysushy: {
                    o_tury: {
                        o_tury: ''
                    }
                },
                currentQuestion: 0,
            }
        },
        async asyncData({$axios, redirect, query}){
            let res = await $axios.$get('/olimpiada/test/load', {
                    params: {
                        code: query.code
                    }
                })
            var timer = 3600
            var katysushy = res.data[1];
            if (res.status == true) {
                var suraktar = res.data[0];
            } else if (res.status == 'continue') {
                var suraktar = new Array();
                res.data[0].forEach((e) => {
                    e.surak.my_answer = e.zhauap_id
                    suraktar.push(e.surak)
                });
                timer = res.date
            }
            let s = Number(timer)
            let currentQuestion = 0
            let chec = true
            suraktar.forEach((e, index) => {
                if (e.my_answer == 0 && chec) {
                    currentQuestion = index
                    chec = false
                }
            })
            return {
                suraktar: suraktar,
                katysushy: katysushy,
                currentQuestion: currentQuestion,
                cT: {
                    currentTime: s,
                    minuts: Math.floor(s / 60) / 10 < 1 ? '0' + Math.floor(s / 60) : Math.floor(s / 60),
                    seconds: Math.floor(s % 60) / 10 < 1 ? '0' + Math.floor(s % 60) : Math.floor(s % 60),
                },
            }
        },
        
        methods: {
            startTimer() {
                this.$axios.$post('olimpiada/test/start', {
                    o_order_id: this.katysushy.o_order_id,
                    suraktar: this.suraktar,
                }).then((res)=>{
                    console.log('success saved')
                })
                this.timer = setInterval(() => {
                    this.cT.currentTime--;
                    let s = this.cT.currentTime;
                    this.cT.minuts = Math.floor(s / 60) / 10 < 1 ? '0' + Math.floor(s / 60) : Math.floor(s / 60);
                    this.cT.seconds = Math.floor(s % 60) / 10 < 1 ? '0' + Math.floor(s % 60) : Math.floor(s % 60);
                    if (s < 1) this.testFinish();
                }, 1000)
            },
            stopTimer() {
                clearTimeout(this.timer)
            },
            testFinish() {
                if (this.suraktar[this.currentQuestion].my_answer != 0) {
                    this.sendToSaveAnswer(this.currentQuestion)
                }
                this.sendTestResult()
            },
            sendTestResult() {
                this.stopTimer()
                this.$api.$post('olimpiada/test/finish', {
                    id: this.katysushy.idd
                }).then((res) => {
                    this.$router.push({
                        name: 'olimpiada-test-id-result',
                        params: {
                            id: this.katysushy.idd,
                        }
                    })
                })
            },
            sendAppeals(variable, text) {
                this.$api.post('/olimpiada/appeals/create', {
                    variable: variable,
                    text: text,
                    code: this.katysushy.o_tizim.code,
                    surak: this.suraktar[this.currentQuestion]
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
            checEnterAllVariants() {
                let count = true
                this.suraktar.forEach((e) => {
                    if (e.my_answer == 0) count = false
                })
                return count
            },
            nextTo() {
                if (this.suraktar[this.currentQuestion].my_answer != 0) {
                    this.sendToSaveAnswer(this.currentQuestion)
                }
                if (this.currentQuestion < 19) this.currentQuestion++
            },
            prevTo() {
                if (this.suraktar[this.currentQuestion].my_answer != 0) {
                    this.sendToSaveAnswer(this.currentQuestion)
                }
                if (this.currentQuestion > 0) this.currentQuestion--
            },
            setQuestion(e) {
                if (this.suraktar[this.currentQuestion].my_answer != 0) {
                    this.sendToSaveAnswer(this.currentQuestion)
                }
                this.currentQuestion = e - 1;
            },
            sendToSaveAnswer(e) {
                this.$api.$post('olimpiada/test/save/answer', {
                    user_code: this.katysushy.o_tizim.code,
                    surak_id: this.suraktar[e].id,
                    zhauap_id: this.suraktar[e].my_answer
                }).then(() => {
                    console.log('Успешно сохранен!')
                })
            },
        },
        mounted() {
            this.stopTimer()
            this.startTimer()
        }

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
            padding: 20px 0 40px;
            grid-gap: 20px;
        }

        .header {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-gap: 20px;
            align-items: center;

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

                input:checked+span::before {
                    background-image: url(~/assets/images/nike.svg);
                    background-color: #1E63E9;
                }


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
            .framer {
                overflow: hidden;
            }
            iframe {
                transform: translate(-54px, -100px);
                height: 600px;
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

    @media all and (max-width: 500px) {
        .cst-ct {
            padding: 0;

            .header {
                padding: 0 10px;
            }
        }
    }

</style>
