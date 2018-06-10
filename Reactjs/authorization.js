import React from 'react';
import ReactDOM from 'react-dom';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: 'swordfish',
      authorized: false
    };
    this.authorize = this.authorize.bind(this);
  }

  authorize(e) {
    const password = e.target.querySelector(
      'input[type="password"]').value;
    const auth = password == this.state.password;
    this.setState({
      authorized: auth
    });
  }

  render() {
    let auth;
    const login = (
      <form action="#" onSubmit={this.authorize}>
        <input type="password" placehold="Password" />
        <input type="submit" />
      </form>
      );
    const contactInfo = (
      <ul>
          <li>
            client@example.com
          </li>
          <li>
            555.555.5555
          </li>
        </ul>
    );

    if (this.state.authorized) {
      auth = <h1>Contact</h1>;
    } else {
      auth = <h1>Enter the Password</h1>;
    };

    return (
      <div id="authorization">
        {auth}
        {this.state.authorized ? contactInfo : login}
      </div>
    );
  }
}

ReactDOM.render(
  <Contact />,
  document.getElementById('app')
);
