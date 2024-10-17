const Encoder = {
  encode: (str: string) => {
    // base64
    return btoa(str);
  },
  decode: (str: string) => {
    // base64
    return atob(str);
  },
};

export { Encoder };
