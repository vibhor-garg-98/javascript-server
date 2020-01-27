
const users = [
    {
        traineeEmail: "ujjwal.jain@successive.tech",
        reviewerEmail:"preet.saxena@successive.tech",
    },
    {
        traineeEmail: "ujjwal.jainsuccessive.tech",
        reviewerEmail:"preeta@succesive.tech",
    },
    {
        traineeEmail: "ujju.jain@successive.tech",
        reviewerEmail:"preet@successive.tech",
    },

];
a = 0;
b = 0;
valid = [];
invalid = [];

function validateEmail(email)
{
    const re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/;
    x = re.test(email);

    if( x == true ) 
        valid.push(email);
    else 
        invalid.push(email);
    
    return(x);
}

function validateUsers(users)
{
    users.forEach((element) => {
        const {traineeEmail, reviewerEmail} = element;
        check = validateEmail(traineeEmail);

        if( check == true)
             a++;
        else
             b++;

        check1 = validateEmail(reviewerEmail);
        
        if( check1 == true ) 
             a++;
        else
             b++;
    })
}
validateUsers(users);

console.log(`valid Emails \n${valid}`);
console.log("invlaid Email \n"+invalid);
console.log("valid count \n"+a);
console.log("invlaid count \n"+b);