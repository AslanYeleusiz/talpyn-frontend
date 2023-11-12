<template>
    <div :class="{danger: danger}">
        <label :for="nameWrap">{{stringName}}</label>
        <div class="input">
            <input v-model="inputVal" :type="passwordFieldType" :id="nameWrap" :name="nameWrap" class="form-control" :placeholder="stringPlaceholder">
            <div @click.prevent="openPassword" class="btn visibleBtn">
                <img v-show="passwordFieldType=='password'" src="~assets/images/eye-slash.png" alt="">
                <img v-show="passwordFieldType=='text'" src="~assets/images/eye_materials.svg" alt="">
            </div>
        </div>
        <span v-if="danger" class="danger_message">{{dangerText}}</span>
    </div>
</template>


<script>
    export default {
        props: ['stringName', 'stringPlaceholder', 'nameWrap', 'value','danger','dangerText'],
        data() {
            return {
                passwordFieldType: "password",
                inputVal: this.value
            }
        },
        methods: {
            openPassword() {
                this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
            }
        },
        watch: {
            inputVal(val) {
                this.$emit('input', val);
            }
        }
    }

</script>


<style scoped lang="scss">
    label{
        font-family: Raleway;
font-size: 16px;
font-weight: 400;
line-height: 23px;
        color: #888888;

    }
    .mb{
        margin-bottom: 15px;
    }
    input {
        border: 1px solid #C7C7C7;
        background: #FAFAFA;
        border-radius: 6px;
        height: 50px;

        &:placeholder {
            color: #888888;
        }

        &:focus {
            background: #ffffff;

            &::placeholder {
                color: #ffffff;
            }
        }

        &:nth-child(2) {
            margin-bottom: 15px;
        }
    }
    .danger input{
        border: 1px solid #dc3545;
    }
    .danger_message{
        font-family: 'Raleway';
        font-size: 12px;
        font-weight: 400;
        line-height: 19px;
        position: absolute;
        line-height: 13px;
        transform: translateY(2px);
        color: #dc3545;
    }
    .visibleBtn {
        position: absolute;
        img{
            width: 24px;
            height: 24px;
        }
    }

    .input {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

</style>
