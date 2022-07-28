const members = []

// Functions
console.log('file')
const getMembers = async() => {
    console.log('here')
    const response = await fetch('../api/member')
    const membersList = await response.json()
    members = [...membersList]
}

// Event Listeners
document.querySelector('.testButton').addEventListener('click', getMembers)