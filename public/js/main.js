// Functions
const getMembers = async() => {

    const response = await fetch('../api/member')
    const membersList = await response.json()
    const list = document.querySelector('.fetch-view-results')
    membersList.forEach(member => {
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liName = document.createElement('li')
        const liId = document.createElement('li')
        const liRole = document.createElement('li')
        const liEdit = document.createElement('li')
        const liDelete = document.createElement('li')
        const editBtn = document.createElement('button')
        const deleteBtn = document.createElement('button')
    
        editBtn.innerText = 'Edit'
        deleteBtn.innerText = 'Delete'
        editBtn.classList.add('fetch-edit-btn')
        deleteBtn.classList.add('fetch-delete-btn')
        liId.innerText = member._id
        liName.innerText = member.name
        liRole.innerText = member.role

        liEdit.appendChild(editBtn)
        liDelete.appendChild(deleteBtn)
        ul.appendChild(liName)
        ul.appendChild(liId)
        ul.appendChild(liRole)
        ul.appendChild(liEdit)
        ul.appendChild(liDelete)
        liContainer.appendChild(ul)
        list.appendChild(liContainer)
    })
}

// Event Listeners
document.querySelector('.fetch-view-btn').addEventListener('click', getMembers)
// document.querySelector('.fetch-add-btn').addEventListener('click')