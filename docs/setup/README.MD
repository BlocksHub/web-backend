# BlocksHub First Time Setup

First, make sure you have the following (required) software installed:
- **NodeJS** (Preferably latest LTS version - currently 14.x)
- **MySQL 5.7**
- **Redis** (Latest LTS Version). If you are on Windows, I highly recommend getting [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10), and then installing Redis through that (using Ubuntu).
- **Git**
- **Text Editor/IDE** (Preferably VSCode)

There are also some third-party services you will need:
- **3 Aws S3 (or S3 Compatible) Buckets**. Vultr is a good option, as they only charge $5/Month for unlimited buckets, so using different buckets for development and production is cheap.
- **Google Recaptcha V2 and V3 API Keys**. Go [here](https://www.google.com/recaptcha/about/) and click on "Admin Console" to create then.

There are also some optional third-party services you can setup:
- **PayPal Account & Rest API ClientID, Secret, and Email** Required for PayPal support, although PayPal support is currently disabled
- **CoinPayments Account & Public and Private API Keys** Required for CoinPayments support
- **Mailjet Account & Public and Private API Keys** Required for sending emails
- **IP Quality Score Account and API Key** Required for fraud checks, VPN checks, etc

## Final Note
Remember that Google and Stackoverflow are your friends. If you get any errors, try Googling them: chances are, you aren't alone, and it may even be common. Only open issues or contact maintainers when you know the issue is with BlocksHub itself, and not your environment.

## 1) Pulling the Repo
Create a new folder where you want the project to be stored. It is likely you will be pulling multiple BlocksHub repositories, so creating a folder called "BlocksHub", and then creating another folder inside that called "web-backend" might be a good idea.

If you use VSCode, you should open the "web-backend" folder in it

Open up a terminal (preferably in your IDE/Editor) and enter the web-backend directory (if you aren't already in it). Enter the following command into your terminal
```
git clone git@github.com:BlocksHub/web-backend.git .
```
This will install `BlocksHub/web-backend` into your `web-backend` folder.

## 2) Installing Dependencies
Enter the following command into your terminal:
```
npm i
```
This will "i" (install) the node dependencies required for this project.

***Note:** Get any errors that mention `node-gyp`, c++ guilding, or "no compiler found"? Check out [C++ Errors](#c-errors)*

## 3) Configuration
Make sure you have MySQL Database and a MySQL user with access to that Database. Also make sure you have saved your MySQL Username and Password somewhere (Please don't use the root account as you might accidentally drop a database, or expose a database!)

Create a file called `config.json` in the **root** of the project directory (for instance, inside the `web-backend` folder). Next, go through the JSON key information in [docs/config/README.MD](../config/README.MD) to see how to configure everything.

## 4) DB Migration
Currently, you should have an empty database, so it's time to change that: run `npx knex migrate:latest` to start the Database migration. This creates all the necessary DB Tables and starting data. This should take a minute or so.

## 5) Starting
After everything is setup, run `npm start:dev` to start the development server. This should take about a minute, however, it may take longer (though anything over than 3 minutes likely indicates something is wrong!).

Now, you can go to http://localhost:3000 to browse your `web-backend` server!

## Troubleshooting
Various errors can happen during first time setup. Here is some information about common errors and how to fix them.

---

#### C++ Errors:
**"node-gyp"** errors, "**no compiler found**", "**c++ building**" errors

**Windows:** There's a few ways to fix this: one is to open powershell as administrator and run `npm install --global windows-build-tools`, however, this doesn't always work. Another fix is to install [Visual Studio Community (Free)](https://visualstudio.microsoft.com/downloads/), and install `Microsoft Visual C++ Build Tools`. If you still get errors after all that, try installing Visual Studio Community 2017 (then C++ Build Tools), and Visual Studio Community 2015 (then C++ Build Tools).

**Linux:** Enter `sudo apt-get install build-essetial` into your terminal to get C++ Build tools, then re-run `npm i`

If nothing above fixed your issues, use Google (or browse through the Troubleshooting section).

---

#### Python Errors:
Python is really annoying to deal with (and is one of the many reasons I'm not a fan of it). Nevertheless, python is (unfortunately) required by some dependencies used by this project.

If you get a python-related error during the installation of a package (or during the installation of all packages), there are a few possible solutions.

**Windows:** Make sure you've gone through the [C++ Errors Section](#c-errors), as some of the methods provided might fix the issue you're getting. If python is already installed, try to install a different version (e.g. if you have python3, install python2 and see if that fixes anything, or vice versa). If you don't have python, [get it here](https://www.python.org/downloads/). It's unlikely the latest version will work, but try it, and uninstall and try an older version, until you eventually find one that works (don't jump from the latest to 2.x though, just keep going down minors, then try 2.7).

**Linux:** Run `npm i python-dev` and retry your command.

If nothing above fixed your issues, use Google (or browse through the Troubleshooting section).