# bank-activity

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```


## Attention
    项目搬迁到 vue cli 后，build 打包时会报错

    ```
     ERROR  Error: CSS minification error: postcss-svgo: TypeError: Cannot read property 'path' of undefined. File: css/chunk-1bfa108b.df136635.css
Error: CSS minification error: postcss-svgo: TypeError: Cannot read property 'path' of undefined. File: css/chunk-1bfa108b.df136635.css
    at C:\Users\hp\bank-activity\node_modules\@intervolga\optimize-cssnano-plugin\index.js:106:21
    ```

    经Google发现是 @vue/cli-service 用到了 cssnano，cssnano 用到了 cssnano-preset-default，cssnano-preset-default用到了 postcss-svgo， postcss-svgo 用到了 svgo@1.1.0 正式出错的包！
    手动安装 svgo@1.1.1 问题得到解决。