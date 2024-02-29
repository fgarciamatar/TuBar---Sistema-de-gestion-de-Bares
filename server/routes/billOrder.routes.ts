import { Router } from 'express';
import { checkRole, protect } from '../middlewares';
import {
  addOrderInBillOrderForBar,
  createBillOrderForBar,
  getBillOrdersForBar,
  payBillOrder,
  getBillOrderForBar,
} from '../controllers/billOrder.controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Factura
 *  description: Endpoints para las Facturas del bar
 */

router.use(protect(['profileSession']));

/**
 * @swagger
 * /bill-orders:
 *  get:
 *    tags: [Factura]
 *    summary: Obtener las facturas del Bar, requiere sesion del perfil
 *    description: Endpoint para listar los facturas creados en el bar
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/productsResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */

router.get('/', getBillOrdersForBar);
router.use(checkRole(['ADMIN']));
/**
 * @swagger
 * /bill-orders/table/{tableId}:
 *  post:
 *    tags: [Factura]
 *    summary: Crear una factura para el Bar, requiere sesion del perfil
 *    description: Endpoint para crear facturas en el bar
 *    parameters:
 *       - name: tableId
 *         in: path
 *         description: Id de la tabla
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/billOrderGeneral"
 *    responses:
 *       '200':
 *         description: Producto creado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/productResponse"
 *       '400':
 *         description: No se pudo crear la factura. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta.
 *       '404':
 *         description: No se encontró ninguna categoria con el ID especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.post('/table/:tableId', createBillOrderForBar);

/**
 * @swagger
 * /bill-orders/{billOrderId}:
 *  get:
 *    tags: [Factura]
 *    summary: Optener una factura del Bar, requiere sesion del perfil
 *    description: Endpoint para obtener una factura del bar
 *    parameters:
 *       - name: billOrderId
 *         in: path
 *         description: Id de la factura
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '200':
 *         description: Producto editado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/productResponse"
 *       '400':
 *         description: No se pudo editar el producto. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ningun producto con el ID especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.patch('/:billOrderId', getBillOrderForBar);

/**
 * @swagger
 * /bill-orders/{billOrderId}/addOrder:
 *  patch:
 *    tags: [Factura]
 *    summary: Agregar ordenes en la factura del bar, requiere sesion del perfil
 *    description: Endpoint para agregar ordenes en la factura del bar
 *    parameters:
 *       - name: billOrderId
 *         in: path
 *         description: Id de la factura
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/billOrderGeneral"
 *    responses:
 *       '204':
 *         description: Producto eliminado exitosamente.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna producto con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.patch('/:billOrderId/addOrder', addOrderInBillOrderForBar);

/**
 * @swagger
 * /bill-orders/{billOrderId}/pay:
 *  patch:
 *    tags: [Factura]
 *    summary: Marcar como pagado la factura del bar, requiere sesion del perfil
 *    description: Endpoint para marcar la factura del bar
 *    parameters:
 *       - name: billOrderId
 *         in: path
 *         description: Id de la factura
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '204':
 *         description: Producto eliminado exitosamente.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna producto con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.patch('/:billOrderId/pay', payBillOrder);

export default router;
