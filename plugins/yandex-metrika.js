import ym from 'yandex-metrika'

export default ({ app }) => {
  const id = app.$config.yandexMetrikaId

  if (id) {
    ym(id, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    })
  }
}
