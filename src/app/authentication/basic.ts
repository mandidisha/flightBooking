import BasicAuth from 'express-basic-auth';

const auth = (userName: string, password: string, challenge: boolean) => BasicAuth({
  users: {
    [userName]: password,
  },
  challenge,
});

export default auth;
