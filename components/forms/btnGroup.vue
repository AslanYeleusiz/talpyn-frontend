<template>
    <div class="btn-group" :class="{danger:danger}" v-click-outside="hide">
        <button type="button" class="btn myBtn" :class="{active: isOpen, soup: type==2, oval: type>=3, white: type==4, isActive:active!=null||isActive!=null}" data-bs-toggle="dropdown" aria-expanded="false" @click="openedMenu">
            <template v-if="isActive!=null">
                {{category[isActive] ? category[isActive].name : 'Жүктелуде...'}}
            </template>
            <template v-else-if='active!=null'>
                {{category[active] ? category[active].name : 'Жүктелуде...'}}
            </template>
            <template v-else>
                {{placeholder}}
            </template>
            <arrowLeft />
        </button>
        <ul v-show="isOpen" class="dropdown-menu">
            <li v-if="!category.length || loading" class="dropdown-item text-center">
                <b-spinner variant="primary"></b-spinner>
            </li>
            <template v-else>
                <li v-for='(cat, index) in category'><a class="dropdown-item" @click="sendRes(index)">{{cat.name}}</a></li>
            </template>
        </ul>
    </div>
</template>


<script>
    import ClickOutside from 'vue-click-outside'
    import arrowLeft from '@/components/svg/arrowLeftCopy.vue'

    export default {
        components: {
            arrowLeft
        },
        data() {
            return {
                isOpen: false,
                isActive: null,
            }
        },
        props: ['category', 'placeholder', 'type', 'active', 'danger', 'loading'],
        methods: {
            openedMenu() {
                this.isOpen ? this.isOpen = false : this.isOpen = true
                this.$emit('clearDanger')
            },
            hide() {
                this.isOpen = false
            },
            sendRes(e) {
                this.isActive = e;
                this.$emit('entered-category', this.isActive);
                setTimeout(() => {
                    this.hide()
                }, 150)
            }
        },
        directives: {
            ClickOutside
        },

    }

</script>


<style scoped lang="scss">
    * {
        font-family: Raleway;
        font-size: 14px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
    }

    .dropdown-menu {
        display: block;
    }

    .danger .myBtn {
        border: 1px solid #dc3545;
    }

    .myBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #F3F3F3;
        border: 1px solid #D6D6D6;
        border-radius: 6px !important;
        padding: 0 15px 0 20px;
        height: 100%;
        max-height: 50px;

        svg {
            width: 16px;
            height: 16px;
            transform: rotate(-90deg);
            stroke: #000;
        }

        &.soup {
            width: 160px;
            height: 40px;
            background: #FFFFFF;
            border: 0.5px solid #F0F0F0;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
            border-radius: 40px !important;
            color: #888888;

            &.active,
            &:active,
            &:focus {
                border: 1px solid #ffffff;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.075) !important;
            }
        }

        &.oval {
            height: 40px;
            border-radius: 20px !important;
            border: none;
            background: #F8F8F8;

            svg {
                margin-left: 6px;
            }

            &.active,
            &:active,
            &:focus {
                border: none;
                box-shadow: none !important;
            }
        }

        &.isActive {
            background: #0045CB !important;
            color: #ffffff;

            svg {
                stroke: #ffffff;
            }
        }

        &.white {
            border: 1px solid #D6D6D6;
            background: #FFFFFF;
            height: 100%;
            border-radius: 30px !important;
        }

        svg {
            transition: 0.15s;
        }

        &.active {
            border: 1px solid #0045CB;

            svg {
                transform: rotate(90deg) scale(1, -1);
            }
        }
    }

    .dropdown-menu {
        width: 260px;
        max-height: 240px;
        overflow-y: scroll;
        padding: 0 10px 0 10px;

        @media all and (max-width: 693px) {
            width: 100%;
        }

        .dropdown-item {
            padding: 15px 20px;
            transition: 0.05s;
            border-bottom: 1px solid #D6D6D6;
            white-space: normal;

            &:hover {
                background: #0045CB;
                color: #ffffff;
                cursor: pointer;
            }
            &.text-center:hover{
                background: white;
                cursor: default;
            }
            .spinner-border{
                width: 1.2rem;
                height: 1.2rem;
            }
        }

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: #F0F0F0;
        }

        &::-webkit-scrollbar-thumb {
            background: #888888;
            border-radius: 30px;
        }
    }

</style>
