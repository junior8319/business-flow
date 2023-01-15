import { Op } from "sequelize";
import OrderModel from "../database/models/Order.model";
import IOrder from "../interfaces/IOrder";
import ProviderModel from '../database/models/Provider.model';
import BuyerModel from '../database/models/Buyer.model';

class OrdersService {
  static model: IOrder;

  public id!: number;

  constructor() {
    OrdersService.model = new OrderModel();
  }

  public getOrders = async (): Promise<IOrder[] | null> => {
    const ordersList = await OrderModel.findAll({
      include: [
        { model: ProviderModel, as: 'provider' },
        { model: BuyerModel, as: 'buyer' },
      ],
    });
    if (!ordersList) return null;

    return ordersList.map(orderObject => orderObject.dataValues);
  };

  public getOrderById = async (receivedId: number): Promise<IOrder | null> => {
    this.id = receivedId;
    const order = await OrderModel.findByPk(this.id);
    if (!order) return null;

    return order;
  };

  static existsOrder = async (receivedOrder: IOrder): Promise<boolean> => {
    const {
      orderNumber,
      orderPath,
      orderFileName,
      orderOriginalName,
    } = receivedOrder;
    const order = await OrderModel.findOne({
      where: {
        [Op.or]: [
          { orderNfId: (orderNumber) ? orderNumber : null },
          { orderPath: (orderPath) ? orderPath : null },
          { orderFileName: (orderFileName) ? orderFileName : null },
          { orderOriginalName: (orderOriginalName) ? orderOriginalName : null },
        ],
      },
    });


    const exists = !!order;

    return exists;
  };

  public createOrder = async (receivedOrder: IOrder): Promise<IOrder | null> => {
    if (!receivedOrder) return null;

    const orderExists = await OrdersService.existsOrder(receivedOrder);
    if (orderExists) return null;

    const newOrder = await OrderModel.create({ ...receivedOrder });
    if (!newOrder) return null;

    return newOrder.dataValues;
  };

  public updateOrder = async (receivedOrder: IOrder): Promise<IOrder | null> => {
    if (!receivedOrder || !receivedOrder.id) return null;

    this.id = receivedOrder.id;
    const orderToUpdate = await OrderModel.findByPk(this.id);
    if (!orderToUpdate) return null;

    if (
      receivedOrder.orderNfId ||
      receivedOrder.orderPath ||
      receivedOrder.orderFileName ||
      receivedOrder.orderOriginalName
    ) {
      const alreadyExists = await OrdersService.existsOrder(receivedOrder);
      if (alreadyExists) return null;
    };

    await orderToUpdate.update(receivedOrder);

    return orderToUpdate.dataValues;
  };

  public excludeOrder = async (receivedId: number): Promise<IOrder | null> => {
    if (!receivedId) return null;

    this.id = receivedId;

    const orderToExclude = await OrderModel.findByPk(this.id);
    if (!orderToExclude) return null;

    await orderToExclude.destroy();

    return orderToExclude.dataValues;
  };
}

export default OrdersService;
