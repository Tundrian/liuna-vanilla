let trainingSelected = {
    id: '',
    courseId: '',
    certificationName: '',
    startDate: new Date(),
    endDate: new Date(),
    scheduledDates: '',
    availableSlots: '',
    openSlots: '',
    filledSlots: '',
    type: ''
}

const formFields = {
    container: document.querySelector('.view-modal-container'),
    courseId: document.querySelector('#view-course-id'),
    startDate: document.querySelector('#view-start-date'),
    endDate: document.querySelector('#view-end-date'),
    scheduledDates: document.querySelector('#view-scheduled-dates'),
    availableSlots: document.querySelector('#view-available-slots'),
    openSlots: document.querySelector('#view-open-slots'),
    filledSlots: document.querySelector('#view-filled-slots'),
    type: document.querySelector('#view-type'),
    certificationName: document.querySelector('#view-certification-name')
}

// Functions
const closeModal = () => {
    formFields.container.classList.add('hide');
    formFields.certificationName.value = ''
    formFields.startDate.value =''
    formFields.endDate.value = ''
    formFields.scheduledDates.value = ''
    formFields.availableSlots.value = ''
    formFields.openSlots.value = ''
    formFields.filledSlots.value = ''
    formFields.type.value = ''
    formFields.courseId.value = ''

    trainingSelected.id = ''
    trainingSelected.certificationName = ''
    trainingSelected.startDate = ''
    trainingSelected.endDate = ''
    trainingSelected.scheduledDates = ''
    trainingSelected.availableSlots = ''
    trainingSelected.openSlots = ''
    trainingSelected.filledSlots = ''
    trainingSelected.type = ''
    trainingSelected.courseId = ''

}

const openModal = async (e) => {
    if(e !== 'add'){
        await getTraining(e.target.getAttribute('data-id'))
    }
    
    formFields.certificationName.value = trainingSelected.certificationName
    formFields.startDate.value = new Date(trainingSelected.startDate).toISOString().split('T')[0]
    formFields.endDate.value = new Date(trainingSelected.endDate).toISOString().split('T')[0]
    formFields.scheduledDates.value = trainingSelected.scheduledDates
    formFields.availableSlots.value = trainingSelected.availableSlots
    formFields.openSlots.value = trainingSelected.openSlots
    formFields.filledSlots.value = trainingSelected.filledSlots
    formFields.type.value = trainingSelected.type
    formFields.courseId.value = trainingSelected.courseId
    formFields.container.classList.remove('hide');
}

const getTraining = async (id) => {

    const response = await fetch(`../api/training/${id}`)
    const training = await response.json()
    trainingSelected.id = training._id || '',
    trainingSelected.courseId = training.courseId || '',
    trainingSelected.certificationName = training.certificationName || '',
    trainingSelected.startDate = training.startDate || '',
    trainingSelected.endDate = training.endDate || '',
    trainingSelected.openSlots = training.openSlots || '',
    trainingSelected.scheduledDates = training.scheduledDates || '',
    trainingSelected.availableSlots = training.availableSlots || '',
    trainingSelected.filledSlots = training.filledSlots || '',
    trainingSelected.type = training.type || ''
}

