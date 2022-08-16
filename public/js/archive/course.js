let courseSelected = {
    id: '',
    name: '',
    description: '',
    category: '',
    renewalLength: '',
    length: ''
}

const formFields = {
    container: document.querySelector('.view-modal-container'),
    name: document.querySelector('#view-name'),
    description: document.querySelector('#view-description'),
    category: document.querySelector('#view-category'),
    renewalLength: document.querySelector('#view-renewal-length'),
    length: document.querySelector('#view-length')
}

// Functions
const closeModal = () => {
    formFields.container.classList.add('hide');
    formFields.name.value = ''
    formFields.description.value =''
    formFields.category.value = ''
    formFields.renewalLength.value = ''
    formFields.length.value = ''
    formFields.status.value = ''

    courseSelected.id = ''
    courseSelected.name = ''
    courseSelected.description = ''
    courseSelected.category = ''
    courseSelected.renewalLength = ''
    courseSelected.length = ''
    courseSelected.status = ''
}

const openModal = async (e) => {
    if(e !== 'add'){
        await getCourse(e.target.getAttribute('data-id'))
    }
    
    formFields.name.value = courseSelected.name
    formFields.description.value = courseSelected.description
    formFields.category.value = courseSelected.category
    formFields.renewalLength.value = courseSelected.renewalLength
    formFields.length.value = courseSelected.length
    formFields.container.classList.remove('hide');
}

const getCourse = async (id) => {

    const response = await fetch(`../api/course/${id}`)
    const course = await response.json()
    courseSelected.id = course._id || '',
    courseSelected.name = course.name || '',
    courseSelected.description = course.description || '',
    courseSelected.category = course.category || '',
    courseSelected.renewalLength = course.renewalLength || '',
    courseSelected.length = course.length || ''
}

const getCourses = async() => {
    
    if(document.querySelector('.view-results-list')){
        const element = document.querySelectorAll('.view-results-list')
        element.forEach(el => {
            el.innerHTML = ''
            el.remove()
        })
    } 
    const response = await fetch('../api/course')
    const coursesList = await response.json()
    const list = document.querySelector('.fetch-view-results')
    
    coursesList.forEach(course => {
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liName = document.createElement('li')
        const liId = document.createElement('li')
        const liRole = document.createElement('li')    
        const liView = document.createElement('li')
        const liViewBtn = document.createElement('button')

        liId.innerText = course.length
        liName.innerText = course.name
        liRole.innerText = course.renewalLength
        liViewBtn.innerText = 'VIEW'
        liViewBtn.classList.add('view-btn', 'btn')
        liViewBtn.setAttribute('data-id', course._id)
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

const addCourse = async(e) => {
    e.preventDefault()
    
    const newCourse = {
        name:  formFields.name.value,
        renewalLength: formFields.renewalLength.value,
        description: formFields.description.value,
        category: formFields.category.value,
        length: formFields.length.value
    }
    const response = await fetch('../api/course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
    })
    addClicked()
    getCourses()
    return response.json()
}

const deleteCourse = async(e) => {
    
    e.preventDefault()

    handleModal('delete')

    const response = await fetch(`../api/course/${courseSelected.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getCourses()
    closeModal()
    return
}

const enableEdit = (e) => {

    e.preventDefault()

    handleModal('edit')

    formFields.name.disabled = false
    formFields.description.disabled = false
    formFields.category.disabled = false
    formFields.renewalLength.disabled = false
    formFields.length.disabled = false
    
    document.querySelector('.view-edit-button').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = false
    document.querySelector('.view-edit-button').disabled = true
}

const editCourse = async(e) => {
    e.preventDefault()

    if(document.querySelector('.view-edit-confirm-btn').classList.contains('hide')){
        return
    }
    courseSelected.name = formFields.name.value
    courseSelected.description = formFields.description.value
    courseSelected.category = formFields.category.value
    courseSelected.renewalLength = formFields.renewalLength.value
    courseSelected.length = formFields.length.value

    const editedCourse = {
            name: courseSelected.name,
            renewalLength: courseSelected.renewalLength,
            userId: courseSelected.id,
            description: courseSelected.description,
            category: courseSelected.category,
            length: courseSelected.length
    }

    const response = await fetch(`../api/course/${courseSelected.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedCourse)
    })
    getCourses()
    closeModal()

    formFields.name.disabled = true
    formFields.description.disabled = true
    formFields.category.disabled = true
    formFields.renewalLength.disabled = true
    formFields.length.disabled = true

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
    formFields.description.disabled = false
    formFields.category.disabled = false
    formFields.renewalLength.disabled = false
    formFields.length.disabled = false

    formFields.name.value = ''
    formFields.description.value = ''
    formFields.category.value = ''
    formFields.renewalLength.value = ''
    formFields.length.value = ''
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
document.querySelector('.fetch-view-btn').addEventListener('click', getCourses)
document.querySelector('#fetch-add-btn').addEventListener('click', addClicked)
document.querySelector('.form-submit').addEventListener('click', addCourse)
document.querySelector('.view-modal-close-btn').addEventListener('click', closeModal)
document.querySelector('.view-delete-button').addEventListener('click', deleteCourse)
document.querySelector('.view-edit-button').addEventListener('click', enableEdit)
document.querySelector('.view-edit-confirm-btn').addEventListener('click', editCourse)
getCourses()