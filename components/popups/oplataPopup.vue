<template>
    <transition name="fadePopup">
        <div v-if='oplataOpen>0' class="oplataPopup d-flex aj-c" @mousedown.self="closePopup">
            <transition name="fade">
                <div v-show="oplataOpen==1" class="block">
                    <div class="header d-flex a-c j-b">
                        <div></div>
                        <exitBtn @click.native="closePopup" />
                    </div>
                    <div class="body pd_bottom">
                        <div class="h">Төлем сомасын енгізіңіз:</div>
                        <input type="text" class="form-control st_inp" v-model="priceMask" @input="maskPrice()" @keyup.backspace="maskPrice(1)">
                        <cstBtn class="cst_btn_size" @click.native="startTrans()" square=1 text='Жалғастыру' />
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <div v-show="oplataOpen==2" class="block">
                    <div class="header d-flex a-c j-b active">
                        <div></div>
                        <exitBtn @click.native="closePopup" />
                    </div>
                    <div class="body mt-20">
                        <div class="h">Өзіңізге ыңғайлы төлем жасау түрін таңдаңыз!</div>
                    </div>
                    <div class="variable">
                        <button @click="sendKaspi()" class="btn variants">
                            <img src="~assets/images/kaspi.png" alt="">
                            <span>Kaspi.kz арқылы</span>
                        </button>
                        <button @click="qrOpen" class="btn variants">
                            <img src="~assets/images/qr.svg" alt="">
                            <span>Kaspi QR арқылы</span>
                        </button>
                        <!--
                        <button class="btn variants">
                            <img src="~assets/images/card.png" alt="">
                            <span>Банк картасы арқылы</span>
                        </button>
-->

<!--
                        <button v-if="isMobile" @click="whatsappOpen(0)" class="btn variants">
                            <img src="~assets/images/whatsapp.png" alt="">
                            <span>WhatsApp-қа жазу</span>
                        </button>
-->
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <div v-show="oplataOpen==3" class="block">
                    <div class="header d-flex a-c j-b active">
                        <button @click="$emit('setPopup', 2)" class="btn back">
                            <img src="~assets/images/arrow-left-blue.svg" alt="">
                            Артқа
                        </button>
                        <exitBtn @click.native="closePopup(1)" />
                    </div>
                    <div class="body mt-20">
                        <div class="h">Kaspi.kz арқылы төлем жасау нұсқаулығы</div>
                        <div class="id_block">
                            <div class="wrap">
                                <div class="id">
                                    <div class="span">ID номеріңіз:</div>
                                    <div class="value">{{$auth.user.id}}</div>
                                </div>
                                <div class="jarna">
                                    <div class="span">Жарнасы</div>
                                    <div class="value">{{price ? price : '600'}} тг</div>
                                </div>
                            </div>
                        </div>
                        <div class="desc">
                            Kaspi қосымшасына кіріп <b>"Платежи"</b> бөлімінен <b>Ustaz Tilegi</b> деп іздеп, сайттағы <b>ID нөміріңізді: {{$auth.user.id}}</b> - жазыңыз. Керекті сумманы жазып төлемді аударыңыз. Ақша сайттағы балансыңызға бірден түседі
                        </div>
                    </div>
                    <div class="or">
                        <div class="or_block">
                            немесе
                        </div>
                    </div>
                    <div class="qr pd_bottom">
                        <div class="body">
                            <div class="h">Kaspi {{isMobile ? ' ' : 'QR '}}арқылы төлеу</div>
                            <template v-if="!isMobile">
                                <!--                                && isMaterialPage-->
                                <cstBtn class="cst_btn_size" @click.native="qrOpen" square=1 text='Kaspi QR көрсету' />
                            </template>
                            <template v-else>
                                <form action="https://kaspi.kz/online" id="kaspiqrbutton1-triger" method="post">
                                    <input type="hidden" name="TranId" value="1">
                                    <input type="hidden" name="OrderId" :value="$auth.user.id">
                                    <input type="hidden" name="Amount" id="pricekaspi" :value="price ? price + '00' : '60000'">
                                    <input type="hidden" name="Service" value="UstazTilegi">
                                    <input type="hidden" name="returnUrl" id="kaspissilka" :value="$store.state.appUrl + $route.path">
                                    <input type="hidden" name="Signature" value="">
                                    <cstBtn class="cst_btn_size" square=1 text='Kaspi арқылы төлеу' />
                                </form>
                            </template>
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <div v-show="oplataOpen==5" class="block">
                    <div class="header d-flex a-c j-b pb-0">
                        <div></div>
                        <exitBtn @click.native="closePopup" />
                    </div>
                    <div class="body error mt-0">
                        <div class="error-card">
                            <img src="~assets/images/empty-wallet-remove.png" alt="">
                        </div>
                        <div class="h">Сіздің қаражатыңыз жеткіліксіз!</div>
                        <div class="desc">Төлем жасау әдісін таңдаңыз:</div>
                    </div>
                    <div class="variable error">
                        <button @click="sendKaspi()" class="btn variants">
                            <img src="~assets/images/kaspi.png" alt="">
                            <span>Kaspi.kz арқылы</span>
                        </button>
                        <button @click="qrOpen" class="btn variants">
                            <img src="~assets/images/qr.svg" alt="">
                            <span>Kaspi QR арқылы</span>
                        </button>

                        <!--
                        <button class="btn variants">
                            <img src="~assets/images/card.png" alt="">
                            <span>Банк картасы арқылы</span>
                        </button>
