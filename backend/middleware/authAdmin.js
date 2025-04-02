import jwt from "jsonwebtoken";

const authAdmin = async(req,res,next) =>{
try {
  const {atoken} = req.headers;
  
  if(!atoken){
    return res.json({success : false , message : "Not authorized admin login again"});
  }

  const tokenDecode = jwt.verify(atoken , process.env.JWT_SECRET);

  if (tokenDecode.email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ success: false, message: "Not authorized. Admin login again." });
  }
  next();
} catch (error) {
  console.log(error);
  return res.json({success : false , message : error.message});
}
}

export {authAdmin}