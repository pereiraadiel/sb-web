const Encoder = {
  encode: (str: string) => {
    // base64
    return Buffer.from(str).toString("base64");
  },
  decode: (str: string) => {
    // base64
    return Buffer.from(str, "base64").toString("utf-8");
  },
};

export { Encoder };
