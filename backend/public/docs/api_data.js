define({ "api": [
  {
    "type": "GET",
    "url": "/auth/facebook",
    "title": "Login using Facebook",
    "name": "Authentication_Facebook",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Redirect",
            "optional": false,
            "field": "User",
            "description": "<p>Redirects the user to Facebook for login.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/auth/facebook/callback",
    "title": "Callback route from Facebook Login",
    "name": "Authentication_Facebook_Callback",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Facebook_Profile",
            "optional": false,
            "field": "Profile",
            "description": "<p>Profile for the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JWT",
            "optional": false,
            "field": "JWT",
            "description": "<p>Returns the JWT token for the current user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/auth/google",
    "title": "Login using Google",
    "name": "Authentication_Google",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Redirect",
            "optional": false,
            "field": "User",
            "description": "<p>Redirects the user to Google for login.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/auth/google/callback",
    "title": "Callback route from Google Login",
    "name": "Authentication_Google_Callback",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Google_Profile",
            "optional": false,
            "field": "Profile",
            "description": "<p>Profile for the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JWT",
            "optional": false,
            "field": "JWT",
            "description": "<p>Returns the JWT token for the current user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/user",
    "title": "Request the user information",
    "name": "Get_User_Information",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JWT token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "JWT",
            "description": "<p>Returns the updated JWT token of the current user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
