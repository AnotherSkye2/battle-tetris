export function deleteBoard(user){
    console.log(user)
    const userNames = document.querySelectorAll(".name.micro-5-regular")
    
    userNames.forEach((nameElement) =>{
        if(nameElement.innerHTML === user){
            nameElement.closest(".game-board").remove();
        }
    })
    console.log("deleteBoard",userNames)
}