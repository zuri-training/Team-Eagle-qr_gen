Create file named .env, it should contain PORT,MONGO_URL, JWT, cloud_name, api_key, api_secret 

"cloud_name, api_key, api_secret", will be generated when we you create an acount on cloudinary

we will be using cloudinary image server to store the image, on response from the cloudinary, it will give us the url to the image which will be stored in the qrcode schema

To run program, "npm start"

To get program ready, "npm install"

These are the APIs you fetch from

Login API ("/api/qrcode/user/login")

Registration API ("/api/qrcode/user/register")

ChangePassword API ("/api/qrcode/user/changepassword")

Logout API ("/api/qrcode/user/logout"), the logout will be like this, "<a href="/api/qrcode/user/logout">Logout</a>"

The public folder is where the frontend will be located
