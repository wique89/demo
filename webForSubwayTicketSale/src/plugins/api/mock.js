import MockAdapter from "axios-mock-adapter";

const responses = [
  ["GET", "foo", 200, { foo: "bar" }],
  ["POST", "bar", 200],
  ["PUT", "baz", 200]
];

export default api => {
  let mocker = new MockAdapter(api);

  mocker.onAny().reply(config => {
    const [method, url, ...response] = responses.shift();
    if (config.url === url && config.method.toUpperCase() === method)
      return response;
    return [500, {}];
  });

  return mocker;
};
