<template>
    <div class="list">
        <div class="cst-ct">
            <div v-if="loading==1" class="d-flex justify-content-center loader">
                <div class="spinner-border" role="status"></div>
            </div>
            <div v-show="loading==2" class="not_found">
                <Lottie :width="150" :height="150" :options="notFoundOption" v-on:animCreated="handleAnimation" />
                <div class="head">Cіз ешқандай олимпиадаға қатыспағансыз.</div>
                <div class="body">Қатысу үшін олимпиадана таңдаңыз</div>
                <NuxtLink to="/olimpiada" class="cst_size_btn">
                    <cstBtn text="Таңдау" square=1 />
                </NuxtLink>
            </div>
            <div v-if="loading==0" class="block_list">
                <div class="wrap">
                    <div class="belsendi">
                        <img src="~assets/images/flash.svg" alt="">
                        Белсенді
                    </div>
                    {{thisYear}} жыл, {{thisMonth}} айының олимпиадасы
                </div>
                <template v-for="(olimp, index) in olimps">
                    <nuxt-link :to="'/olimpiada/'+olimp.o_bagyt.lat_name+'-'+olimp.o_bagyt.idd" @click="startOlimp(index)" class="block">
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
        </div>
    </div>
</template>


<script>
    import Lottie from 'vue-lottie/src/lottie.vue'
    import * as notFoundData from "@/assets/lottie_files/not_found/82408-search.json"
    import cstBtn from '@/components/forms/btn.vue'
    export default {
        components: {
            Lottie,
            cstBtn
        },
        props: ['loading', 'olimps', 'thisYear', 'thisMonth'],
        data() {
            return {
                notFoundOption: {
                    animationData: notFoundData
                },
                animationSpeed: 1,
            }
        },
        methods: {
            startOlimp(id) {
                let slug = this.olimps[id].lat_name + '-' + this.olimps[id].idd
                this.$api.$get('olimpiada/' + slug).then((res) => {
                    this.$router.push({
                        name: 'olimpiada-slug',
                        params: {
                            slug: slug,
                            bagyt: res.bagyt,
                            o_users: res.o_users,
                            classes: res.classes,
                        }
                    });
                })
            },
            handleAnimation: function(anim) {
                this.anim = anim;
            },
        },
    }

</script>


<style scoped lang="scss">
    .list {

        padding-bottom: 100px;

        .loader {
            padding-top: 30px;
            padding-bottom: 380px;

            .spinner-border {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        .block_list {
            padding: 30px;
            border: 1px solid #03B113;
            background: #FFFFFF;
            display: flex;
            flex-direction: column;
            border-radius: 30px;
            margin-top: 30px;
            gap: 1px;

            .wrap {
                display: flex;
                align-items: center;
                gap: 20px;
                font-size: 24px;
                font-weight: 800;
                line-height: 30px;
                margin-bottom: 30px;

                .belsendi {
                    display: flex;
                    padding: 5px 20px;
                    background: #E6F7E8;
                    border-radius: 30px;
                    align-items: center;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 30px;
                    color: #03B113;

                }
            }

            .block {
                background: #FFFFFF;
                border-radius: 10px;
                padding: 10px 30px;

                &:hover {
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

        .not_found {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding-top: 115px;

            .head {
                font-size: 36px;
                font-weight: 600;
                line-height: 42px;
                color: #002A4D;
                margin-top: 20px;
            }

            .body {
                font-size: 24px;
                font-weight: 400;
                line-height: 28px;
                margin-top: 12px;
            }

            .cst_size_btn {
                width: 230px;
                height: 50px;
                margin-top: 40px;
            }
        }
    }

    @media all and (max-width: 500px) {
        .list .block_list[data-v-cbc8b6e6] {
            padding: 30px 10px;
        }

        .list .block_list .wrap[data-v-cbc8b6e6] {
            font-size: 20px;
            line-height: 26px;
        }
    }

</style>
