import jwt from "jsonwebtoken";

// wants the like post
// clicks like button => auth middleware(next) will check if he has permissions to like =>
// if permission granted like controller will be triggered and can also deny!

const auth = async (req , res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      const customToken = token.length < 500;
      let decodedData;
      if (token && customToken) {
          decodedData = jwt.verify(token, 'test');
          req.userId = decodedData?.id;
      } else {
          decodedData = jwt.decode(token);
          req.userId = decodedData?.sub;
      }
      next();
  } catch (error) {
      console.log(error);
  }
}
export default auth;