export const isAdmin = (req,res,next)=>{
  
    const user = req.session.user;
    if(user&&user.isAdmin === true){
        next()
    }else{
        return res.status(403).send({
            success: false,
            message: 'Access denied: Admins only'
        });
    }

}