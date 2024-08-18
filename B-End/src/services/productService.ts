import productModle from "../models/productModel";
export const getAllProducts = async ()=>{
    return await productModle.find();
};

export const seedInitialProducts = async ()=>{
    const products = [
        {title:"lenovo", image:"https://avatars.mds.yandex.net/get-mpic/1862611/img_id3653734767596878149.jpeg/orig",price:500  ,stock:100}

    ];
    const existingProducts = await getAllProducts();
    if(existingProducts.length === 0){
        await productModle.insertMany(products)
    }

} ;