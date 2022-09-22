// import {closeModal, handleModal, addClicked, enableEdit} from './common.js'

// Declaration of formFields and edited form field values
let dataSelected = {
    name: '',
    role: '',
    userId: '',
    firstName: '',
    lastName: '',
    status: '',
    memberNumber: ''
}
let formFields = {
    container: document.querySelector('.view-modal-container'),
    name: document.querySelector('#view-name'),
    role: document.querySelector('#view-role'),
    userId: document.querySelector('#view-userId'),
    firstName: document.querySelector('#view-firstName'),
    lastName: document.querySelector('#view-lastName'),
    status: document.querySelector('#view-status'),
    memberNumber: document.querySelector('#view-memberNumber'),
}

const fetchUri = `../api/member`

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
    if(e !== 'add'){
        handleModal('edit')
        await getData(e.target.getAttribute('data-id'))
    }

    Object.keys(formFields).forEach(key => {
        if(key in dataSelected && dataSelected[key] != null){
            formFields[key].value = dataSelected[key]
        } else if(dataSelected[key] === null){
            formFields[key].value = ''
        } else if (formFields[key] === null){
            formFields[key].value = ''
        }else {
            formFields[key].value = formFields[key].value
        }
    })

    let response = await fetch(`../api/user`)
    let users = await response.json()
    document.querySelector('#view-userId').innerHTML = ''

    users.forEach(x => {
        let op = document.createElement('option')
        op.value = x.name
        op.innerText = x.name
        document.querySelector('#view-userId').appendChild(op)
    })
    
    formFields.container.classList.remove('hide');
}

const getData = async (id) => {

    const response = await fetch(`${fetchUri}/${id}`)
    const data = await response.json()
    Object.keys(dataSelected).forEach(key => {
        dataSelected[key] = data[key] || ''
    })
    dataSelected.id = data._id || ''
}

const getDatas = async() => {
    
    if(document.querySelector('.view-results-list')){
        const element = document.querySelectorAll('.view-results-list')
        element.forEach(el => {
            el.innerHTML = ''
            el.remove()
        })
    } 
    const response = await fetch(`${fetchUri}`)
    const dataList = await response.json()
    const list = document.querySelector('.fetch-view-results')

    dataList.forEach((data, i) => {
        const liContainer = document.createElement('tr')
        // const ul = document.createElement('th')
        const liViewBtn = document.createElement('button')
        const liView = document.createElement('td')
        let lis = []
        Object.keys(formFields).forEach((key, i) => {
            // return document.createElement('li')
            lis.push(document.createElement('td'))
            // console.log(key, data[key])
            lis[i].innerText = data[key]
        }) 
        lis.shift()
        
        liViewBtn.innerText = 'VIEW'
        liViewBtn.classList.add('view-btn', 'btn')
        liContainer.classList.add('view-results-list')
        liViewBtn.setAttribute('data-id', data._id)
        
        liView.appendChild(liViewBtn)
        if(i % 2 !== 0){
            liContainer.classList.add('active')
        }
        // ul.classList.add('table-body')

        lis.forEach(li => liContainer.appendChild(li))
        
        liContainer.appendChild(liView)
        // liContainer.appendChild(ul)
        list.appendChild(liContainer)
    })

    // Add event listeners to all view buttons
    document.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', openModal))
}

const addData = async(e) => {

    e.preventDefault()
    
    Object.keys(dataSelected).forEach(key => {
        dataSelected[key] = key in formFields ? formFields[key].value : dataSelected[key]
      })

    const response = await fetch(`${fetchUri}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSelected)
    })

    // addClicked(formFields)
    getDatas()
    closeModal(formFields, dataSelected)
    
    return response.json()
}

const deleteData = async(e) => {
    
    e.preventDefault()

    handleModal('delete')

    const response = await fetch(`${fetchUri}/${dataSelected.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    getDatas()
    
    closeModal(formFields)
    
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

const editData = async(e) => {
    e.preventDefault()

    if(document.querySelector('.view-edit-confirm-btn').classList.contains('hide')){
        return
    }

    Object.keys(dataSelected).forEach(key => {
        dataSelected[key] = key in formFields ? formFields[key].value : dataSelected[key]
      })

    const response = await fetch(`${fetchUri}/${dataSelected.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSelected)
    })
    
    getDatas()
    
    closeModal(formFields)

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
document.querySelector('.fetch-view-btn').addEventListener('click', getDatas)
document.querySelector('#fetch-add-btn').addEventListener('click', addClicked)
document.querySelector('.form-submit').addEventListener('click', addData)
document.querySelector('.view-modal-close-btn').addEventListener('click', closeModal)
document.querySelector('.view-delete-button').addEventListener('click', deleteData)
document.querySelector('.view-edit-button').addEventListener('click', enableEdit)
document.querySelector('.view-edit-confirm-btn').addEventListener('click', editData)
getDatas()