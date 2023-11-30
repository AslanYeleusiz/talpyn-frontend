<template>
    <div class="start_main_page">
        <div class="home-elem-121">
            <div class="home-elem-122">
                <div class="home-elem-123">
                    <div class="home-elem-124"> <span class="home-elem-125">
                            <p>алгоритмизации</p>
                        </span><span class="home-elem-126">
                            <p>Программалау дағдыларыны жетістіру</p>
                        </span></div><button class="home-elem-127">
                        <nuxt-link to="/olimpiada">
                            <p>Қатысу</p>
                        </nuxt-link>
                    </button>
                </div>
                <div class="home-elem-132">
                    <div class="home-elem-130"> <span class="home-elem-128">
                            <p>IT-жұмысы</p>
                        </span><span class="home-elem-129">
                            <p>Келесі карьераны алу үшін дайындалу</p>
                        </span></div><button class="home-elem-131">
                        <nuxt-link to="/olimpiada">
                            <p>Қатысу</p>
                        </nuxt-link>
                    </button>
                </div>
                <div class="home-elem-137">
                    <div class="home-elem-135"> <span class="home-elem-133">
                            <p>талдау және шешу</p>
                        </span><span class="home-elem-134">
                            <p>Логикалық ойлау дағдыларын жетістіру</p>
                        </span></div><button class="home-elem-136">
                        <nuxt-link to="/olimpiada">
                            <p>Қатысу</p>
                        </nuxt-link>
                    </button>
                </div>
                <div class="home-elem-142">
                    <div class="home-elem-140"> <span class="home-elem-138">
                            <p>оқу жасау</p>
                        </span><span class="home-elem-139">
                            <p>Оқуын ынтымақтау</p>
                        </span></div><button class="home-elem-141">
                        <nuxt-link to="/olimpiada">
                            <p>Қатысу</p>
                        </nuxt-link>
                    </button>
                </div>
                <div class="home-elem-152">
                    <div class="home-elem-150"> <span class="home-elem-148">
                            <p>өз айықтық және мотивациясын жою</p>
                        </span><span class="home-elem-149">
                            <p>Тану мүмкіндігі</p>
                        </span></div><button class="home-elem-151">
                        <nuxt-link to="/olimpiada">
                            <p>Қатысу</p>
                        </nuxt-link>
                    </button>
                </div>
                <div class="home-elem-147">
                    <div class="home-elem-145"> <span class="home-elem-143">
                            <p>білімді алмасу мүмкіндігі</p>
                        </span><span class="home-elem-144">
                            <p>Ең жақтылардан білу мүмкіндігі</p>
                        </span></div><button class="home-elem-146">
                        <nuxt-link to="/olimpiada">
                            <p>Қатысу</p>
                        </nuxt-link>
                    </button>
                </div>
            </div>
        </div>
        <div class="home-elem-198">
            <div class="home-elem-197">
                <div class="home-elem-186"> <span class="home-elem-173">
                        <p><strong>Көмек керек пе жок? Хабарлама жіберу формасын пайдаланыңыз</strong></p>
                    </span><span class="home-elem-174">
                        <p>Біз сізге көмек көрсету үшін дайынбыз. Сіздің хабарламанызды жіберу үшін төменгі форманы пайдаланыңыз, және біз жатталған уақыт ішінде жауап беру үшін салыстырамыз.</p>
                    </span>
                    <div class="home-elem-181">
                        <div class="home-elem-180"> <span class="cd-paragraph-clean home-elem-178">
                                <p>Атыңыз</p>
                            </span><input type="text" placeholder="Атыңызды енгізіңіз" class="home-elem-179"></div>
                        <div class="home-elem-177"> <span class="cd-paragraph-clean home-elem-175">
                                <p>Email</p>
                            </span><input type="email" placeholder="Email қойыңыз" class="home-elem-176"></div>
                    </div>
                    <div class="home-elem-184"> <span class="cd-paragraph-clean home-elem-182">
                            <p>Хабарлама</p>
                        </span><textarea placeholder="Сіздің хабарламаңыз" class="home-elem-183"></textarea></div><button class="home-elem-185">
                        <p>Тікет жіберу</p>
                    </button>
                </div>
                <div class="home-elem-196"> <span class="home-elem-187">
                        <p><strong>Тіркелу</strong></p>
                    </span><span class="home-elem-188">
                        <p>Олимпиадаға қатысу үшін тіркеу жасаңыз.</p>
                    </span>
                    <div class="home-elem-193">
                        <div class="home-elem-190">
                            <cstInput v-model="form.phone" type-name="text" name-wrap="tel_num" string-name="Телефон нөмірі:" string-placeholder="+7 (7__) - ___ - __ - __" class="mt-15" :danger="errors.phone" :dangerText="errors.phone" @click.native="errors.phone = null" v-on:keyup.enter.native="checkPhone" />
                        </div>
                        <div class="home-elem-190">
                            <cstPasswordInput v-model="form.password" type-name="password" name-wrap="password" string-name="Құпиясөз:" string-placeholder="•••••••••••••••••" :danger="errors.password" :dangerText="errors.password" @click.native="errors.password = null" class="mt-15" v-on:keyup.enter.native="login" />
                        </div>
                    </div><button @click="login()" class="home-elem-194">
                        <p>Жазылу</p>
                    </button>
                </div>
            </div>
        </div>

        <div class="home-elem-1">
            <div class="home-elem-111"> <span class="home-elem-110">
                    <p><strong>Біздің жетістіктеріміз</strong></p>
                </span><span class="home-elem-108">
                    <p>Күнделікті адамдар біздің сайтты қолданады. Олар олимпиадаға қатысып, өзін сынайды және білімін жетілдіреді.</p>
                </span>
                <div class="home-elem-109">
                    <div class="home-elem-107">
                        <div class="home-elem-106"> <span class="home-elem-105">
                                <p>Тіркелген мектептер</p>
                            </span><span class="home-elem-104">
                                <p>17</p>
                            </span></div>
                        <div class="home-elem-120"> <span class="home-elem-119">
                                <p>Тіркелген пайдаланушылар</p>
                                <p><br></p>
                            </span><span class="home-elem-118">
                                <p>12+</p>
                            </span></div>
                        <div class="home-elem-117"> <span class="home-elem-116">
                                <p>Сұрақтар саны</p>
                            </span><span class="home-elem-115">
                                <p>1023</p>
                            </span></div>
                        <div class="home-elem-114"> <span class="home-elem-113">
                                <p>Тіркеген қалалар</p>
                            </span><span class="home-elem-112">
                                <p>1</p>
                            </span></div>
                    </div>

                </div>
            </div>
        </div>
        <div class="home-elem-74">
            <div class="home-elem-63">
                <div class="home-elem-62"> <span class="home-elem-60">
                        <p>Кодтау жарыстарын даулау </p>
                    </span><span class="home-elem-61">
                        <p>Кодтау дағдыларын біздің дүрбелеңді кодтау жарыстарымызда сынаққа қойыңыз. Үздіктерге қарсы сайысқа түсіп, өз талантыңызды көрсетіңіздер. </p>
                    </span><button class="home-elem-75">
                        <nuxt-link to="/olimpiada">
                            <p>Енді бастау </p>
                        </nuxt-link>
                    </button></div><span class="home-elem-59"> <img src="https://res.cloudinary.com/storylens/image/upload/v1698486908/zrbcrlvp3c0n4tqgouph.jpg"> </span>
            </div>
            <div class="home-elem-68"> <span class="home-elem-64"> <img src="https://res.cloudinary.com/storylens/image/upload/v1698486909/mefviy2hmtqmzy2bqsaq.jpg"> </span>
                <div class="home-elem-67"> <span class="home-elem-65">
                        <p>Кодтау дағдыларын жақсарту </p>
                    </span><span class="home-elem-66">
                        <p>Біздің олимпиадалық тесттер кодтау дағдыларын жетілдіруге және проблемаларды шешу қабілеттерін арттыруға көмектеседі. </p>
                    </span><button class="home-elem-76">
                        <nuxt-link to="/olimpiada">
                            <p>Енді бастау </p>
                        </nuxt-link>
                    </button></div>
            </div>
            <div class="home-elem-73">
                <div class="home-elem-72"> <span class="home-elem-70">
                        <p>Қызықты сыйлықтарды жеңіп алу </p>
                    </span><span class="home-elem-71">
                        <p>Жоғары лауазымдар үшін сайысқа түсіп, ақшалай сыйлықтарды, сертификаттарды жеңіп алыңыз және кодтау талантыңызды мойындаңыз. </p>
                    </span><button class="home-elem-77">
                        <nuxt-link to="/olimpiada">
                            <p>Енді бастау </p>
                        </nuxt-link>
                    </button></div><span class="home-elem-69"> <img src="https://res.cloudinary.com/storylens/image/upload/v1698486909/f3pt4gchgluovv8efirx.jpg"> </span>
            </div>
        </div>
        <div class="faqs">
            <faqs />
        </div>
    </div>
