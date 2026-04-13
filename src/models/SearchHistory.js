const mongoose = require("mongoose");

const SearchHistorySchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    keyword: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("SearchHistory", SearchHistorySchema);
