🌠 Click here to use the app: https://angular-shiftbuilder.netlify.app

🖥️ Desktop Screenshots: [Login](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/f77fefce-d66a-43b8-ab6c-d6d52bce6bb7) | [Register](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/78089882-3a1f-4963-95d2-49a13d2d4c61) | [Register2](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/aece6249-d070-45d3-a161-4b893cf43255) | [Profile](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/f3d833e9-6666-48b0-a59e-6197ad183c72) | [Shift adding](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/37753c46-ed0d-491c-a329-bc001b06aa7a) | [Shifts](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/7a62eed7-1f71-46e6-880e-9cec020d0615) | [Admin - Shifts - Statistics](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/f85aa607-7148-4e35-a590-ec7d99641861) | [Admin - Employees](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/f91c55cb-0254-4285-a054-999abd3d1a85)

📱 Mobile Screenshots: [Register](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/ceab277a-26d4-4061-8c01-09cbd3fdc725)
 | [Shifts](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/07583c73-77a2-431d-bfb9-002a7749b669) (horizontal scrolling) | 
[Profile](https://github.com/anghel-gabriel/Angular-Firebase-Shiftbuilder/assets/129520009/da9a57a1-c0a4-4257-b114-1e6ff4a2cb00)










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
