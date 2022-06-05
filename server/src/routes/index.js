const express = require("express");

//instantiate express module here
const router = express.Router();

// Controller
const {
  updateProfile,
  getProfile,
  userReg,
  userLog,
  checkAuth,
  getProduct,
  addProduct,
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
  updateRating
} = require("../controllers");

//middleware auth
const {auth} = require('../middlewares/auth')
const {uploadFile} = require('../middlewares/fileUpload')

// Route reg
router.post("/register", userReg);
router.post("/login", userLog);
router.get("/check-auth",auth, checkAuth);
// Route product
router.post("/product",auth,uploadFile("image"), addProduct);
router.get("/products",auth, getProducts);
router.get("/product/:id",auth, getProduct);
router.patch("/product/:id",auth,uploadFile("image"), updateProduct);
router.delete("/product/:id",auth, deleteProduct);
// Route transaction
router.post("/transaction",auth, addTransaction);
router.get("/transactions/:id", auth, getTransactions);
// Route category
router.post("/category",auth, addCategory);
router.get("/categories",auth, getCategories);
router.get("/category/:id",auth, getCategory);
router.patch("/category/:id",auth, updateCategory);
router.delete("/category/:id",auth, deleteCategory);

// Route profile
router.get("/profile/:id",auth, getProfile);
router.patch("/profile/:id",auth, updateProfile);

//Route Rating
router.get("/rating/:id",auth,getRating)
router.patch("/rating/:id",auth,updateRating)
//route CRUD
// router.get('/users', getUsers)
// router.get('/user/:id', getUser)
// router.patch('/user/:id', updateUser)
// router.delete('/user/:id', deleteUser)

//route todo
// router.get("/todos", getTodos);
// router.get("/todo/:id", getTodo);
// router.post("/todo", addTodo);
// router.patch("/todo/:id", updateTodo);
// router.delete("/todo/:id", deleteTodo);

module.exports = router;
