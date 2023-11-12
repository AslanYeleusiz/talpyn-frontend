<template>
    <div>
        <headLink :head='head' active=0 />
        <div class="main">
            <div class="cst-ct">
                <div class="head"><span class="orange">{{month ? month : 'Қаңтар'}}</span> айының зияткерлік олимпиадасы</div>
                <div class="olivers">
                    <div class="block">
                        <img src="~assets/images/diploma.svg" alt="">
                        <div class="info">Портфолиоңызды толтыруға арналған <span class="b up">дипломдар мен сертификаттар</span> алып, санатыңызды көтеріңіз!</div>
                    </div>
                    <div class="block">
                        <img src="~assets/images/watch.svg" alt="">
                        <div class="info">Уақыты: <span class="b">1-31 <span class="tt_underline">{{month}}</span> аралығында</span></div>
                    </div>
                    <div class="block">
                        <img src="~assets/images/portmane.svg" alt="">
                        <div class="info">Оқушыңызды қатыстырып жетекші ретінде тегін <span class="b">алғыс хат</span> алыңыз. Оқушы Ата-анасына да алғыс хат беріледі</div>
                    </div>
                </div>
                <div class="timerBlock">
                    <div class="left">{{month}} айының олимпиадасының Бітуіне қалды</div>
                    <div class="right">
                        <div class="time">
                            <div class="block d-flex aj-c">{{cT.days}}</div>
                            <div class="info">күн</div>
                        </div>
                        <div class="time">
                            <div class="block d-flex aj-c">{{cT.hours}}</div>
                            <div class="info">сағат</div>
                        </div>
                        <div class="time">
                            <div class="block d-flex aj-c">{{cT.minuts}}</div>
                            <div class="info">минут</div>
                        </div>
                        <div class="time">
                            <div class="block d-flex aj-c">{{cT.seconds}}</div>
                            <div class="info">секунд</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <section class="olimp_list">
            <div class="category-overflow">
                <div class="cst-ct">
                    <div class="categories">
                        <button class="btn category-item" :class="{active: category==1}" @click="changeCategory(1)">
                            Облыстық
                        </button>
                        <button class="btn category-item" :class="{active: category==2}" @click="changeCategory(2)">
                            Республикалық
                        </button>
                        <button class="btn category-item" :class="{active: category==3}" @click="changeCategory(3)">
                            Халықаралық
                        </button>
                    </div>
                </div>
            </div>

            <div class="body">
                <div class="cat-overflow">
                    <div class="cst-ct">
                        <div class="cat-category">
                            <button class="btn cat-item" :class="{active: cat_category==1}" @click="changeCatType(1)">
                                Ұстаздарға
                            </button>
                            <button class="btn cat-item" :class="{active: cat_category==4}" @click="changeCatType(4)">
                                Тәрбиешілерге
                            </button>
                            <button class="btn cat-item" :class="{active: cat_category==3}" @click="changeCatType(3)">
                                Оқушыларға
                            </button>
                            <button class="btn cat-item" :class="{active: cat_category==2}" @click="changeCatType(2)">
                                Студенттерге
                            </button>
                        </div>
                    </div>
                </div>
                <div class="cst-ct">
                    <div v-if="loading==1" class="d-flex justify-content-center mt-5 pb-5">
                        <div class="spinner-border" role="status"></div>
                    </div>
                    <div v-else class="list">
                        <template v-for="(olimp, index) in olimps">
                            <div class="block">
                                <div class="wrap">
                                    <img src="~assets/images/olimpsvg.svg" alt="">
                                    <div class="title">{{olimp.o_bagyty}}</div>
                                </div>
                                <div class="cst_size_btn">
                                    <nuxt-link :to="'/olimpiada/'+olimp.lat_name+'-'+olimp.idd">
                                        <cstBtn text="Қатысушыны енгізу" />
                                    </nuxt-link>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
    import headLink from '@/components/header.vue'
    import cstBtn from '@/components/forms/btn.vue'

    export default {
        head() {
            return {
                link: [{
                    rel: 'canonical',
                    href: this.$store.state.appUrl + this.$route.path
                }]
            }
        },
        components: {
            headLink,
            cstBtn
        },
        data() {
            return {
                head: [{
                        link: '/olimpiada',
                        name: 'Олимпиада',
                    }, {
                        link: '/menin-olimpiadalarym',
                        name: 'Менің олимпиадаларым',
                    },
                    {
                        link: '/olimpiada/reiting',
                        name: 'Рейтинг',
                    }
                ],
                category: 2,
                cat_category: 1,
                timer: null,
            }
        },
        async asyncData({
            $axios,
            redirect,
            query
        }) {
            if (Object.keys(query).length === 0) {
                let res = await $axios.$get('olimpiada/tury', {
                    params: {
                        katysushy_id: 1,
                        type: 2
                    }
                })
                return {
                    olimps: res.olimps,
                    loading: 0,
                    cT: {
                        currentTime: res.time,
                        days: '...',
                        hours: '...',
                        minuts: '...',
                        seconds: '...',
                    },
                    month: res.month,
                }
            } else return redirect(302, '/olimpiada')
        },
        methods: {
            getData() {
                this.$axios.get('/olimpiada/tury', {
                    params: {
                        katysushy_id: this.cat_category,
                        type: this.category,
                    }
                }).then((res) => {
                    this.olimps = res.data.olimps
                    this.loading = 0
                    this.cT.currentTime = res.data.time
                    this.month = res.data.month
                })
            },
            changeCategory(e) {
                this.loading = 1
                this.category = e
                this.getData()
            },
            changeCatType(e) {
                this.loading = 1
                this.cat_category = e
                this.getData()
            },
            startTimer() {
                this.timer = setInterval(() => {
                    this.cT.currentTime--;
                    let s = this.cT.currentTime;
                    this.cT.days = Math.floor(s / 86400);
                    this.cT.hours = Math.floor((s % 86400) / 3600);
                    this.cT.minuts = Math.floor((s % 3600) / 60);
                    this.cT.seconds = Math.floor(s % 60);
                    if (s < 1) clearTimeout(this.timer);
                }, 1000)
            },
            stopTimer() {
                clearTimeout(this.timer)
            }
        },
        mounted() {
            this.startTimer()
        }
    }

