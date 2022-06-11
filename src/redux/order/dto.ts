import { IOrderOutput, IPaymentStatus } from '../../libs/apis/order/types';

const mappingStatus = (status: IPaymentStatus) => {
  if (status === IPaymentStatus.Pending) {
    return 'Chưa thanh toán';
  }
  if (status === IPaymentStatus.Success) {
    return 'Đã thanh toán';
  }
  if (status === IPaymentStatus.Rejected) {
    return 'Lỗi thanh toán';
  }
  return '';
};

export const transfromOrderHistory = (item: IOrderOutput[]) => {
  return item.map((item, i) => {
    return {
      stt: i + 1,
      id: item?.id ?? '',
      createdAt: item?.createdAt ?? new Date(),
      address: `Số điện thoại: ${item.shippingMethod.phoneNumber}(@)Địa chỉ: ${
        item?.shippingMethod.privateHome
      }-${item?.shippingMethod.wards?.name ?? ''}-${
        item?.shippingMethod.district?.name ?? ''
      }-${item?.shippingMethod.province?.name ?? ''}`,
      total: item.totalMoney,
      paymentStatus: mappingStatus(item?.paymentStatus),
      discount: item.discount,
      books: item.orderLines.map((line, i) => {
        return {
          id: line.id,
          thumbnail: line.book[0]?.thumbnail,
          name: line.book[0].name,
          price: line.price,
          author: line.book[0].author,
          quantity: line.quantity,
        };
      }),
    };
  });
};
