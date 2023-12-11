<template>
    <div>
        <div class="cst-ct">
            <div class="block">
                <div class="h2">
                    Қатысу нұсқаулығы
                </div>
                <div class="wrap">
                    <div>
                        <ol>
                            <li>Қатысушының аты-жөнін енгізіңіз (Бірнеше қатысушы болса барлығының аты-жөнін жазыңыз)</li>
                            <li>Жарнасын төлеңіз (тегін олимпиада болған жағдай төлем жасаудың қажеті жоқ)</li>
                            <li>Тестті бастау батырмасын басып тест тапсырыңыз (Әріптесіңді көмек ретінде тіркесеңіз қатысу кодын беріңіз. Өзі сайтта код арқылы тапсыра алады)</li>
                            <li>Марапатты жүктеп алыңыз (Әріптесіңіз тест біткен соң нәтижесі шыққан беттен өзі жүктеп алуына болады)</li>
                        </ol>
                        <nuxt-link to="/olimpiada/test/enter-code">
                            <glassBtn class="glbtn" radian=1 text="Кодты енгізу беті" newbe=1 />
                        </nuxt-link>
                    </div>
                    <div @mousedown="$emit('videoOpen')" class="video">
                        <img src="~assets/images/pdfbig.png" alt="">
                        <div class="title"><img src="~assets/images/download.svg" alt=""> Қатысу нұсқаулығы.pdf</div>
                    </div>
                </div>
            </div>
            <div class="block">
                <div class="h2">
                    Сіз тіркелген олимпиадалар тізімі
                </div>
                <div class="h3">{{thisYear}} жыл</div>

                <div v-if="olimps.length==0" class="not_found">
                    <img src="~/assets/images/document.svg" alt="">
                    <div class="head">{{thisYear}} жылы ешқандай олимпиадаға тіркелмегенсіз</div>
                </div>



                <div class="block_list">
                    <template v-for="(olimp, index) in olimps">
                        <nuxt-link v-if="index<3" :to="'/olimpiada/'+olimp.o_bagyt.lat_name+'-'+olimp.o_bagyt.idd" class="block">
                            <div class="head">{{olimp.o_bagyt.month_name}} айының {{olimp.o_bagyt.o_bagyty}}</div>
                            <div class="body">
                                <div class="clock">
                                    <img src="~assets/images/clock2.svg" alt="">
                                    <div class="date">{{'01.'+olimp.o_bagyt.month+'.'+olimp.o_bagyt.year+'-'+olimp.o_bagyt.month_end+'.'+olimp.o_bagyt.month+'.'+olimp.o_bagyt.year}}</div>
                                    <div class="day">{{olimp.o_bagyt.day_is_left}} күн қалды</div>
                                </div>
                                <div class="tusers">
                                    <img src="~assets/images/humans.svg" alt="">
                                    <div class="tuser_count">Менің қатысушыларым: {{olimp.total}}</div>
                                </div>
                            </div>
                        </nuxt-link>
                    </template>
                </div>
                <template v-if="olimps.length<=1">
                    <div class="h3 mt-30">{{thisYear-1}} жыл</div>
                    <div class="not_found">
                        <img src="~/assets/images/document.svg" alt="">
                        <div class="head">{{thisYear-1}} жылы ешқандай олимпиадаға тіркелмегенсіз</div>
                    </div>
                </template>
                <nuxt-link to="/menin-olimpiadalarym">
                    <glassBtn class="mt-10 cst_btn" :text="olimps.length >= 3 ? 'Барлығын көру' : 'Өткен олимпиадалардың барлығын көру'" imgToRight=1 radian=1 />
                </nuxt-link>
            </div>
            <div class="block">
                <div class="h2">
                    Олимпиада марапаттары
                </div>
                <div class="wrap">
                    <div class="wrap_col">
                        <img class="cert" src="~assets/images/diploms.png" alt="">
                        <div class="wraper">
                            <div class="list_block">
                                <img src="~assets/images/TickSquare.svg" alt="">
                                <div class="list_body">
                                    <div class="head">I Дәрежелі диплом</div>
                                    <div class="desc">20-19 дұрыс жауап</div>
                                </div>
                            </div>
                            <div class="list_block">
                                <img src="~assets/images/TickSquare.svg" alt="">
                                <div class="list_body">
                                    <div class="head">II Дәрежелі диплом</div>
                                    <div class="desc">18-16 дұрыс жауап</div>
                                </div>
                            </div>
                            <div class="list_block">
                                <img src="~assets/images/TickSquare.svg" alt="">
                                <div class="list_body">
                                    <div class="head">III Дәрежелі диплом</div>
                                    <div class="desc">16-13 дұрыс жауап</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="wrap_col">
                        <img class="cert" src="~assets/images/algys.png" alt="">
                        <div class="wraper">
                            <div class="list_block">
                                <img src="~assets/images/TickSquare.svg" alt="">
                                <div class="list_body">
                                    <div class="head">Сертификат</div>
                                    <div class="desc">Барлық қатысушыларға - сертификат</div>
                                </div>
                            </div>
                            <div class="list_block">
                                <img src="~assets/images/TickSquare.svg" alt="">
                                <div class="list_body">
                                    <div class="head">Алғыс хат</div>
                                    <div class="desc">Әр 5 оқушы үшін жетекшіге - алғыс хат</div>
                                </div>
                            </div>
                            <div class="list_block">
                                <img src="~assets/images/TickSquare.svg" alt="">
                                <div class="list_body">
                                    <div class="head">Ата-анаға алғыс хат</div>
                                    <div class="desc">Оқушылардың ата-анасына алғыс хат</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <material_reklama10 only=1 />
        <material_reklama10 only=2 />
        <div class="cst-ct">
            <faqs />
        </div>
    </div>
