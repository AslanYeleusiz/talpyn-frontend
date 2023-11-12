<template>
    <header>
        <div class="main_header" :class="{pd:pd}">
            <div class="cst-ct d-flex a-c j-b">
                <div class="d-flex a-c">
                    <gotoBackBtn @click.native="gotoBack" />
                    <div class="kroshki d-f a-c gap-10">
                        <template v-for='(head, index) in header'>
                            <span v-if='index>0'> / </span>
                            <span v-if='head.link'>
                                <NuxtLink :to="head.link">{{head.name}}</NuxtLink>
                            </span>
                            <span v-else>{{head.name}}</span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>


<script>
    import gotoBackBtn from '@/components/forms/gotoBackBtn.vue'

    export default {
        components: {
            gotoBackBtn
        },
        props: ['header', 'pd', 'gotoUrl'],
        methods: {
            gotoBack() {
                this.gotoUrl ? this.$router.push(this.gotoUrl) : this.$router.go(-1);
            }
        }
    }

</script>


<style scoped lang="scss">
    .otstup {
        padding-bottom: 66px;

        @media all and (max-width: 767px) {
            padding-bottom: 132px;

            &.pd {
                padding-bottom: 66px;
            }
        }
    }

    .main_header {
        background: #ffffff;
        .kroshki {
            margin-left: 15px;
            line-height: 20px;
            color: #888888;
            a {
                color: #1E63E9;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }

</style>
