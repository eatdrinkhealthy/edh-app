const path = require("path");

module.exports = {
  module: {
    loaders: [
      {
        test: /.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"],
        include: path.resolve(__dirname, "../")
      }
    ]
  }
};
