<template>
    <header :class="{'shd':!$auth.user, 'mx0':$auth.user}">
        <div class="cst-ct d-f a-c j-b header">
            <nuxt-link class="logo" to="/">
                <img src="~/assets/images/logo2.svg" alt="">
            </nuxt-link>
            <template v-if="$auth.user">
                <div class="d-f a-c navs mob">
                    <nuxt-link to="/">Басты бет</nuxt-link>
                    <nuxt-link to="/olimpiada">Олимпиада</nuxt-link>
                    <nuxt-link to="/materials">Кітапхана</nuxt-link>
                </div>
                <div class="auth">
                    <b-dropdown id="dropdown-1" variant="link" toggle-class="text-decoration-none" ref="dropdown" right no-caret>
                        <template #button-content>
                            <div class="d-f a-c right">
                                <span>Кабинет</span>
                                <div :style="{ backgroundImage: `url(${getApiImgUrl($auth.user.img1)})`}" class="avatar"></div>
                                <arrow_bottom />
                            </div>
                        </template>
                        <template>
                            <b-dropdown-item to="/">
                                <div class="d-f a-c gap-10">
                                    <img src="~assets/images/svg/menu_user.svg" alt="">Басты бет
                                </div>
                            </b-dropdown-item>
                            <b-dropdown-item to="/olimpiada">
                                <div class="d-f a-c gap-10">
                                    <img src="~assets/images/svg/menu_nt.svg" alt="">Олимпиада
                                </div>
                            </b-dropdown-item>
                            <b-dropdown-item to="/materials">
                                <div class="d-f a-c gap-10">
                                    <img src="~assets/images/svg/menu_sub.svg" alt="">Кітапхана
                                </div>
                            </b-dropdown-item>
                            <b-dropdown-item @click="logout">
                                <div class="d-f a-c gap-10">
                                    <img src="~assets/images/svg/menu_exit.svg" alt="">Шығу
                                </div>
                            </b-dropdown-item>
                        </template>
                    </b-dropdown>
                </div>
            </template>
            <template v-else>
                <div class="d-f a-c navs">
                    <nuxt-link to="/">Басты бет</nuxt-link>
                    <nuxt-link to="/olimpiada">Олимпиада</nuxt-link>
                    <nuxt-link to="/materials">Кітапхана</nuxt-link>
                    <nuxt-link class="cst_m" to="/login">
                        <cstBtn class="cst_btn" text="Кіру/тіркелу"></cstBtn>
                    </nuxt-link>
                </div>
            </template>
        </div>
    </header>
</template>

<script>
    import cstBtn from '@/components/forms/cstBtn.vue'
    import arrow_bottom from '@/components/svg/arrow_bottom.vue'
    export default {
        components: {
            cstBtn,
            arrow_bottom,
        },
        methods: {
            getApiImgUrl(pet) {
                var images = this.$store.state.apiUrl + '/storage/files/images/avatars/' + pet;
                return images;
            },
            logout() {
                this.$auth.logout();
            },
        }

    }

</script>
<style lang="scss" scoped>
    header {
        position: relative;
        z-index: 5;
        .logo img {
            width: 150px;
        }

        &.shd {
            box-shadow: 0px 4px 34px 0px #00000026;
        }
        &.mx0{
            .cst-ct {
                max-width: 100% !important;
                padding: 0 65px 0 75px;
            }
        }
    }

    .header {
        height: 80px;
    }

    .navs {
        gap: 5px;

        a {
            padding: 10px 15px;
            font-size: 16px;
            line-height: 23px;
            color: inherit;

            &:hover {
                color: #1943B8;
                text-decoration: underline;
            }
        }

        a.cst_m {
            margin-left: 40px;
            padding: 0;
        }

        .cst_btn {
            padding: 14px 20px;
        }
    }

    .right {
        font-size: 16px;
        font-weight: 500;
        line-height: 19px;
        letter-spacing: 0.02em;
        gap: 10px;
        text-decoration: none;
        color: #252525;

        &:hover {
            color: #252525;
            text-decoration: none;

        }

        .avatar {
            width: 30px;
            height: 30px;
            border-radius: 100%;
            border: 2px solid #D5CFE8;
            background-size: cover;
            background-position: 50% 50%;
        }

        svg {
            stroke: #D5CFE8;
        }

    }

    @media all and (max-width: 980px) {
        .navs .cst_m {
            margin-left: 20px;
        }
        .navs.mob {
            display: none;
        }
    }

    @media all and (max-width: 800px) {
        .navs a {
            display: none;
        }

        .navs .cst_m {
            display: block;
            margin-left: 0;
        }
    }

    @media all and (max-width: 620px) {
        .header {
            height: 60px;
        }

        .navs .cst_btn {
            padding: 10px 20px;
        }
        header.mx0 .cst-ct {
            padding: 0 15px 0 30px;
        }
        
    }

</style>
