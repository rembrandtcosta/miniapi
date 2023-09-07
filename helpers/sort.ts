export type SortOrder = 'asc' | 'desc';

export function orderBy(collection: any[], properties: string[], orders: SortOrder[]): any[] {
  const propOrders: {key: string, order: SortOrder}[] = properties.map((prop, index) => {
    return { 'key': prop, 'order': orders[index] }
  });

  return collection.sort((a, b) => {
    for (const prop of propOrders) {
      const { key, order } = prop;
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue)
        return order === 'asc' ? -1 : 1;
      if (aValue > bValue)
        return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}
