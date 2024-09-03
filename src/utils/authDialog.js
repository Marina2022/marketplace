export const formatPhone = (phone)=>{
  
  const arrFromPhone = phone.split("")

  const newArr = arrFromPhone.map((digit,i)=>{
    
    if (i === 0) return `(${digit}`
    if (i === 2) return `${digit}) `
    if (i === 5) return `${digit}-`
    if (i === 7) return `${digit}-`
    return digit 
    
  })
  
  const newPhone = newArr.join("")
  return newPhone 
  
}