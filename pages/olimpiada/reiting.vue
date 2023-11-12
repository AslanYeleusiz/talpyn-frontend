<template>
    <div class="reiting">
        <headerLink :head='head' active=2 />
        <div class="cst-ct">
            <div class="h2">Үздік жетекшілер рейтингі</div>
            <template v-if="active">
                <div class="desc">Әр 3 ай сайын ең белсенді 20 жетекшіге сыйлықтар табысталады. Бір қатысушыға (оқушы немесе мұғалім) 1 балл беріледі. Қанша көп оқушы тіркесеңіз сонша жоғары балл аласыз.</div>
                <div class="desc"><b>Ескерту:</b> Рейтинг автоматты түрде есептелінеді. Әр жетекшінің қанша қатысушы қатыстырғаны, олар қай оқу орнынан қатысқаны барлығы көрінеді. Сондықтан барлығы әділ өтеді</div>
                <div class="desc"><b>Белсенді: 2023, Күз (қыркүйек, қазан, қараша) мезгілінің рейтингі 01.12.2023 күні шығады</b></div>
                <div class="desc block">
                    2023 жылдың күз айындағы жетекшілерге:
                    <ul>
                        <li>1-орынға ноутбук а-632</li>
                        <li>2-орынға Айпл 256гб</li>
                        <li>3-орынға самсунг А65</li>
                        <li>4-10 орындарға Ұстаз тілеі журналына тегін мақала жариялау және 2000тг бонус</li>
                        <li>10-20 орындарға 2000тг бонус</li>
                    </ul>
                </div>
                <div class="table-block">

                    <table class="table table-striped dataTable dtr-inline">
                        <thead>
                            <tr role="row">
                                <th>Орын</th>
                                <th>ID номер</th>
                                <th>Аты-жөні</th>
                                <th>Қатысушы саны</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(zhetekshi, index) in zhetekshiler" class="odd" :class="{'active':index==number}">
                                <td>{{index+1}}</td>
                                <td>{{zhetekshi.user_id}}</td>
                                <td>{{zhetekshi.name}}</td>
                                <td>{{zhetekshi.qatysushylar_count}}</td>
                            </tr>
                            <tr v-if="im_zhetekshi && number > 9" class="odd active">
                                <td>{{number}}</td>
                                <td>{{im_zhetekshi.user_id}}</td>
                                <td>{{im_zhetekshi.name}}</td>
                                <td>{{im_zhetekshi.qatysushylar_count}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-center">Рейтингке қосылу үшін сізге кемі 15 қатысушы қосу керек. Сіздің рейтингтегі орныңыз</div>
                </div>
                <div class="end_olimps_reiting">
                    <div class="h2">Аяқталған олимпиадалардың рейтингі</div>
                    <div class="list">
                        <template v-for="s in 4">
                            <nuxt-link v-if="s < season" to="/olimpiada/reiting">{{year}}, {{getSeasonText(s)}} мезгілінің рейтингі</nuxt-link>
                        </template>
                    </div>
                </div>
            </template>
            <template v-else>
               <div class="loading">
                   <Lottie :width="172" :height="172" :options="notFoundOption" v-on:animCreated="handleAnimation" />
                   Жақын арада қосылады
               </div>
                
                
            </template>

        </div>
    </div>
</template>

<script>
    import headerLink from '@/components/header.vue'
    import Lottie from 'vue-lottie/src/lottie.vue'
    import * as notFoundData from "@/assets/lottie_files/Later/animation.json"
    export default {
        middleware: ['auth'],
        head() {
            return {
                title: 'Үздік жетекшілер рейтингі',
                meta: [{
                    hid: 'description',
                    name: 'description',
                    content: 'Әр 3 ай сайын ең белсенді 20 жетекшіге Ноутбук, телефон және ақшалай сыйлықтарды береміз!'
                }, {
                    hid: 'keywords',
                    name: 'keywords',
                    content: ''
                }, ],
                link: [{
                    rel: 'canonical',
                    href: this.$store.state.appUrl + this.$route.path
                }]
            }
        },
        components: {
            headerLink,
            Lottie,
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
                }],
                notFoundOption: {
                    animationData: notFoundData
                },
                animationSpeed: 1,
                zhetekshiler: [],
                active: 0,
                im_zhetekshi: null,
                season: this.getSeason(new Date().getMonth()),
                year: new Date().getFullYear(),

            }
        },

        methods: {
            getData() {
                this.$api.$get('/olimpiada/olimpiadalarym/reiting', {
                    params: {
                        year: this.year,
                        season: this.season
                    }
                }).then((res) => {
                    this.zhetekshiler = res.data
                    this.im_zhetekshi = res.im_zhetekshi
                    this.number = res.number
                })
            },
            handleAnimation: function(anim) {
                this.anim = anim;
            },
            getSeason(month) {
                switch (month) {
                    case 3:
                    case 4:
                    case 5:
                        return 1;
                    case 6:
                    case 7:
                    case 8:
                        return 2;
                    case 9:
                    case 10:
                    case 11:
                        return 3;
                    case 12:
                    case 1:
                    case 2:
                        return 4;
                }
            },
            getSeasonText(season) {
                switch (season) {
                    case 1:
                        return 'Көктем (Наурыз, Сәуір, Мамыр)';
                    case 2:
                        return 'Жаз (Маусым, Шілде, Тамыз)';
                    case 3:
                        return 'Күз (Қыркүйек, Қазан, Қараша)';
                    case 4:
                        return 'Қыс (Желтоқсан, Қаңтар, Ақпан)';
                }
            },

        },
        mounted() {
            this.getData()
        }
    }

</script>

<style scoped lang="scss">
    .loading{
        margin-top: 100px;
        padding-bottom: 100px;
        font-size: 24px;
        font-weight: 800;
        line-height: 29px;
        color: #DBDBDB;

        text-align: center;
    }
    .reiting {
        padding-top: 30px;
        padding-bottom: 150px;
        .h2 {
            font-size: 24px;
            font-weight: 800;
            line-height: 30px;
        }
        .desc {
            margin-top: 20px;
            font-size: 16px;
            line-height: 19px;
        }
        .block {
            background: #F9FBFF;
            padding: 30px;
            border: 1px solid #F0F0F0;
            border-radius: 20px;
            ul {
                margin-top: 10px;
                margin-bottom: 0px;
            }
        }
        .table-block {
            background: #F8F8F8;
            padding: 16px 30px;
            margin-top: 50px;
            border-radius: 20px;
        }
        .table th,
        .table td {
            border-top: none;
            border-bottom: none;
        }
        .table-striped tbody .odd {
            border-radius: 10px;
        }
        .table-striped tbody tr:nth-of-type(odd) {
            background-color: #ffffff;
        }
        .table-striped tbody .odd.active {
            background: #fff;
            outline: 1px solid #FF8B0D;
            border-radius: 10px;
        }

        .end_olimps_reiting {
            margin-top: 50px;
        }
    }

</style>