const getTrainings = async() => {
    
    if(document.querySelector('.view-results-list')){
        const element = document.querySelectorAll('.view-results-list')
        element.forEach(el => {
            el.innerHTML = ''
            el.remove()
        })
    } 
    const response = await fetch('../api/training')
    const trainingsList = await response.json()
    const list = document.querySelector('.fetch-view-results')
    
    trainingsList.forEach(training => {
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liName = document.createElement('li')
        const liId = document.createElement('li')
        const liRole = document.createElement('li')    
        const liView = document.createElement('li')
        const liViewBtn = document.createElement('button')

        liId.innerText = training.courseId
        liName.innerText = training.certificationName
        liRole.innerText = training.startDate
        liViewBtn.innerText = 'VIEW'
        liViewBtn.classList.add('view-btn', 'btn')
        liViewBtn.setAttribute('data-id', training._id)
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

const addTraining = async(e) => {
    e.preventDefault()
    
    const newTraining = {
        certificationName:  formFields.certificationName.value,
        scheduledDates: formFields.scheduledDates.value,
        startDate: formFields.startDate.value,
        endDate: formFields.endDate.value,
        openSlots: formFields.openSlots.value,
        availableSlots: formFields.availableSlots.value,
        filledSlots: formFields.filledSlots.value,
        type: formFields.type.value,
        courseId: formFields.courseId.value
    }
    const response = await fetch('../api/training', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTraining)
    })
    addClicked()
    getTrainings()
    return response.json()
}

const deleteTraining = async(e) => {
    
    e.preventDefault()

    handleModal('delete')

    const response = await fetch(`../api/training/${trainingSelected.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getTrainings()
    closeModal()
    return
}

const enableEdit = (e) => {

    e.preventDefault()

    handleModal('edit')

    formFields.certificationName.disabled = false
    formFields.startDate.disabled = false
    formFields.endDate.disabled = false
    formFields.scheduledDates.disabled = false
    formFields.availableSlots.disabled = false
    formFields.openSlots.disabled = false
    formFields.filledSlots.disabled = false
    formFields.type.disabled = false
    formFields.courseId.disabled = false
    
    document.querySelector('.view-edit-button').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = false
    document.querySelector('.view-edit-button').disabled = true
}

const editTraining = async(e) => {
    e.preventDefault()

    if(document.querySelector('.view-edit-confirm-btn').classList.contains('hide')){
        return
    }
    trainingSelected.certificationName = formFields.certificationName.value
    trainingSelected.startDate = formFields.startDate.value
    trainingSelected.endDate = formFields.endDate.value
    trainingSelected.scheduledDates = formFields.scheduledDates.value
    trainingSelected.availableSlots = formFields.availableSlots.value
    trainingSelected.openSlots = formFields.openSlots.value
    trainingSelected.filledSlots = formFields.filledSlots.value
    trainingSelected.type = formFields.type.value
    trainingSelected.courseId = formFields.courseId.value

    const editedTraining = {
            certificationName: trainingSelected.certificationName,
            scheduledDates: trainingSelected.scheduledDates,
            userId: trainingSelected.id,
            startDate: trainingSelected.startDate,
            endDate: trainingSelected.endDate,
            openSlots: trainingSelected.openSlots,
            availableSlots: trainingSelected.availableSlots,
            filledSlots: trainingSelected.filledSlots,
            type: trainingSelected.type,
            courseId: trainingSelected.courseId
    }

    const response = await fetch(`../api/training/${trainingSelected.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTraining)
    })
    getTrainings()
    closeModal()

    formFields.certificationName.disabled = true
    formFields.startDate.disabled = true
    formFields.endDate.disabled = true
    formFields.scheduledDates.disabled = true
    formFields.availableSlots.disabled = true
    formFields.openSlots.disabled = true
    formFields.filledSlots.disabled = true
    formFields.type.disabled = true
    formFields.courseId.disabled = true

    document.querySelector('.view-edit-button').classList.remove('hide')
    document.querySelector('.view-edit-confirm-btn').classList.add('hide')
    document.querySelector('.view-edit-confirm-btn').disabled = true
    document.querySelector('.view-edit-button').disabled = false
    return response.json()
}

const addClicked = async(e) => {
    handleModal('add')
    openModal('add')
    formFields.certificationName.disabled = false
    formFields.startDate.disabled = false
    formFields.endDate.disabled = false
    formFields.scheduledDates.disabled = false
    formFields.availableSlots.disabled = false
    formFields.openSlots.disabled = false
    formFields.filledSlots.disabled = false
    formFields.type.disabled = false
    formFields.courseId.disabled = false

    formFields.certificationName.value = ''
    formFields.startDate.value = ''
    formFields.endDate.value = ''
    formFields.scheduledDates.value = ''
    formFields.availableSlots.value = ''
    formFields.openSlots.value = ''
    formFields.filledSlots.value = ''
    formFields.type.value = ''
    formFields.courseId.value = ''
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
document.querySelector('.fetch-view-btn').addEventListener('click', getTrainings)
document.querySelector('#fetch-add-btn').addEventListener('click', addClicked)
document.querySelector('.form-submit').addEventListener('click', addTraining)
document.querySelector('.view-modal-close-btn').addEventListener('click', closeModal)
document.querySelector('.view-delete-button').addEventListener('click', deleteTraining)
document.querySelector('.view-edit-button').addEventListener('click', enableEdit)
document.querySelector('.view-edit-confirm-btn').addEventListener('click', editTraining)
getTrainings()