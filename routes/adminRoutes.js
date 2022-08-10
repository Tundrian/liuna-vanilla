const express = require('express')
const router = express.Router()

const memberFields = [
    {
        label: 'Name',
        id: 'name',
        type: 'text',
        placeholder: 'Full Name' 
    },
    {
        label: 'First Name',
        id: 'firstName',
        type: 'text',
        placeholder: 'First name' 
    },
    {
        label: 'Last Name',
        id: 'lastName',
        type: 'text',
        placeholder: 'Last name' 
    },
    {
        label: 'Role',
        id: 'role',
        type: 'text',
        placeholder: 'Role' 
    },
    {
        label: 'Member Number',
        id: 'memberNumber',
        type: 'text',
        placeholder: 'Member #' 
    },
    {
        label: 'Status',
        id: 'status',
        type: 'text',
        placeholder: 'Status' 
    },
]
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
        id: 'expiration-length',
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
        id: 'acquire-date',
        type: 'date',
        placeholder: 'Acquire Date' 
    },
    {
        label: 'Reminder Date',
        id: 'reminder-date',
        type: 'date',
        placeholder: 'Reminder Date' 
    }
]
const trainingFields = [
    {
        label: 'Course ID',
        id: 'course-id',
        type: 'text',
        placeholder: 'Course ID' 
    },
    {
        label: 'Start Date',
        id: 'start-date',
        type: 'date',
        placeholder: 'Start Date' 
    },
    {
        label: 'End Date',
        id: 'end-date',
        type: 'date',
        placeholder: 'End Date' 
    },
    {
        label: 'Scheduled Dates',
        id: 'scheduled-dates',
        type: 'text',
        placeholder: 'Scheduled Dates' 
    },
    {
        label: 'Available Slots',
        id: 'available-slots',
        type: 'number',
        placeholder: 'Available Slots' 
    },
    {
        label: 'Open Slots',
        id: 'open-slots',
        type: 'number',
        placeholder: 'Open Slots' 
    },
    {
        label: 'Filled Slots',
        id: 'filled-slots',
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
        id: 'certification-name',
        type: 'text',
        placeholder: 'Certification Name' 
    }
]
const dispatchFields = [
    {
        label: 'Contractor ID',
        id: 'contractor-id',
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
        id: 'start-date',
        type: 'date',
        placeholder: 'Start Date' 
    },
    {
        label: 'End Date',
        id: 'end-date',
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

router.route('/').get((req,res) => {
    res.render('admin/dashboard.ejs')
})

/* Admin Routes */
router.route('/member').get((req, res) => {
    res.render('admin/member/index.ejs', {fields: memberFields})
})
router.route('/certificate').get((req, res) => {
    res.render('admin/certificate/index.ejs', {fields: certificateFields})
})
router.route('/course').get((req, res) => {
    res.render('admin/course/index.ejs', {fields: courseFields})
})
router.route('/dispatch').get((req, res) => {
    res.render('admin/dispatch/index.ejs', {fields: dispatchFields})
})
router.route('/trainingSession').get((req, res) => {
    res.render('admin/trainingSession/index.ejs', {fields: trainingFields})
})
router.route('/user').get((req, res) => {
    res.render('admin/user/index.ejs')
})
router.route('/contractor').get((req, res) => {
    res.render('admin/contractor/index.ejs', {fields: contractorFields})
})

module.exports = router