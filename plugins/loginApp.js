import Vue from 'vue'
export default ({ auth }, inject) => {
    inject('bus', new Vue())
}
