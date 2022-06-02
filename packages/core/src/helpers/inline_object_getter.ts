export function safeGet(obj: Object|undefined, propsArg: Array<any>|Object|string|Symbol, defaultValue: any): string {
  if (!obj) {
    return defaultValue;
  }
  let props;
  let prop;
  if (Array.isArray(propsArg)) {
    props = propsArg.slice(0);
  }
  if (typeof propsArg === 'string') {
    props = propsArg.split('.');
  }
  if (typeof propsArg === 'symbol') {
    props = [propsArg];
  }
  if (!Array.isArray(props)) {
    throw new Error('props arg must be an array, a string or a symbol');
  }
  while (props.length) {
    prop = props.shift();
    if (!obj) {
      return defaultValue;
    }
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    obj = obj[prop];
    if (obj === undefined) {
      return defaultValue;
    }
  }
  return obj as string;
}