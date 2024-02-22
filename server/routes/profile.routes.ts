import { Router } from 'express';
import { logIn, protect, signUp } from '../controllers';
import { getProfiles } from '../controllers/profile.controllers';

const router = Router();

router.use(protect(['barSession']));
/**
 * @swagger
 * tags:
 *  name: Perfiles
 *  description: Perfiles endpoints
 */

/**
 * @swagger
 * /profiles:
 *  get:
 *    tags: [Perfiles]
 *    summary: Obtener los perfiles del Bar
 *    description: Endpoint para listar los perfiles creados en el bar
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión para obtener acceso.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */

router.get('/', getProfiles);

export default router;
