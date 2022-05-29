const { Router } = require("express");
const router = Router();
const getAllTypes = require("../controllers/typescontroller");

router.get("/", getAllTypes);

module.exports = router;