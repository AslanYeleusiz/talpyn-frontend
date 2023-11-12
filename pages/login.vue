<template>
    <div class="home-elem-198">
        <div class="home-elem-197">
            <div class="home-elem-196"> <span class="home-elem-187">
                    <p><strong>Жүйеге кіру</strong></p>
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
                </div>
                   <button @click="login()" class="home-elem-194">
                    <p>Жазылу</p>
                </button>
                <span class="home-elem-188 mt-4">
                    <p>Тіркелмедіңіз бе? <nuxt-link to="/register">Тіркелу</nuxt-link>
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
            cstPasswordInput,
            cstInput,
        },
        data() {
            return {
                form: {},
                errors: {
                    password: null,
                },
            }
        },
        layout: 'second',
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
                    this.$router.push('/')
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
