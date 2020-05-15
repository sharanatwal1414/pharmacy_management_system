pharmacy_management_system
##Product Overview
Pharmacy Management System is a web/mobile application to manage an online pharmacy store. The application helps pharmacists to sell drugs, consult the available stocks of drugs, add new products and send orders to suppliers. The application must also make it possible to determine the money collected by the pharmacy over a given period. Apart from this, the application will also allow staff to manage who is the pharmacist or the person who sold the drug and an alert mechanism for the management of best-selling products will be implemented.
##Scope
The Pharmacy Management System will be accessible from both web and mobile interface.
##ARCHITECTURE
The architecture of pharmacy management system includes mainly 3 parts as listed below -Web Front End -Mobile Application -A Rest API
From the Web/Mobile, a request is generated and send to the Rest API to do a specific task. Once the proxy server in Rest API receives the request it call the respective micro service. Following are the micro services in the API -User Management System -Product Management System -Sales Management System -Purchase Management System -Supplier Management System
This micro services communicate with the database and once the task is completed, the appropriate response will be send back to the proxy server and from there response is send back and rendered in Web/Mobile UI.
##Languages And Technologies Used -Spring Boot
-React.js
-MySQL
-Bootstrap
-HTML5
-CSS3
-Material-ui
-JavaScript
-Kotlin
