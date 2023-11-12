<template>
    <div class="registerCode">
        <div class="cst-ct">
            <div class="codeCheckBlock code-enter">
                <div class="header">Олимпиадаға кіру үшін берілген кодты енгізіңіз!</div>
                <div class="cst-size-inp">
                    <cstInput @keyup.enter.native="startOlimp" stringPlaceholder="Мысалы: 123456789" v-model="code" class="code-enter-input cst_fix_span_input" />
                </div>
                <div class="cst-size-btn">
                    <cstBtn v-if="loading" loading=1 />
                    <cstBtn v-else @click.native="startOlimp" text="Олимпиаданы бастау" />
                </div>
            </div>
            <div class="block">
                <div class="h2">
                    Қатысу нұсқаулығы
                </div>
                <div class="wrap">
                    <div>
                        <ol>
                            <li>Жетекші берген кодты осында енгізіп, олимпиадаға кіру батырмасын басыңыз</li>
                            <li>Ашылған бетте тестті бастау кнопкасын бассаңыз бірден тест басталып кетеді</li>
                            <li>Барлық сұрақтарға жауап беріңіз</li>
                            <li>Олимпиада біткен соң марапаттарды нәтижесі шыққан бетте жүктеп алуға болады. Жетекшіңіз өз кабинетінен диплом немесе сертификаттарды жүктеп алады, Жетекшіңіздің кабинетінде нәтижесі көрінеді.</li>
                        </ol>
                    </div>
                    <div @mousedown="downloadPdf()" class="video">
                        <img src="~assets/images/pdfbig.png" alt="">
                        <div class="title"><img src="~assets/images/download.svg" alt=""> Қатысу нұсқаулығы.pdf</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import cstInput from '@/components/forms/cstInput.vue'
    import cstBtn from '@/components/forms/btn.vue'

    export default {
        middleware: ['auth'],
        head() {
            return {
                title: 'Зияткерлік олимпиада | Олимпиадаға код арқылы кіру',
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
            cstInput,
            cstBtn,
        },
        layout: 'third',
        data() {
            return {
                code: null,
                loading: 0,
                error_message: '',
            }
        },
        methods: {
            startOlimp() {
                this.$api.$get('/olimpiada/test/load', {
                    params: {
                        code: this.code
                    }
                }).then((res)=>{
                    if(!res.status){
                        this.setNotification(res.data.message, 'failer')
                    } else {
                        this.$router.push({
                            name: 'olimpiada-test-erezhe',
                            query: {
                                code: this.code
                            },
                        });
                    }
                })
            },
            downloadPdf() {

            },
            setNotification(text,status) {
                this.$bus.$emit('notification', {
                    text: text,
                    status: status,
                })
            },
        },
    }

</script>


<style scoped lang="scss">
    
    .registerCode {
        background: #F9F9F9;
        padding-top: 150px;
        padding-bottom: 150px;

        .codeCheckBlock {
            width: 100%;
            max-width: 840px;
            background: #FFFFFF;
            box-shadow: 0px 4px 54px rgba(0, 0, 0, 0.05);
            border-radius: 30px;
            padding: 50px 20px 60px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .header {
                font-size: 32px;
                font-weight: 600;
                line-height: 38px;
                color: #363636;
                text-align: center;
                max-width: 572px;
                margin: 0 auto;
            }

            .cst-size-inp,
            .cst-size-btn {
                width: 100%;
                max-width: 400px;
                height: 50px;
            }

            .cst-size-inp {
                margin-top: 40px;
            }

            .cst-size-btn {
                margin-top: 30px;
            }
        }

        .block {
            margin-top: 100px;
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
                background: #ffffff;
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
    }

    @media all and (max-width: 1099px) {
        .registerCode .codeCheckBlock .header {
            font-size: 30px;
            line-height: 36px;
        }

        .h1,
        .h2 {
            font-size: 22px;
            line-height: 25px;
        }

        .registerCode .wrap {
            grid-template-columns: 1fr;
        }

        .registerCode .codeCheckBlock[data-v-21e9f20b] {
            margin-top: 100px;
        }
    }

    @media all and (max-width: 883px) {
        .registerCode .codeCheckBlock .header {
            font-size: 28px;
            line-height: 33px;
        }
    }

    @media all and (max-width: 500px) {
        .registerCode .codeCheckBlock .header {
            font-size: 26px;
            line-height: 31px;
        }

        .registerCode .codeCheckBlock .cst-size-inp {
            margin-top: 30px;
        }

        .registerCode .codeCheckBlock .cst-size-btn[data-v-cc436974] {
            margin-top: 20px;
        }



    }

    @media all and (max-width: 438px) {
        .registerCode .codeCheckBlock .header {
            font-size: 24px;
            line-height: 29px;
        }
    }

</style>
<style lang="scss">
    .code-enter-input .danger_message {
        position: relative;
    }
    .cst_fix_span_input {
        margin: 0;
        .danger_message {
            position: absolute;
            transform: translateY(-8px);
            font-family: Raleway;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            color: #FF0000;
        }
    }

</style>
