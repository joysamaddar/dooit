import { makeVar } from "@apollo/client";

const userVar = makeVar({
  _id: null,
  username: null,
});

export default userVar;
