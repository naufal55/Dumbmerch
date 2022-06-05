// const { userReg,userLog } = require("./user");
const { userReg,userLog, checkAuth } = require("./auth");
const { getTransactions, addTransaction } = require("./transaction");
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require("./category");
const {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./product");
const { getProfile,updateProfile } = require("./profile");
const { getRating, updateRating } = require("./rating");

module.exports = {
  updateProfile,
  getProfile,
  userReg,
  userLog,
  checkAuth,
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addTransaction,
  getTransactions,
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getRating,
  updateRating,
};
