<template>
    <div class="materials">
        <div class="cst-ct">
           <div class="h">Материалдар</div>
            <ul class="list-group mt-5 text-white">
                <a v-for="material in materials" :href="$store.state.apiUrl + '/storage/files/materials/' + material.file">
                    <li class="list-group-item d-flex justify-content-between align-content-center">
                        <div class="d-flex flex-row">
                            <img src="https://img.icons8.com/color/100/000000/folder-invoices.png" width="40" />
                            <div class="ml-2">
                                <h6 class="mb-0">{{material.name}}</h6>
                                <div class="about">
                                    <span v-html="material.description"></span>
                                    <span>{{material.date}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="check">
                            <input type="checkbox" name="a">
                        </div>
                    </li>
                </a>
            </ul>
        </div>
    </div>
</template>


<script>
    //import Header from '@/components/Header.vue'
    export default {
        components: {
            //Header,
        },
        async asyncData({
            $axios
        }) {
            let res = await $axios.$get('/materials')
            return {
                materials: res
            }
        },
        
    }

</script>

<style lang="scss" scoped>
    .h {
        font-size: 28px;
        line-height: 32px;
        font-weight: 600;
        text-align: center;
    }
    .materials {
        padding: 30px 0 150px;

        .list-group-item {
            margin-top: 10px;
            border-radius: none;
            background: #5E35B1;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
        }


        .list-group-item:hover {
            transform: scaleX(1.1);
        }



        .check {
            opacity: 0;
            transition: all 0.6s ease-in-out;
        }

        .list-group-item:hover .check {
            opacity: 1;

        }

        .about span {
            font-size: 12px;
            margin-right: 10px;

        }

        input[type=checkbox] {
            position: relative;
            cursor: pointer;
        }

        input[type=checkbox]:before {
            content: "";
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            top: 0px;
            left: 0;
            border: 1px solid #10a3f9;
            border-radius: 3px;
            background-color: white;

        }

        input[type=checkbox]:checked:after {
            content: "";
            display: block;
            width: 7px;
            height: 12px;
            border: solid #007bff;
            border-width: 0 2px 2px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
            position: absolute;
            top: 2px;
            left: 6px;
        }

        input[type="checkbox"]:checked+.check {
            opacity: 1;
        }
    }

</style>
