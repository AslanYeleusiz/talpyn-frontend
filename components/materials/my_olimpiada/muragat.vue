<template>
    <div>
        <olimpiadaPopup :active="active" @close="active=0" :tuser="o_user" />
        <div class="muragat">
            <div class="header">
                <div class="cst-ct">
                    <div class="info">
                        Олимпиадаға қатысқан жылды таңдаңыз
                    </div>
                    <div class="btnGroup">
                        <btnGroup @entered-category="enterYear" :category="filter" :placeholder='filter[0].name' type='2' />
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="cst-ct">
                    <div v-if="loading==1" class="d-flex justify-content-center loader">
                        <div class="spinner-border" role="status"></div>
                    </div>
                    <div v-else>
                        <div v-show="tusers.length>0" v-for="month in activeMonth">
                            <div class="list_block">
                                <div class="h">{{months[month-1]}} айының қатысушылары</div>
                                <div class="info">Қатысушылар</div>
                                <div class="tuser_list">
                                    <div v-for="(tuser, index) in sortedTuser(month)">
                                        <div class="tuser_block">
                                            <div class="numeric">{{index+1}}</div>
                                            <div v-if="tuser.edit" class="body_wrap">
                                                <div class="input-wrap">
                                                    <cstInput class="cst_input_40 cst_fix_span_input" stringPlaceholder="Қатыsсушының толық аты-жөні" @keyup.enter.native="editUser(index)" v-model="tuser.o_katysushy_fio" :danger="tuser.error" :dangerText="tuser.error" />
                                                </div>
                                                <div class="wrap">
                                                    <saveBtn v-if="tuser.loading" loading=1 />
                                                    <saveBtn v-else @click.native="editUser(index)" text="Сақтау" />
                                                    <saveBtn @click.native="tuser.edit=0" text="Болдырмау" red=1 />
                                                </div>
                                            </div>
                                            <div v-else class="body" :class="{one_wrap:!tuser.bari_tapsirdy}">
                                                <div class="name">{{tuser.o_katysushy_fio}}</div>
                                                <div class="btn_list">
                                                    <template v-if="tuser.bari_tapsirdy">
                                                        <div class="cst_size_btn v1">
                                                            <editBtn @click.native="getCertificate(tuser.idd)" :text="calcSertType(tuser.o_tizim.result) + ' жүктеу'" img='3' />
                                                        </div>
                                                        <div class="cst_size_btn v2">
                                                            <editBtn @click.native="getAlgysAtaAna(tuser.idd)" text="Ата-анаға алғыс хатты жүктеу" img='3' />
                                                        </div>
                                                        <div class="cst_size_btn v3">
                                                            <editBtn @click.native="moreResults(index)" text="Толығырақ" img='4' />
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <div v-if="tuser.update_count>0" class="cst_size_btn v4">
                                                            <editBtn @click.native="tuser.edit=1" text="Өзгерту" img='1' />
                                                        </div>
                                                        <div class="code">
                                                            Қатысу коды:<br><b>{{tuser.obwcode}}</b>
                                                        </div>
                                                        <div class="cst_size_btn v5">
                                                            <cstBtn v-if="tuser.loading" loading=1 radian=1 />
                                                            <cstBtn v-else @click.native="startTest" text="Тест тапсыру" radian=1 />
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info zhetekshi">Жетекшілер</div>
                                <div class="tuser_list">
                                    <!--
                                <div v-for="(tuser, index) in sortedZhetekshi(month)">
                                    <div class="tuser_block">
                                        <div class="numeric">{{index+1}}</div>
                                        <div class="body">
                                            <div class="name">{{tuser.zhetekshi_name}}</div>
                                            <div class="btn_list">
                                                <div class="cst_size_btn v1">
                                                    <editBtn text="Алғыс хатты жүктеу" img='3' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
