<h1 align="center">Human-Computer Interaction Project:<br>UX Redesign of the "Neighborhood Nannies" Website</h1>

<h2 align="center"><i>Developed by:</i></h2>
<h2 align="center"><a href="https://www.linkedin.com/in/emil-bantak-2219b3292/">Bantak Emil</a></h2>
<h2 align="center"><a href="https://www.linkedin.com/in/παναγιώτης-τσιμπούρης/">Tsimpouris Panagiotis</a></h2>

# Assignment Description

The goal of this project was to redesign a real, existing website created by the Greek government, named "Neighborhood Nannies", which connects parents and guardians with nannies in their area to babysit their children

The redesign focused on both the user experience (UX) and the user interface (UI), following a User-Centered Design (UCD) approach, with the human user at the center. Since the platform has two different types of users/personas (i.e. parents/guardians and nannies), each with their own needs and tasks, we designed a separate path for each of them, so that each type of user sees and interacts only with the information and actions that concern them. We also made the interface more user-friendly compared to the original Greek government website, so that both parents/guardians and nannies can use the website more easily and with logical steps that make sense for each type of user to follow, in contrast to the original website, where some steps did not follow a logical order

The new website was implemented with React for the interface (frontend), while Firebase was used as the backend: Firebase Authentication for the login/registration of the users and Cloud Firestore as the database

# Table of Contents

- [Installing the dependencies (node_modules)](#installing-the-dependencies-node_modules)
- [Running the Project](#running-the-project)
- [Demo Users](#demo-users)
- [What Has Been Implemented](#what-has-been-implemented)
  - [Login/Registration Part](#loginregistration-part)
  - [Guardians Part](#guardians-part)
  - [Nannies Part](#nannies-part)
  - [For Everyone](#for-everyone)
- [Firebase](#firebase)
  - [Firestore Ad Part](#firestore-ad-part)
  - [Firestore CV Part](#firestore-cv-part)
- [Notes](#notes)

## Installing the dependencies (node_modules)

The node_modules folder is not included in the repository, so before the first execution of the project you must install it. Open a terminal inside the project folder and write the command below:

```bash
npm i --legacy-peer-deps
```

This has to be done only once.<br>

So now you have downloaded all the necessary node_modules to run this project

## Running the Project

Open a terminal inside the project folder and write the command below:

```bash
npm start
```

Open a browser and write this link <http://localhost:3000> so that you can see the project

## Demo Users

The following users exist in the database:

For the Nannies

email = ntanta2@gmail.com\
password= ntanta2gmail\
(For the above nanny one finalized ad and one temporarily saved ad have been created)

email = ntanta3@gmail.com\
password= ntanta3gmail\
(For the above nanny one finalized ad and one finalized CV have been created)

For the Guardians

email = khdemonas@gmail.com\
password= khdemonasgmail

## What Has Been Implemented

### <ins>Login/Registration Part</ins>

For this part the ready-made code that was given to us has been used but some small additions have been made to it and the way it looks has been modified i.e. the css part.

The files that implement the Login/Registration are located inside the components folder and are the Login and Register folders respectively.

### <ins>Guardians Part</ins>

● The following bullets from the assignment have been implemented:

1) Information about the eligibility criteria, the procedure they must follow, the operation of the platform and any other information you consider necessary.

2) Search for professionals (“nannies”) based on various criteria, (e.g., area of residence, age of the child, employment type (full/part-time)), time specification (e.g., specific days of the week, specific hours, etc.), profile (e.g., specialization, studies, experience) and characteristics (e.g., employment availability) of the professionals they are looking for, and other criteria at your discretion.

3) Display of search results and details for each professional, in whatever way you consider most appropriate.

4) Scheduling of a meet-and-greet appointment (online/in person) with professional/s of their interest.

5) Application expressing interest in cooperating with a professional. Each declaration can be:
    - either in a temporarily saved (draft) state where the user can still edit their declaration before submitting it or until the deadline for declarations expires (if there is one)
    - or in a state of final submission where they will be able to view (preview) the details they have declared but will not be able to edit them.

6) “Signing” of a private cooperation agreement with a professional through the interface.

7) Payment of the professional:
    - Certification of completion of the month’s work (this should be done for every month of work that is completed).
    - Automatic display of the appropriate digital voucher for the payment in the interface of the professional.
        - Confirmation of receipt of the voucher by the professional.

8) End of cooperation:
    - Confirmation of completion of the agreed cooperation.
    - Possibility of renewing the agreement.
    - Evaluation/review of the professional.

9) Viewing of the “history” of declarations, agreements, payments, etc.

● The files that implement the guardians part are located in the components folder and are the following:

EndColab.js\
Guardian.js\
Guardian.css\
NannyDetails.js\
NannyDetails.css\
PersonaGar.js\
Request.js\
Request.css

### <ins>Nannies Part</ins>

● The following bullets from the assignment have been implemented:

1) information about the eligibility criteria, the procedure they must follow in order to register for the service, the operation of the platform and any other information you consider necessary.

2) Creation of a CV that includes full name, age, gender, level of education, experience and references, if any (they should be given the option to upload recommendation letters as well).

3) Creation of an “ad” that will include information such as availability, employment type (full/part-time), work location, and anything else you consider necessary. The ad can be:
    - either in a temporarily saved (draft) state where the user can still edit the details before submitting it
    - or in a state of final submission where they will be able to view (preview) the details they have submitted but will not be able to edit them.