-->

<!--
                        <button v-if="isMobile" @click="whatsappOpen(1)" class="btn variants">
                            <img src="~assets/images/whatsapp.png" alt="">
                            <span>WhatsApp-қа жазу</span>
                        </button>
-->

                    </div>
                </div>
            </transition>
            <transition name="fade">
                <div v-show="oplataOpen==6 || oplataOpen==7" class="block isPayed">
                    <div class="header d-flex a-c j-b">
                        <div></div>
                        <exitBtn @click.native="closePopup" />
                    </div>
                    <div class="body error">
                        <div class="error-card">
                            <img src="~assets/images/wallet-check.png" alt="">
                        </div>
                        <div class="h">{{ oplataOpen==7 ? 'Төлем сәтті жасалынды' : 'Төлем жасалынып жатыр' }}</div>
                        <div v-show="oplataOpen==6 || oplataOpen==5 || oplataOpen==8" class="lottie" :class="{border:oplataOpen==6}">
                            <Lottie :width="80" :height="80" :options="waitOptions" v-on:animCreated="handleAnimation" />
                        </div>
                        <div v-show="oplataOpen==7" class="lottie2" :class="{border:oplataOpen==6}">
                            <Lottie v-if="oplataOpen==7" :width="120" :height="120" :options="doneOptions" v-on:animCreated="handleAnimation" />
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <div v-show="oplataOpen==8" class="block qrBlock">
                    <div class="header d-flex a-c j-b active">
                        <div class="hide20px"></div>
                        <div class="qrHead">Kaspi QR арқылы төлеу</div>
                        <exitBtn @click.native="closePopup" />
                    </div>
                    <div v-if="qrLoad" class="text-center mt-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <div v-else v-html="qr" class="body mt-3 pb-2 d-flex j-c"></div>
                    <div class="pd_bottom qrText d-f a-c">
                        <div>Төлем жасаған соң "Төлем жасадым" батырмасын басыңыз</div>
                        <cstBtn @click.native="closePopup(1)" class="cst_size" text="Төлем жасадым" />
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>


