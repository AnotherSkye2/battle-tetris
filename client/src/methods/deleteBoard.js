export function deleteBoard(userName){
    console.log(userName)
    const userNames = document.querySelectorAll(".name.micro-5-regular")
    
    userNames.forEach((nameElement) =>{
        if(nameElement.innerHTML === userName){
            nameElement.closest(".game-board").remove();
        }
    })
    console.log("deleteBoard",userNames)
}