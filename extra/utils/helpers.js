function validateEmail(email)
{
    const re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/;
    let x = re.test(email);

    // if( x == true ) 
    //     valid.push(email);
    // else 
    //     invalid.push(email);
    
    return(x);
}

 export {validateEmail}