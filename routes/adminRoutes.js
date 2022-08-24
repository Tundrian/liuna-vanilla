const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')

// const memberFields = [
//     {
//         label: 'Name',
//         id: 'name',
//         type: 'text',
//         placeholder: 'Full Name' 
//     },
//     {
//         label: 'First Name',
//         id: 'firstName',
//         type: 'text',
//         placeholder: 'First name' 
//     },
//     {
//         label: 'Last Name',
//         id: 'lastName',
//         type: 'text',
//         placeholder: 'Last name' 
//     },
//     {
//         label: 'Role',
//         id: 'role',
//         type: 'text',
//         placeholder: 'Role' 
//     },
//     {
//         label: 'Member Number',
//         id: 'memberNumber',
//         type: 'text',
//         placeholder: 'Member #' 
//     },
//     {
//         label: 'Status',
//         id: 'status',
//         type: 'text',
//         placeholder: 'Status' 
//     },
// ]
const certificateFields = [
    {
        label: 'Name',
        id: 'name',
        type: 'text',
        placeholder: 'Name' 
    },
    {
        label: 'Description',
        id: 'description',
        type: 'text',
        placeholder: 'Description' 
    },
    {
        label: 'Type',
        id: 'type',
        type: 'text',
        placeholder: 'Type' 
    },
    {
        label: 'Expiration Length',
        id: 'expirationLength',
        type: 'number',
        placeholder: 'Expiration Length' 
    }
]
const contractorFields = [
    {
        label: 'Name',
        id: 'name',
        type: 'text',
        placeholder: 'Name' 
    },
    {
        label: 'Description',
        id: 'description',
        type: 'text',
        placeholder: 'Description' 
    },
    {
        label: 'Category',
        id: 'category',
        type: 'text',
        placeholder: 'Category' 
    },
    {
        label: 'Type',
        id: 'type',
        type: 'text',
        placeholder: 'Type' 
    },
    {
        label: 'Acquire Date',
        id: 'acquireDate',
        type: 'date',
        placeholder: 'Acquire Date' 
    },
    {
        label: 'Reminder Date',
        id: 'reminderDate',
        type: 'date',
        placeholder: 'Reminder Date' 
    }
]
const trainingFields = [
    {
        label: 'Course ID',
        id: 'courseId',
        type: 'text',
        placeholder: 'Course ID' 
    },
    {
        label: 'Start Date',
        id: 'startDate',
        type: 'date',
        placeholder: 'Start Date' 
    },
    {
        label: 'End Date',
        id: 'endDate',
        type: 'date',
        placeholder: 'End Date' 
    },
    {
        label: 'Scheduled Dates',
        id: 'scheduledDates',
        type: 'text',
        placeholder: 'Scheduled Dates' 
    },
    {
        label: 'Available Slots',
        id: 'availableSlots',
        type: 'number',
        placeholder: 'Available Slots' 
    },
    {
        label: 'Open Slots',
        id: 'openSlots',
        type: 'number',
        placeholder: 'Open Slots' 
    },
    {
        label: 'Filled Slots',
        id: 'filledSlots',
        type: 'number',
        placeholder: 'Filled Slots' 
    },
    {
        label: 'Type',
        id: 'type',
        type: 'text',
        placeholder: 'Type' 
    },
    {
        label: 'Certification Name',
        id: 'certificationName',
        type: 'text',
        placeholder: 'Certification Name' 
    }
]
const dispatchFields = [
    {
        label: 'Contractor ID',
        id: 'contractorId',
        type: 'text',
        placeholder: 'Contractor ID' 
    },
    {
        label: 'Description',
        id: 'description',
        type: 'text',
        placeholder: 'Description' 
    },
    {
        label: 'Name',
        id: 'name',
        type: 'text',
        placeholder: 'Name' 
    },
    {
        label: 'Type',
        id: 'type',
        type: 'text',
        placeholder: 'Type' 
    },
    {
        label: 'Length',
        id: 'length',
        type: 'number',
        placeholder: 'Length' 
    },
    {
        label: 'Start Date',
        id: 'startDate',
        type: 'date',
        placeholder: 'Start Date' 
    },
    {
        label: 'End Date',
        id: 'endDate',
        type: 'date',
        placeholder: 'End Date' 
    }
]
const courseFields = [
    {
        label: 'Category',
        id: 'category',
        type: 'text',
        placeholder: 'Category' 
    },
    {
        label: 'Description',
        id: 'description',
        type: 'text',
        placeholder: 'Description' 
    },
    {
        label: 'Name',
        id: 'name',
        type: 'text',
        placeholder: 'Name' 
    },
    {
        label: 'Renewal Length',
        id: 'renewal-length',
        type: 'number',
        placeholder: 'Renewal Length' 
    },
    {
        label: 'Length',
        id: 'length',
        type: 'text',
        placeholder: 'Length' 
    }
]
// const userFields = [
//     {
//         label: 'Username',
//         id: 'name',
//         type: 'text',
//         placeholder: 'Username' 
//     },
//     {
//         label: 'Email',
//         id: 'email',
//         type: 'string',
//         placeholder: 'Email' 
//     },
//     {
//         label: 'Theme',
//         id: 'theme',
//         type: 'text',
//         placeholder: 'Theme' 
//     },
//     {
//         label: 'Member Number',
//         id: 'memberNumber',
//         type: 'text',
//         placeholder: 'Member Number' 
//     },
//     {
//         label: 'Created Date',
//         id: 'date',
//         type: 'date',
//         placeholder: 'Created Date' 
//     },
// ]

router.route('/').get((req,res) => {
    res.render('admin/dashboard.ejs', {
        // name: req.user.name
    })
})

router.route('/member2').get((req, res) => {
    res.render('admin/member/index.ejs', {dataType: 'member', fields: memberFields})
})

/* Admin Routes */
router.route('/member').get((req, res) => {
    res.render('admin/member/index.ejs')
})
router.route('/certificate').get((req, res) => {
    res.render('admin/admin/index.ejs', {dataType: 'certificate', fields: certificateFields})
})
router.route('/course').get((req, res) => {
    res.render('admin/admin/index.ejs', {dataType: 'course', fields: courseFields})
})
router.route('/dispatch').get((req, res) => {
    res.render('admin/admin/index.ejs', {dataType: 'dispatch', fields: dispatchFields})
})
router.route('/trainingSession').get((req, res) => {
    res.render('admin/admin/index.ejs', {dataType: 'training', fields: trainingFields})
})
router.route('/user').get((req, res) => {
    res.render('admin/user/index.ejs')
})
router.route('/contractor').get((req, res) => {
    res.render('admin/admin/index.ejs', { dataType: 'contractor', fields: contractorFields})
})

module.exports = router