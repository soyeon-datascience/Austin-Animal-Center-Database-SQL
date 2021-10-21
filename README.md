# Austin Animal Center Database
<img width="1372" alt="Screen Shot 2021-10-20 at 6 53 36 PM" src="https://user-images.githubusercontent.com/92895639/138188013-af32b676-ce73-4af9-a986-72241abac069.png">

This application is developed for employees working in the Austin Animal Center. They can save animals' traits information like type, breed, color and date of birth. Also, the application allows users to save animals’ intake and outcome history. Users can not only insert new data, but also update and delete the data. Whenever users update the animal’s information, the application
saves the new and old data together in the auditing table. The purpose of this function is that
they can find old data easily when they update wrong data by mistake.

## Dataset
The dataset which we decided to use for this project was created by Austin Animal Center (AAC), which is the largest shelter in the United States that provides care and shelter to over 18,000 animals each year. The organization has accumulated the data containing intakes and outcomes of animals entering it from the beginning of October 2013. The data is available on the official City of Austin open data portal and are updated daily. The size of data is 30MB, consisting of 41 attributes and 79,672 rows. The dataset is available [here](https://www.kaggle.com/aaronschlegel/austin-animal-center-shelter-intakes-and-outcomes?select=aac_intakes_outcomes.csv). There are 3 datasets in the website, and we used ‘aac_intakes_outcomes.csv’.


## Database design
The normalization process was operated with 5 steps :
* Moving unnecessary attributes to an extra table
* 1st Normal form
* 2nd Normal Form
* 3rd Normal Form
* Placing together attributes sharing the same characteristics

## Implemented test cases
* Search animal’s trait/intake/outcome information
* Insert/update/delete animal’s bio/intake/outcome data
* View specific groups of animals
  * Animals which experienced their gender transformation
  * Adopted animals
  * Transferred animals
* View data change history
* View statistics related to the animals in the center


## Functionality
Our application has 7 major functionalities : search, insert, update, delete, display, audit, and
summary and below are the use cases for each functionality.

### Pre-conditions
* Database server should be up and running
* Backend NodeJS and frontend application should be started by following the steps given in the [recreate document](https://github.com/soyeon-datascience/Austin-Animal-Center-Database-SQL/blob/main/02-application/How%20to%20implement%20application.pdf)

## Final project
This folder contains our [final report](https://github.com/soyeon-datascience/Austin-Animal-Center-Database-SQL/blob/main/03-report/Project%20Report.pdf) and our video presentation can be found [here](https://www.youtube.com/watch?v=r1ftB8UKpVg).
