import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card } from 'react-bootstrap';


export class UserBuilder {
  fullName!:    string;
  email!:       string;
  phone!:       string
  title!:       string;
  availableAs!: string[];

  build(): User {
    return new User(
      this.fullName,
      this.title,
      this.availableAs,
      this.email,
      this.phone
    )
  }

  addAvailability(...value: string[]) {
    this.availableAs.push(...value);
    return this;
  }

  withAvailability(...value: string[]) {
    this.availableAs = value;
    return this;
  }

  withFullName(value: string) {
    this.fullName = value;
    return this;
  }

  withEmail(value: string) {
    this.email = value;
    return this;
  }

  withPhone(value: string) {
    this.phone = value;
    return this;
  }

  withTitle(value: string) {
    this.title = value;
    return this;
  }
}

export class User
{
  fullName:    string;
  title:       string;
  availableAs: string[];
  email:       string;
  phone:       string;

  constructor(
    fullName: string,
    title: string,
    availableAs: string[],
    email: string,
    phone: string)
  {
    this.fullName    = fullName;
    this.title       = title;
    this.availableAs = availableAs;
    this.email       = email;
    this.phone       = phone;
  }

  static builder(): UserBuilder {
    return new UserBuilder();
  }

  displayAvailable(): string
  {
    return this.availableAs.join(', ');
  }
}

export class AppProps {
  user!: User;
}

export default function App(props: AppProps) {
  let user = props.user;
  return (
    <div data-bs-theme="dark">
      <Card>
        <Card.Header>
          <Card.Title>About Me</Card.Title>
        </Card.Header>
        <Card.Body>
          <h1>{ user.fullName }</h1>
          <h3>{ user.title } | { user.displayAvailable() }</h3>
          <p>Email: { user.email }</p>
          <p>Phone: { user.phone }</p>
        </Card.Body>
      </Card>
    </div>
  )
}

const user = User
  .builder()
  .withAvailability("Full-Time", "Contract", "Freelance")
  .withEmail("keenanwilkinson@outlook.com")
  .withFullName("Keenan W. Wilkinson")
  .withPhone("(314) 479-2014")
  .withTitle("Software Engineer")
  .build();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App user={user} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
