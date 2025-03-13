type User = {
    name:string,
    age:number;
    email:string;
}

type Admin = User & {
    password:string,
}

export {type User,type Admin};