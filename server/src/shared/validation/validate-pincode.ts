export const validatePincode=(value:String)=>{

    var pattern = /^[1-9][0-9]{5}$/;

    if(value.match(pattern))
    {
        return true;
    }
    else
    {
        return false;
    }
}