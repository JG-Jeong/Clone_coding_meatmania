const PostsRepository = require("../repository/posts");

class PostsService {
    postsRepository = new PostsRepository();
    
    createProduct = async(title,option,amount,cost,item,content,origin,deadline,imgUrl) => {
        try{
        await this.postsRepository.createProduct(
            title,option,amount,cost,item,content,origin,deadline,imgUrl
        )
        // if(title==='' || option==='' || amount==='' || cost==='' || item==='' || content==='' || origin==='' || deadline==='' || imgUrl===''){
        //     throw { message : "올바른 형식으로 입력해주세요"}
        // }
        return;
        }catch(e){
            throw {message:"경로 요청이 잘못되었습니다."}
        }
    }
    
    findAllProduct = async() => {
        try{
        const findAllProduct = await this.postsRepository.findAllProduct();
        return findAllProduct;
        }catch(e){
            throw { message: "요청 양식이 잘못되었습니다."}
        }
    }
    
    findOneProduct = async(postId) => {
        try{
        const findOnePost = await this.postsRepository.findOneProduct(postId);
        return findOnePost
        }catch(e){
            throw { message: "경로요청이 잘못되었습니다."}
        }
    }

    // updateProduct = async( amount,postId, userId) => {
    //     try{
    //     const updateProduct = await this.postsRepository.updateProduct(amount, postId, userId);
    //     return updateProduct
    //     }catch(e){
    //         throw { message : "경로 요청이 잘못되었습니다."}
    //     }
    // }

    deleteProduct = async(postId) => {
        try{
        await this.postsRepository.deleteProduct(postId);
        return
        }catch(e){
            throw { message : "경로요청이 잘못되었습니다."}
        } 
    }
}

module.exports = PostsService;