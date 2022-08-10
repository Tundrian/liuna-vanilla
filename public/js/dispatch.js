let dispatchSelected = {
    id: '',
    name: '',
    type: '',
    length: '',
    startDate: new Date(),
    endDate: new Date(),
    contractorId: '',
    description: ''
}

const formFields = {
    container: document.querySelector('.view-modal-container'),
    name: document.querySelector('#view-name'),
    type: document.querySelector('#view-type'),
    length: document.querySelector('#view-length'),
    startDate: document.querySelector('#view-start-date'),
    endDate: document.querySelector('#view-end-date'),
    contractorId: document.querySelector('#view-contractor-id'),
    description: document.querySelector('#view-description')
}

// Functions
const closeModal = () => {
    formFields.container.classList.add('hide');
    formFields.name.value = ''
    formFields.type.value =''
    formFields.length.value = ''
    formFields.startDate.value = ''
    formFields.endDate.value = ''
    formFields.contractorId.value = ''
    formFields.description.value = ''

    dispatchSelected.id = ''
    dispatchSelected.name = ''
    dispatchSelected.type = ''
    dispatchSelected.length = ''
    dispatchSelected.startDate = ''
    dispatchSelected.endDate = ''
    dispatchSelected.contractorId = ''
    dispatchSelected.description = ''
}

const openModal = async (e) => {
    if(e !== 'add'){
        await getDispatch(e.target.getAttribute('data-id'))
    }
    
    formFields.name.value = dispatchSelected.name
    formFields.type.value = dispatchSelected.type
    formFields.length.value = dispatchSelected.length
    formFields.startDate.value = new Date(dispatchSelected.startDate).toISOString().split('T')[0]
    formFields.endDate.value = new Date(dispatchSelected.endDate).toISOString().split('T')[0]
    formFields.contractorId.value = dispatchSelected.contractorId
    formFields.description.value = dispatchSelected.description
    formFields.container.classList.remove('hide');
}

const getDispatch = async (id) => {

    const response = await fetch(`../api/dispatch/${id}`)
    const dispatch = await response.json()
    dispatchSelected.id = dispatch._id || '',
    dispatchSelected.name = dispatch.name || '',
    dispatchSelected.type = dispatch.type || '',
    dispatchSelected.length = dispatch.length || '',
    dispatchSelected.contractorId = dispatch.contractorId || '',
    dispatchSelected.startDate = dispatch.startDate || '',
    dispatchSelected.endDate = dispatch.endDate || '',
    dispatchSelected.description = dispatch.description || ''
}

const getDispatchs = async() => {
    
    if(document.querySelector('.view-results-list')){
        const element = document.querySelectorAll('.view-results-list')
        element.forEach(el => {
            el.innerHTML = ''
            el.remove()
        })
    } 
    const response = await fetch('../api/dispatch')
    const dispatchsList = await response.json()
    const list = document.querySelector('.fetch-view-results')
    
    dispatchsList.forEach(dispatch => {
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liName = document.createElement('li')
        const liId = document.createElement('li')
        const liRole = document.createElement('li')    
        const liView = document.createElement('li')
        const liViewBtn = document.createElement('button')

        liId.innerText = dispatch.contractorId
        liName.innerText = dispatch.name
        liRole.innerText = dispatch.type
        liViewBtn.innerText = 'VIEW'
        liViewBtn.classList.add('view-btn', 'btn')
        liViewBtn.setAttribute('data-id', dispatch._id)
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

const addDispatch = async(e) => {
    e.preventDefault()
    
    const newDispatch = {
        name:  formFields.name.value,
        startDate: formFields.startDate.value,
        type: formFields.type.value,
        length: formFields.length.value,
        contractorId: formFields.contractorId.value,
        endDate: formFields.endDate.value,
        description: formFields.description.value
    }
    const response = await fetch('../api/dispatch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDispatch)
    })
    addClicked()
    getDispatchs()
    return response.json()
}

const deleteDispatch = async(e) => {
    
    e.preventDefault()

    handleModal('delete')

    const response = await fetch(`../api/dispatch/${dispatchSelected.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getDispatchs()
    closeModal()
    return
}

const enableEdit = (e) => {

    e.preventDefault()

    handleModal('edit')

    formFields.name.disabled = false
    formFields.type.disabled = false
    formFields.length.disabled = false
    formFields.startDate.disabled = false
    formFields.endDate.disabled = false
    formFields.contractorId.disabled = false
    formFields.description.disabled = false
    
    document.querySelector('.view-edit-button').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = false
    document.querySelector('.view-edit-button').disabled = true
}

const editDispatch = async(e) => {
    e.preventDefault()

    if(document.querySelector('.view-edit-confirm-btn').classList.contains('hide')){
        return
    }
    dispatchSelected.name = formFields.name.value
    dispatchSelected.type = formFields.type.value
    dispatchSelected.length = formFields.length.value
    dispatchSelected.startDate = formFields.startDate.value
    dispatchSelected.endDate = formFields.endDate.value
    dispatchSelected.contractorId = formFields.contractorId.value
    dispatchSelected.description = formFields.description.value

    const editedDispatch = {
            name: dispatchSelected.name,
            startDate: dispatchSelected.startDate,
            userId: dispatchSelected.id,
            type: dispatchSelected.type,
            length: dispatchSelected.length,
            contractorId: dispatchSelected.contractorId,
            endDate: dispatchSelected.endDate,
            description: dispatchSelected.description
    }

    const response = await fetch(`../api/dispatch/${dispatchSelected.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedDispatch)
    })
    getDispatchs()
    closeModal()

    formFields.name.disabled = true
    formFields.type.disabled = true
    formFields.length.disabled = true
    formFields.startDate.disabled = true
    formFields.endDate.disabled = true
    formFields.contractorId.disabled = true
    formFields.description.disabled = true

    document.querySelector('.view-edit-button').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = true
    document.querySelector('.view-edit-button').disabled = false
    return response.json()
}

const addClicked = async(e) => {
    handleModal('add')
    openModal('add')
    formFields.name.disabled = false
    formFields.type.disabled = false
    formFields.length.disabled = false
    formFields.startDate.disabled = false
    formFields.endDate.disabled = false
    formFields.contractorId.disabled = false
    formFields.description.disabled = false

    formFields.name.value = ''
    formFields.type.value = ''
    formFields.length.value = ''
    formFields.startDate.value = ''
    formFields.endDate.value = ''
    formFields.contractorId.value = ''
    formFields.description.value = ''
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
document.querySelector('.fetch-view-btn').addEventListener('click', getDispatchs)
document.querySelector('#fetch-add-btn').addEventListener('click', addClicked)
document.querySelector('.form-submit').addEventListener('click', addDispatch)
document.querySelector('.view-modal-close-btn').addEventListener('click', closeModal)
document.querySelector('.view-delete-button').addEventListener('click', deleteDispatch)
document.querySelector('.view-edit-button').addEventListener('click', enableEdit)
document.querySelector('.view-edit-confirm-btn').addEventListener('click', editDispatch)
getDispatchs()