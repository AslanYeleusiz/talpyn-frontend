<template>
    <transition name="fadePopup">
        <div v-if="active>0" class="modal d-flex aj-c" @mousedown.self="$emit('close')">
            <div class="modal_block">
                <div class="header d-flex j-b">
                    <div></div>
                    <exitBtn @click.native="$emit('close')" />
                </div>
                <div v-if="active==1" class="body">
                    <div class="green">Олимпиада нәтижесі</div>

                    <div class="list">
                        <div class="list_item">
                            <img src="~assets/images/turnir_Profile.svg" alt="">
                            <span class="light">Қатысушы: </span><span>{{o_katysushy.o_katysushy_fio}}</span>
                        </div>
                        <div class="list_item">
                            <img src="~assets/images/turnir_Bookmark.svg" alt="">
                            <span class="light">Олимпиада атауы: </span><span>{{o_katysushy.o_tury.o_tury}}</span>
                        </div>
                        <div class="list_item">
                            <img src="~assets/images/turnir_flag.svg" alt="">
                            <span class="light">Деңгейі: </span><span>{{oblys(o_katysushy.o_bagyt.type)}}</span>
                        </div>
                        <div class="list_item">
                            <img src="~assets/images/turnir_user-octagon.svg" alt="">
                            <span class="light">Қатысушы: </span><span>{{katysushy(o_katysushy.o_katysushy_idd)}}</span>
                        </div>
                        <div class="list_item">
                            <img src="~assets/images/turnir_Star.svg" alt="">
                            <span class="light">Жинаған балыңыз: </span><span>20/{{o_katysushy.o_tizim.result}} балл</span>
                        </div>
                        <div class="list_item">
                            <img src="~assets/images/turnir_Calendar.svg" alt="">
                            <span class="light">Уақыты: </span><span>{{o_katysushy.o_tizim.date}}</span>
                        </div>
                    </div>
                    <div class="row buttons">
                        <div class="col-md-6 cst_size_btn mt-4">
                            <glassBtn @click.native="katemenJumys" text="Қатемен жұмыс" svg=1 radian=1 />
                        </div>
                    </div>
                    
                </div>
                <div v-if="active==2" class="body mini">
                    <div class="try">
                        Жетекшіні қосу мүмкін емес!.
                    </div>
                    <div class="try_desc">
                        5 қатысушының жарнасы төленгеннен кейін жетекшіні қоса аласыз
                    </div>
                </div>
                <div v-if="active==3" class="body mini">
