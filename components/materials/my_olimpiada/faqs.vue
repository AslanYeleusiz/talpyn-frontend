<template>
    <div class="FAQ">
        <div class="cst-ct">
            <div class="h2 text-center">Жиі қойылатын сұрақтар</div>
            <div class="list">
                <div v-for="(FAQ,index) in FAQS" class="li" :class="{'active':FAQ.active}" @click="faqActivate(index)">
                    <div class="text">{{FAQ.question}}</div>
                    <img src="~assets/images/vector-down.svg" alt="">
                    <div class="content" v-html="FAQ.answer">

                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                FAQS: [{
                        question: 'Олимпиадаға қатысу шарттары қандай?',
                        answer: `<style>b{font-weight: 600;}</style>Біздің орталықта олимпиадаларға ақылы және тегін де қатысуға болады. Тегін олимпиадаларға қатысу үшін тегін <b>олимпиадалар</b> бөліміне өтіп, ұнаған олимпиаданы таңдап қатысуға болады. <br><br>Ақылы олимпиадалар мұғалімдер мен тәрбиешілерге 490тг, оқушылар мен студенттерге 390тг. Олимпиада <b>20 сұрақтан</b> тұрады. <br>Берілетін уақыт: <b>60 минут.</b><br><b>Олимпиада нәтижесі бірден шығады. Жетекшіге және оқушы ата-анасына алғыс хат тегін беріледі.</b> <br>Олимпиада біткен соң қатемен жұмысты жасап, жауаптарға анализ жасауға болады. <br>Сұрақтар кездейсоқ форматта беріледі, бір немесе бірнеше дұрыс жауапты сұрақтар болады.`,
                        active: false,
                    },
                    {
                        question: 'Олимпиадаға сынып болып қатысуға болады ма?',
                        answer: `Ия, сынып болып қатысуға болады. Ол үшін жетекші сәйкес олимпиадаға кіріп барлық оқушылардың аты-жөндерін жазып шығу керек. Сосын әр қатысушының кодын алып оқушылар сайтқа өтіп қатыса алады. Сайттың басты бетінде код арқылы қатысу батырмасын басса болды. Толығырақ мына нұсқаулықта жазылған:`,
                        active: false,
                    },
                    {
                        question: 'Олимпиадаға әріптесімді қатыстыруыма болады ма?',
                        answer: `<style>b{font-weight: 600;}</style>Ия, болады. Ол үшін олимпиадаға кіріп барлық әріптестеріңіздің аты-жөндерін жазып шығу керек. Сосын әр қатысушының кодын алып әріптесіңізге беріңіз. Әріптесіңіз сайтқа өтіп қатыса алады. Сайттың басты бетінде <b>кодты енгізу</b> батырмасын басса болды. Толығырақ мына нұсқаулықта жазылған:`,
                        active: false,
                    },
                    {
                        question: 'Олимпиадаға қатысқан соң бонусты қалай аламыз?',
                        answer: `<style>b{font-weight: 600;}</style>Олимпиадаға толем жасаған соң әр қатысушыдан 10% бонус беріледі. Ол ақшаны картаға шығарып алуға немесе сайттағы қызметтерге жұмсауға болады. <b>Ең белсенді жетекшілерге сыйлықтар беріледі.</b>`,
                        active: false,
                    },
                    {
                        question: 'Олимпиада нәтижесі қанша уақытта дайын болады?',
                        answer: '<style>b{font-weight: 600;}</style>Олимпиада нәтижесі тест біткен соң бірден шығады. Тест біткен соң сізді нәтижесін көрсететін бетке жібереді. Сол бетте марапаттарды жүктеп алуға болады. Менің олимпиадаларым бетінде де нәтижесі сақталады. <b>Менің олимпиадаларым</b> бетіне өтіп тізімнен өзіңіз қатысқан олимпиадаға кіріп марапаттарды жүктеп алуға болады.',
                        active: false,
                    },

                ],
            }
        },
        methods: {
            faqActivate(index) {
                this.FAQS[index].active = this.FAQS[index].active ? false : true;
            },
        }

    }

</script>



<style scoped lang="scss">
    b {
        font-weight: 600 !important;
    }

    .h2 {

        @media all and (min-width: 1099px) {
            font-size: 40px;
            font-weight: 800;
            line-height: 47px;
        }

    }

    .FAQ {
        margin-top: 100px;

        .list {
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            gap: 10px;

            .li {
                display: grid;
                grid-template-columns: 1fr auto;
                align-items: center;
                padding: 12px 25px;
                font-size: 18px;
                font-weight: 600;
                line-height: 21px;
                cursor: pointer;
                border-radius: 24px;
                transition: all 0.4s linear;

                &:hover {
                    outline: 1px solid #0045CB;
                }

                &.active {
                    img {
                        transform: rotate(180deg);
                    }

                    background: #F8F8F8;
                    border: 1px solid #f2f2f2;

                    .content {
                        max-height: 133px;
                        margin-top: 15px;
                    }
                }

                img {
                    width: 20px;
                    height: 20px;
                }

                .content {
                    max-height: 0px;
                    overflow: hidden;
                    margin-top: 0px;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 19px;
                    transition: all 0.4s ease;
                    color: #505050;

                    b {
                        font-weight: 600;
                    }
                }

            }
        }
    }

    @media all and (max-width: 883px) {
        .FAQ .list .li {
            font-size: 16px;
            line-height: 19px;
        }

        .FAQ .list .li .content {
            font-size: 14px;
            line-height: 17px;
        }
    }

</style>
