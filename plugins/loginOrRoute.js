import vue from 'vue';
export default ({ app, redirect }, inject) => {
    inject('loginOrRoute', (e)=>{
        if(app.$auth.user){
            if(e) redirect(e);
            else return true;
        }else app.$bus.$emit('openLogin');
    })
}
