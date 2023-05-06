export const users = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@nomail.com',
        password: 'password',
        active: true,
        type: 'student',
        user_name: 'johndoe',
        student_number: '12345678',
    },
    {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@nomail.com',
        password: 'password',
        active: true,
        type: 'teacher',
        user_name: 'janedoe',
    },
    {
        first_name: '',
        last_name: '',
        email: 'admin@admin.com',
        password: 'admin',
        active: true,
        type: 'admin',
        user_name: 'admin',
    }
]

export const grades = [
    {
        title: 'First Partial',
        comment: 'Good job',
        mark: '8.5',
        date: new Date('December 17, 1995 03:24:00'),
        pass: true,
        final: false,
    },
    {
        title: 'Second Partial',
        comment: 'You can do better',
        mark: '6.5',
        date: new Date('April 25, 1996 00:00:00'),
        pass: true,
        final: false,
    },
    {
        title: 'Homework 1',
        comment: '3rd answer needs more work',
        mark: 'Approved',
        date: new Date('May 12, 1996 00:00:00'),
        pass: true,
        final: false,
    },
    {
        title: 'Team Project',
        comment: 'EVERYTHING IS WRONG',
        mark: '2.5',
        date: new Date('May 30, 1996 16:09:00'),
        pass: false,
        final: false,
    },
    {
        title: 'Homework 2',
        comment: 'I need more details in every answer',
        mark: '5.0',
        date: new Date('June 7, 1996 20:23:00'),
        pass: true,
        final: false,
    },
    {
        title: 'Third Partial',
        comment: 'Great work',
        mark: '9.5',
        date: new Date('July 3, 1996 05:24:00'),
        pass: true,
        final: false,
    },
    {
        title: 'Final Exam',
        comment: 'You did great',
        mark: '7.5',
        date: new Date('September 13, 1996 12:26:00'),
        pass: true,
        final: false,
    },
    {
        title: 'Final Grade',
        comment: 'You passed, congrats',
        mark: '8.0',
        date: new Date('September 13, 1996 12:26:00'),
        pass: true,
        final: true,
    },
]

export const carreers = [
    {
        name: 'Computer Science',
        notes: 'Carreer Plan 2013'
    },
    { name:'Business Administration' },
    { name: 'Engineering' }
]

export const subjects = [
    [
        'Introduction to Programming',
        'Data Structures and Algorithms',
        'Computer Networks',
        'Operating Systems',
        'Software Engineering',
        'Database Systems',
        'Computer Architecture',
        'Artificial Intelligence',
        'Machine Learning',
        'Computer Graphics',
        'Human-Computer Interaction',
        'Computer Security',
        'Web Development',
        'Mobile App Development',
        'Cloud Computing',
        'Diseño Multimedia',
    ],
    [
        'Accounting',
        'Marketing',
        'Finance',
        'Management',
        'Human Resources',
        'Operations Management',
        'Strategic Management',
        'Organizational Behavior',
        'Business Law',
        'Economics',
        'Entrepreneurship',
        'International Business',
        'Business Ethics',
        'Information Systems',
        'Business Communication'
    ],
    [
        'Calculus',
        'Physics',
        'Chemistry',
        'Statics',
        'Dynamics',
        'Thermodynamics',
        'Materials Science'
    ]
]