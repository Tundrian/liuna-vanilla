// Declaration of formFields and edited form field values
let dataSelected = {
    courseId: '',
    startDate: '',
    endDate: '',
    courseLength: '',
    scheduledDates: '',
    totalSlots: '',
    openSlots: '',
    filledSlots: '',
    type: '',
    attendees: '',
}

let formFields = {
    container: document.querySelector('.view-modal-container'),
    courseId: document.querySelector('#view-course'),
    startDate: document.querySelector('#view-startDate'),
    endDate: document.querySelector('#view-endDate'),
    courseLength: document.querySelector('#view-courseLength'),
    scheduledDates: document.querySelector('#view-scheduledDates'),
    totalSlots: document.querySelector('#view-totalSlots'),
    openSlots: document.querySelector('#view-openSlots'),
    filledSlots: document.querySelector('#view-filledSlots'),
    type: document.querySelector('#view-type'),
    certificationName: document.querySelector('#view-certificationName'),
}

const hiddenFromTable = ['container', 'scheduledDates', 'attendees']

const fetchUri = `../api/training`

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
        console.log('key: ', key)
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

    let resCert = await fetch(`../api/certificate`)
    let users = await resCert.json()
    document.querySelector('#view-certificationName').innerHTML = ''

    users.forEach(x => {
        let op = document.createElement('option')
        op.value = x.name
        op.innerText = x.name
        document.querySelector('#view-certificationName').appendChild(op)
    })

    let resCourse = await fetch(`../api/course`)
    let courses = await resCourse.json()
    document.querySelector('#view-course').innerHTML = ''

    courses.forEach(x => {
        let op = document.createElement('option')
        op.value = x.name
        op.innerText = x.name
        document.querySelector('#view-course').appendChild(op)
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
    console.log(dataList)
    const courseRes = await fetch(`../api/course/`)

    let courses = await courseRes.json()
    courses = courses.map(course => {
        return {id: course._id, name: course.name}
    })

    dataList.forEach(data => {
        const liContainer = document.createElement('li')
        const ul = document.createElement('ul')
        const liViewBtn = document.createElement('button')
        const liView = document.createElement('li')
        let lis = []

        Object.keys(formFields).forEach((key, i) => {
            if(!hiddenFromTable.includes(key)){
                lis.push(document.createElement('li'))
                console.log('key: ', key)
                if(key === 'courseId'){
                    console.log('courses: ', courses, data[key], key, courses.find(course => data[key] === course.id))
                    lis[lis.length - 1].innerText = courses.find(course => data[key] === course.id)
                }else{
                    lis[lis.length - 1].innerText = data[key]
                }
            }
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

const updateScheduledDates = () => {

   const courseLength = document.querySelector('#view-courseLength').value
   const scheduleDates = document.querySelector('#view-scheduledDates')

   const currentDates = document.querySelector('#view-scheduledDates')
   currentDates.innerHTML = ''

//    let timeOptions = document.createElement('datalist')
//    timeOptions.id = 'timeSlots'
//    timeOptions.list="timeOptionsList"

//    timeOptions.appendChild(document.createElement('option').value(''))
   
//    <datalist id="browsers">
//         <option value="Edge">
//         <option value="Firefox">
//         <option value="Chrome">
//         <option value="Opera">
//         <option value="Safari">
//     </datalist>

    for(let i = 0; i < courseLength; i++){
       let label = document.createElement('label')
       let timeLabel = document.createElement('label')

       let input = document.createElement('input')
       let timeInput = document.createElement('input')

       label.innerText = `Class ${i+1} Date`
       label.setAttribute('for', `class-${i+1}-date`)
       input.type = "date"
       input.name = `class-${i+1}-date`
       input.id = `view-class${i+1}Date`

       timeLabel.innerText = `Class ${i+1} Time`
       timeLabel.setAttribute('for', `class-${i+1}-time`)
       timeInput.type = "time"
       timeInput.name = `class-${i+1}-time`
       timeInput.id = `view-class${i+1}Time`

       scheduleDates.appendChild(label)
       scheduleDates.appendChild(input)
       scheduleDates.appendChild(timeLabel)
       scheduleDates.appendChild(timeInput)
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
document.querySelector('#view-courseLength').addEventListener('change', updateScheduledDates)

getDatas()

