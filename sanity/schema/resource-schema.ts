const resource = {
    name: "resource",
    title: "Resource",
    type: "document",
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'url',
        },
        {
            name: 'file',
            title: 'File',
            type: 'file',
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
                source: 'title',
            },
        },
    ]
}

export default resource;