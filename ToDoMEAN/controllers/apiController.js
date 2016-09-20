//STEP 4 - Now that we have test data, we need to add get post and delete functionality
var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    //using bodyParser middleware to get our json object
    app.use(bodyParser.json()); //parse out the json from our http request's body
    app.use(bodyParser.urlencoded({ extended: true })); //handle special data (certain characters converted to %number)
    
    //GET - get all the todos for a particular person, depending on name asked for
    app.get('/api/todos/:uname', function(req, res) {
        
        //use mongoose function to find all users with the name I provided
        Todos.find({ username: req.params.uname }, function(err, todos) {
            if (err) throw err;
            
            res.send(todos); //final http response to send back the results
        });
        
    });
    
    //GET - individual to do by id
    app.get('/api/todo/:id', function(req, res) {
       
       //mongoose method
       Todos.findById({ _id: req.params.id }, function(err, todo) {
           if (err) throw err;
           
           res.send(todo); //final http response
       });
        
    });
    
    app.post('/api/todo', function(req, res) {
        
        //body-parser gives us .body, is json data converted to a js object
        //if an id exists, update the document
        if (req.body.id) {
            //takes id to update and properties we want to update, and finally a function to run when finished updating
            Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
                if (err) throw err;
                
                res.send('Success');
            });
        }
        //otherwise, create a new entry
        else {
           
           var newTodo = Todos({
               username: 'test',
               todo: req.body.todo,
               isDone: req.body.isDone,
               hasAttachment: req.body.hasAttachment
           });
           //and save the new entry
           newTodo.save(function(err) {
               if (err) throw err;
               res.send('Success');
           });
            
        }
        
    });
    
    //DELETE
    app.delete('/api/todo', function(req, res) {
        
        Todos.findByIdAndRemove(req.body.id, function(err) {
            if (err) throw err;
            res.send('Success');
        })
        
    });
    
}