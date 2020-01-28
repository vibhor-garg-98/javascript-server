
const permissions =
{
'getUsers': {
all: ['head-trainer'],
read : ['trainee', 'trainer'],
write : ['trainer'],
delete: [],
}
};

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
    }
]
export {permissions,users}