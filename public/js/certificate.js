let certificateSelected = {
    id: '',
    name: '',
    description: '',
    type: '',
    expiration_length: ''
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

    certificateSelected.id = ''
    certificateSelected.name = ''
    certificateSelected.description = ''
    certificateSelected.type = ''
    certificateSelected.expiration_length = ''
}

const openModal = async (e) => {
    if(e !== 'add'){
        await getCertificate(e.target.getAttribute('data-id'))
    }
    
    formFields.name.value = certificateSelected.name
    formFields.description.value = certificateSelected.description
    formFields.type.value = certificateSelected.type
    formFields.expiration_length.value = certificateSelected.expiration_length
    formFields.container.classList.remove('hide');
}

const getCertificate = async (id) => {

    const response = await fetch(`../api/certificate/${id}`)
    const certificate = await response.json()
    certificateSelected.id = certificate._id || '',
    certificateSelected.name = certificate.name || '',
    certificateSelected.description = certificate.description || '',
    certificateSelected.type = certificate.type || '',
    certificateSelected.expiration_length = certificate.expiration_length || ''
}

const getCertificates = async() => {
    if(document.querySelector('.view-results-list')){
        const element = document.querySelectorAll('.view-results-list')
        element.forEach(el => {
            el.innerHTML = ''
            el.remove()
        })
    } 
    const response = await fetch('../api/certificate')
    const certificatesList = await response.json()
    const list = document.querySelector('.fetch-view-results')

    certificatesList.forEach(certificate => {
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liName = document.createElement('li')
        const liDescription = document.createElement('li')
        const liType = document.createElement('li')    
        const liView = document.createElement('li')
        // const liExpirationLength = document.createElement('li')
        const liViewBtn = document.createElement('button')

        liDescription.innerText = certificate.description
        liName.innerText = certificate.name
        liType.innerText = certificate.type
        // liExpirationLength = certificate.expiration_length
        liViewBtn.innerText = 'VIEW'
        liViewBtn.classList.add('view-btn', 'btn')
        liViewBtn.setAttribute('data-id', certificate._id)
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

const addCertificate = async(e) => {
    e.preventDefault()
    
    const newCertificate = {
        name:  formFields.name.value,
        description: formFields.description.value,
        type: formFields.type.value,
        expiration_length: formFields.expiration_length.value,
    }

    const response = await fetch('../api/certificate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCertificate)
    })
    addClicked()
    getCertificates()
    return response.json()
}

const deleteCertificate = async(e) => {
    
    e.preventDefault()

    handleModal('delete')

    const response = await fetch(`../api/certificate/${certificateSelected.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getcertificates()
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

const editCertificate = async(e) => {
    e.preventDefault()

    if(document.querySelector('.view-edit-confirm-btn').classList.contains('hide')){
        return
    }
    certificateSelected.name = formFields.name.value
    certificateSelected.description = formFields.description.value
    certificateSelected.type = formFields.type.value
    certificateSelected.expiration_length = formFields.expiration_length.value

    const editedCertificate = {
            name: certificateSelected.name,
            description: certificateSelected.description,
            type: certificateSelected.type,
            expiration_length: certificateSelected.expiration_length
    }

    const response = await fetch(`../api/certificate/${certificateSelected.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedCertificate)
    })
    getCertificates()
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
document.querySelector('.fetch-view-btn').addEventListener('click', getCertificates)
document.querySelector('#fetch-add-btn').addEventListener('click', addClicked)
document.querySelector('.form-submit').addEventListener('click', addCertificate)
document.querySelector('.view-modal-close-btn').addEventListener('click', closeModal)
document.querySelector('.view-delete-button').addEventListener('click', deleteCertificate)
document.querySelector('.view-edit-button').addEventListener('click', enableEdit)
document.querySelector('.view-edit-confirm-btn').addEventListener('click', editCertificate)
getCertificates()