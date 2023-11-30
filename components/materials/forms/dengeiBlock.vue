<template>
    <div class="bagyt_info_block">
        <div class="left">
            <div class="wrap">
                <div>
                    <div class="head">Есеп жинақ атауы:</div>
                    <div class="title">{{name}}</div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="block">
                <div class="wrap">
                    <div class="content">
                        <div class="head">Уақыты:</div>
                        <div class="title">1-{{lastDayInMonth}} {{month}} аралығында</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ['dengei', 'name', 'qatysushy', 'month', 'lastDayInMonth', 'price', 'type'],
        methods: {
            getType(type) {
                if(type) {
                    if(type == 2) return 'Байқау'
                    return 'Олимпиада'
                }
                return 'Турнир'
            }
        }
    }

</script>


<style scoped lang="scss">
    .bagyt_info_block {
        border-radius: 10px;
        padding: 20px;
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr 320px;

        .left {
            padding: 10px;

            .wrap {
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
                grid-gap: 20px;

                &.bonus {
                    .head {
                        color: #1D58CB;
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 19px;
                    }

                    .title {
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 19px;

                        color: #888888;
                    }
                }


                .head {
                    color: #888888;
                }

                .title {
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 21px;
                    color: #363636;

                    &:first-letter {
                        text-transform: uppercase;
                    }
                }
            }
        }

        .right {
            .block {
                background: #FFFFFF;
                /* Line color */

                border: 1px solid #D6D6D6;
                border-radius: 10px;
                padding: 20px 20px 30px;

                .wrap {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    align-items: center;
                    grid-gap: 10px;

                    .head {
                        color: #888888;
                    }

                    .title {
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 21px;
                        color: #363636;

                        &.money {
                            font-size: 32px;
                        }
                    }

                    &.mt-20 {
                        margin-top: 20px;
                    }
                }
            }

        }
    }

    @media all and (max-width: 991px) {
        .bagyt_info_block {
            grid-template-columns: 1fr 267px;
        }

        .bagyt_info_block .right .block .wrap .title {
            font-size: 16px;
            line-height: 18px;
        }

        .bagyt_info_block .right .block .wrap .title.money {
            font-size: 28px;
        }

        .bagyt_info_block .left .wrap .title {
            font-size: 16px;
            line-height: 19px;
        }

        .bagyt_info_block .right .block {
            padding: 16px 16px 26px;
        }
    }

    @media all and (max-width: 883px) {
        .bagyt_info_block {
            grid-template-columns: 1fr;
            grid-gap: 10px;
        }

        .bagyt_info_block .right .block {
            padding: 16px 17px 32px;
        }
    }

    @media all and (max-width: 575px) {
        .bagyt_info_block .left .wrap .head {
            font-size: 13px;
        }

        .bagyt_info_block .left .wrap .title {
            font-size: 14px;
            line-height: 17px;
        }

        .bagyt_info_block .right .block .wrap .title {
            font-size: 14px;
            line-height: 18px;
        }

        .bagyt_info_block .right .block .wrap .title.money {
            font-size: 26px;
            line-height: 29px;
        }

        .bagyt_info_block .right .block .wrap .head {
            font-size: 13px;
        }

    }

    @media all and (max-width: 500px) {
        .bagyt_info_block .left .wrap {
            grid-gap: 10px;
        }

        .bagyt_info_block img {
            width: 30px;
            height: 30px;
        }

        .bagyt_info_block .left .wrap .head {
            font-size: 12px;
        }

        .bagyt_info_block .right .block .wrap .head {
            font-size: 12px;
        }

        .bagyt_info_block .right .block .wrap .title.money {
            font-size: 23px;
            line-height: 25px;
        }
    }

    @media all and (max-width: 420px) {
        .bagyt_info_block .right .block .wrap .title.money {
            font-size: 20px;
            line-height: 23px;
        }
    }

</style>
