// Declaration of formFields and edited form field values
let dataSelected = {
    id: ''
}
let formFields = {
    container: document.querySelector('.view-modal-container'),
}

// Populate formFields dynamically
for(key in fields){
    dataSelected[fields[key].id] = ''
}

for(key in fields){
    formFields[fields[key].id] = document.querySelector(`#view-${fields[key].id}`)
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
        await getData(e.target.getAttribute('data-id'))
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

const getData = async (id) => {

    const response = await fetch(`../api/${dataType}/${id}`)
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
    const response = await fetch(`../api/${dataType}`)
    const dataList = await response.json()
    const list = document.querySelector('.fetch-view-results')
    
    dataList.forEach(data => {
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liViewBtn = document.createElement('button')
        const liView = document.createElement('li')
        let lis = []
        Object.keys(formFields).forEach((key, i) => {
            // return document.createElement('li')
            lis.push(document.createElement('li'))
            console.log(key, data[key])
            lis[i].innerText = data[key]
        }) 
        lis.shift()
        
        liViewBtn.innerText = 'VIEW'
        liViewBtn.classList.add('view-btn', 'btn')
        liContainer.classList.add('view-results-list')
        liViewBtn.setAttribute('data-id', data._id)
        
        liView.appendChild(liViewBtn)

        ul.classList.add('table-body')

        lis.forEach(li => ul.appendChild(li))
        
        ul.appendChild(liView)
        liContainer.appendChild(ul)
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

    const response = await fetch(`../api/${dataType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSelected)
    })

    addClicked()
    
    getDatas()

    closeModal()
    
    return response.json()
}

const deleteData = async(e) => {
    
    e.preventDefault()

    handleModal('delete')

    const response = await fetch(`../api/${dataType}/${dataSelected.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    getDatas()
    
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

const editData = async(e) => {
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
    
    getDatas()
    
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
document.querySelector('.fetch-view-btn').addEventListener('click', getDatas)
document.querySelector('#fetch-add-btn').addEventListener('click', addClicked)
document.querySelector('.form-submit').addEventListener('click', addData)
document.querySelector('.view-modal-close-btn').addEventListener('click', closeModal)
document.querySelector('.view-delete-button').addEventListener('click', deleteData)
document.querySelector('.view-edit-button').addEventListener('click', enableEdit)
document.querySelector('.view-edit-confirm-btn').addEventListener('click', editData)
getDatas()