This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It contains two simple carousels components with different effect.

## How to run the web app ?

1. Run the development server, if you are going to continue developing the project.
   Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.<br>
   There are mainly three pages:<br>
   1. '/', this is home page, showing a high performant carousel, supports screen width of 720, 1080 and 1600+.It will auto-detect the size of screen and accordingly auto-decide that how many items to show in viewport.
   2. '/tvshows' this includes another version of carousel, which is slidable with animation effect. It supports all screen size and auto decide when to slide the carousel by detecting the first and last item within viewport.
   3. '/program' this is the detail page of a movie, it is purely static sent from server side, so it is also SEO friendly, think how easy to find a movie detail page via Google search.


```bash
npm run dev
```
Development (npm run dev):

During development, you typically use the command npm run dev.
The Next.js development server compiles the code on-the-fly and serves it from memory.
The .next folder is used to store temporary build artifacts and is not meant to be deployed.
2. Run unit test file with jest, this will run all unit test cases

```bash
npm run test
```
3. Run Production ready web app on your local machine:

```bash
npm run build
npm run start
```
Production (npm run start after npm run build):

Before deploying to production, it's common to run npm run build to generate optimized and bundled production-ready code.
After the build process, you can use npm run start to start the production server.
The production server serves the application using the optimized code in the .next folder.
The .next folder in production contains the statically generated pages, serverless functions, and other artifacts needed for deployment.

4. If your local environment does not have proper environment, run Production ready web app in a docker image

```bash
docker build . -t my-image:1.0.0
docker run -p 4000:4000 my-image:1.0.0
```
Open [http://localhost:4000](http://localhost:4000) with your browser.
The first '4000' is the port on the host machine (your local machine);
The second '4000' is the port inside the Docker container.

This means that any traffic sent to port 4000 on your local machine will be forwarded to port 4000 inside the Docker container.

Please make sure your local port 4000 is empty, run following to check:

```bash
lsof -i :4000
```
 or you may kill any server running on 4000 by:
```bash
kill -9 <PID>
```
For deployment, pushing the built/production-ready image to AWS ECR, then pull the docker image on EC2 then running it publicly.

## How did you decide on the technical and architectural choices used as part of your solution?
1. React/Next js SSR <br>
This is a React web application built by Next.js, by utilising it's Server Side Rendering (SSR), this media web app can have: <br>
* Improved Performance
* Search Engine Optimization (SEO)
* Social Media Sharing
* Better Accessibility

All non-interactive elements, including logo, site menu and program details page with rich text content are SSR, the other parts that audiences would need to interact with are client side.<br>

2. Redux <br>
Since the carousels are highly interactive, Redux action is a nice solution to update web-wide data that would need to sharing between pages. For example, current page number, current select item, and program's data.<br>

3. Dynamic import<br>
This feature allows the page to render static content on the server before sending to browser, while keep the remaining part interactive on client side.<br>
4. Lazy loading<br>
Since there are many of images to load, With image lazy loading, images are loaded only when they come into the user's viewport, reducing the initial page load time.
5. Suspense <br>
   Suspense helps manage the loading states of components and improves the user experience by avoiding abrupt loading transitions<br>
6. Global state store
   By utilizing redux store, all data could be loaded and stored under hood without impact user experience, and only load needed part of data to show on screen between pages.
7. High Order Components <br>
   The HOC helps me wrapping the selected item in the carousel, which is easy to re-use in any other cases.<br>
8. Custom hooks <br>
   custom hooks is useful when it comes to lots of business logic, side effects between renderings, and local state changes. By put those logics into custom hooks, it is easy to debug, update or maintain in one place.



## Are there any improvements you could make to your submission?

1. Improve performance by splitting components to even smaller, so every single components would responsible for few or only one task, it allows the codes to be maintainable.
2. In this project, I've create two carousels with different functionality, but similar components. I would like to even consider merging them as one, but also need to consider the complexity of multi-function components. Keep balance between re-usability and maintainable.
3. The carousel in '/tvshows' is less performant due to using IntersectionObserver api from the browser. I would like to figure out a better way to achieve the same results while improve its performance.
4. bundle more business logic into custom hooks to keep codes clean and readable for others.
5. avoid or remove side effects that causes unnecessary re-renders to children components by using useCallback and useMemo hooks.
6. Restructure the path of each page, utils, constants and components, if the app is keep growing, it needs a more clearly structure to maintain and develop.
7. Make '/program' page more responsive on different size of screens.

## What would you do differently if you were allocated more time?

I have done two versions of carousel. I just want to see which one is better.So it took me around 7 hours during the weekend to get everything done and works.
But If I have more time on this, I would like to discover a more performant, user-friendly and stable solution to create a super nice carousel, even could upload it to npm for sharing.
Also I would spend more time on unit test to the key business logics in each components. Anyway, it's always very pleasure to me to be creative and create something.

My current project is confidential in company, it is a media site that also implements some techniques I used in this practice. Something similar to Ticktok, a web version of short video carousals contains many short videos.


## What else?

I'm a fan of front end developer for many years, but also have knowledge of back end api design/fix/update and docker image deployment with painless CI/CD, my mission is to create the best of the best user interface of applications. My current role is to create great web apps UI to attract more audiences and their staying time on pages.Looking forward to hear from you!

## Cheers! :)
Ke (pronunced as key) Z