import { OrderDetailService } from '../services';
import { catchAsync } from '../utils';

const orderDetailService = new OrderDetailService();

const editOrderForBar = catchAsync(async (req, res) => {
  const { body, params } = req;
  const { profileSession } = res.locals;
  const { id } = params;
  const OrderDetail = await orderDetailService.updateOrderForBar(
    +id,
    profileSession.barId,
    body
  );
  res.status(200).json({ status: true, OrderDetail });
});

const deleteOrderForBar = catchAsync(async (req, res) => {
  const { profileSession } = res.locals;
  const { id } = req.params;
  await orderDetailService.removeOrderForBar(+id, profileSession.barId);
  res
    .status(204)
    .json({ status: true, msg: 'Producto eliminado exitosamente.' });
});

export { editOrderForBar, deleteOrderForBar };
