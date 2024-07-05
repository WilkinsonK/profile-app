/**
 * User profile objects. Includes the `User` and
 * `UserBuilder` classes.
 */

/**
 * Allows a user to declare a new `User` in a
 * building style. Composing the `User`s
 * attributes either directly or over time with
 * additional logic.
 */
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

/**
 * Common user attributes and methods associated
 * with a user.
 */
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
