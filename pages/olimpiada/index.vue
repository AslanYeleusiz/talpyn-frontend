<template>
    <div>
        <videoPopup :isOpen="videoOpen" :youtube="youtubeLink" @closePopup="videoOpen=0" />
        <div class="olimp">
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
                <div class="list">
                    <div class="cst-ct">
                        <div class="wrapper">
                            <div class="col_wrap">
                                <template v-for="(olimp, index) in olimps">
                                    <nuxt-link v-if="index%2==0" :to="'/olimpiada/'+olimp.lat_name+'-'+olimp.idd">
                                        <div class="block">
                                            <div class="wrap">
                                                <div class="column_number">{{index+1}}.</div>
                                                <div class="bd">
                                                    <div class="title">{{olimp.bagyt ? olimp.bagyt : olimp.o_bagyty}}</div>
                                                </div>
                                            </div>
                                            <arrowLeft />
                                        </div>
                                    </nuxt-link>
                                </template>
                            </div>
                            <div class="col_wrap">
                                <template v-for="(olimp, index) in olimps">
                                    <nuxt-link v-if="index%2==1" :to="'/olimpiada/'+olimp.lat_name+'-'+olimp.idd">
                                        <div class="block">
                                            <div class="wrap">
                                                <div class="column_number">{{index+1}}.</div>
                                                <div class="bd">
                                                    <div class="title">{{olimp.bagyt ? olimp.bagyt : olimp.o_bagyty}}</div>
                                                </div>
                                            </div>
                                            <arrowLeft />
                                        </div>
                                    </nuxt-link>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <faqs />
        </div>
    </div>
</template>

<script>
    import headLink from '@/components/header_olimp.vue'
    import arrowLeft from '@/components/svg/arrow-left.vue'
    import glassBtn from '@/components/forms/glassBtn.vue'
    import cstbtn from '@/components/forms/btn.vue'
    import bigBtn from '@/components/forms/bigBtn.vue'
    import videoPopup from '@/components/popups/videoPopup.vue'
    import faqs from '@/components/materials/my_olimpiada/faqs.vue'

    export default {
        components: {
            headLink,
            arrowLeft,
            glassBtn,
            videoPopup,
            cstbtn,
            bigBtn,
            faqs,
        },
        data() {
            return {
                head: [{
                    link: '/olimpiada',
                    name: 'Олимпиада',
                }, {
                    link: '/menin-olimpiadalarym',
                    name: 'Менің олимпиадаларым',
                }, {
                    link: '/olimpiada/reiting',
                    name: 'Рейтинг',
                }, ],
                cat_category: 1,
                loading: 0,
                videoOpen: 0,
                youtubeLink: 'https://www.youtube.com/watch?v=Ka0lRluiGmk',
                practice_classes: ['a', 'b', 'c', 'd', 'e', 'f'],
                practice_plusses: [{
                        title: 'Ата-ана мен жетекшіге тегін алғыс хат',
                        desc: 'Оқушы және студенттер олимпиаданы аяқтаған соң өзінің диплом немесе сертификатымен қоса Жетекшісіне және оқушы ата-анасына арналған алғыс хатты тегін жүктеп алуына болады.',
                        img: 'list_ol.png'
                    },
                    {
                        title: 'Әр қатысушыға сұрақтар реті мен нұсқалар реті кездейсоқ форматта беріледі',
                        desc: 'Кездейсоқ форматты берілу арқылы оқушылар бір-бірінен көшіре алмайды. Сол арқылы академиялық адалдық сақталынады.',
                        img: 'refresh_olimp.png'
                    },
                    {
                        title: 'Нәтижесі бірден шығады',
                        desc: 'Олимпиаданы аяқтаған соң нәтижесі бірден шығады. Арнайы код арқылы бірден білуге болады. Олимпиада біткен соң нәтижесін ешкім өзгерте алмайды.',
                        img: 'apllie_olimp.png'
                    },
                    {
                        title: 'Қатемен жұмыс жасауға болады',
                        desc: 'Олимпиаад біткен соң, бірден қай сұрақтардан қателескеніңізді көре аласыз. Сол арқылы барлық сұрақтар мен жауаптарды талдауға болады',
                        img: 'book_olimp.png'
                    },
                    {
                        title: '10% бонус беріледі',
                        desc: 'Ақылы олимпиадаға қатысқан кезде жарнасын төлеген соң сол сумманың 10% бонус ретінде беріледі. Сол ақшаға келесі олимпиадаға жеңілдікпен қатыса аласыз немесе картаға шығаруға болады',
                        img: 'percent_olimp.png'
                    },
                    {
                        title: 'Жетекшілерге сыйлықтар',
                        desc: 'Жетекшілерге әр этап сайын бағалы сыйлықтар (ноутбуктар, телефондар, бағалы сыйлықтар) беріледі. Сыйлықтар туралы ақпаратты рейтинг бетінде жариялап отырамыз',
                        img: 'minigift_olimp.png'
                    },

                ],
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
            getImgUrl(pet) {
                var images = require.context('../../assets/images/', false)
                return images('./' + pet)
            },
            changeCatType(e) {
                this.loading = 1
                this.cat_category = e
                this.getData()
            },
            getData() {
                this.$axios.get('/olimpiada/tury', {
                    params: {
                        katysushy_id: this.cat_category,
                        type: 2,
                    }
                }).then((res) => {
                    this.olimps = res.data.olimps
                    this.loading = 0
                    this.cT.currentTime = res.data.time
                    this.month = res.data.month
                })
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
    .olimp {
        padding-bottom: 130px;

        .body {
            margin-top: 50px;


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
                    background: #ffffff;

                    @media all and (max-width: 767px) {
                        font-size: 16px;
                    }

                    @media all and (max-width: 575px) {
                        font-size: 14px;
                    }

                }
                
                .blue::after{
                    content: '';
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #1E63E9;
                    margin-bottom: 4px;
                    margin-left: 5px;
                }

                .cat-item.active {
                    border-bottom: 3px solid #363636;
                    color: #363636;
                }
            }

            .list {
                border: 1px solid #D6D6D6;
                background: #F8F8F8;
                border-radius: 30px;
                padding: 50px 0 72px;

                .wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 20px;

                    .title {
                        color: #363636;
                    font-size: 16px;
                    font-weight: 700;
line-height: 19px;

                    }

                    .desc {
                        color: #888888;
                    }

                    a:hover {
                        text-decoration: none;

                        .block {
                            outline: 1px solid #0045CB;

                            svg {
                                stroke: #0045CB;
                            }
                        }
                    }
                }

                .block {
                    border-radius: 26px;
                    padding: 25px 20px;
                    background: #fff;
                    box-shadow: 0px 4px 10px 0px #0000001A;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    justify-content: space-between;
                    outline: 1px solid #D6D6D6;
                    margin-top: 20px;

                    svg {
                        stroke: #D6D6D6;
                        transform: rotate(180deg);
                        width: 24px;
                        height: 24px;
                    }

                    .wrap {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    }


                }
            }
        }
    }

    span.gold {
        color: #A48A16;
    }

    span.blue {
        color: #6E64BD;
    }


    @media all and (max-width: 883px) {
        .olimp .body .list .wrapper {
            grid-template-columns: 1fr;
            gap: 0;
        }

        .olimp .body .cat-overflow {
            overflow: scroll;
        }

    }

</style>
