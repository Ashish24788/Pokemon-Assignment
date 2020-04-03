# ashish24788-gmail.com
Angular Pokemon Assignment

Pokemon details and Listing Application is build in Angular 9 :

1) This app basically have four tabs Home, Details, Create Product and Product List and a search component.

2) By default Home tab is in Active state, if user navigate to different tab then relevent tab become highlighted.

3) In User.service.ts isAdmin flag is used which basically controls the rendering of tabs. If isAdmin is true then all the four tabs render, is isAdmin sets to false then only home and details tab render.

4) Product List displays on Home tab which contains pokemon name and its image. Data is coming into pieces initially 30 pokemon render. Two next and previous buttons also there which render appropriate data. On the click of pokemon it renders to detail page.

5) Detail page shows appropriate information related to selected pokemon. where we can fetch data using pokemon api and few more data using pokemon-spices, moves and evaluation Apis.

6) Create product basically used to add new products that save in localstorage. All the fields includes proper validation save button enables after all the fields validate. Reset button used to reset form in initially state. Add New product used to add multiple similar fields that should not be more then 5.

7) Product list picks products form localstorage and displays them inside. if there are not any products add using create form component user should not be able to click on product list tab, this is managed using canActivate Guard.

8) Search component: User is able to enter a name of pokemon and on pressing enter if the name is correct user should be navigated to details page. Name should be three char long.