const axios = require('axios');
const fs = require('fs');

axios.get('https://example.com/api/data') // Замените на ваш URL или API-эндпоинт для получения данных
  .then(response => {
    // Обработка полученных данных
    const data = response.data;

    // Создание sitemap
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Добавление URL-ов в sitemap
    data.forEach(item => {
      sitemap += `<url>
<loc>${item.url}</loc>
<priority>0.8</priority>
</url>\n`; // Замените на соответствующие поля из полученных данных
    });

    sitemap += '</urlset>';

    // Сохранение sitemap в файл
    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('Sitemap успешно сгенерирован');
  })
  .catch(error => {
    console.error('Ошибка при получении данных:', error);
  });