</template>

<script>
    import glassBtn from '@/components/forms/glassBtn.vue'
    import cstbtn from '@/components/forms/btn.vue'
    import faqs from '@/components/materials/my_olimpiada/faqs.vue'
    import material_reklama10 from '@/components/landing/material_reklama10.vue'

    export default {
        components: {
            glassBtn,
            cstbtn,
            faqs,
            material_reklama10,
        },
        props: ['olimps', 'thisYear'],
        data() {
            return {
                faqsIsOpen: null,
            }
        },
        methods: {
            openFAQ(index) {
                this.faqsIsOpen = this.faqsIsOpen == index ? -1 : index;
            },
        }

    }

</script>

<style scoped lang="scss">
    a {
        text-decoration: none;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: .2s;
    }

    .cst_btn {
        height: 50px;

        &.mt-10 {
            margin-top: 10px;
        }
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-25%);
        transition: 0.2s;
    }

    span.gold {
        color: #A48A16;
    }

    span.blue {
        color: #6E64BD;
    }

    .block {
        margin-top: 130px;
    }

    .h2 {
        font-size: 40px;
        font-weight: 800;
        line-height: 47px;
    }

    .h3 {
        font-size: 20px;
        font-weight: 700;
        line-height: 23px;
        margin-top: 50px;

        &.mt-30 {
            margin-top: 30px;
        }
    }

    .wrap_col {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .not_found {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0 30px;

        .head {
            font-size: 18px;
            font-weight: 600;
            line-height: 22px;
            color: #888888;

            max-width: 300px;
            margin-left: 40px;
            text-align: left;
        }
    }

    .block_list {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .block {
            margin: 0;
            background: #FFFFFF;
            border-radius: 10px;
            padding: 15px 20px;

            &:hover {
                outline: 1px solid #0045CB;
                cursor: pointer;

                .head {
                    color: #0045CB;
                    text-decoration: underline;
                }
            }

            .head {
                font-size: 24px;
                font-weight: 600;
                line-height: 28px;
                color: #1E63E9;
            }

            .body {
                margin-top: 15px;
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
                grid-gap: 10px 30px;
                flex-wrap: wrap;
                font-family: 'Gilroy-Bold';
                font-size: 14px;
                font-weight: 600;
                line-height: 17px;

                @media all and (max-width: 883px) {
                    grid-template-columns: 1fr;
                }

                .clock {
                    color: #03B113;
                }

                .clock,
                .tusers {
                    display: grid;
                    align-items: center;
                    grid-template-columns: auto auto 1fr;
                    grid-gap: 10px;
                }

                .tusers {
                    color: #888888;
                    grid-template-columns: auto 1fr;
                }
            }
        }
    }

    .wrap {
        margin-top: 50px;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 50px;
        align-items: center;

        .video {
            width: 312px;
            height: 302px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #F8F8F8;
            border-radius: 30px;

            &:hover {
                cursor: pointer;
                outline: 1px solid #1E63E9;
            }

            .title {
                font-size: 18px;
                font-weight: 500;
                line-height: 21px;
                color: #1E63E9;
                margin-top: 40px;

                img {
                    width: 20px;
                    height: 20px;
                }
            }
        }

        .glbtn {
            width: auto;
            height: 60px;
            padding: 20px 40px;
        }

        .list_block {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 20px;
            align-items: center;

            .head {
                font-size: 20px;
                font-weight: 600;
                line-height: 25px;
                color: #363636;
            }

            .desc {
                font-size: 16px;
                font-weight: 400;
                line-height: 19px;
                color: #363636;
                margin-top: 5px;
            }
        }

        .wraper {
            display: grid;
            grid-template-columns: 1fr;
            justify-content: center;
            flex-direction: column;
            grid-gap: 30px;
            margin-top: 35px;
        }
    }

    ol {
        font-size: 18px;
        font-weight: 400;
        line-height: 21px;

        color: #363636;

        li:not(:last-child) {
            margin-bottom: 15px;
        }

        li::marker {
            color: #363636;
            font-weight: 700;
        }
    }


    .cert {
        width: 100%;
    }

    @media all and (max-width: 1099px) {
        .h2 {
            font-size: 36px;
            line-height: 43px;
        }

        ul {
            font-size: 22px;
            line-height: 26px;
        }
    }

    @media all and (max-width: 991px) {
        .h2 {
            font-size: 33px;
            line-height: 39px;
        }

        ul {
            font-size: 20px;
            line-height: 24px;
        }
    }

    @media all and (max-width: 883px) {
        .h2 {
            font-size: 30px;
            line-height: 36px;
        }

        ul {
            font-size: 18px;
            line-height: 22px;
        }

        .wrap {
            margin-top: 50px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;
            align-items: center;
        }
    }

    @media all and (max-width: 767px) {
        .h2 {
            font-size: 27px;
            line-height: 33px;
        }

        .wrap {
            margin-top: 40px;
            display: grid;
            grid-gap: 30px;
            grid-template-columns: 1fr;
            grid-template-areas: 'a''b';
        }

        .wrap .video {
            height: 242px;
            grid-area: a;
        }

        .block {
            margin-top: 100px;
        }

        .wrap_col:first-child {
            margin-top: 50px;
        }

        ul {
            grid-area: b;
        }

        .wrap_col {
            &:first-child {
                grid-area: b;
            }

            &:last-child {
                grid-area: a;
            }
        }

    }

    @media all and (max-width: 500px) {
        .h2[data-v-3ed23f4e] {
            font-size: 24px;
            line-height: 29px;
        }
    }

</style>
