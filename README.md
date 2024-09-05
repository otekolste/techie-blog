# Techie Blog!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Welcome to the Techie Blog! This platform allows users to connect with other developers by creating accounts, creating posts, and commenting on others' posts; users can also edit and delete their existing posts. This project was built using TailwindCSS, Sequelize, Express, Node.js, and PostgreSQL, and was the result of my practicing full-stack development, combining frontend and backend development to create a functioning application!

## Usage

Go [here](https://techie-blog-w2h7.onrender.com/) to check it out!

When you open the site, you should see the homepage as follows. To do anything on this site other than view the front page, you need to create an account. You can click "login" or any of the links and you will be redirected to the homepage.

![Website homepage](/public/images/techblog-1.png)

Assuming that you don't have an account, you can click the "create account" button to be redirected to the signup form. Enter a username and password.

![Website login page](/public/images/techblog-2.png)

The site will automatically sign you in with those credentials. Now that you have access to the site, you can comment on others' posts and create your own! Click on a post to be redirected to that page.

![!Post details page](/public/images/techblog-3.png)

At the bottom, you'll see a box to allow you to enter a comment, plus any existing comments. You can use this to add comments.

![Post with 2 comments](/public/images/techblog-4.png)

To view any posts you have created, you can click on the dashboard tab at the top. This is also where you can make a new post.

![Website dashboard](/public/images/techblog-5.png)

Click the "new post" button to be redirected to the post creation form. Fill out the fields with whatever's on your mind!

![Post creation form](/public/images/techblog-6.png)

Once you've created the post, you'll be redirected to your dashboard, with your newly-created post showing!

![Dashboard displaying 1 post](/public/images/techblog-7.png)

If you change your mind about what you've posted, simply click on that post link from your dashboard. You'll be redirected to the edit post form, which will pre-fill what you inputted. Here, you can edit or delete your post, before re-submitting.

![Edit post form](/public/images/techblog-7.png)

## Credits

### Packages used:

- [TailwindCSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/en) and [Express](https://expressjs.com/)
- [Express handlebars](https://www.npmjs.com/package/express-handlebars)
- [Express Session](https://www.npmjs.com/package/express-session)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [PG](https://www.npmjs.com/package/pg)
- [Dotenv](https://www.npmjs.com/package/dotenv)

This site is also hosted using the free tier of Render.

### Code referenced:

All of the styling was created using [tailblocks](https://tailblocks.cc/), which can be viewed here! (Everything in the views directory)
The login.js, logout.js (public/js), and user-routes.js (controllers/api) were based off of instructional code provided by edX.

## License

This project is covered by the MIT license. For more information, click the badge at the top of this file or check out the LICENSE file in the root directory.
