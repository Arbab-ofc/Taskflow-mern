const httpMocks = require("node-mocks-http");
const { EventEmitter } = require("events");

const invoke = async (
  app,
  { method = "GET", url, body, query, params, headers = {} } = {}
) => {
  return new Promise((resolve, reject) => {
    const request = httpMocks.createRequest({
      method,
      url,
      originalUrl: url,
      headers: {
        "content-type": "application/json",
        ...headers,
      },
      body,
      query,
      params,
      socket: {
        remoteAddress: "127.0.0.1",
      },
    });

    const response = httpMocks.createResponse({
      eventEmitter: EventEmitter,
    });

    response.on("end", () => {
      const raw = response._getData();
      const data =
        typeof raw === "string"
          ? (() => {
              try {
                return JSON.parse(raw);
              } catch {
                return raw;
              }
            })()
          : raw;

      resolve({
        statusCode: response.statusCode,
        body: data,
      });
    });

    response.on("error", reject);

    try {
      app(request, response);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = invoke;
