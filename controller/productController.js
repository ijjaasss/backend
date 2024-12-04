import productsMode from "../models/productsMode.js"
import userModel from "../models/userModel.js";

export const productsFind =async (req,res)=>{
    try {
        const products=await productsMode.find({})
        if (!products.length) {
            return res.status(404).json({ message: 'No products found' });
          }
          res.status(200).json(products);
    // res.send(products)
    } catch (error) {
        console.log(error);
        
    }
}

export const cartproduct= async  (req,res)=>{
try {
 const {id}=req.params
const {temp}=req.body
const user =await userModel.findById(id)
if(temp==100){
    user.cart=[]
}else{
    user.cart.push(temp);
}


await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
} catch (error) {
    console.log(error);
    
}
}

export const updateCart=async(req,res)=>{
try {
    const {id}=req.params
    const {temp}=req.body
const user =await userModel.findById(id)
user.cart=temp
await user.save();
res.status(200).json({ message: 'User updated successfully', user });
} catch (error) {
    console.log(error);
    
}
}

export const addToBuy= async (req,res)=>{
    try {
        const {id}=req.params
        const {buy}=req.body
        const user= await userModel.findById(id)
        user.buy=buy
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        
    }
}


export const deleteProduct= async (req,res)=>{
    const { id } = req.params;
    try {
       const deletproduct=await productsMode.findByIdAndDelete(id)
       if(!deletproduct){
        return res.status(404).json({ message: 'product not found' });

       } 
       res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
        console.log(error);
        
    }
}

export const addToProduct = async(req,res)=>{
    const { title, description, price, quntity, image } = req.body;
    const newProduct= new productsMode({
        title,
    description,
    price,
    quntity,
    image,
    })
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); 
      } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product', error });
      }
}

export const editProduct= async(req,res)=>{
  const {id}=req.params
  const { title, description, price, quntity, image } = req.body;
  try {
    const updatedProdect= await productsMode.findByIdAndUpdate(
        id,
        { title, description, price, quntity, image },
        { new: true }
    )
    if(!updatedProdect){
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    
  }
}