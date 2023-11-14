<template>
        <div>
            <div class="otstup"></div>
        <div class="main_header">
            <div class="cst-ct d-flex a-c j-b drop">
                <div class="d-flex overflow">
                    <template v-for="(h, index) in head">
                        <NuxtLink :to="h.link" class="NuxtLink-item" :class="{active: index==active}">
                            {{h.name}}
                        </NuxtLink>
                    </template>
                </div>
                <div class="d-flex a-c free-cert">
                    <NuxtLink to="/olimpiada/test/enter-code">
                        <bigBtn img="key.svg" class="codeBtn" text='Кодты енгізу' />
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="cst-ct ">
            <div class="insert-free-cert">
                <NuxtLink to="/olimpiada/test/enter-code">
                    <bigBtn img="key.svg" class="codeBtn" text='Кодты енгізу' />
                </NuxtLink>
            </div>

        </div>
        </div>
</template>


<script>
    import bigBtn from '@/components/forms/bigBtn.vue'
    import notification from '@/components/svg/notification.vue'
    export default {
        components: {
            bigBtn,
            notification
        },
        props: ['head', 'active']
    }

</script>


<style scoped lang="scss">
    .otstup {
        padding-bottom: 66px;

        @media all and (max-width: 767px) {
            padding-bottom: 132px;
        }
    }

    .main_header {
        font-family: Raleway;
        font-size: 16px;
        font-weight: 500;
        line-height: 19px;
        background: #ffffff;

        .cst-ct {
            height: 100%;

            .d-flex {
                height: 100%;
            }
        }

        .overflow {
            max-width: 100vw;
            overflow-x: scroll;

            &::-webkit-scrollbar {
                height: 0;
            }
        }

        .free-cert {
            .codeBtn {
                width: 240px;
                height: 44px;
            }
        }

        .NuxtLink-item {
            display: flex;
            align-items: center;
            color: #363636;
            height: 100%;
            margin-right: 40px;
            white-space: nowrap;

            &:hover {
                text-decoration: none;
            }
        }

        .NuxtLink-item.active {
            border-bottom: 2px solid #363636;
        }


    }

    .insert-free-cert {
        display: none;
        padding: 20px 10px 30px;
    }

    @media all and (max-width: 991px) {
        .main_header .free-cert {
            display: none !important;
        }

        .insert-free-cert {
            display: block;
        }
    }

</style>
