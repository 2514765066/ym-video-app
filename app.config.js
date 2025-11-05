export default {
  expo: {
    name: "ym-video",
    slug: "ym-video",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    userInterfaceStyle: "automatic",
    scheme: "ymvideo",
    android: {
      edgeToEdgeEnabled: true,
      package: "com.zhangmingyang.ymvideo",
      jsEngine: "hermes",
      permissions: ["WRITE_SETTINGS", "REQUEST_INSTALL_PACKAGES"],
    },

    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./src/assets/images/icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#191919",
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            buildArchs: ["arm64-v8a"],
          },
        },
      ],
      "expo-sqlite",
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    extra: {
      eas: {
        projectId: "9f8a9d65-a06e-48aa-84d8-96b7c4e78f48",
      },
    },
  },
};
