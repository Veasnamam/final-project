const express = require("express");
const router = express();
const stateController = require("../../controllers/stateController");
const funfactsController = require("../../controllers/funFactsController");

router.route("/").get(stateController.getStates);



router.route("/:state").get(stateController.getState);
router
    .route("/:state/funfact")
    .get(funfactsController.getFunFact)
    .post(funfactsController.createNewFunFact)
    .patch(funfactsController.updateFunFact)
    .delete(funfactsController.deleteFunfact);

router.route("/:state/capital").get(stateController.getStateCapital);
router.route("/:state/nickname").get(stateController.getStateNickname);
router.route("/:state/population").get(stateController.getStatePopulation);
router.route("/:state/admission").get(stateController.getStateAdmission);


module.exports = router;