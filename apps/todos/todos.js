// ==========================================================================
// Project:   Todos
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

Todos = SC.Application.create({
    store: SC.Store.create().from(SC.Record.fixtures)
});



// Models

Todos.Todo = SC.Record.extend({
    title: SC.Record.attr(String),
    isDone: SC.Record.attr(Boolean, { defaultValue: NO })
});



// Fixtures

Todos.Todo.FIXTURES = [
    {   guid: "todo-1",
        title: "Build my first Sproutcore app",
        isDone: false
    },
    {   guid: "todo-2",
        title: "Build a really awesome Sproutcore app",
        isDone: false
    },
    {   guid: "todo-3",
        title: "Start using VIM",
        isDone: true
    },
    {   guid: "todo-4",
        title: "Next, the world!",
        isDone: false
    }
];



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

Todos.StatsView = SC.TemplateView.extend({
    remainingBinding: 'Todos.todoListController.remaining',

    displayRemaining: function() {
        var remaining = this.get('remaining');
        return remaining + (remaining === 1 ? " item" : " items");
    }.property('remaining')
});



// Controllers

Todos.todoListController = SC.ArrayController.create({
    content: [],

    createTodo: function(title) {
        Todos.store.createRecord(Todos.Todo, { title: title });
    },

    clearCompletedTodos: function() {
        this.filterProperty('isDone', true).forEach(function(item) {
            item.destroy();
        });
    },

    remaining: function() {
        return this.filterProperty('isDone', false).get('length');
    }.property('@each.isDone'),

    allAreDone: function(key, value) {
        if (value !== undefined) {
            this.setEach('isDone', value);
            return value;
        }
        else {
            return this.get('length') && this.everyProperty('isDone', true);
        }
    }.property('@each.isDone')
});



// SC.ready

SC.ready(function() {
    Todos.mainPane = SC.TemplatePane.append({
        layerId: 'todos',
        templateName: 'todos'
    });

    var todos = Todos.store.find(Todos.Todo);
    Todos.todoListController.set('content', todos);
});
