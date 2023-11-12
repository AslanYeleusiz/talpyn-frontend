<template>
    <div class="list">
        <div class="cst-ct">
            <div v-if="loading==1" class="d-flex justify-content-center loader">
                <div class="spinner-border" role="status"></div>
            </div>
            <h2>Өткен олимпиадалар тізімі</h2>
            <div v-for="(year, index) in years" class="block_list">
                <div class="year">{{year.year}} жыл</div>
                <div v-if="year.data.length==0" class="not_found">
                    <img src="~/assets/images/document.svg" alt="">
                    <div class="head">{{year.year}} жылы ешқандай олимпиадаға тіркелмегенсіз</div>
                </div>
                <template v-for="(olimp, index) in year.data">
                    <nuxt-link :to="'/olimpiada/'+olimp.o_bagyt.lat_name+'-'+olimp.o_bagyt.idd+'?year='+year.year+'&month='+olimp.o_bagyt.month" class="block">
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
                <div class="d-f j-c">
                    <div v-if="year.data.length >= 3" class="more" :class="{'active':year.data.length > 3}" @click="moreData(index)">{{year.data.length == 3 ? 'Толық ашу' : year.data.length > 3 ? 'Қыстқарту' : '' }}</div>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
    import cstBtn from '@/components/forms/btn.vue'
    export default {
        components: {
            cstBtn
        },
        props: ['turnirs', 'thisYear', 'thisMonth'],
        data() {
            return {
                years: [],
                loading: 1,
            }
        },
        methods: {
            moreData(index){
                if(this.years[index].data.length == 3){
                    let year = this.years[index].year;
                    this.$api.$get('/olimpiada/olimpiadalarym/muragat/'+year).then((res) => {
                        console.log(res)
                        this.years[index].data = res.data
                    })
                } else if(this.years[index].data.length > 3) {
                    this.years[index].data = this.years[index].data.slice(0, 3);
                }
                
            },
            getData() {
                this.$api.$get('/olimpiada/olimpiadalarym/muragat').then((res) => {
                    console.log(res)
                    this.years = res.data
                    this.loading = 0
                })
            },
        },
        mounted() {
            this.getData()
        }
    }

</script>


<style scoped lang="scss">
    .list {
        padding-bottom: 200px;

        .loader {
            padding-top: 30px;
            padding-bottom: 380px;

            .spinner-border {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        h2 {
            font-size: 24px;
            font-weight: 800;
            line-height: 30px;


        }

        .year {
            font-size: 24px;
            font-weight: 800;
            line-height: 30px;
            margin-bottom: 20px;

        }

        .block_list {
            padding: 30px;
            background: #FFFFFF;
            display: flex;
            flex-direction: column;
            border-radius: 30px;
            margin-top: 30px;
            gap: 1px;


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
            padding: 40px 0 90px;

            .head {
                font-size: 18px;
                font-weight: 600;
                line-height: 22px;
                max-width: 300px;
                margin-top: 20px;
                text-align: center;
            }
        }

        .more {
            margin-top: 30px;
            font-size: 16px;
            font-weight: 600;
            line-height: 19px;
            color: #888888;
            padding-right: 20px;
            cursor: pointer;
            
            &.active::after{
                transform: rotate(135deg) translate(-2px, -12px);
            }

            &::after {
                content: '';
                display: inline-block;
                position: absolute;
                width: 8px;
                height: 8px;
                border-left: 2px solid #888888;
                border-bottom: 2px solid #888888;
                transform: rotate(-45deg) translate(4px, 10px);
            }

            &:hover {
                color: #0045CB;

                &::after {
                    border-left: 2px solid #0045CB;
                    border-bottom: 2px solid #0045CB;
                }
            }

        }
    }

    @media all and (max-width: 500px) {
        .list .block_list {
            padding: 30px 10px;
        }

        .list .block_list .wrap {
            font-size: 20px;
            line-height: 26px;
        }
    }

</style>
