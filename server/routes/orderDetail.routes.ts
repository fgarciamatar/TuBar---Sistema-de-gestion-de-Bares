import { Router } from 'express';
import { checkRole, protect } from '../middlewares';
import {
  deleteOrderForBar,
  editOrderForBar,
} from '../controllers/orderDetail.controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Pedidos
 *  description: Endpoints para las Pedidos de los productos
 */

router.use(protect(['profileSession']));

router.use(checkRole(['ADMIN', 'EMPLOYEE', 'CHEF', 'SCREEN']));

/**
 * @swagger
 * /order-detail/{id}:
 *  patch:
 *    tags: [Pedidos]
 *    summary: Editar un pedido del Bar, requiere sesion del perfil
 *    description: Endpoint para editar los Pedidos del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id del pedido
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/orderDetailEdit"
 *    responses:
 *       '200':
 *         description: Pedido editado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/OrderDetailReponse"
 *       '400':
 *         description: No se pudo editar el pedido. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ningun pedido con el ID especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.patch('/:id', editOrderForBar);

/**
 * @swagger
 * /order-detail/{id}:
 *  delete:
 *    tags: [Pedidos]
 *    summary: Eliminar un pedido de la factura, requiere sesion del perfil
 *    description: Endpoint para eliminar Pedidos del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id del pedido
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '204':
 *         description: Pedido eliminado exitosamente.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna Pedido con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.delete('/:id', deleteOrderForBar);

export default router;
