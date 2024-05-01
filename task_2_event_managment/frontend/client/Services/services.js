import  calApi  from "./api";
async function RegistrationFunc(body){
    return await  calApi("post","http://localhost:3000/registerUser",body);
}
async function LoginFunc(body){
    return await  calApi("post","http://localhost:3000/loginUser",body);
}

async function VerifyTokenFunc(body){
    console.log('servive='+body)
    return await  calApi("post","http://localhost:3000/verifyToken",body);
}


async function CreatePostFunc(body){

    return await  calApi("post","http://localhost:3000/createPost",body);
}

async function FetchPostFunc(body){
    return await  calApi("post","http://localhost:3000/fetchPosts",body);
}

async function addInterestFunc(body){
    return await  calApi("post","http://localhost:3000/addInterest",body);

}


async function fetchInterestFunc(body){
    return await  calApi("post","http://localhost:3000/fetchInterest",body);

}



export {VerifyTokenFunc,fetchInterestFunc,addInterestFunc,RegistrationFunc,LoginFunc,CreatePostFunc,FetchPostFunc, };
