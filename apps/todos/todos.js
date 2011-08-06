// ==========================================================================
// Project:   Todos
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

// Creates main application object
Todos = SC.Application.create();

// Creates Todo class
Todos.Todo = SC.Object.extend({
    title: null,
    isDone: false
});

// CreateTodoView
Todos.CreateTodoView = SC.TextField.extend({
    insertNewLine: function() {
        var value = this.get('value');
        if (value) {
            Todos.todoListController.createTodo(value);
            this.set('value', '');
        }
    }
});

SC.ready(function() {
    // Create main application pane and renders template 'todos.handlebars'
    Todos.mainPane = SC.TemplatePane.append({
        layerId: 'todos',
        templateName: 'todos'
    });
});

Todos.todoListController = SC.ArrayController.create({
    // Initialize the array controller with an empty array
    content: [],

    // Creates a new todo with title and adds it to array in controller
    createTodo: function(title) {
        var todo = Todos.Todos.create({ title: title });
        this.pushObject(todo);
    }
});
