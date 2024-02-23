🌠 Click here to use the app: https://angular-shiftbuilder.netlify.app

🖥️ Desktop Screenshots: [Login](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/f77fefce-d66a-43b8-ab6c-d6d52bce6bb7) | [Register](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/78089882-3a1f-4963-95d2-49a13d2d4c61) | [Register2](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/aece6249-d070-45d3-a161-4b893cf43255)




# Developer's Contribution

## External Libraries Used

- **PrimeNG:** My favourite Angular component library.
- **Tailwind CSS:** Used to style what PrimeNG couldn't. More efficient than SCSS - less code, not moving between HTML and SCSS files.
- **File-saver and XLSX:** To export shifts to Excel files.
- **Firebase:** To handle authentication, to store, sync, and query data from everywhere.
- **chart.js:** For creating charts and graphs.

## Features of Angular Used

- Template driven forms.
- Services, observables.
- Some new Angular syntax (e.g., `@ngIf`).
- rxJS, for reactive programming.
- Pipes (mostly date pipe variations).
- Guards.

## Areas for Improvement

- Improve security.
- Improve fetching.
- Improve type checking.
- Improve code quality.

---

# Project Requirements

## Project's Target

- Managing my shifts in my various jobs.
- Create an administrator side that can manage the shifts of all the workers.
- Management of hours by workplace.
- Generate reports and statistics according to various filters.
- Create a responsive page suitable for desktop and cell phones screens.

## Goals

- Writing client side with Angular.

## App Environments

- Internet environment.
- Suitable for tablets and smartphones.

## Infrastructures

- Angular
- HTML
- CSS
- JavaScript

## Architectural and Technological Requirements

### Regular Worker

#### Registration Page

- **Email:** An email field in an email format (Mandatory).
- **Password:** At least 6 characters long.
- **Password Confirmation:** Must be the same as the first inserted password.
- **First Name:** Including at least 2 characters.
- **Last Name:** Including at least 2 characters.
- **Birth Date:** The derived age must be between 6 and 130.
- **Register Button:** Clicking on the register checks that all conditions are true and the data is saved via the server.
- **After successful registration,** the user will go to the home page, which includes a top bar menu.

#### Login Page

- **Username Input:** At least 6 characters long.
- **Password Input:** At least 6 characters long.
- **Login Button:** After clicking, the data is saved via the server.

#### Home Page

- Top navbar menu.
- Body of the homepage will contain statistics components about the shifts.

#### My Shifts Page

- A table that shows all the shifts.

#### Adding a Shift Page

- Form to add a new shift.

#### Editing a Shift Page

- Similar to add a shift page but for editing.

#### Profile Editing Page

- Allows the user to edit his details.

### Administrator

#### Registration Page

- Same registration page as for regular workers.

#### Login Page

- Same login page as for regular workers.

#### Home Page

- Top navbar menu.
- Body of the homepage will contain statistics components about the workers.

#### All Shifts Page

- Shows all the shifts of all the workers.

#### All Workers Page

- Shows the profiles of all the workers.

#### Worker Profile Editing Page

- Allows editing of worker details.

#### Filter Shifts Of A Single Worker Page

- Shows all the shifts of the chosen worker.