-->
                                </div>
                            </div>
                        </div>
                        <div v-show="tusers.length==0" v-for="month in months">
                            <div class="list_block">
                                <div class="h">{{month}} айының қатысушылары</div>
                                <div class="note">
                                    <img src="~assets/images/note-remove.svg" alt="">
                                    <div class="lite">Қатысушылар жоқ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import btnGroup from '@/components/forms/btnGroup.vue'
    import editBtn from '@/components/forms/editBtn.vue'
    import cstBtn from '@/components/forms/btn.vue'
    import olimpiadaPopup from '@/components/popups/olimpiadaPopup.vue'
    import cstInput from '@/components/forms/cstInput.vue'
    import saveBtn from '@/components/forms/saveBtn.vue'

    export default {
        components: {
            btnGroup,
            editBtn,
            cstBtn,
            olimpiadaPopup,
            cstInput,
            saveBtn
        },
        props: ['thisYear'],
        data() {
            return {
                filter: [{
                    name: ''
                }],
                years: [],
                year: 2022,
                loading: 1,
                months: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'],
                tusers: [],
                o_user: null,
                activeMonth: [],
                zhetekshiler: [],
                active: 0,
            }
        },
        methods: {
            enterYear(res) {
                this.loading = 1
                this.activeMonth = []
                this.year = this.years[res]
                this.getData()
            },
            getCertificate(id){
                this.$api.get('/olimpiada/'+id+'/certificate',{
                    responseType: 'blob'
                }).then((response)=>{
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    var d = new Date();
                    fileLink.setAttribute('download', d.toLocaleString()+'.jpeg');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
            },
            getAlgysAtaAna(id){
                this.$api.get('/olimpiada/'+id+'/thankLetter',{
                    responseType: 'blob',
                    params: {
                        type: 2
                    }
                }).then((response)=>{
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    var d = new Date();
                    fileLink.setAttribute('download', d.toLocaleString()+'.jpeg');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
            },

            getData() {
                this.$api.$get('/olimpiada/olimpiadalarym/muragat', {
                    params: {
                        year: this.year
                    }
                }).then((res) => {
                    console.log(res)
                    this.loading = 0
                    this.tusers = res.tuser
                    this.zhetekshiler = res.zhetekshi
                    this.validate()
                })
            },
            validate() {
                this.tusers.forEach((tuser) => {
                    if (this.activeMonth.indexOf(tuser.month) == -1) this.activeMonth.push(tuser.month)
                })
            },
            addYear(year) {
                this.filter[0].name = year + ' ЖЫЛ'
                this.years[0] = year
                this.year = year
                for (let n = year - 1; n >= 2014; n--) {
                    let fill = {
                        name: n + ' ЖЫЛ'
                    }
                    this.filter.push(fill)
                    this.years.push(n)
                }
            },
            sortedTuser(month) {
                let tusers = []
                this.tusers.forEach((tuser) => {
                    if (tuser.month == month) tusers.push(tuser)
                })
                return tusers
            },
            sortedZhetekshi(month) {
                let zhetekshi = []
                this.zhetekshiler.forEach((tuser) => {
                    if (tuser.month == month) zhetekshi.push(tuser)
                })
                return zhetekshi
            },
            moreResults(index) {
                this.o_user = this.tusers[index];
                this.active = 1;
            },
            startTest() {
                this.$router.push('/olimpiada/test/enter-code')
            },
            editUser(index) {
                this.tusers[index].loading = 1
                this.$api.post('/olimpiada/user/update', {
                    id: this.tusers[index].idd,
                    name: this.tusers[index].o_katysushy_fio,
                    synyp: this.tusers[index].o_tury.synyp
                }).then((res) => {
                    this.tusers[index].loading = 0;
                    if (res.data.success == true) {
                        this.tusers[index].edit = 0;
                        this.tusers[index].update_count--;
                    }
                }).catch((err) => {

                })
            },
            calcSertType(val) {
                if (val >= 19) return '1 дәрежелі дипломды'
                if (val >= 16) return '2 дәрежелі дипломды'
                if (val >= 13) return '3 дәрежелі дипломды'
                return 'Сертификатты'
            }

        },
        mounted() {
            this.addYear(this.thisYear)
            this.getData()
        }


    }

</script>


<style scoped lang="scss">
    .muragat {
        background: #F8F8F8;
        padding-bottom: 200px;
    }

    .header {
        padding-top: 20px;

        .info {
            color: #888888;
        }

        .btnGroup {
            margin-top: 10px;
        }
    }

    .list {
        margin-top: 30px;

        .loader {
            padding-top: 30px;
            padding-bottom: 380px;

            .spinner-border {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        .list_block {
            background: #FFFFFF;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
            border-radius: 10px;
            padding: 30px;
            margin-bottom: 30px;

            .h {
                font-size: 24px;
                font-weight: 700;
                line-height: 30px;
                color: #000000;
            }

            .info {
                margin-top: 30px;
                font-size: 18px;
                font-weight: 400;
                line-height: 22px;
                color: #363636;

                &.zhetekshi {
                    margin-top: 50px;
                }
            }

            .tuser_list {
                margin-top: 30px;
                display: flex;
                flex-direction: column;
                gap: 10px;

                .tuser_block {
                    display: grid;
                    grid-template-columns: 70px 1fr;
                    border-radius: 10px;
                    overflow: hidden;

                    .numeric {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #363636;
                        color: #FF8B0D;
                        font-size: 24px;
                        font-weight: 800;
                    }

                    .body {
                        padding: 25px 15px;
                        background: #FFF1E4;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        gap: 20px;
                        align-items: center;

                        .name {
                            font-size: 18px;
                            font-weight: 600;
                            line-height: 21px;
                        }

                        .btn_list {
                            display: grid;
                            grid-template-columns: auto auto auto;
                            gap: 10px;

                            @media all and (max-width: 991px) {
                                grid-template-columns: auto;
                            }

                        }

                    }

                    .body_wrap {
                        padding: 25px 15px;
                        background: #FFF1E4;

                        .wrap-go {
                            position: relative;
                            z-index: 3;
                            margin-top: 15px;
                            display: grid;
                            grid-template-columns: 280px 180px;
                            grid-template-rows: 40px;
                            grid-gap: 10px;

                        }

                        .input-wrap {
                            display: grid;
                            grid-template-columns: 1fr;
                            grid-gap: 10px;
                            position: relative;
                            z-index: 4;


                            .cst-size-btn {
                                width: 200px;
                                display: grid;
                            }
                        }

                        .wrap {
                            margin-top: 10px;
                            display: grid;
                            grid-template-columns: 135px 135px;
                            grid-gap: 10px;
                            position: relative;
                            height: 40px;
                            z-index: 3;
                        }
                    }
                }
            }
        }
    }

    .cst_size_btn {
        height: 40px;
        width: 100%;

        &.v1 {
            max-width: 200px;
        }

        &.v2 {
            max-width: 236px;
        }

        &.v3 {
            max-width: 160px;
        }

        &.v4 {
            width: 135px;
        }

        &.v5 {
            width: 220px;
        }


    }

    .code {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        font-family: Raleway;
        font-size: 14px;
        font-weight: 300;
        line-height: 16px;
        padding: 0 20px 0 10px;

        b {
            font-weight: 600;
        }
    }

    .note {
        padding: 50px 0 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }

    .lite {
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        color: #363636;

    }

    @media all and (max-width: 991px) {
        .list .list_block .tuser_list .tuser_block .body {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    @media all and (max-width: 883px) {
        .list .list_block .h {
            font-size: 22px;
            line-height: 28px;
        }

        .list .list_block .info {
            margin-top: 20px;
        }

        .list .list_block .tuser_list .tuser_block .body .name {
            width: 100%;
        }

        .list .list_block .tuser_list .tuser_block .body .btn_list {
            align-content: center;
            gap: 15px;
        }

        .list .list_block .tuser_list .tuser_block .body {
            gap: 15px;
        }
    }

    @media all and (max-width: 767px) {
        .list .list_block .h {
            font-size: 20px;
            line-height: 25px;
        }

        .list .list_block .info {
            margin-top: 15px;
            font-size: 16px;
            line-height: 19px;
        }

        .list .list_block {
            padding: 30px 25px;
        }

        .header {
            padding-top: 30px;
        }

        .list .list_block .tuser_list .tuser_block .body .name {
            font-size: 16px;
            font-weight: 600;
            line-height: 19px;
        }
    }

    @media all and (max-width: 575px) {
        .list .list_block .h {
            font-size: 18px;
            line-height: 22px;
        }

        .list .list_block .info {
            margin-top: 10px;
        }

        .list .list_block .tuser_list .tuser_block .body .name {
            font-size: 15px;
            line-height: 18px;
        }

        .list .list_block .tuser_list .tuser_block {
            grid-template-columns: 60px 1fr;
        }
    }

    @media all and (max-width: 500px) {
        .list .list_block {
            padding: 25px 20px;
        }
    }

    @media all and (max-width: 448px) {
        .list .list_block {
            padding: 20px 15px;
        }
    }

    @media all and (max-width: 432px) {
        .list .list_block .tuser_list .tuser_block .body_wrap .wrap {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media all and (max-width: 400px) {
        .list .list_block .tuser_list .tuser_block {
            grid-template-columns: 50px 1fr;
        }

        .list .list_block .tuser_list .tuser_block .body {
            padding: 15px 25px;
        }

        .list .list_block .tuser_list .tuser_block .body .name {
            font-size: 14px;
            line-height: 17px;
        }

        .list .list_block .h {
            font-size: 17px;
            line-height: 19px;
        }

        .list .list_block {
            padding: 20px 10px;
        }


    }

    @media all and (max-width: 380px) {
        .list .list_block .tuser_list .tuser_block {
            grid-template-columns: 40px 1fr;
        }

        .list .list_block .h {
            font-size: 16px;
            line-height: 18px;
        }

    }

</style>
<style lang="scss">
    .cst_input_40 input {
        height: 40px;
    }

    .cst_fix_span_input {
        .danger_message {
            position: relative;
        }
    }

    .list .list_block .tuser_list .tuser_block .body_wrap .wrap .cst_btn {
        width: 100%;
        max-width: 135px;
    }

</style>