</template>

<script>
    import cstBtn from '@/components/forms/cstBtn.vue'
    import cstInput from '@/components/forms/cstInput.vue'
    import cstPasswordInput from '@/components/forms/cstPasswordInput.vue'
    import faqs from '@/components/materials/my_olimpiada/faqs.vue'

    export default {
        components: {
            cstBtn,
            cstInput,
            cstPasswordInput,
            faqs,
        },
        data() {
            return {
                gui: 0,
                form: {},
                errors: {},
            }
        },
        methods: {
            login() {
                this.$auth.options.redirect = false
                this.$auth.loginWith('laravelJWT', {
                    data: {
                        phone: this.form.phone,
                        password: this.form.password
                    }
                }).then((res) => {
                    this.errors.sendSms = null
                    localStorage.setItem('access_token', res.data.access_token);
                    window.location.reload();
                }).catch((error) => {
                    const data = error.response.data.errors;
                    for (let [key, value] of Object.entries(this.errors)) {
                        this.errors[key] = data[key] !== undefined ? data[key].join() : null;
                    }
                });
            },
        }

    }

</script>
<style lang="scss" scoped>
    .faqs {
        padding-bottom: 150px;
    }

    .main {
        padding-top: 70px;
        background: url(~/assets/images/main_bg.jpg) 50% 50%/cover no-repeat;

        h1,
        .desc,
        .cont {
            max-width: 640px;
        }

        h1,
        .desc {
            font-family: Arsenal;
            font-size: 48px;
            font-weight: 700;
            line-height: 60px;
        }

        .desc {
            margin-top: 15px;
            font-size: 40px;
            line-height: 45px;
        }

        .cont {
            margin-top: 15px;
            font-size: 18px;
            font-weight: 400;
            line-height: 21px;

        }

        .cstBtn {
            margin-top: 40px;
        }

        .wrap {
            display: flex;
            justify-content: center;
            transform: translateY(50%);
            margin-top: 42px;
            gap: 30px;

            .block {
                width: auto;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background: #FFFFFF;
                border-radius: 20px;
                box-shadow: 0px 14px 38px 0px #0000002E;
                padding: 30px;
                gap: 10px;

                .val {
                    font-family: Arsenal;
                    font-size: 60px;
                    font-weight: 700;
                    line-height: 75px;
                    color: #FF8B0D;

                }

                .text {
                    font-size: 18px;
                    line-height: 21px;
                    color: #7D7D7D;

                }
            }
        }
    }

</style>
