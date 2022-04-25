const express = require("express");
const app = express();
const cors = require("cors");
var JiraClient = require('jira-connector');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cors());

var jira = new JiraClient({
    host: 'honglytech.atlassian.net',
    basic_auth:{
        username: 'honlytutorial@gmail.com',
        password:'S1GRdEvMwMKO9gYPrjqu2B71',
    },
    strictSSL: false,
});
app.get("/",(req,res)=>{
    console.log("welcome")
    res.send("welcome");
});

app.post("/",(req,res)=>{
    res.send("starts new nodejs project");
 if (req.body.status === 'success'){
    jira.issue.createIssue({
        fields:{
            project:{
                key:'HLT',
            },
            summary:'jira Rest API via nodejs library',
            description:'This Jira issue is created using jira-connector',
            issuetype:{
                name:'Story',
            },
            customfield_10014:'HLT-03',
        },
        function(error, issue){
            console.log('error', error);
            console.log('issue', issue);  
        },
    });
}else{
    console.log('status: nope');
}

});

app.listen(5000, () => console.log("listening on post 5000"));