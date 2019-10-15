export const StatusMessageEnum = {
  INFO: { value: 1, string: 'info', icon: 'info' },
  WARNING: { value: 2, string: 'warning', icon: 'warning' },
  ERROR: { value: 3, string: 'error', icon: 'error' },
  SUCCESS: { value: 4, string: 'success', icon: 'check' },
};
if (Object.freeze) Object.freeze(StatusMessageEnum);

export const compare = (key = 'name', order = 1) => (a, b) => {
  if (a[key] < b[key]) return -1 * order;
  if (a[key] > b[key]) return 1 * order;
  return 0;
};

export const noop = () => {};

export const listToGroups = (list, key = 'name') => {
  if (!(list || []).length) return [];
  const grouped = list.reduce((result, item) => {
    if (!item) return result;
    const foundItem = result.find(itm => itm[key] === item[key]);
    if (!foundItem) {
      const newItem = {
        [key]: item[key],
        items: [item],
      };
      result.push(newItem);
      return result;
    }
    foundItem.items.push(item);
    return result;
  }, []);
  return grouped;
};

export const flattenItemList = list => {
  console.log('list: ', list);
  return list
    .reduce((acc, val = []) => {
      return [...acc, ...val.items];
    }, [])
    .filter(v => v);
};

export const formattedTechnicianData = data => {
  return (data || [])
    .map(item => ({ value: item.userId, label: item.name }))
    .sort(compare('label'));
};

export const onChange = (object, onChange) => {
  const handler = {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    defineProperty(target, property, descriptor) {
      onChange();
      return Reflect.defineProperty(target, property, descriptor);
    },
    deleteProperty(target, property) {
      onChange();
      return Reflect.deleteProperty(target, property);
    },
  };

  return new Proxy(object, handler);
};
