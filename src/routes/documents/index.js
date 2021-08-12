const { Router } = require("express");
const router = Router();

const HANDLERS = {
  download: require("./handlers/download"),
  email: require("./handlers/email"),
};

router.get("/download", HANDLERS.download);
router.get("/email", HANDLERS.email);

module.exports = router;
