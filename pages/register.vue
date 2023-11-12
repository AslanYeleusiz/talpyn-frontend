<template>
    <div class="home-elem-198">
        <div class="home-elem-197">
            <div class="home-elem-196"> <span class="home-elem-187">
                    <p><strong>Тіркелу</strong></p>
                </span><span class="home-elem-188">
                    <p>Олимпиадаға қатысу үшін тіркеу жасаңыз.</p>
                </span>
                <div class="home-elem-193">
                    <div class="home-elem-192">
                        <cstInput v-model="form.username" type-name="text" string-name="Аты:" string-placeholder="Атыңызды енгізіңіз" class="mt-15" :danger="errors.username" :dangerText="errors.username" @click.native="errors.username = null" />
                    </div>
                    <div class="home-elem-190">
                        <cstInput v-model="form.tel_num" type-name="text" name-wrap="tel_num" string-name="Телефон нөмірі:" string-placeholder="+7 (7__) - ___ - __ - __" class="mt-15" :danger="errors.tel_num" :dangerText="errors.tel_num" @click.native="errors.tel_num = null" v-on:keyup.enter.native="checkPhone" />
                    </div>
                    <div class="home-elem-190">
                        <cstPasswordInput v-model="form.password" type-name="password" name-wrap="password" string-name="Құпиясөз:" string-placeholder="•••••••••••••••••" :danger="errors.password" :dangerText="errors.password" @click.native="errors.password = null" class="mt-15" />
                    </div>
                    <div class="home-elem-190">
                        <cstPasswordInput v-model="form.password_confirmation" type-name="password" name-wrap="password" string-name="Құпиясөз қайталап жазыңыз:" string-placeholder="•••••••••••••••••" :danger="errors.password_confirmation" :dangerText="errors.password_confirmation" @click.native="errors.password_confirmation = null" class="mt-15" />
                    </div>
                    
                    
                </div>
                <button @click="register()" class="home-elem-194">
                    <p>Жазылу</p>
                </button>
                <span class="home-elem-188 mt-4">
                    <p>Тіркелдіңіз бе? <nuxt-link to="/login">Жүйеге кіру</nuxt-link>
                    </p>
                </span>
            </div>
        </div>
    </div>
</template>


<script>
    //import Header from '@/components/Header.vue'
    import cstInput from '@/components/forms/cstInput.vue'
    import cstPasswordInput from '@/components/forms/cstPasswordInput.vue'
    export default {
        components: {
            //Header,
            cstInput,
            cstPasswordInput,
        },
        data() {
            return {
                form: {},
                errors: {
                    username: null,
                    phone: null,
                    password: null,
                    password_confirmation: null,
                },
            }
        },
        layout: 'second',
        methods: {
            login() {
                this.$auth.options.redirect = false
                this.$auth.loginWith('laravelJWT', {
                    data: {
                        tel_num: this.form.tel_num,
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
            register() {
                this.loading = 1
                this.$api.$post('/auth/register', {
                    username: this.form.username,
                    tel_num: this.form.tel_num,
                    password: this.form.password,
                    password_confirmation: this.form.password_confirmation,
                }).then((e) => {
                    this.form = {
                        tel_num: this.form.tel_num,
                        password: this.form.password,
                    }
                    this.login()
                }).catch((err) => {
                    this.loading = 0
                    console.log(err.response);
                    const data = err.response.data.errors;
                    for (let [key, value] of Object.entries(this.errors)) {
                        this.errors[key] = data[key] !== undefined ? data[key].join() : null;
                    }
                    console.log(this.errors)
                });
            },
        }

    }

</script>
