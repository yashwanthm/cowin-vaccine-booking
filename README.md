# About
This utility can login into Cowin, track vaccine availability and automatically book a a vaccination slot if you are logged in. The app is made possible by https://apisetu.gov.in/public/api/cowin
The deployment is available at https://yashwanthm.github.io/cowin-vaccine-booking/

This app also supports
* Dose based availability
* Captcha code 
* Paid/Free selection
* Age Group Selection

# API for integrating link based booking into your app/Notifications system
This API allows you to open a URL from within your application where a user will be readily available to book. Support for passing user's token coming soon. Please report an issue if you need this expedited.

### URL Pattern: 
`https://yashwanthm.github.io/cowin-vaccine-booking/?dose=${dose}&session_id=${session_id}&slot=${slot}`
Where 
 - `dose` is a Number indicating dose1 or dose2. Value 1 indicates dose1 and value 2 indicates dose 2
 - `session_id`is a String and it's the value of the session_id as available from Cowin's availability API
 - `slot` is a String which is the slot list item on the slots Array available from 

#### Example: 
https://yashwanthm.github.io/cowin-vaccine-booking/?dose=1&session_id=13526b72-38f3-46bb-970c-0c4fd893a1e9&slot=09%3A00AM-11%3A00AM

## Running locally
```yarn install```
```yarn start```

## Update poll frequency using
```localstorage.pollFreq = 1000```
This also works on the deployed version.
