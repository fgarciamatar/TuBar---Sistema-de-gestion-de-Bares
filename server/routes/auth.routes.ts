import { Router } from 'express';
import { logIn, signUp } from '../controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Endpoints
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: [Auth]
 *    summary: Ingreso a la app
 *    description: Endpoint para hacer login en la aplicacion
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/login"
 *    responses:
 *       '200 ':
 *         description: Inicio de sesión exitoso.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/loginResponse"
 *       '401':
 *         description: Credenciales incorrectas. Verifique su usuario y contraseña.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *
 */

router.post('/login', logIn);

/**
 * @swagger
 * /auth/sign-up:
 *  post:
 *    tags: [Auth]
 *    summary: Registro para la app
 *    description: Endpoint para registrar nuevo bar para el ingreso de la aplicacion
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/signUp"
 *    responses:
 *       '201':
 *         description: Bar registrado exitosamente.
 *       '400':
 *         description: | 
 *          No se pudo registrar el Bar. Verifique los datos proporcionados.
 *            - Formato del email incorrecto.
 *       '409':
 *         description: |
 *          Error de restricción única.
 *            - username existente.
 *            - email existente.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *
 */
router.post('/sign-up', signUp);

export default router;