</script>


<style scoped lang="scss">
    .main {
        padding-bottom: 70px;

        .head {
            font-size: 40px;
            font-weight: 700;
            line-height: 47px;
            text-align: center;
            margin-top: 40px;

            .orange {
                color: #FF8B0D;
            }


        }

        .olivers {
            margin-top: 40px;
            display: grid;
            grid-template-columns: auto auto auto;
            align-items: center;
            grid-gap: 19px;

            .block {
                display: grid;
                grid-template-columns: auto auto;
                align-items: center;
                grid-gap: 15px;

                .info {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 16px;

                    .b {
                        font-weight: 700;
                    }

                    .up {
                        text-transform: uppercase;
                    }
                }
            }
        }

        .timerBlock {
            background: #FEDCD0;
            /* оранжевый */

            border: 1px solid #FF8B0D;
            border-radius: 6px;
            width: 100%;
            max-width: 666px;
            margin: 30px auto 0;
            padding: 30px 40px;
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            grid-gap: 20px;

            .left {
                font-size: 20px;
                font-weight: 600;
                line-height: 23px;
                color: #363636;
                text-transform: uppercase;
            }

            .right {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-gap: 10px;

                .time {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .block {
                        width: 50px;
                        height: 40px;
                        font-family: 'Gilroy-Bold';
                        font-size: 20px;
                        line-height: 25px;
                        color: #FFFFFF;
                        background: #404040;
                        border-radius: 6px;
                    }

                    .info {
                        font-family: 'Gilroy-Regular';
                        font-size: 12px;
                        line-height: 14px;
                        color: #404040;
                        margin-top: 5px;
                        text-transform: uppercase;

                    }
                }
            }
        }
    }

    .olimp_list {
        .category-overflow {
            @media all and (max-width: 767px) {
                overflow-x: scroll;

                &::-webkit-scrollbar {
                    display: none;
                }
            }

        }

        .categories {
            display: flex;
            justify-content: center;

            @media all and (max-width: 767px) {
                justify-content: flex-start;
            }

            .category-item {
                padding: 20px 35px 30px;
                font-size: 24px;
                font-weight: 600;
                color: #888888;
                border-radius: 6px 6px 0px 0px;

                @media all and (max-width: 767px) {
                    padding: 15px 25px 30px;
                    font-size: 20px;
                }

                @media all and (max-width: 575px) {
                    padding: 15px 20px 16px;
                    font-size: 17px;
                }

            }

            .category-item.active {
                background: #F8F8F8;
                border-left: 1px solid #D6D6D6;
                border-top: 1px solid #D6D6D6;
                border-right: 1px solid #D6D6D6;
                color: #363636;
            }
        }

        .body {
            background: #F8F8F8;
            padding-top: 30px;
            padding-bottom: 90px;

            .cat-overflow {
                @media all and (max-width: 767px) {
                    overflow: scroll;

                    &::-webkit-scrollbar {
                        display: none;
                    }
                }

            }

            .cat-category {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-gap: 1px;
                background-color: #D6D6D6;
                background-image: linear-gradient(0deg, #D6D6D6 60%, #F9F9F9 40%);
                background-size: 40px 45px;
                border-bottom: 1px solid #D6D6D6;

                @media all and (max-width: 767px) {}

                .cat-item {
                    font-size: 18px;
                    font-weight: 600;
                    height: 60px;
                    color: #363636;
                    background: #F8F8F8;

                    @media all and (max-width: 767px) {
                        font-size: 16px;
                    }

                    @media all and (max-width: 575px) {
                        font-size: 14px;
                    }

                }

                .cat-item.active {
                    border-bottom: 3px solid #1E63E9;
                }
            }

            .list {
                margin-top: 50px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 20px;

                @media all and (max-width: 767px) {
                    grid-template-columns: 1fr;
                }

                .block {
                    background: #FFFFFF;
                    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.1);
                    border-radius: 6px;
                    padding: 25px 20px 30px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .wrap {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: 20px;
                        padding-bottom: 20px;

                        .title {
                            font-size: 16px;
                            font-weight: 500;
                            line-height: 19px;
                            color: #363636;
                        }
                    }

                    .cst_size_btn {
                        width: 100%;
                        max-width: 200px;
                        height: 40px;
                    }
                }

            }

        }
    }

    @media all and (max-width: 991px) {
        .main .head {
            font-size: 37px;
            line-height: 43px;
        }


    }

    @media all and (max-width: 883px) {
        .main .olivers {
            grid-template-columns: auto;
        }

        .main .olivers .block {
            grid-template-columns: auto 1fr;
        }

        .main .timerBlock {
            grid-template-columns: 1fr;
            margin: 40px auto 0;
        }

        .main .timerBlock .right {
            width: 230px;
            margin: 0 auto;
        }

        .main .timerBlock .left {
            font-size: 19px;
            text-align: center;
            line-height: 22px;
        }

        .main .head {
            font-size: 35px;
            line-height: 39px;
        }
    }

    @media all and (max-width: 767px) {
        .main .head {
            font-size: 33px;
            line-height: 37px;
        }

    }

    @media all and (max-width: 575px) {
        .main .head {
            font-size: 30px;
            line-height: 32px;
            margin-top: 50px;
        }

        .main .timerBlock .left {
            font-size: 17px;
            line-height: 20px;
        }

        .main .timerBlock {
            grid-template-columns: 1fr;
            margin: 50px auto 0;
        }

        .olimp_list .body .list .block .wrap .title {
            font-size: 15px;
            line-height: 18px;
        }
    }

    @media all and (max-width: 500px) {
        .main .head {
            font-size: 27px;
            line-height: 29px;
        }

        .main .olivers .block .info {
            font-size: 13px;
            line-height: 14px;
        }

    }

    @media all and (max-width: 450px) {
        .main .timerBlock {
            padding: 30px 30px;
        }
    }

    @media all and (max-width: 428px) {
        .main .head {
            font-size: 25px;
            line-height: 27px;
        }

        .main .timerBlock .left {
            font-size: 16px;
            line-height: 20px;
        }

    }

    @media all and (max-width: 417px) {
        .main .head {
            font-size: 23px;
            line-height: 24px;
        }

        .main .olivers .block .info {
            font-size: 12px;
            line-height: 14px;
        }

        .main .timerBlock {
            padding: 30px 20px;
        }

        .olimp_list .body .list .block .wrap .title {
            font-size: 14px;
            line-height: 17px;
        }

    }

</style>