<script>
    import Lottie from 'vue-lottie/src/lottie.vue'
    import * as animationData from "~/assets/lottie_files/upload_materials/96551-hourglass.json"
    import * as animationData2 from "~/assets/lottie_files/done/lf30_editor_baziyhkx.json"
    import cstInput from '@/components/forms/cstInput.vue'
    import cstBtn from '@/components/forms/btn.vue'
    import exitBtn from '@/components/forms/exitBtn.vue'

    export default {
        components: {
            cstInput,
            cstBtn,
            exitBtn,
            Lottie,
        },
        props: ['oplataOpen', 'price', 'isMaterialPage', 'material_id', 'type'],
        data() {
            return {
                priceMask: '',
                anim: false,
                waitOptions: {
                    animationData: animationData,
                },
                doneOptions: {
                    animationData: animationData2,
                    loop: false
                },
                animationSpeed: 1,
                isMobile: 0,
                qr: null,
                qrLoad: 1,
            }
        },
        methods: {
            whatsappOpen(e) {
                var cash = this.price ? this.price : '600';
                return window.open('https://api.whatsapp.com/send?phone=+77712345599&text=Сәлеметсіз бе. Сайттағы балансымды толтырғым келеді. Маған төлем реквизитін жіберсеңіз. Төлем: ' + cash + 'тг ID: ' + this.$auth.user.id + ' ' + (e ? 'Сілтеме: ' + this.$store.state.appUrl + this.$route.path : ''), 'send', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`)
            },
            handleAnimation: function(anim) {
                this.anim = anim;
            },
            successNext() {
                this.anim.play()
                this.$emit('setPopup', 7)
            },
            maskPrice(x){
                if(x) this.priceMask = this.priceMask.slice(0,-3)
                this.priceMask = this.priceMask.replace(/\D/g,'').concat(' ₸')
            },
            sendKaspi() {
                const form = document.createElement('form');
                form.method = 'post'
                form.action = 'https://kaspi.kz/online'
                const query = this.$store.state.appUrl + this.$route.path + (this.material_id != null ? '?buy='+this.material_id+(this.type ? '&type='+this.type : '') : '')
                const params = {
                    TranId: 1,
                    OrderId: this.$auth.user.id,
                    Amount: this.price ? this.price + '00' : '60000',
                    Service: 'UstazTilegi',
                    returnUrl: query,
                    Signature: '',
                }
                for (const key in params) {
                    if (params.hasOwnProperty(key)) {
                        const hiddenField = document.createElement('input');
                        hiddenField.type = 'hidden';
                        hiddenField.name = key;
                        hiddenField.value = params[key];

                        form.appendChild(hiddenField);
                    }
                }
                document.body.appendChild(form);
                form.submit();
            },
            qrOpen() {
                this.qrLoad = 1
                this.$emit('setPopup', 8)
                const order = this.$auth.user.id
                this.$api.post('/kaspi/getQR', {
                    OrderId: order,
                    Amount: this.price,
                    returnUrl: this.price,
                }).then((res) => {
                    this.qr = res.data
                    this.qrLoad = 0
                }).catch((err) => {
                    console.log(err)
                })
            },
            startTrans() {
                this.price = this.priceMask.replace(/\D/g,'')
                this.isMobile ? this.$emit('setPopup', 2) : this.qrOpen()
            },
            closePopup(c) {
                this.$emit('closePopup')
                this.updateBalance(c)
            },
            updateBalance(c){
                this.$api.get('auth/user/balance').then((e) => {
                    const userToUpdate = {
                        ...this.$auth.user
                    }
                    userToUpdate.balance = e.data
                    this.$auth.setUser(userToUpdate)
                    if (c == 1 && this.material_id != null) this.$emit('buyThisMaterial')
                })
            }
        },
        mounted() {
            if (window.innerWidth <= 769) this.isMobile = 1
        },
        watch: {
            oplataOpen(val) {
                if (val == 5 && !this.isMobile) this.qrOpen()
                if (val == 7) {
                    this.updateBalance()
                    setTimeout(()=>{
                        this.$emit('closePopup')
                    },1500)
                }
            }
        }
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

    .mt-20 {
        margin-top: 20px;
    }

    .oplataPopup .block input {
        margin-top: 30px;
    }

    .oplataPopup .block .cst_btn {
        margin-top: 20px;
    }

    .oplataPopup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 20;

        .cst_btn_size {
            height: 50px;
        }

        .block {
            position: absolute;
            width: 100%;
            max-width: 360px;
            background: #ffffff;
            border-radius: 6px;

            &.qrBlock {
                max-width: 560px;
            }

            .lottie,
            .lottie2 {
                display: block;
                margin: 30px auto 50px;
                width: 80px;
                height: 80px;

                &.border {
                    border-radius: 50%;
                    outline: 2px solid #03B113;
                }
            }

            .lottie2 {
                width: 140px;
                height: 140px;
                margin: 0px auto 20px;
            }

            .header {
                padding: 20px;

                .hide20px {
                    width: 20px;
                    height: 20px;
                }

                .qrHead {
                    font-size: 18px;
                    color: #000;
                    font-weight: 600;
                }

                .back {
                    font-weight: 600;
                    line-height: 16px;
                    color: #1E63E9;
                    padding: 0px;
                }

                &.active {
                    border-bottom: 1px solid #D6D6D6;
                    background: #F5F5F5;

                    .exitBtn {}
                }
            }

            .qrText {
                text-align: center;
                margin: 15px 20px 0;
                font-size: 16px;
                flex-direction: column;

                .cst_size {
                    max-width: 300px;
                    height: 50px;
                    font-size: 18px;
                }
            }

            .exitBtn {
                padding: 0px;
            }

            .body {
                padding: 0 30px;

                .h {
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 21px;
                    text-align: center;
                }

                .st_inp {
                    margin-top: 30px;
                    border: 1px solid #C7C7C7;
                    background: #FAFAFA;
                    border-radius: 6px;
                    height: 50px;
                    transition: 0.3s;

                    &:placeholder {
                        color: #888888;
                    }

                    &:focus {
                        background: #ffffff;

                        &::placeholder {
                            color: #ffffff;
                        }
                    }
                }

                .error-card {
                    display: flex;
                    justify-content: center;
                }

                &.error {
                    .h {
                        margin-top: 10px;
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 21px;
                        text-align: center;
                    }

                    .desc {
                        margin-top: 6px;
                        font-size: 16px;
                        font-weight: 400;
                        text-align: center;
                        color: #888888;

                    }
                }
            }

            .variable {
                margin-top: 20px;

                &.error {
                    margin-top: 30px;
                }

                .variants {
                    width: 100%;
                    padding: 15px 30px;
                    text-align: left;
                    border-top: 1px solid #D6D6D6;

                    img {
                        margin-right: 20px;
                    }

                    span {
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 19px;
                        color: #1E63E9;
                    }
                }
            }

            .pd_bottom {
                padding-bottom: 40px;
            }

            .id_block {
                background: #F8F8F8;
                border-radius: 10px;
                padding: 10px;
                margin-top: 20px;

                .wrap {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 1px;
                    background: #CBCBCB;
                    text-align: center;

                    .jarna,
                    .id {
                        background: #F8F8F8;

                        .value {
                            font-size: 18px;
                            font-weight: 600;
                            line-height: 21px;
                        }
                    }

                    .jarna .value {
                        color: #03B113;
                    }
                }
            }

            .desc {
                margin-top: 20px;
                font-size: 16px;
                font-weight: 400;
                line-height: 19px;

                b {
                    font-weight: 600;
                }
            }

            .or {
                border-bottom: 1px solid #CBCBCB;
                display: flex;
                justify-content: center;
                margin-top: 30px;

                .or_block {
                    background: #ffffff;
                    width: 120px;
                    font-size: 16px;
                    line-height: 19px;
                    color: #888888;
                    text-align: center;
                    transform: translateY(50%);
                }
            }

            .qr {
                margin-top: 50px;
            }
        }
    }

</style>
