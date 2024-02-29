import { BillOrderProps } from '../interfaces';
import { BillOrderService } from '../services';
import { catchAsync } from '../utils';

const billOrderService = new BillOrderService();

const getBillOrdersForBar = catchAsync(async (_req, res) => {
  const { profileSession } = res.locals;
  const billOrders = await billOrderService.findBillOrdersForBar(
    profileSession.barId
  );
  res.status(200).json({ status: true, billOrders });
});
const getBillOrderForBar = catchAsync(async (req, res) => {
  const { billOrderId } = req.params;
  const { profileSession } = res.locals;
  const billOrder = await billOrderService.findBillOrderForBarOr404(
    +billOrderId,
    profileSession.barId
  );
  res.status(200).json({ status: true, billOrder });
});

const createBillOrderForBar = catchAsync(async (req, res) => {
  const { body } = req;
  console.log('body', req.params);
  const tableId = +req.params.tableId;
  const { profileSession } = res.locals;
  const billOrderBody: BillOrderProps = {
    tableId,
    profileId: profileSession.id,
  };
  const billOrder = await billOrderService.createBillOrderForBar(
    profileSession.barId,
    billOrderBody,
    body
  );
  res.status(200).json({ status: true, billOrder });
});

const addOrderInBillOrderForBar = catchAsync(async (req, res) => {
  const { body, params } = req;
  const { profileSession } = res.locals;
  const { billOrderId } = params;
  const billOrder = await billOrderService.addOrderInBillOrderForBar(
    +billOrderId,
    profileSession.barId,
    body
  );
  res.status(200).json({ status: true, billOrder });
});

const payBillOrder = catchAsync(async (req, res) => {
  const { billOrderId } = req.params;
  const { profileSession } = res.locals;
  const billOrder = await billOrderService.payBillOrder(
    +billOrderId,
    profileSession.barId
  );
  res.status(200).json({ status: true, billOrder });
});

export {
  getBillOrdersForBar,
  createBillOrderForBar,
  addOrderInBillOrderForBar,
  payBillOrder,
  getBillOrderForBar,
};
