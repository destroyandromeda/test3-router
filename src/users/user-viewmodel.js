import ko from 'knockout';

export default class UserViewModel {
  constructor(ctx) {
    this.user = ko.observable('Carlos');
    this.logUser = this.user.bind(this);
  }

  logUser() {
    console.log(this.user);
  }
}