4) Viewing of the evaluations that have been submitted.

5) “Signing” of a private cooperation agreement with a parent through the interface.

6) Receipt of voucher and confirmation to the parent.

7) Viewing of the “history” of applications, agreements, payments, etc.

● The files that implement the nannies part are located in the components folder and are the following:

HomePageBabysitter.js/.css\
(it is the home page of the nannies as soon as they log in/register successfully on the website)\
AdCreation.js/.css\
(covers the part of creating and/or modifying an ad)\
ResumeCreation.js/.css\
(covers the part of creating a CV)\
ShowFinalizedAd.js\
(covers the part of displaying the finalized ad)\
ShowFinalizedResume.js\
(covers the part of displaying the finalized CV)\
RatingsSection.js\
(covers the part of viewing the evaluations that have been submitted for a nanny)\
AvailabilitySection.js\
AddingElementsSection.js\
RecommendationsSection.js\
SelectDropDownOptions.js\
ServiceAreasSection.js\
WeeklyScheduleTable.js

### <ins>For Everyone</ins>

1) Possibility of editing the profile for the users who have logged in.

● The files that implement this part are:

AgreementsHistory.js\
Messages.js\
PaymentHistory.js\
PaymentHistory.css\
PersonalInfoForm.js\
PersonalInfoForm.css\
Profile.js\
Profile.css\
RequestHistory.js

## Firebase

**<ins>FireBase Database Connection</ins>**

Inside the config folder there is the firebase.js file which contains the necessary credentials to connect to the Firebase project.

**<ins>Firebase Part</ins>**

● As mentioned previously the ready-made code that was given to us for the login/registration has been used but some small additions have been made to it and the way it looks has been modified i.e. its css part.

Therefore apart from the users collection in the Firestore Database there are two other collections named job_applications and resumes in which the ad (finalized and/or temporarily saved) for each nanny and the finalized CV for each nanny are stored respectively.

### <ins>Firestore Ad Part</ins>

In the collection of a document that belongs to job_applications we have added a field the mode: which takes the values either “submit” or “save” so that we know if this ad is finalized or temporarily saved respectively.

And we save the document with the following name user.uid:mode:save or submit

In the case that the user submits an ad we have to find all the documents in the job_applications collection that start with the user.uid and are either in save state or in submit state and delete them so that firstly we only have the latest finalized ad each time for the user and if the user wants to create a new ad afterwards they will not have the old ad that was in save state before they finalized it.

And we save the ad with the name user.uid:mode:submit

In the case that the user has saved the ad we either update the previously saved ad if they have made one before with the updated values in the fields or if they had not saved an ad we create an ad in save state and add the values to the fields of this document.

This methodology has been implemented in the AdCreation.js file.

### <ins>Firestore CV Part</ins>

I follow a similar logic for the CV as well with the only difference that the CVs for each user are stored only in submit state there is no save state.

So when the user finalizes the CV we try to find from the Firestore from the resumes collection the document of the latest CV of the specific user which document will be stored with the following name user.uid:mode:submit

If it exists we delete it and then and in the case that a document did not exist before we create a new document with the name user.uid:mode:submit and add the values to the fields of this document.

This methodology has been implemented in the ResumeCreation.js file.

## Notes

- To a large extent the website has been made to adapt to different screen sizes.
