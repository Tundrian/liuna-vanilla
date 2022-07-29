// Functions
console.log('file')
const getMembers = async() => {
    console.log('here')
    const response = await fetch('../api/member')
    const membersList = await response.json()
    const list = document.querySelector('.data-view')
    membersList.forEach(member => {
        const li = document.createElement('li')
        li.innerText = member.name
        list.appendChild(li)
    })
}

// Event Listeners
document.querySelector('.testButton').addEventListener('click', getMembers)