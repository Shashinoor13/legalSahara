const news = {
    name: 'news',
    title: 'News',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: "Title",
            type: "string",
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
            name: 'image',
            title: 'Image',
            type: 'image',
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

export default news;