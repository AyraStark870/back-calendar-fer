/*
  rutas de usuarios / auth
  host + api/auth
*/
const {Router} = require('express')
const router = Router()
const { check } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')


const {
       createUser,
       loginUser,
       revalidateUser
                     } = require('../controllers/controllers')


router.post('/new',
          [
            check('name','el nombre es obligatorio').not().isEmpty(),
            check('email','el email es obligatorio').isEmail(),
            check('password','el password debe tener mas de 5 caracteres').isLength({min:5}),
            validarCampos
          ],
          createUser)
router.post('/',
          [
            check('email','el email es obligatorio').isEmail(),
            check('password','el password debe tener mas de 5 caracteres').isLength({min:5}),
            validarCampos
          ],
           loginUser)
router.get('/renew',validarJWT, revalidateUser)




module.exports=router

