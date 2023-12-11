<template>
    <div>
        <div v-if="only==1" class="gift_block">
            <div class="cst-ct">
                <div class="title">Жетекшілерге сыйлықтар</div>
                <div class="com"><span class="gold">Ноутбук, телефон және ақшалай сыйлықтарды</span> ең белсенді жетекшілерге береміз!</div>
                <div class="desc">Рейтинг бөлімінде барлық нәтижелер туралы жариялап отырамыз!</div>
                <cstbtn square=1 class="cstbtn" text="Толығырақ" />
            </div>
        </div>
        <div v-if="only==2" class="gift_block guard">
            <div class="cst-ct">
                <div class="title"><span class="blue">10% бонус</span> қалай беріледі?</div>
                <div class="com">Әр қатысушыға төлем жасаған соң сол сумманың 10% сізге бонус ретінде беріледі</div>
                <div class="desc">Бонусты сайттағы олимпиадаға төлем жасауға немесе картаға ақша ретінде шығарып алуға болады</div>
                <cstbtn square=1 class="cstbtn" text="Бонусты көру" />
            </div>
        </div>
    </div>
</template>


<script>
    import cstbtn from '@/components/forms/btn.vue'
    export default {
        props: ['only'],
        components: {
            cstbtn
        },
    }

</script>


<style scoped lang="scss">
    
    span.gold {
        color: #A48A16;
    }

    span.blue {
        color: #6E64BD;
    }
    
    .gift_block {
        max-width: 980px;
        margin: 100px auto 0;
        padding: 50px 0 73px;
        color: #363636;
        background: url(~assets/images/gift_olimp.png) no-repeat 93%/382px #F8F8F8;
        border-radius: 30px;

        .title {
            font-size: 38px;
            font-weight: 800;
            line-height: 45px;
        }

        .com {
            margin-top: 20px;
            font-size: 20px;
            font-weight: 600;
            line-height: 23px;
        }

        .desc {
            margin-top: 10px;
            font-size: 20px;
            line-height: 23px;
        }

        .com,
        .desc {
            max-width: 477px;
        }

        .cstbtn {
            width: 220px;
            height: 50px;
            margin-top: 20px;
        }

        &.guard {
            margin-top: 30px;
            background: url(~assets/images/guard_olimp.png) no-repeat 100%/382px #F8F8F8;
        }

    }

    @media all and (max-width: 1099px) {

        .gift_block .title {
            font-size: 34px;
            line-height: 40px;
        }

        .gift_block .com {
            font-size: 18px;
            line-height: 21px;
        }

        .gift_block .desc {
            font-size: 18px;
            line-height: 21px;
        }

        .gift_block {
            max-width: 840px;
            background: url(~assets/images/gift_olimp.png) no-repeat 96%/340px #F8F8F8;

            &.guard {
                background: url(~assets/images/guard_olimp.png) no-repeat 100%/340px #F8F8F8;
            }
        }
    }

    @media all and (max-width: 991px) {

        .gift_block {
            max-width: 700px;
            background: url(~assets/images/gift_olimp.png) no-repeat 101%/312px #F8F8F8;
        }

        .gift_block .title {
            font-size: 30px;
            line-height: 36px;
        }

        .gift_block .com,
        .gift_block .desc {
            font-size: 16px;
            line-height: 18px;
        }

        .gift_block .com,
        .gift_block .desc {
            max-width: 362px;
        }
    }

    @media all and (max-width: 883px) {

        .gift_block {
            padding: 180px 0 50px;

            max-width: 590px;
            background: url(~assets/images/gift_olimp.png) no-repeat 0% 0%/201px #F8F8F8;

            &.guard {
                background: url(~assets/images/guard_olimp.png) no-repeat 0% 0%/201px #F8F8F8;
            }
        }
    }

    @media all and (max-width: 590px) {
        .gift_block .title {
            font-size: 26px;
            line-height: 32px;
        }

        .gift_block .com,
        .gift_block .desc {
            max-width: 100%;
        }

        .gift_block {
            padding: 144px 0 50px;
            max-width: 590px;
            background: url(~assets/images/gift_olimp.png) no-repeat 0% 0%/160px #F8F8F8;

            &.guard {
                background: url(~assets/images/guard_olimp.png) no-repeat 0% 0%/160px #F8F8F8;
            }
        }
    }

    @media all and (max-width: 425px) {
        .gift_block .title {
            font-size: 22px;
            line-height: 27px;
        }

        .gift_block {
            padding: 180px 0 50px;
            background: url(~assets/images/gift_olimp.png) no-repeat -15% 0%/179px #F8F8F8;
        }
    }

</style>
