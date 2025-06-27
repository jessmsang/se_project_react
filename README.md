# WTWR (What to Wear?)

## About the Project

The idea of this application is pretty simple! We make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Technologies and Techniques Used

This project was our first project to use React. It was a good opportunity to become more fluent in state management. It also uses responsive design to create a mobile-view, which includes its own CSS styling in addition to the desktop-view CSS styling. This project utilizes a weather API to provide weather data in which the app adapts to.

## Features

This app has both public cards (home page) and user-specific cards (profile page). The profile also has a sidebar that contains the button to opening a modal that can edit the user's profile (name and avatar), as well as a "Log Out" button. Each card can be clicked, and this will open the item's preview modal. If the item is owned by the current user, it will display a delete button for that particular item. New items can be added via the add item modal, which can be accesses either through the "+ Add Clothes" button in the header, or in the "+ Add new" button in the profile. For unauthorized users, the login modal will open. Within the login modal is a navigation button to the register modal for those who have yet to sign up and thus can't login yet. After signing up, the user is brought to their profile page. Users without any items will see the text "No Items Added Yet" text on their profile where the items would typically render if they had added items. There is a navigation link in the logo in the header that brings the user to the home page. The logo has a hover state that decreases its opacity to indicate to the user that it is indeed a button. The app also has a temperature toggle button that allows them to switch between Celsius and Fahrenheit. The clothing items displayed on the home page will be filtered for the current weather (cold, warm, or hot). All users' items are visible in the home page (as long as it meets the weather filter for current weather), but only the user's specifically added items will display in their own profile page. Items can be liked and unliked.

## Links

- [Figma Design](https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=1-53&t=etkoIIcY5rMGxylu-0)
- [Deployment URL](https://jessmsang.github.io/se_project_react/)
- [Back-end Repo](https://github.com/jessmsang/se_project_express)
