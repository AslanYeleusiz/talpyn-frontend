<template>
    <div>
        <videoPopup :isOpen="videoOpen" :youtube="youtubeLink" @closePopup="videoOpen=0" />
        <olimpiadaPopup :active="active" :o_katysushy="o_katysushy" @close="active=0"  />
        <confirmedPopup />
        <header_kroshki :header="header" gotoUrl="/olimpiada" />
        <div class="main">
            <div class="cst-ct">
               <div v-if="startDate" class="warning">
                    <Lottie :width="64" :height="64" :options="notFoundOption" v-on:animCreated="handleAnimation" />
                    <div><b>Ескерту:</b> Бұл олимпиада {{startDate}}-{{endDate}} аралығында өткен. Бұл бетте тек нәтижелері сақталған. Қазіргі болып жатқан олимпиадаларды көргіңіз келсе олимпиада бетіне өтіңіз!</div>
                </div>
                <div v-if="!bagyt.o_bagyty" class="header">
                    <b-skeleton width="75%" height="25px"></b-skeleton>
                </div>
                <div v-else class="header">
                    {{bagyt.o_bagyty}}
                </div>
                <dengeiBlock :month="getMonth(bagyt.month)" :name="bagyt.bagyt" :qatysushy="get_qatysushi_text()" :lastDayInMonth="bagyt.lastDayInMonth" type=1 />
                <div class="userBlock">
                    <div class="prev">Қатысушылар</div>
                    <div class="users">
                        <template v-if="preload">
                            <div class="text-center">
                                <b-spinner variant="primary" label="Text Centered"></b-spinner>
                            </div>
                        </template>
                        <template v-else v-for="(o_user, index) in o_users">
                            <div v-if="userEdit==index" class="block edit">
                                <div class="body">
                                    <div class="input-wrap zindex-7" :class="{'column-3':checkBagyt(), 'column-2':bagyt.o_katysushy_idd == 2}">
                                        <cstInput class="cst_input_40 cst_fix_span_input" stringPlaceholder="Есіміңіз" v-model="o_user.o_katysushy_name" @click.native="o_user.errorName=''" :danger="o_user.errorName" />
                                        <cstInput class="cst_input_40 cst_fix_span_input" stringPlaceholder="Тегіңіз (Фамилия)" v-model="o_user.o_katysushy_fname" @click.native="o_user.errorFname=''" :danger="o_user.errorFname" />
                                        <div v-if="bagyt.o_katysushy_idd == 3" class="cst-size-btn">
                                            <btnGroup :category='classes' :placeholder="o_user.o_tury.synyp+' сынып'" @entered-category="(e)=>{enteredEditClass(index, e)}" />
                                        </div>
                                    </div>
                                    <div v-if="o_user.o_mekeme" class="work">{{o_user.o_mekeme}}</div>
                                    <checkbox v-model="o_user.addWork" class="zi mt-3" :text="o_user.o_mekeme ? textWork()+' орнын өзгерту' : textWork()+' орнын қосу'" idName="mekeme" type=1 />
                                    <div v-show="o_user.addWork==1" class="input-wrap zindex-6 column-3 mt-2">
                                        <btnGroup :category='oblys' :placeholder="userWork[0] ? userWork[0] : 'Облысты таңдаңыз'" @entered-category="(e)=>{enteredOblys(index, e)}" class="cst_input_40 zi" :danger="userWorkDanger" />
                                        <btnGroup v-show="userWork[0]" :category='audan' :placeholder="userWork[1] ? userWork[1] : 'Ауданы таңдаңыз'" @entered-category="(e)=>{enteredAudan(index, e)}" class="cst_input_40 zi" :danger="userWorkDanger" />
                                        <btnGroup v-show="userWork[1]" :category='mektep' :placeholder="userWork[2] ? userWork[2] : 'Мектепті таңдаңыз'" @entered-category="(e)=>{enteredMektep(index, e)}" class="cst_input_40 zi" :danger="userWorkDanger" />
                                    </div>
                                    <template v-if="checkBagyt()">
                                        <checkbox v-model="zhetekshiChec" class="zi mt-3" :text="o_user.o_zhetekshi ? 'Жетекшіні өзгерту' : 'Жетекшіні қосу'" idName="zhetekshi" type=1 />
                                        <div v-if="zhetekshiChec==1" class="input-wrap mt-2">
                                            <cstInput v-if="o_user.o_zhetekshi" class="cst_input_40 cst_fix_span_input" stringPlaceholder="Жетекшінің толық аты-жөні" v-model="o_user.o_zhetekshi.name" :danger="errorZhetekshi" />
                                            <cstInput v-else class="cst_input_40 cst_fix_span_input" stringPlaceholder="Жетекшінің толық аты-жөні" v-model="newUsersZhetekshi" :danger="errorZhetekshi" />
                                        </div>
                                    </template>
                                    <div v-if="!startDate" class="wrap">
                                        <saveBtn v-if="o_user.loading" loading=1 />
                                        <saveBtn v-else @click.native="editUser(index)" text="Сақтау" />
                                        <saveBtn @click.native="userEdit=null" text="Болдырмау" red=1 />
                                    </div>
                                    <div class="numeric">
                                        <div class="num">{{index+1}}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="block">
                                <div class="body">
                                    <div class="name-wrap">
                                        <div class="name">{{o_user.o_katysushy_fio}}</div>
                                        <div v-if="o_user.bari_tapsirdy" class="ball">Балл: 20/{{o_user.o_tizim.result}}</div>
                                    </div>
                                    <div v-if="o_user.o_mekeme" class="work">{{o_user.o_mekeme}}</div>
                                    <div v-if="o_user.o_zhetekshi" class="work m-0">Жетекші: {{o_user.o_zhetekshi.name}}</div>
                                    <div v-if="o_user.bari_tapsirdy" class="wrap-go">
                                        <editBtn @click.native="openPopup(index)" text="Нәтижесі" img='4' />
                                    </div>
                                    <div v-else class="wrap-edit">
                                        <div class="grid">
                                            <editBtn v-if="o_user.update_count>0" @click.native="userEdit=index" text="Өзгерту" img='1' />
                                            <editBtn v-if="!o_user.success" @click.native="confirmDeleteUser(index)" text="Жою" img='2' />
                                        </div>
                                        <div class="cst_size_btn">
                                            <cstBtn v-if="o_user.loading" loading=1 radian=1 />
                                            <cstBtn v-else-if="o_user.success" @click.native="startTest(index)" text="Тест тапсыру" radian=1 />
                                            <cstBtn v-else @click.native="olimpTolem(index)" text="Тест дайындау" radian=1 />
                                        </div>
                                    </div>
                                    <div class="numeric">
                                        <div class="num">{{index+1}}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-if="addNewUser" class="block edit">
                            <div class="body">
                                <div class="input-wrap zindex-7" :class="{'column-3':checkBagyt(), 'column-2':bagyt.o_katysushy_idd == 2}">
                                    <cstInput class="cst_input_40 cst_fix_span_input" stringPlaceholder="Есіміңіз" v-model="newUserName" :danger="errorNewUserName" />
                                    <cstInput class="cst_input_40 cst_fix_span_input" stringPlaceholder="Тегіңіз (Фамилия)" v-model="newUserFname" :danger="errorNewUserFname" />
                                    <div v-if="bagyt.o_katysushy_idd == 3" class="cst-size-btn">
                                        <btnGroup :category='classes' placeholder='Сыныбы' @entered-category="enteredClass" :danger="newUserClassDanger" />
                                    </div>
                                </div>
                                <checkbox v-model="newUserWorkCheck" class="zi mt-3" :text="textWork()+' орнын қосу'" idName="mekeme" type=1 />
                                <div v-if="newUserWorkCheck==1" class="input-wrap zindex-6 column-3 mt-2">
                                    <btnGroup :category='oblys' :placeholder="newUserWork[0] ? newUserWork[0] : 'Облысты таңдаңыз'" @entered-category="(e)=>{newuserEnteredOblys(e)}" class="cst_input_40 zi" :danger="newUserWorkDanger" />
                                    <btnGroup v-show="newUserWork[0]" :category='audan' :placeholder="newUserWork[1] ? newUserWork[1] : 'Ауданы таңдаңыз'" @entered-category="(e)=>{newuserEnteredAudan(e)}" class="cst_input_40 zi" :danger="newUserWorkDanger" />
                                    <btnGroup v-show="newUserWork[1]" :category='mektep' :placeholder="newUserWork[2] ? newUserWork[2] : 'Мектепті таңдаңыз'" @entered-category="(e)=>{newuserEnteredMektep(e)}" class="cst_input_40 zi" :danger="newUserWorkDanger" />
                                </div>
                                <template v-if="checkBagyt()">
                                    <checkbox v-model="newUsersZhetekshiCheck" class="zi mt-3" text="Жетекшіні қосу" idName="zhetekshi" type=1 />
                                    <div v-if="newUsersZhetekshiCheck==1" class="input-wrap mt-2">
                                        <cstInput class="cst_input_40 cst_fix_span_input" stringPlaceholder="Жетекшінің толық аты-жөні" v-model="newUsersZhetekshi" :danger="errorZhetekshi" />
                                    </div>
                                </template>

                                <div class="wrap">
                                    <saveBtn v-if="loading" loading=1 />
                                    <saveBtn v-else @click.native="saveNewUser" text="Сақтау" />
                                    <saveBtn @click.native="addNewUser=0" text="Болдырмау" red=1 />
                                </div>
                                <div class="numeric">
                                    <div class="num">{{newUserNomer}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="!startDate" class="addNewUser">
                            <div class="cst_size_btn">
                                <cstBtn @click.native="addNewUser=1" text="Қосу" radian=1 img="add.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import cstInput from '@/components/forms/cstInput.vue'
    import cstBtn from '@/components/forms/btn.vue'
    import btnGroup from '@/components/forms/btnGroup.vue'
    import dengeiBlock from '@/components/materials/forms/dengeiBlock.vue'
    import confirmedPopup from '@/components/popups/confirmedPopup.vue'
    import header_kroshki from '@/components/header_kroshki.vue'
    import saveBtn from '@/components/forms/saveBtn.vue'
    import editBtn from '@/components/forms/editBtn.vue'
    import olimpiadaPopup from '@/components/popups/olimpiadaPopup.vue'
    import videoPopup from '@/components/popups/videoPopup.vue'
    import checkbox from '@/components/forms/checkbox.vue'
    import Lottie from 'vue-lottie/src/lottie.vue'
    import * as notFoundData from "@/assets/lottie_files/info_2/animation_kqc42oh6.json"

    export default {
        middleware: ['auth'],
        head() {
            return {
                title: this.bagyt.o_bagyty,
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
            confirmedPopup,
            header_kroshki,
            cstInput,
            btnGroup,
            saveBtn,
            editBtn,
            cstBtn,
            dengeiBlock,
            videoPopup,
            olimpiadaPopup,
            Lottie,
            checkbox
        },
        data() {
            return {
                classes: [],
                loading: 0,
                active: 0,
                preload: 0,
                go: 0,
                videoOpen: 0,
                youtubeLink: 'https://www.youtube.com/watch?v=Ka0lRluiGmk',
                addNewUser: 0,
                newUserName: '',
                newUserFname: '',
                newUserWorkCheck: 0,
                newUserWork: ['', '', ''],
                userWork: ['', '', ''],
                newUserWorkDanger: null,
                newUserClassDanger: null,
                userWorkDanger: null,
                userEdit: null,
                audan: [],
                mektep: [],
                errorNewUserName: '',
                errorNewUserFname: '',
                newClassSet: null,
                newUsersZhetekshiCheck: 0,
                errorZhetekshi: '',
                newUsersZhetekshi: '',
                zhetekshiChec: 0,
                thisYear: 2021,
                thisMonth: '',
                notFoundOption: {
                    animationData: notFoundData
                },
                animationSpeed: 1,
                o_katysushy: {},
                test: {
                    active: 0,
                    katysushy: null,
                },
                katysushy_type: null,
                form: {
                    edit: 0
                },
            }
        },
        async asyncData({
            $axios,
            params,
            query
        }) {
            let seed = ''
            if(query.year && query.month) seed = '?year='+query.year+'&month='+query.month
            let title = params.slug.split('-');
            let id = title[1]
            let data = await $axios.$get(`olimpiada/${id}${seed}`)
            let classes = []
            data.classes.forEach((e) => {
                let synyp = {
                    name: e + ' сынып',
                    value: e
                }
                classes.push(synyp)
            })
            let user = params.status == 'result' ? params.katysushy : {}
            return {
                bagyt: data.bagyt,
                o_users: data.o_users,
                zhetekshiler: data.zhetekshiler,
                oblys: data.oblys,
                newUserNomer: data.o_users.length + 1,
                classes: classes,
                o_user: user,
                startDate: data.startDate,
                endDate: data.endDate,
                header: [{
                    name: 'Олимпиадалар',
                    link: '/olimpiada'
                }, {
                    name: data.bagyt.o_bagyty,
                }],
            }
        },
        methods: {
            openPopup(index){
                this.o_katysushy = this.o_users[index];
                this.active = 1;
            },
            checkBagyt() {
                switch (this.bagyt.o_katysushy_idd) {
                    case 1:
                    case 4:
                        return false;
                    case 3:
                    case 2:
                        return true;
                }
            },
            certCalc(val) {
                if (val >= 19) return '1 дәрежелі дипломды';
                else if (val >= 16) return '2 дәрежелі дипломды';
                else if (val >= 13) return '3 дәрежелі дипломды';
                else return 'Сертификатты';
            },
            get_qatysushi_text() {
                switch(this.bagyt.o_katysushy_idd){
                    case 1: return 'Ұстаздар арасында';
                    case 2: return 'Студенттер арасында';
                    case 3: return this.bagyt.first_child.synyp+'-'+this.bagyt.last_child.synyp+' сынып оқушылары арасында';
                    case 4: return 'Тәрбиешілер арасында';
                }
            },
            handleAnimation: function(anim) {
                this.anim = anim;
            },
            startTest(index) {
                var code = this.o_users[index].obwcode
                    this.$router.push({
                        name: 'olimpiada-test',
                        query: {
                            code: code
                        },
                    });
            },
            getCertificate(id) {
                this.$api.get('/olimpiada/' + id + '/certificate', {
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
            getAlgys(e, index) {
                let id = e ? this.o_users[index].idd : this.o_users[index].o_zhetekshi_id
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
            textWork(){
                switch(this.bagyt.o_katysushy_idd){
                    case 1: return 'Жұмыс'
                    case 2: return 'Оқу'
                    case 3: return 'Оқу'
                    case 4: return 'Жұмыс'
                }
            },
            checStudent(index) {
                return this.o_users[index].o_katysushy_idd == 2 ? true : this.o_users[index].o_katysushy_idd == 3 ? true : false;
            },
            confirmDeleteUser(index) {
                let o_user = this.o_users[index]
                this.$dialog.open({
                    message: 'Әрекетіңізді растайсыз ба?',
                    resolver: (async (result) => {
                        try {
                            const res = await result;
                            this.deleteUser(index);

                        } catch (error) {
                            console.warn(error);
                        }
                    }),
                });
            },
            editUser(index) {
                this.o_users[index].loading = 1;
                let work = this.o_users[index].o_mekeme
                if (this.o_users[index].addWork == 1) {
                    if (this.userWork.some(item => item == '')) {
                        this.userWorkDanger = 'Қате';
                        this.setNotification('Барлық бағандарды толтырыңыз', 'failer')
                        this.o_users[index].loading = 0;
                        return;
                    }
                    work = this.userWork.join(' ');
                }
                
                let zhetekshi = this.o_users[index].o_zhetekshi ? this.o_users[index].o_zhetekshi.name : this.newUsersZhetekshi;
                if(this.zhetekshiChec == 1)
                    if(!zhetekshi) {
                        this.errorZhetekshi = 'Қате';
                        this.setNotification('Сыныпты таңдаңыз', 'failer')
                        this.o_users[index].loading = 0;
                        return;
                    }

                this.$api.post('/olimpiada/user/update', {
                    id: this.o_users[index].idd,
                    name: this.o_users[index].o_katysushy_name,
                    fname: this.o_users[index].o_katysushy_fname,
                    o_mekeme: work,
                    synyp: this.o_users[index].o_tury.synyp,
                    zhetekshi: zhetekshi
                }).then((res) => {
                    this.o_users[index].loading = 0;
                    if (res.data.success == true) {
                        this.o_users[index] = res.data.katysushy
                        this.o_users[index].addWork = 0
                        this.userEdit = null
                        this.setNotification('Өзгеріс сақталды', 'success')
                    }
                    this.clearFeedBack()
                }).catch((err) => {
                    
                })
                // АПИ ИЗМЕНЕНИЕ ИМЕНИ ДОДЕЛАТЬ
            },
            deleteUser(index) {
                let user = this.o_users[index]
                this.$api.get('/olimpiada/user/' + user.idd + '/destroy').then((res) => {
                    console.log(res.data);
                    if (res.data.success == true) {
                        this.o_users.splice(index, 1);
                        this.setNotification('Сәтті жойылды', 'success')
                    }
                })
            },
            olimpTolem(index) {
                this.o_users[index].loading = 1
                this.$api.post('/olimpiada/test/tolem-zhasau', {
                    id: this.o_users[index].idd,
                    nomer: index + 1,
                    price: 0,
                }).then((res) => {
                    this.o_users[index].loading = 0
                    if (res.data.success == true) {
                        this.o_users[index].success = 1
                        this.o_users[index].o_tizim = res.data.o_tizim
                        this.setNotification('Төлем жасалынды', 'success')
                        this.setNotification(res.data.price + ' тг сіздің бонустың шотыңызға аударылды')
                    }
                    console.log(this.o_users)
                }).catch((err) => {
                    this.o_users[index].loading = 0
                    console.log(err);
                })
            },
            getMonth(e) {
                switch (e) {
                    case '1':
                        return 'қаңтар';
                    case '2':
                        return 'ақпан';
                    case '3':
                        return 'наурыз';
                    case '4':
                        return 'сәуір';
                    case '5':
                        return 'мамыр';
                    case '6':
                        return 'маусым';
                    case '7':
                        return 'шілде';
                    case '8':
                        return 'тамыз';
                    case '9':
                        return 'қыркүйек';
                    case '10':
                        return 'қазан';
                    case '11':
                        return 'қараша';
                    case '12':
                        return 'желтоқсан';
                }
            },
            enteredClass(e) {
                this.newClassSet = this.classes[e].value
            },
            enteredEditClass(index, e) {
                this.o_users[index].o_tury.synyp = this.classes[e].value
            },
            enteredOblys(index, e) {
                this.userWork[0] = this.oblys[e].name
                this.$api.get('olimpiada/oblys/' + this.oblys[e].id).then((res) => {
                    this.audan = res.data.audan
                })
            },
            enteredAudan(index, e) {
                this.userWork[1] = this.audan[e].name
                this.$api.get('olimpiada/oblys/' + this.oblys[e].id + '/audan/' + this.audan[e].id).then((res) => {
                    this.mektep = res.data.mektep
                })
            },
            enteredMektep(index, e) {
                this.userWork[2] = this.mektep[e].name
            },
            newuserEnteredOblys(e) {
                this.newUserWork[0] = this.oblys[e].name
                this.$api.get('olimpiada/oblys/' + this.oblys[e].id).then((res) => {
                    this.audan = res.data.audan
                })
            },
            newuserEnteredAudan(e) {
                this.newUserWork[1] = this.audan[e].name
                this.$api.get('olimpiada/oblys/' + this.oblys[e].id + '/audan/' + this.audan[e].id).then((res) => {
                    this.mektep = res.data.mektep
                })
            },
            newuserEnteredMektep(e) {
                this.newUserWork[2] = this.mektep[e].name
            },
            setNotification(text,status) {
                this.$bus.$emit('notification', {
                    text: text,
                    status: status,
                })
            },
            saveNewUser() {
                this.loading = 1;
                let work = null;
                if (this.newUserWorkCheck == 1) {
                    if (this.newUserWork.some(item => item == '')) {
                        this.newUserWorkDanger = 'Қате';
                        this.setNotification('Барлық бағандарды толтырыңыз', 'failer')
                        this.loading = 0;
                        return;
                    }
                    work = this.newUserWork.join(' ');
                }
                if(this.bagyt.o_katysushy_idd == 3 && this.newClassSet == null) {
                    this.newUserClassDanger = 'Қате';
                    this.setNotification('Сыныпты таңдаңыз', 'failer')
                    this.loading = 0;
                    return;
                }


                this.$api.post('/olimpiada/user/create', {
                    bagyt_id: this.bagyt.idd,
                    type_id: this.bagyt.type,
                    name: this.newUserName,
                    fname: this.newUserFname,
                    katysushy_id: this.bagyt.o_katysushy_idd,
                    class: this.newClassSet,
                    nomer: this.newUserNomer,
                    zhetekshi: this.newUsersZhetekshi,
                    o_mekeme: work
                }).then((res) => {
                    this.clearFeedBack()
                    this.newUserNomer++
                    res.data.katysushy.addWork = 0
                    this.o_users.push(res.data.katysushy)
                    this.setNotification('Сәтті сақталды', 'success')
                }).catch((error) => {
                    this.loading = 0
                    const data = error.response.data.errors;
                    this.errorNewUserName = data.name !== undefined ? data.name.join() : null;
                    this.errorNewUserFname = data.fname !== undefined ? data.fname.join() : null;
                    this.setNotification('Барлық бағандарды толтырыңыз', 'failer')
                })
            },
            clearFeedBack() {
                this.loading = 0
                this.addNewUser = 0
                this.newUserName = ''
                this.newUserFname = ''
                this.errorNewUserName = ''
                this.errorNewUserFname = ''
                this.newUserWorkDanger = ''
                this.userWorkDanger = ''
                this.newUserWork = ['', '', '']
                this.newUserWorkCheck = 0
                this.zhetekshiChec = 0
                this.newUsersZhetekshiCheck = 0
                //                this.userWork = ['', '', '']
            },
            moreResults(index) {
                let id = this.o_users[index].idd;
                this.$router.push({
                    name: 'olimpiada-test-id-result',
                    params: {
                        id: id,
                    }
                })
            },
        },
        mounted() {
            var q = this.$route.query.buy
            if (q) this.olimpTolem(q)
        },
    }

</script>


<style scoped lang="scss">
    .zi {
        position: relative;
        z-index: 4;
    }

    .main {
        padding-bottom: 100px;
    }

    .warning{
        display: flex;
        gap: 15px;
        align-items: center;
        padding: 15px 40px 15px 25px;
        background: #FFF4E8;
        border-radius: 6px;
        font-size: 18px;
        font-weight: 400;
        line-height: 21px;
        color: #FF8B0D;
    }
    
    .header {
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
        margin-top: 50px;

        &:first-letter {
            text-transform: uppercase;
        }
    }

    .userBlock {
        border-radius: 10px;
        padding: 30px 30px 50px;
        margin-top: 30px;

        .prev {
            font-size: 18px;
            font-weight: 400;
            line-height: 22px;
            color: #000000;

        }

        .users {
            margin-top: 30px;
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 10px;

            .block {
                position: relative;
                background: #FFFFFF;
                box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08);
                border-radius: 6px;

                .work {
                    color: #888888;
                    position: relative;
                    z-index: 2;
                    margin-top: 5px;

                }

                .body {
                    padding: 15px 20px 15px 60px;

                    .wrap-go {
                        position: relative;
                        z-index: 3;
                        margin-top: 15px;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                        .cst_btn{
                            width: auto;
                            height: 40px;
                            min-width: 180px;
                            padding: 0 27px;
                        }

                    }

                    .input-wrap {
                        display: grid;
                        grid-gap: 10px;
                        position: relative;
                        z-index: 5;

                        &.column-3 {
                            grid-template-columns: 1fr 1fr 1fr;
                        }

                        &.column-2 {
                            grid-template-columns: 1fr 1fr;
                        }

                        &.zindex-7 {
                            z-index: 7;
                        }

                        &.zindex-6 {
                            z-index: 6;
                        }




                        .cst-size-btn {
                            width: 200px;
                            display: grid;
                            height: 40px;
                        }
                    }

                    .wrap {
                        margin-top: 10px;
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: 10px;
                        position: relative;
                        height: 40px;
                        z-index: 3;
                    }

                    .numeric {
                        position: absolute;
                        top: 0;
                        left: 0;
                        border: 1px solid #1E63E9;
                        color: #1E63E9;
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1;
                        .num {
                            transform: translateY(-2px);
                            font-size: 16px;
                            font-weight: 800;
                            line-height: 19px;
                            
                        }
                    }

                    .name {
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 19px;
                        color: #000000;
                        position: relative;
                        z-index: 3;
                    }

                    .wrap-edit {
                        display: flex;
                        gap: 20px;
                        flex-wrap: wrap;
                        margin-top: 15px;
                        position: relative;
                        z-index: 3;
                        align-items: center;

                        .grid {
                            display: inline-grid;
                            grid-template-columns: auto auto;
                            grid-gap: 10px;

                            button {
                                width: 135px;
                                height: 40px;
                            }
                        }

                        .cst_size_btn {
                            width: 100%;
                            max-width: 220px;
                            min-width: 180px;
                            height: 40px;
                            font-size: 12px;
                        }


                        .code {
                            font-size: 14px;
                            font-weight: 300;
                            line-height: 16px;

                            b {
                                font-weight: 600;
                            }
                        }
                    }

                    .name-wrap {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .ball {
                            font-size: 16px;
                            font-weight: 600;
                            line-height: 19px;
                            color: #888888;
                            text-align: right;

                        }
                    }

                    .wrap-zhetekshi {
                        margin-top: 15px;
                        display: grid;
                        grid-template-columns: 180px 240px;
                        grid-template-rows: 40px;
                        grid-gap: 10px;
                        position: relative;
                        z-index: 3;
                    }
                }
            }
        }

        .addNewUser {
            margin-top: 30px;
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            grid-template-areas: 'a b';
            grid-gap: 20px;

            @media all and (max-width: 767px) {
                grid-template-columns: 1fr;
                grid-template-areas: 'b''a';
                justify-items: center;
                padding: 0 20px;

            }

            .cst_size_btn {
                width: 220px;
                height: 40px;
                grid-area: a;

                @media all and (max-width: 767px) {
                    width: 100%;
                    max-width: 280px;

                }

            }

            .info {
                font-size: 16px;
                line-height: 16px;
                color: #888888;
                grid-area: b;

                @media all and (max-width: 767px) {
                    text-align: center;
                }

            }
        }

        &.zhetekshi {
            .user .block .body .wrap-go {}

            .solo-wrap {
                grid-template-columns: 1fr;
                grid-template-rows: 40px;
                position: relative;
                z-index: 3;
            }
        }

    }

    @media all and (max-width: 1099px) {
        .userBlock .users .block .body {
            padding: 15px 20px 20px 60px;
        }
    }

    @media all and (max-width: 991px) {
        .userBlock .users .block .body .wrap-go {
            grid-template-columns: 235px 150px;
        }

        .userBlock .users .block .body .input-wrap .cst-size-btn {
            width: 180px;
            display: grid;
        }

        .header {
            font-size: 22px;
            line-height: 26px;
        }





    }

    @media all and (max-width: 883px) {
        .userBlock .users .block .body .wrap-go {
            grid-template-columns: 1fr;
            grid-template-rows: 40px 40px;
        }

        .userBlock .users .block .body .input-wrap .cst-size-btn {
            width: 120px;
            display: grid;
        }

        .userBlock .users .block .body .name {
            text-align: center;
        }

        .userBlock .users .block .body .wrap-zhetekshi {
            grid-template-columns: 140px 191px;
        }

        .userBlock .users .block .body {
            padding: 15px 20px 25px 60px;
        }

    }

    @media all and (max-width: 767px) {
        .userBlock .users .block .body .input-wrap {
            grid-template-columns: 1fr;
        }

        .userBlock .users .block .body .input-wrap .cst-size-btn {
            width: 100%;
            height: 40px;
        }

        .userBlock .users .block .body .wrap {
            margin-top: 20px;
        }

        .header {
            font-size: 21px;
            line-height: 24px;
        }

        .userBlock .users .block .body .wrap-edit {
            display: grid;
            grid-template-columns: 1fr;
        }

        .userBlock .users .block .body .wrap-edit .code br {
            display: none;
        }

        .userBlock .users .block .body .wrap-zhetekshi {
            grid-template-columns: 1fr;

            button {
                height: 40px;
            }
        }

        .userBlock .users .block .body {
            padding: 15px 20px 30px 60px;
        }

        .userBlock .users .block .body .wrap-edit {
            justify-items: center;
        }

        .userBlock .users .block .body .name-wrap {
            flex-direction: column-reverse;
        }

        .userBlock .users .block .body .name-wrap .ball {
            width: 100%;
        }

        .userBlock .users .block .body {
            padding: 15px 30px 30px 30px;
        }
    }

    @media all and (max-width: 575px) {
        .header {
            font-size: 20px;
            line-height: 24px;
        }

    }

    @media all and (max-width: 500px) {
        .userBlock {
            padding: 30px 20px 50px;
        }

        .userBlock .users .block .body .name {
            margin-top: 30px;
        }

        .userBlock .users .block.edit .body {
            padding: 60px 30px 15px 30px;
        }

        .userBlock .users .block .body .wrap {
            grid-template-columns: 1fr 1fr;
            justify-items: center;
        }

        .cst-ct {
            max-width: 100%;
            padding: 0 0;
        }

        .header {
            margin-top: 40px;
            padding: 0 10px;
        }
    }

    @media all and (max-width: 420px) {
        .userBlock .users .block.edit .body {
            padding: 60px 20px 15px 20px;
        }

        .userBlock {
            padding: 30px 10px 50px;
        }

        .userBlock .users .block .body {
            padding: 15px 20px 30px 20px;
        }
    }

</style>
<style lang="scss">
    .cst_input_40, .cst_input_40 input {
        height: 40px;
    }

    .cst_fix_span_input {
        .danger_message {
            position: relative;
        }
    }

</style>
