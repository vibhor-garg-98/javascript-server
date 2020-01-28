function validateEmail(email)
{
    const re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/;
    let x = re.test(email);
    
    return(x);
}

 export {validateEmail}