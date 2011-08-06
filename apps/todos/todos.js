// ==========================================================================
// Project:   Todos
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

Todos = SC.Application.create();



// Models

Todos.Todo = SC.Object.extend({
    title: null,
    isDone: false
});



// Views

Todos.CreateTodoView = SC.TextField.extend({
    insertNewline: function() {
        var value = this.get('value');
        if (value) {
            Todos.todoListController.createTodo(value);
            this.set('value', '');
        }
    }
});

Todos.MarkDoneView = SC.Checkbox.extend({
    titleBinding: '.parentView.content.title',
    valueBinding: '.parentView.content.isDone'
});

Todos.StatsView = SC.TemplateView.extend({
    remainingBinding: 'Todos.todoListController.remaining',

    displayRemaining: function() {
        var remaining = this.get('remaining');
        return remaining + (remaining === 1 ? ' item' : ' items');
    }.property('remaining')
});



// Controllers

Todos.todoListController = SC.ArrayController.create({
    content: [
        Todos.Todo.create({ title: 'First todo' }),
        Todos.Todo.create({ title: 'This is second todo' }),
        Todos.Todo.create({ title: 'Third todo', isDone: true })
    ],

    createTodo: function(title) {
        var todo = Todos.Todo.create({ title: title });
        this.pushObject(todo);
    },

    remaining: function() {
        return this.filterProperty('isDone', false).get('length');
    }.property('@each.isDone')
});



// SC.ready

SC.ready(function() {
    Todos.mainPane = SC.TemplatePane.append({
        layerId: 'todos',
        templateName: 'todos'
    });
});
