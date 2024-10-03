const timer = (ms: number, callbackFn: Function): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const result = await callbackFn();
      resolve(result);
    }, ms);
  });
};

export default timer;
