# Сборка и Инфрастуктура

## Второе домашнее задание

Ссылка: [GitHub Pages](https://germanivanov0719.github.io/shri_simple_template/)

### Описание

Это проект приложения на JavaScript, которое представляет собой todo-list (список дел). Приложение позволяет добавлять в список новые элементы и отмечать элементы списка как выполненные.

### Требования

1. **Подключите в проект инструменты для разработки и настройте их запуск через секцию scripts в package.json**

   - [x] `build` — сборка приложения для публикации в production в папку `dist`
   - [x] `start` — запуск локального сервера для разработки
   - [x] `lint:js` — проверка JS кода при помощи [ESLint](https://eslint.org)
   - [x] `lint:css` — проверка CSS кода при помощи [Stylelint](https://stylelint.io)
   - [x] `analyze` — формирование html отчета о сборке при помощи [Statoscope](http://statoscope.tech)
   - [x] `validate` — проверка сборки через Statoscope при помощи конфига из файла `statoscope.config.js`
   - [x] `deploy` — публикация приложения, собранного командой `build`, в GitHub Pages при помощи пакета [gh-pages](https://www.npmjs.com/package/gh-pages)

2. **Настройте автоматическое выполнение действий в CI**

   - [x] при коммитах в открытые PR запускайте сборку и линтеры кода
   - [x] при влитии PR в основную ветку публикуйте текущую версию приложения в GitHub Pages

   В качестве платформы CI используйте [GitHub Actions](https://docs.github.com/en/actions).
