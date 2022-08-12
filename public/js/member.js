let dataSelected = {
    id: '',
    name: '',
    firstName: '',
    lastName: '',
    role: '',
    memberNumber: '',
    status: ''
}

const formFields = {
    container: document.querySelector('.view-modal-container'),
    name: document.querySelector('#view-name'),
    firstName: document.querySelector('#view-firstName'),
    lastName: document.querySelector('#view-lastName'),
    role: document.querySelector('#view-role'),
    memberNumber: document.querySelector('#view-memberNumber'),
    status: document.querySelector('#view-status')
}

// Functions
const closeModal = () => {
    
    formFields.container.classList.add('hide')

    Object.keys(formFields).forEach(key => {
        formFields[key].value = ''
    })
    
    Object.keys(dataSelected).forEach(key => {
        dataSelected[key] = null
    })
}

const openModal = async (e) => {
    console.log(dataSelected, formFields)
    if(e !== 'add'){
        await getMember(e.target.getAttribute('data-id'))
    }

    Object.keys(formFields).forEach(key => {
        if(key in dataSelected && dataSelected[key] != null){
            formFields[key].value = dataSelected[key]
        } else if(dataSelected[key] === null){
            formFields[key].value = ''
        } else {
            formFields[key].value = formFields[key].value
        }
    })
    
    formFields.container.classList.remove('hide');
}

const getMember = async (id) => {

    const response = await fetch(`../api/${dataType}/${id}`)
    const data = await response.json()
    Object.keys(dataSelected).forEach(key => {
        dataSelected[key] = data[key] || ''
    })
    dataSelected.id = data._id || ''
}

const getMembers = async() => {
    
    if(document.querySelector('.view-results-list')){
        const element = document.querySelectorAll('.view-results-list')
        element.forEach(el => {
            el.innerHTML = ''
            el.remove()
        })
    } 
    const response = await fetch(`../api/${dataType}`)
    const dataList = await response.json()
    const list = document.querySelector('.fetch-view-results')
    
    dataList.forEach(data => {
        // console.log(data)
        // const lis = Object.keys(data).forEach(key => {
        //     return document.createElement('li')
        // })
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liName = document.createElement('li')
        const liId = document.createElement('li')
        const liRole = document.createElement('li')    
        const liView = document.createElement('li')
        const liViewBtn = document.createElement('button')

        liId.innerText = data.dataNumber
        liName.innerText = data.name
        liRole.innerText = data.role
        
        liViewBtn.innerText = 'VIEW'
        
        liViewBtn.classList.add('view-btn', 'btn')
        liContainer.classList.add('view-results-list')

        liViewBtn.setAttribute('data-id', data._id)
        
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
    
    Object.keys(dataSelected).forEach(key => {
        dataSelected[key] = key in formFields ? formFields[key].value : dataSelected[key]
      })

    const response = await fetch(`../api/${dataType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSelected)
    })

    addClicked()
    
    getMembers()
    
    return response.json()
}

const deleteMember = async(e) => {
    
    e.preventDefault()

    handleModal('delete')

    const response = await fetch(`../api/${dataType}/${dataSelected.id}`, {
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
    
    Object.keys(formFields).forEach(key => {
        formFields[key].disabled = false
    })
    
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

    Object.keys(dataSelected).forEach(key => {
        dataSelected[key] = key in formFields ? formFields[key].value : dataSelected[key]
      })

    const response = await fetch(`../api/${dataType}/${dataSelected.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSelected)
    })
    
    getMembers()
    
    closeModal()

    Object.keys(formFields).forEach(key => {
        formFields[key].disabled = true
      })

    document.querySelector('.view-edit-button').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = true
    document.querySelector('.view-edit-button').disabled = false
    return response.json()
}

const addClicked = async(e) => {
    handleModal('add')
    openModal('add')
    
    Object.keys(formFields).forEach(key => {
        formFields[key].disabled = false
        formFields[key].value = ''
    })

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