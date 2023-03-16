module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@containers": "./src/containers",
            "@components": "./src/components",
            "@services": "./src/services",
            "@models": "./src/models",
            "@helpers": "./src/helpers",
            "@config": "./src/config",
            "@hooks": "./src/hooks",
          },
        },
      ],
    ],
  };
};
