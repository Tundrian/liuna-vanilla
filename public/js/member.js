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

const addMember = async(e) => {
    e.preventDefault()
    console.log('here')
    const newMember = {
        name: document.querySelector('#full-name').value,
        role: document.querySelector('#role').value,
        first_name: document.querySelector('#first-name').value,
        last_name: document.querySelector('#last-name').value,
        status: document.querySelector('#status').value
    }
    const response = await fetch('../api/member', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMember)
    })
    
    return response.json()
}

// Event Listeners
document.querySelector('.fetch-view-btn').addEventListener('click', getMembers)
// document.querySelector('.fetch-add-btn').addEventListener('click')
document.querySelector('.form-submit').addEventListener('click', addMember)
