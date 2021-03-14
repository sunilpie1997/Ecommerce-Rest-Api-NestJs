export const validatePassword=(value:String)=>{

    var pattern=/^[a-zA-Z0-9@#]{8,20}$/;

    if(value.match(pattern))
    {
        return true;
    }
    else
    {
        return false;
    }

}