const express = require('express');
const { createMenu, getCreateMenuPage, getParentIsNull, getMenuDisplay, updateMenu, deleteMenu, getAllMenu } = require('../controllers/menuController');

const router = express.Router();


router.route("/create-menu").post(createMenu).get(getCreateMenuPage)
router.route("/parent-is-null").get(getParentIsNull)
router.route("/update-menu").put(updateMenu)
router.route("/delete-menu/:id").delete(deleteMenu)
router.route("/menu").get(getMenuDisplay)
router.route("/all-menu").get(getAllMenu)

module.exports = router;    