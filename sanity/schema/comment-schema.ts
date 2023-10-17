
 const comment = {
    name: "comment",
    type: "document",
    title: "Comment",
    fields:[
        {
            name: "name",
            type: "string",
            title: "Name",
            readOnly:true,
        },
        {
            name: "email",
            type: "string",
            title: "Email",
            readOnly:true,
        },
        {
            name: "comment",
            type: "text",
            title: "Comment",
            readOnly:true,
        },
        {
            name : "post",
            type: "reference",
            to: [
                {type: "project"}
            ],
        }
    ]
}

export default comment;