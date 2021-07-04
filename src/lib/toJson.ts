function toJSON<T>(payload: T[]): T[] {
  // return payload.map((value) => {
  //   const parsed = Object.keys(value).reduce((obj, key) => {
  //     if (value[key] instanceof Date) obj[key] = String(value[key]);
  //     return obj;
  //   }, {});
  //   return parsed;
  // });

  return payload.map((value) => {
    for (const key in value)
      if (value[key] instanceof Date)
        value[key] = String(value[key]) as unknown as T[Extract<
          keyof T,
          string
        >];

    return value;
  });
}

export default toJSON;
