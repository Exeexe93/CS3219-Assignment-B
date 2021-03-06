# CS3219-Assignment-B

[![travis status badge](https://travis-ci.com/Exeexe93/CS3219-Assignment-B.svg?branch=master)](https://travis-ci.com/github/Exeexe93/CS3219-Assignment-B)

Things to take note: Project root directory is the directory where the README.md is at.

## Part B1

Instructions on how to run the API locally and access the deployed API:

1. In order to run this assignment, you are required to download [NodeJs](https://nodejs.org/en/download/), [MongoDb](https://www.mongodb.com/try/download/community) and [PostMan](https://www.postman.com/).

2. Clone the code from [github repository](https://github.com/Exeexe93/CS3219-Assignment-B.git)

3. After cloning the code, change directory to the application folder by **cd application** from the project root directory.

4. Then, you are required to install the relevant node modules via command prompt using **npm install**.

5. You could run the Mongodb database by **nodemon index**.

6. Afterwards, we could start accessing the PostMan to communicate with our database.

7. In the PostMan, we could communicate with our database by the different functions via the following url address:

- http://localhost:8080/api/contacts

  1. Get all contacts:

     1. Input the url address.
     1. Change to **Get** request.
     1. Press the **Send** button.
     1. You should get all contacts in the body of the reply below.

  1. Create new contact:
     1. Input the url address.
     1. Change to **Post** request.
     1. Select the body tab.
     1. Under the x-www-form-urlencoded tab, fill in the name, email, phone and gender with their values.
     1. Press the **Send** button.

- http://localhost:8080/api/contacts/{input the contact id here}

  1. Get the details of the individual contact:

     1. Input the url address.
     1. Change to **Get** request.
     1. Press the **Send** button.
     1. You should get the contact details in the body of the reply below.

  1. Update the details of the individual contact:

     1. Input the url address.
     1. Change to **Put** request.
     1. Select the Body tab.
     1. Under the x-www-form-urlencoded tab, fill in the name, email, phone and gender with their values.
     1. Press the **Send** button.
     1. The contact is updated with the values you have key.

  1. Delete the individual contact from the database:
     1. Input the url address.
     1. Change to **Delete** request.
     1. Press the **Send** button.
     1. The contact should be deleted from the database.

## Part B2

1. Instructions on run test locally:

   1. Do the step 1-4 for [Part B1](#Part-B1)

   1. Run **npm run test** to run mocha to test on the code.

1. Instructions on run test via travis:

   1. Go to [travis website](https://travis-ci.com/).

   1. Go to setting, under **Respositories** tab, click on Manage respositories on Github.

   1. Login to your github if required.

   1. Under the respository access, either select all respositories or only select **CS3219-Assignment-B** respository.

   1. Afterward, make sure that you have **.travis.yml** file at the root directory, which is the same directory as README.md.

   1. If not, create a new file called **.travis.yml** and put the following details into it:

      ![.travis.yml](https://github.com/Exeexe93/CS3219-Assignment-B/blob/master/images/travis.PNG?raw=true)

   1. After setting up the .travis.yml file, you can edit the README.md and push it to your repository and the travis will run the test.

## Part B3

1. Communicate with the deployed API in AWS lambda via PostMan.

1. The steps for communicate to AWS lambda are the same as [Part B1](#Part-B1).

1. Do take note that, the url address are different from communicate to localhost.

You are required to use:

- https://uq49cg4meg.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts instead of using http://localhost:8080/api/contacts.

- https://uq49cg4meg.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts/{input the contact id here}
  instead of http://localhost:8080/api/contacts/{input the contact id here}.

## Part B4

1. You are required to run the backend by change directory to the application folder and type **nodemon index** in the command prompt.

1. 2. Open a new command terminal and change directory to the frontend folder by **cd application/frontend** from the project root directory.

1. Next, run **npm run serve** to run the website.

1. You could interact with the API via the website:

   1. Get all contacts:

      1. Clicking on the **Get All Contacts** button
      1. The contacts should be displayed at the bottom.

   1. Create new contact:

      1. Fill in the name, email, phone and gender.
      1. Press the **Add new Contact** button.
      1. The list for the contacts should be updated.

   1. Update contact:

      1. Fill in the contact id (required).
      1. Fill in the data you want to replace for the contact.
      1. Press the **Update Contact** button.
      1. The list for the contacts should be updated.

   1. Delete contact:

      1. Fill in the contact id (required).
      1. Press the **Delete contact** button.
      1. The contact should be remove from the list below.
