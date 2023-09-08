module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8",
                "last 10 versions",
            ]
        },
        "postcss-pxtorem": {
            rootValue: 16,
            propList: ["*"],
            unitPrecision: 5,
            selectorBlackList: ['.no_rem'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 1,
        },
    },
};