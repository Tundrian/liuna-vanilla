// class Member {
//     constructor(id, name, firstName, lastName, role, memberNumber, status){
//         this.id = id
//         this.name = name
//         this.firstName = firstName
//         this.lastName = lastName
//         this.role = role
//         this.memberNumber = memberNumber
//         this.status = status
//     }

//     updateMember () {

//     }
// }

let memberSelected = {
    id: '',
    name: '',
    firstName: '',
    lastName: '',
    role: '',
    memberNumber: '',
    status: ''
}

// Functions
const closeModal = () => {
    document.querySelector('.view-modal-container').classList.add('hide');
    document.querySelector('#view-full-name').value = ''
    document.querySelector('#view-first-name').value =''
    document.querySelector('#view-last-name').value = ''
    document.querySelector('#view-role').value = ''
    document.querySelector('#view-member-number').value = ''
    document.querySelector('#view-status').value = ''
    memberSelected.id = ''
    memberSelected.name = ''
    memberSelected.firstName = ''
    memberSelected.lastNamne = ''
    memberSelected.role = ''
    memberSelected.memberNumber = ''
    memberSelected.status = ''

}

const openModal = async (e) => {
    await getMember(e.target.getAttribute('data-id'))
    document.querySelector('#view-full-name').value = memberSelected.name
    document.querySelector('#view-first-name').value = memberSelected.firstName
    document.querySelector('#view-last-name').value = memberSelected.lastName
    document.querySelector('#view-role').value = memberSelected.role
    document.querySelector('#view-member-number').value = memberSelected.memberNumber
    document.querySelector('#view-status').value = memberSelected.status
    document.querySelector('.view-modal-container').classList.remove('hide');
}

const getMember = async (id) => {

    const response = await fetch(`../api/member/${id}`)
    const member = await response.json()
    memberSelected.id = member._id || '',
    memberSelected.name = member.name || '',
    memberSelected.firstName = member.first_name || '',
    memberSelected.lastName = member.last_name || '',
    memberSelected.status = member.status || '',
    memberSelected.role = member.role || ''
    // return member
}

const getMembers = async() => {
    if(document.querySelector('.view-results-list')){
        console.log('here')
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

        liId.innerText = member._id
        liName.innerText = member.name
        liRole.innerText = member.role
        liViewBtn.innerText = 'VIEW'
        liViewBtn.classList.add('view-btn')
        liViewBtn.setAttribute('data-id', member._id)
        liContainer.classList.add('view-results-list')
        liView.appendChild(liViewBtn)
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
        name: document.querySelector('#add-full-name').value,
        role: document.querySelector('#add-role').value,
        first_name: document.querySelector('#add-first-name').value,
        last_name: document.querySelector('#add-last-name').value,
        status: document.querySelector('#add-status').value
    }
    const response = await fetch('../api/member', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMember)
    })
    
    return response.json()
}

const deleteMember = async(e) => {

}

const addClicked = async(e) => {
    document.querySelector('#add-full-name').value = ''
    document.querySelector('#add-first-name').value = ''
    document.querySelector('#add-last-name').value = ''
    document.querySelector('#add-role').value = ''
    document.querySelector('#add-member-number').value = ''
    document.querySelector('#add-status').value = ''
    // document.querySelector('.view-modal-container').classList.remove('hide');
    document.querySelector('.add-form').hidden = !document.querySelector('.add-form').hidden
    e.target.innerHTML = e.target.innerHTML.toLowerCase() === 'add' ? 'CLOSE' : 'ADD'
}

// Event Listeners
document.querySelector('.fetch-view-btn').addEventListener('click', getMembers)
document.querySelector('.fetch-add-btn').addEventListener('click', addClicked)
document.querySelector('.form-submit').addEventListener('click', addMember)
document.querySelector('.view-modal-close-btn').addEventListener('click', closeModal)
getMembers()