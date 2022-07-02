import ko from 'knockout';
import { Router } from '@profiscience/knockout-contrib-router';
//import { initializerPlugin, INITIALIZED } from '@profiscience/knockout-contrib-router-plugins-init'
//import "regenerator-runtime/runtime";

// import TasksViewModel from './tasks/tasks-viewmodel';
// import TasksTemplate from './tasks/tasks-template.html';

import UserViewModel from './users/user-viewmodel';
import UserTemplate from './users/user-template.html';

Router.use(loadingMiddleware);

class MyComponentViewModel {
  constructor() {
    this.isInitialized = ko.observable(false);
    // this[INITIALIZED] = this.init()
    // this.init = this.init.bind(this);
  }

  // async init() { 
  //   this.isInitialized(true);
  // }
}

ko.components.register('my-component', {
  viewModel: MyComponentViewModel,
  template: `<span data-bind="text: isInitialized"></span>`
});



function createOuterTemplate(foo) {
  return `
    <h1>${foo}</h1>
<span data-bind="text: new Date().getMilliseconds()"></span>
    These begin with '/', so they route using the current (containing) router
    <br>
    <a data-bind="path: '/foo'">/foo</a>
    <a data-bind="path: '/bar'">/bar</a>

    <br>
    <br>

    This begins with './', so it is routed using the child (adjacent) router
    <br>
    <a data-bind="path: './baz'">./baz</a>
    <a data-bind="path: './qux'">./qux</a>
    <br>
    <br>

    This begins with '//', so it is routed using the root router
    <br>
    <a data-bind="path: '//${foo}/baz'">//${foo}/baz</a>
    <a data-bind="path: '//${foo}/qux'">//${foo}/qux</a>    
    <router></router>
  `;
}

function createInnerTemplate(foo) {
  return `
    <h2>${foo} INNER</h2>

    These begin with '/', so they route using the current (containing) router
    <br>
    <a data-bind="path: './baz'">/baz</a>
    <a data-bind="path: './qux'">/qux</a>
  `;
}

ko.components.register('empty', { template: '<span></span>' });

ko.components.register('foo', { template: createOuterTemplate('foo') });
ko.components.register('bar', { template: createOuterTemplate('bar') });
ko.components.register('baz', { template: createInnerTemplate('baz') });
ko.components.register('qux', { template: createInnerTemplate('qux') });

ko.components.register('user', {
  viewModel: UserViewModel, 
  // class UsersViewModel {
  //   constructor(ctx) {
  //     this.user = ko.observable('Carlos');
  //     this.logUser = this.user.bind(this);
  //   }

  //   logUser() {
  //     console.log(this.user);
  //   }
  // },
  template: UserTemplate 
  // `
  //   <div data-bind="text: user"></div>
  // `
})

// ko.components.register('tasks', {
//   viewModel: TasksViewModel,
//   template: TasksTemplate,
//   synchronous: true
// })

Router.useRoutes({
  // '/': 'my-component',
  '/': 'user',
  '/foo': [
    'foo',
    {
      '/': 'empty',
      '/baz': 'baz',
      '/qux': 'qux'
    }
  ],
  '/bar': [
    'bar',
    {
      '/': 'empty',
      '/baz': 'baz',
      '/qux': 'qux'
    }
  ],
});


function loadingMiddleware(ctx) {
  return {
    beforeRender(/* done */) {
      //console.log('[router] navigating to', ctx.pathname);
    },
    afterRender() {
      console.log(
        '[router ' + ctx.router.depth + '] navigated to:',
        ctx.pathname
      );
    },
    beforeDispose() {
      console.log('[router] navigating away from', ctx.pathname);
    },
    afterDispose() {
      console.log('[router] navigated away from', ctx.pathname);
    }
  };
}



ko.applyBindings({});
