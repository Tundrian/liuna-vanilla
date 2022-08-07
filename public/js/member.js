let memberSelected = {
    id: '',
    name: '',
    firstName: '',
    lastName: '',
    role: '',
    memberNumber: '',
    status: '',
}

const formFields = {
    container: document.querySelector('.view-modal-container'),
    fullName: document.querySelector('#view-full-name'),
    firstName: document.querySelector('#view-first-name'),
    lastName: document.querySelector('#view-last-name'),
    role: document.querySelector('#view-role'),
    memberNumber: document.querySelector('#view-member-number'),
    status: document.querySelector('#view-status')
}

// Functions
const closeModal = () => {
    formFields.container.classList.add('hide');
    formFields.fullName.value = ''
    formFields.firstName.value =''
    formFields.lastName.value = ''
    formFields.role.value = ''
    formFields.memberNumber.value = ''
    formFields.status.value = ''

    memberSelected.id = ''
    memberSelected.name = ''
    memberSelected.firstName = ''
    memberSelected.lastName = ''
    memberSelected.role = ''
    memberSelected.memberNumber = ''
    memberSelected.status = ''
}

const openModal = async (e) => {
    if(e !== 'add'){
        await getMember(e.target.getAttribute('data-id'))
    }
    
    formFields.fullName.value = memberSelected.name
    formFields.firstName.value = memberSelected.firstName
    formFields.lastName.value = memberSelected.lastName
    formFields.role.value = memberSelected.role
    formFields.memberNumber.value = memberSelected.memberNumber
    formFields.status.value = memberSelected.status
    formFields.container.classList.remove('hide');
}

const getMember = async (id) => {

    const response = await fetch(`../api/member/${id}`)
    const member = await response.json()
    memberSelected.id = member._id || '',
    memberSelected.name = member.name || '',
    memberSelected.firstName = member.firstName || '',
    memberSelected.lastName = member.lastName || '',
    memberSelected.status = member.status || '',
    memberSelected.role = member.role || '',
    memberSelected.memberNumber = member.memberNumber || ''
}

const getMembers = async() => {
    if(document.querySelector('.view-results-list')){
        const element = document.querySelectorAll('.view-results-list')
        element.forEach(el => {
            el.innerHTML = ''
            el.remove()
        })
    } 
    const response = await fetch('../api/member')
    const membersList = await response.json()
    const list = document.querySelector('.fetch-view-results')

    membersList.forEach(member => {
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liName = document.createElement('li')
        const liId = document.createElement('li')
        const liRole = document.createElement('li')    
        const liView = document.createElement('li')
        const liViewBtn = document.createElement('button')

        liId.innerText = member.memberNumber
        liName.innerText = member.name
        liRole.innerText = member.role
        liViewBtn.innerText = 'VIEW'
        liViewBtn.classList.add('view-btn', 'btn')
        liViewBtn.setAttribute('data-id', member._id)
        liContainer.classList.add('view-results-list')
        liView.appendChild(liViewBtn)
        ul.classList.add('table-body')
        ul.appendChild(liName)
        ul.appendChild(liId)
        ul.appendChild(liRole)
        ul.appendChild(liViewBtn)
        liContainer.appendChild(ul)
        list.appendChild(liContainer)
    })

    // Add event listeners to all view buttons
    document.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', openModal))
}

const addMember = async(e) => {
    e.preventDefault()
    
    const newMember = {
        name:  formFields.fullName.value,
        role: formFields.role.value,
        firstName: formFields.firstName.value,
        lastName: formFields.lastName.value,
        status: formFields.status.value,
        memberNumber: formFields.memberNumber.value
    }
    const response = await fetch('../api/member', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMember)
    })
    addClicked()
    getMembers()
    return response.json()
}

const deleteMember = async(e) => {
    
    e.preventDefault()

    handleModal('delete')

    const response = await fetch(`../api/member/${memberSelected.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getMembers()
    closeModal()
    return
}

const enableEdit = (e) => {

    e.preventDefault()

    handleModal('edit')

    formFields.fullName.disabled = false
    formFields.firstName.disabled = false
    formFields.lastName.disabled = false
    formFields.role.disabled = false
    formFields.memberNumber.disabled = false
    formFields.status.disabled = false
    
    document.querySelector('.view-edit-button').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = false
    document.querySelector('.view-edit-button').disabled = true
}

const editMember = async(e) => {
    e.preventDefault()

    if(document.querySelector('.view-edit-confirm-btn').classList.contains('hide')){
        return
    }
    memberSelected.name = formFields.fullName.value
    memberSelected.firstName = formFields.firstName.value
    memberSelected.lastName = formFields.lastName.value
    memberSelected.role = formFields.role.value
    memberSelected.memberNumber = formFields.memberNumber.value
    memberSelected.status = formFields.status.value

    const editedMember = {
            name: memberSelected.name,
            role: memberSelected.role,
            userId: memberSelected.id,
            firstName: memberSelected.firstName,
            lastName: memberSelected.lastName,
            status: memberSelected.status,
            memberNumber: memberSelected.memberNumber
    }

    const response = await fetch(`../api/member/${memberSelected.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedMember)
    })
    getMembers()
    closeModal()

    formFields.fullName.disabled = true
    formFields.firstName.disabled = true
    formFields.lastName.disabled = true
    formFields.role.disabled = true
    formFields.memberNumber.disabled = true
    formFields.status.disabled = true

    document.querySelector('.view-edit-button').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = true
    document.querySelector('.view-edit-button').disabled = false
    return response.json()
}

const addClicked = async(e) => {
    handleModal('add')
    openModal('add')
    formFields.fullName.disabled = false
    formFields.firstName.disabled = false
    formFields.lastName.disabled = false
    formFields.role.disabled = false
    formFields.memberNumber.disabled = false
    formFields.status.disabled = false

    formFields.fullName.value = ''
    formFields.firstName.value = ''
    formFields.lastName.value = ''
    formFields.role.value = ''
    formFields.memberNumber.value = ''
    formFields.status.value = ''
    document.querySelector('#fetch-add-btn').innerText = document.querySelector('#fetch-add-btn').innerText.toLowerCase() === 'add' ? 'CLOSE' : 'ADD'
}

const handleModal = (type) => {
    if(type.toLowerCase() === 'add'){
        document.querySelector('.form-submit').classList.remove('hide')
        document.querySelector('.edit-btn').classList.add('hide')
        document.querySelector('.edit-confirm-btn').classList.add('hide')
        document.querySelector('.delete-btn').classList.add('hide')
    }else {
        document.querySelector('.form-submit').classList.add('hide')
        document.querySelector('.edit-btn').classList.remove('hide')
        document.querySelector('.edit-confirm-btn').classList.add('hide')
        document.querySelector('.delete-btn').classList.remove('hide')
    }
}

// Event Listeners
document.querySelector('.fetch-view-btn').addEventListener('click', getMembers)
document.querySelector('#fetch-add-btn').addEventListener('click', addClicked)
document.querySelector('.form-submit').addEventListener('click', addMember)
document.querySelector('.view-modal-close-btn').addEventListener('click', closeModal)
document.querySelector('.view-delete-button').addEventListener('click', deleteMember)
document.querySelector('.view-edit-button').addEventListener('click', enableEdit)
document.querySelector('.view-edit-confirm-btn').addEventListener('click', editMember)
getMembers()