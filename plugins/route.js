export default ({ app, redirect }) => {
    // В переменной роутс указывайте пути которые не должны входить не авторизованные пользователи

    const routes = [
        'olimpiada',
    ]
    app.router.beforeEach((to, from, next) => {
        console.log(to.name)
        var result = 0
        if(window.innerWidth <= 769)
            app.$bus.$emit('closeMenu')  //закрывается при переходе по ссылкам
        result=0
        const accessToken = app.$auth.strategy.token.get()
        if(!accessToken){
            routes.forEach(el => {
                if(to.name === el){
                    result = 1
                }
            })
            if(!from.name)
                if(result) return redirect('/')
        }
        result ? redirect('/login') : next();
    })
}
