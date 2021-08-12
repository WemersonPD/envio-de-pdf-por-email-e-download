const { Router } = require("express");
const router = Router();

const HANDLERS = {
  download: require("./handlers/download"),
};

router.get("/download", HANDLERS.download);

module.exports = router;
