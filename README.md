# FootballScoreBoard - Client

=========

This project makes use of the library FootballScoreBoard which can be found [here](https://github.com/albcl/FootballScoreBoard) and displays a simple interface with two input fields for adding (starting) matches, a list of currently active matches where we can also increase their score or finish matches, and also a sorted list by total score of active matches.

## Installation

`yarn install` or `npm install`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Notes

It has been built with `Typescript` and tested with `Testing Library`. Helped by a small github action to run all tests before merging.

Because of the necessity of accessing the information provided by our package` FootballScoreBoard` by many different components, I have made use of `React Context` in order to make it simpler and cleaner, avoiding passing data top-down via props when possible.

Also, looking for transparency for the user, the component in charge of initialising a new `Board()` has been wrapped with a High Order Component which will make sure everything below that point will have access to the Context wrapping it up in the Context.Provider and passing a new Board to the context when initialised. All of this will be transparent to the user who only needs to include a <LiveScoreBoard /> component to make use of it. Therefore, we would be able to add as many _live score boards_ in the same screen, or application, as we want without getting any crossed-data issues.

In terms of styling, I have avoided making any complex or thorough styling of components. I have included the bare minimum details to help and improve the use of the interface. As a small sample of how I would have stored some styled components if there were any, I have added a <Button/> component under the <ActiveMatchesList/> component's folder, in a folder called `styledComponents`. There I would normally add any styled component related to the parent component. If it was a generally shared component, it would have gone into a design system maintained outside of this project.