<!--                    <video-player src="/assets/videos/olimpiada.mp4" />-->
                    <videoplayer src="https://www.youtube.com/watch?v=Ka0lRluiGmk" />
                </div>
                <div v-if="active==4" class="body mini">
                    <div class="success wrap">
                        <img src="~assets/images/TickSquare.svg" alt="">
                        <div class="green">
                            <div class="head">Төлем сәтті қабылданды!</div>
                            <div class="foot">Енді тест тапсырсаңыз болады!</div>
                        </div>
                    </div>
                </div>
                <div v-if="active==5" class="body mini">
                    <div class="try">
                        Баланста қаражат жеткіліксіз.
                    </div>
                    <div class="try_desc">
                        Балансты толықтыру үшін жеке кабинеттегі баланс толтыру батырмасын басыңыз!
                    </div>
                    <div class="btn_group">
                        <div class="cst_size_btn">
                            <cstBtn @click.native="$router.push('/profile/balance')" text="Балансты толтыру" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
    import exitBtn from '@/components/forms/exitBtn.vue'
    import cstBtn from '@/components/forms/btn.vue'
    import glassBtn from '@/components/forms/glassBtn.vue'
    import videoplayer from 'nuxt-video-player'

    require('nuxt-video-player/src/assets/css/main.css')

    export default {
        components: {
            exitBtn,
            cstBtn,
            glassBtn,
            videoplayer,
        },
        props: ['active', 'o_katysushy'],
        methods: {
            getCertificate() {
                this.$api.get('/olimpiada/' + this.o_katysushy.idd + '/certificate', {
                    responseType: 'blob'
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    var d = new Date();
                    fileLink.setAttribute('download', d.toLocaleString() + '.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
            },
            getAlgys(e) {
                let id = e ? this.o_katysushy.idd : this.o_katysushy.o_zhetekshi_id
                this.$api.get('/olimpiada/' + id + '/thankLetter', {
                    responseType: 'blob',
                    params: {
                        type: e
                    }
                    
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    var d = new Date();
                    fileLink.setAttribute('download', d.toLocaleString() + '.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
            },
            checStudent() {
                return this.o_katysushy.o_katysushy_idd == 2 ? true : this.o_katysushy.o_katysushy_idd == 3 ? true : false;
            },
            oblys(id) {
                switch(id){
                    case 1: {return 'Облыстық'}
                    case 2: {return 'Республикалық'}
                    case 3: {return 'Халықаралық'}
                }
            },
            katysushy(id) {
                switch(id){
                    case 1: {return 'Ұстаз'}
                    case 2: {return 'Студент'}
                    case 3: {return 'Оқушы'}
                    case 4: {return 'Тәрбиеші'}
                }
            },
            marapat(value) {
                if(value >= 19) return '1 дәрежелі диплом'
                else if(value >= 16) return '2 дәрежелі диплом'
                else if(value >= 13) return '3 дәрежелі диплом'
                else  return 'Сертификат'
            },

            marapatOrph(value) {
                if(value >= 19) return '1 дәрежелі дипломды'
                else if(value >= 16) return '2 дәрежелі дипломды'
                else if(value >= 13) return '3 дәрежелі дипломды'
                else  return 'Сертификатты'
            },
            katemenJumys() {
                this.$router.push({
                    name: 'olimpiada-test-katemen-jumys',
                    query: {
                        user_code: this.o_katysushy.o_tizim.code,
                        code: this.o_katysushy.obwcode
                    }
//                    params: {
//                        suraktar: res.data.data.test,
//                        katysushy: this.o_katysushy,
//                    }
                });
            }

        }
    }

</script>


<style scoped lang="scss">
    .fadePopup-enter-active,
    .fadePopup-leave-active {
        transition: .5s;
    }

    .fadePopup-enter,
    .fadePopup-leave-to {
        opacity: 0;
        transition: 0.3s;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        z-index: 20;

        .modal_block {
            width: 100%;
            max-width: 800px;
            background: #ffffff;
            max-height: 100vh;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                display: none;
            }

            .header {
                padding: 10px;
            }

            .body {
                padding: 10px 40px 50px;

                .uppercase{
                    text-transform: uppercase;
                }

                .green {
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 28px;
                    width: 100%;
                    max-width: 500px;
                    margin: 0 auto;
                    text-align: center;
                    color: #03B113;
                }

                .info {
                    font-size: 28px;
                    font-weight: 700;
                    line-height: 32px;
                    width: 100%;
                    max-width: 500px;
                    margin: 0 auto;
                    text-align: center;
                }

                .list {
                    margin-top: 30px;

                    .list_item {
                        &:not(:first-child) {
                            margin-top: 10px;
                        }

                        display: flex;
                        align-items: center;
                        gap: 5px;

                        span {
                            font-size: 18px;
                            font-weight: 400;
                            line-height: 21px;
                            color: #363636;

                            &.light {
                                color: #888888;
                            }
                        }
                    }
                }
                
                .buttons{
                    max-width: 650px;
                    .cst_size_btn {
                        width: 100%;
                        min-height: 50px;
                    }
                }

                .btn_group {
                    margin-top: 30px;
                    display: flex;
                    gap: 20px;

                    .cst_size_btn {
                        width: 100%;
                        max-width: 290px;
                        min-height: 50px;
                    }

                    @media all and (max-width: 500px) {
                        flex-direction: column;

                        .cst_size_btn {
                            max-width: 100%;
                            height: 40px;
                        }
                    }

                }

                .hr {
                    margin: 40px 0;
                }

                .try {
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 28px;
                    color: #363636;
                }

                .try_desc {
                    margin-top: 8px;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 21px;
                    color: #363636;
                }

                video {
                    width: 100%;
                }

                &.mini {
                    .success {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: 20px;
                        align-items: center;

                        .green {
                            text-align: left;
                            margin: 0;
                        }

                        img {
                            width: 44px;
                            height: 44px;
                        }

                        .foot {
                            font-size: 18px;
                            font-weight: 400;
                            line-height: 21px;
                        }
                    }

                    @media all and (max-width: 767px) {
                        padding: 10px 30px 50px;
                    }

                    @media all and (max-width: 500px) {
                        padding: 10px 20px 40px;
                    }
                }
            }
        }
    }

</style>
<style lang="scss">
    .modal .modal_block .body .btn_group .cst_size_btn button {
        font-size: 14px;
        font-weight: 600;
        line-height: 16px;
    }

</style>
