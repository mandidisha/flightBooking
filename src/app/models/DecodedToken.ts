interface DecodedToken {
  _id: string,
  isAdmin: boolean,
  isSecondFactorAuthenticated: boolean,
  confirmationToken: string,
}

export default DecodedToken;
