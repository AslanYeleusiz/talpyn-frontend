<template>
    <div class="form-input" :class="{oval:type==1}">
        <input v-model="inputVal" type="checkbox" class="cst_checkbox" :id="idName" true-value=1 false-value=0>
        <label :for="idName">{{text}}</label>
    </div>
</template>

<script>
    export default {
        props: ['value', 'text', 'idName', 'type'],
        data() {
            return {
                inputVal: this.value
            }
        },
        watch: {
            inputVal(val) {
                console.log(val)
                this.$emit('input', val);
                this.$emit('change');
            }
        }

    }

</script>

<style scoped lang="scss">
    .form-input {
        display: flex;
        align-items: center;

        &.oval {
            label {
                font-size: 14px;
                font-weight: 600;
                line-height: 16px;
                color: #888888;
            }
            .cst_checkbox{
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
            .cst_checkbox:checked {
                background-color: #03B113;
                border: 2px solid #03B113;
                &+label {
                    color: #000000;
                }
            }
        }
    }

    .cst_checkbox {
        width: 24px;
        height: 24px;
        background-color: white;
        border-radius: 6px;
        vertical-align: middle;
        border: 2px solid #888888;
        appearance: none;
        -webkit-appearance: none;
        outline: none;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }

    .cst_checkbox:checked {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
        background-color: #0045CB;
        background-size: 18px;
        border: 2px solid #0045CB;

        &+label {
            color: #0045CB;
        }
    }

    label {
        font-size: 16px;
        font-weight: 500;
        line-height: 19px;
        color: #888888;
        cursor: pointer;
        margin: 0;
        padding-left: 10px;
        display: block;
    }

</style>
