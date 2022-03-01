/**
  Events Route
  /api/events
 */
const { Router } = require("express");
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getEventos,
  crearEvento,
  eliminarEvento,
  actualizarEvento,
} = require("../controllers/events");

router.use(validarJWT);
router.get("/", getEventos); //si quisiera esta ruta publica solo tendria que subirla antes del router.use...

router.post(
  "/",
  [
    check("title", "titulo es obligatorio").not().isEmpty(),
    check("start", "fecha inicio es obligatoria").custom(isDate),
    check("end", "fecha final es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
router.put(
  "/:id",
  [
    check("title", "titulo es obligatorio").not().isEmpty(),
    check("start", "fecha inicio es obligatoria").custom(isDate),
    check("end", "fecha final es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);
router.delete("/:id", eliminarEvento);

module.exports = router;
