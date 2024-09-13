const newsletter = {
    name: 'newsletter',
    title: 'Newsletter',
    type: 'document',
    fields: [
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
    ],
};

export default newsletter;