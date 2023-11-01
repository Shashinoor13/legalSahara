const project = {
    name : 'project',
    title: 'Projects',
    type : 'document',
    fields: [
        {
            name: 'author',
            title: 'Author',
            type: 'string',
            description: 'Name of the author',
            default: 'Renisha Ghimire',
        },
        {
            name:'authorImage',
            title:'Author Image',
            type:'string',
            options:{
                hotspot:true,
            }
        },
        {
            name : 'name',
            title: 'Name',
            type : 'string',
            description: 'Name of the project',
        },
        {
            name : 'slug',
            title: 'Slug',
            type : 'slug',
            options :{
                source : 'name',
            }
        },
        {
            name : 'image',
            title: 'Image',
            type : 'image',
            options :{
                hotspot : true,
            },
            fields : [
                {
                    name : 'alt',
                    title: 'Alternative text',
                    type : 'string',
                },
            ]
        },
        {
            name:'url',
            title:'URL',
            type:'url',
        },
        {
            name : 'content',
            title: 'Content',
            type : 'array',
            of : [
                {
                    type : 'block',
                },
            ],
        }
    ]
}

export default project;