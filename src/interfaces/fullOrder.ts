interface FullOrder {
  id?: number;
  userId: number;
  productsIds: (number | undefined)[];
}

export default FullOrder;
