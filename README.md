# CS3219-Assignment-B

## Part B1

Instructions on how to run the API locally and access the deployed API.

1) In order to run this assignment, you are required to download [NodeJs](https://nodejs.org/en/download/), [MongoDb](https://www.mongodb.com/try/download/community) and [PostMan](https://www.postman.com/).

2) Clone the code from [github repository](https://github.com/Exeexe93/CS3219-Assignment-B.git)

3) After cloning the code, you are required to install the relevant node modules via command prompt using **npm install** at the root directory, which at the same as index.js.

4) You could run the Mongodb database by **nodemon index**.

5) Afterwards, we could start accessing the PostMan to communicate with our database.

6) In the PostMan, we could communicate with our database by the different functions via the following url address:

* http:///localhost:8080/contacts

    1. Get all contacts:
        1. Under Body tab, input the url address.
        1. Change to **Get** request.
        1. Press the **Send** button.
        1. You should get all contacts in the body of the reply below.

    1. Create new contact:
        1. Under Body tab, input the url address.
        1. Change to **Post** request.
        1. Under the x-www-form-urlencoded tab, fill in the name, email, phone and gender with their values.
        1. Press the **Send** button.

* http:///localhost:8080/contacts/{input the contact id here}

    1. Get the details of the individual contact:
        1. Under Body tab, input the url address.
        1. Change to **Get** request.
        1. Press the **Send** button.
        1. You should ge the contact details in the body of the reply below.

    1. Update the details of the individual contact:
        1. Under Body tab, input the url address.
        1. Change to **Put** request.
        1. Under the x-www-form-urlencoded tab, fill in the name, email, phone and gender with their values.
        1. Press the **Send** button.
        1. The contact is updated with the values you have key.

    1. Delete the individual contact from the database:
        1. Under Body tab, input the url address.
        1. Change to **Delete** request.
        1. Press the **Send** button.
        1. The contact should be deleted from the database.
