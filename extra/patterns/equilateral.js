let r=Number(process.argv[2]);
equilateral(r);
function equilateral(n) 
{
  if(n<11 && n>1)
  {
    for(let i=0;i<n;i++)
    {
      let row =" ";
      for(let j=0;j<n-i;j++)
      {
        row=row+" ";
      }
      for(let k=0;k<=i;k++)
      {
        row=row+"* ";
      }
      console.log(row);
    }
  } 
  else{
      console.log("wrong input");
  }
}
