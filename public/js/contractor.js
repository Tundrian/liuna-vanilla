let contractorSelected = {
    id: '',
    name: '',
    description: '',
    category: '',
    type: '',
    acquireDate: '',
    reminderDate: ''
}

const formFields = {
    container: document.querySelector('.view-modal-container'),
    description: document.querySelector('#view-description'),
    name: document.querySelector('#view-name'),
    type: document.querySelector('#view-type'),
    expiration_length: document.querySelector('#view-expiration-length')
}

// Functions
const closeModal = () => {
    formFields.container.classList.add('hide');
    formFields.name.value = ''
    formFields.description.value =''
    formFields.type.value = ''
    formFields.expiration_length.value = ''

    contractorSelected.id = ''
    contractorSelected.name = ''
    contractorSelected.description = ''
    contractorSelected.type = ''
    contractorSelected.expiration_length = ''
}

const openModal = async (e) => {
    if(e !== 'add'){
        await getContractor(e.target.getAttribute('data-id'))
    }
    
    formFields.name.value = contractorSelected.name
    formFields.description.value = contractorSelected.description
    formFields.type.value = contractorSelected.type
    formFields.expiration_length.value = contractorSelected.expiration_length
    formFields.container.classList.remove('hide');
}

const getContractor = async (id) => {

    const response = await fetch(`../api/contractor/${id}`)
    const contractor = await response.json()
    contractorSelected.id = contractor._id || '',
    contractorSelected.name = contractor.name || '',
    contractorSelected.description = contractor.description || '',
    contractorSelected.type = contractor.type || '',
    contractorSelected.expiration_length = contractor.expiration_length || ''
}

const getContractors = async() => {
    if(document.querySelector('.view-results-list')){
        const element = document.querySelectorAll('.view-results-list')
        element.forEach(el => {
            el.innerHTML = ''
            el.remove()
        })
    } 
    const response = await fetch('../api/contractor')
    const contractorsList = await response.json()
    const list = document.querySelector('.fetch-view-results')

    contractorsList.forEach(contractor => {
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liName = document.createElement('li')
        const liDescription = document.createElement('li')
        const liType = document.createElement('li')    
        const liView = document.createElement('li')
        // const liExpirationLength = document.createElement('li')
        const liViewBtn = document.createElement('button')

        liDescription.innerText = contractor.description
        liName.innerText = contractor.name
        liType.innerText = contractor.type
        // liExpirationLength = contractor.expiration_length
        liViewBtn.innerText = 'VIEW'
        liViewBtn.classList.add('view-btn', 'btn')
        liViewBtn.setAttribute('data-id', contractor._id)
        liContainer.classList.add('view-results-list')
        liView.appendChild(liViewBtn)
        ul.classList.add('table-body')
        ul.appendChild(liName)
        ul.appendChild(liDescription)
        ul.appendChild(liType)
        ul.appendChild(liViewBtn)
        liContainer.appendChild(ul)
        list.appendChild(liContainer)
    })

    // Add event listeners to all view buttons
    document.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', openModal))
}

const addContractor = async(e) => {
    e.preventDefault()
    
    const newContractor = {
        name:  formFields.name.value,
        description: formFields.description.value,
        type: formFields.type.value,
        expiration_length: formFields.expiration_length.value,
    }

    const response = await fetch('../api/contractor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContractor)
    })
    addClicked()
    getContractors()
    return response.json()
}

const deleteContractor = async(e) => {
    
    e.preventDefault()

    handleModal('delete')

    const response = await fetch(`../api/contractor/${contractorSelected.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getcontractors()
    closeModal()
    return
}

const enableEdit = (e) => {

    e.preventDefault()

    handleModal('edit')

    formFields.name.disabled = false
    formFields.description.disabled = false
    formFields.type.disabled = false
    formFields.expiration_length.disabled = false
    
    document.querySelector('.view-edit-button').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = false
    document.querySelector('.view-edit-button').disabled = true
}

const editContractor = async(e) => {
    e.preventDefault()

    if(document.querySelector('.view-edit-confirm-btn').classList.contains('hide')){
        return
    }
    contractorSelected.name = formFields.name.value
    contractorSelected.description = formFields.description.value
    contractorSelected.type = formFields.type.value
    contractorSelected.expiration_length = formFields.expiration_length.value

    const editedContractor = {
            name: contractorSelected.name,
            description: contractorSelected.description,
            type: contractorSelected.type,
            expiration_length: contractorSelected.expiration_length
    }

    const response = await fetch(`../api/contractor/${contractorSelected.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedContractor)
    })
    getContractors()
    closeModal()

    formFields.name.disabled = true
    formFields.description.disabled = true
    formFields.type.disabled = true
    formFields.expiration_length.disabled = true

    document.querySelector('.view-edit-button').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = true
    document.querySelector('.view-edit-button').disabled = false
    return response.json()
}

const addClicked = async(e) => {
    console.log('clicked')
    handleModal('add')
    openModal('add')
    formFields.name.disabled = false
    formFields.description.disabled = false
    formFields.type.disabled = false
    formFields.expiration_length.disabled = false

    formFields.name.value = ''
    formFields.description.value = ''
    formFields.type.value = ''
    formFields.expiration_length.value = ''
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
document.querySelector('.fetch-view-btn').addEventListener('click', getContractors)
document.querySelector('#fetch-add-btn').addEventListener('click', addClicked)
document.querySelector('.form-submit').addEventListener('click', addContractor)
document.querySelector('.view-modal-close-btn').addEventListener('click', closeModal)
document.querySelector('.view-delete-button').addEventListener('click', deleteContractor)
document.querySelector('.view-edit-button').addEventListener('click', enableEdit)
document.querySelector('.view-edit-confirm-btn').addEventListener('click', editContractor)
getContractors()