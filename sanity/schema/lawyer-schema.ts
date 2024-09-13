const lawyer = {
    name: 'lawyer',
    title: 'Lawyer',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'text',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
            },
        },
        {
            name: 'position',
            title: 'Position',
            type: 'string',
            description: 'Position of the lawyer',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {

            name: "approved",
            title: "Approved",
            type: "boolean",
            description: "Approve or disapprove the lawyer",
            defaultValue: false,
        },
        {
            name: 'specialization',
            title: 'Specialization',
            type: 'string',
            description: 'Area of specialization',
            default: 'General Practice',
        },
        {
            name: 'experience',
            title: 'Experience',
            type: 'number',
            description: 'Years of experience',
            default: 0,
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
    },
}
export default lawyer;