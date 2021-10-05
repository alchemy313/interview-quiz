#ANSWER TO Q1:

## api list

|  url  | description |
|------ |----- |
| GET [/event/{eventId}](#event)| find by eventId|
| POST [/event/{eventId}](#event_update)| update by eventId|
| POST [/event](#event_create) | add a new event to store|
| GET [/organizer](#organizer) | search organizer by name|
| GET [/participants](#participants) | search participants by name|

***
##status code
| code  | description |
|------ |----- |
|   200   | success |
|   404   | not found |
|   405   | invalid input |
|   400 | invalid id supplied|

## api details
* <span id = "event">event detail</span>

    * url：/event/{eventId}

    * format：Json

    * method：Post

    * example：http://www.hostname.com/event/1
  
    * parameters：

      | name | type | required |description|
                          |----- |------| ---- |----|
      |<font color=red>eventId | string |true||
    
    * response：

      | name | type |description| 
                          |----- |------| ---- |
      | success | boolean|
      | code | int|
      |data | object|event data|

    * JSON example：

           {"code":200,"success":true,"data":{"id":"1","title":"title","description":"example desc","organizer_name":"name1","organizer_id":"1","date":"2021-12-06","start_time":"00:14","event_length":"2","tags":["test1","test2"],"status":"banned","participant_names":["name1","name2"],"participant_ids":[1,2]}}

 
---

* <span id = "event_update">event update</span>

    * url：/event/{eventId}

    * format：Json

    * method：Post

    * example：http://www.hostname.com/event/1

    * parameters：

      | name | type | required |description|
                    |----- |------| ---- |----|
      |<font color=red>eventId | string |true||
      |<font color=red>data | json |true||

    * response：

      | name | type |description|
      |----- |------|----|
      | success | boolean|

    * post data example：

           {"title":"title","description":"example desc","organizer_id":"1","date":"2021-12-06","start_time":"00:14","event_length":"2","tags":["test1","test2"],"status":"banned","participant_ids":[1,2]}

    * JSON example：

           {
               "success": true
           }

 
---

* <span id = "event_create">event create</span>

    * url：/event/

    * format：Json

    * method：Post

    * example：http://www.hostname.com/event/

    * parameters：

      | name | type | required |description|
                          |----- |------| ---- |----|
      |<font color=red>data | json |true||

    * response：

      | name | type |description|
            |----- |------|----|
      | success | boolean|

    * post data example：

           {"title":"title","description":"example desc","organizer_id":"1","date":"2021-12-06","start_time":"00:14","event_length":"2","tags":["test1","test2"],"status":"banned","participant_ids":[1,2]}

    * JSON example：

           {
               "success": true
           }

---
* <span id = "organizer">organizer</span>

    * url：/organizers

    * format：Json

    * method：Get

    * example：http://www.hostname.com/organizers
    *
    * parameters：

      | name | type | required |description|
                                |----- |------| ---- |----|
      |name | string |false|search organizer by name|

    * response：

      | name | type |description| 
                                |----- |------| ---- |
      | success | boolean|
      | code | int|
      |data | object|event data|

    * JSON example：

            {"code":200,"success":true,"data":[{"id":1,"name":"test1"},{"id":2,"name":"test2"}]}

---
* <span id = "participants">participants</span>

    * url：/participants

    * format：Json

    * method：Get

    * example：http://www.hostname.com/participants
    * 
    * parameters：

      | name | type | required |description|
                                      |----- |------| ---- |----|
      |name | string |false|search participants by name|

    * response：

      | name | type |description| 
                                      |----- |------| ---- |
      | success | boolean|
      | code | int|
      |data | object|event data|

    * JSON example：
  
            {"code":200,"success":true,"data":[{"id":1,"name":"test1"},{"id":2,"name":"test2"}]}



#ANSWER TO Q3:

###form validation
The code does not implement the form verification function, it can not make correct prompts to the user.
We can implement the form data verification function through react hook, such as making requirements for each field

###form input/ajax data formatting    
If the form data format field structure of the back-end post request is too complex, 
our code may not meet the format requirements of the uploaded data.
It is a heavy task to implement the data monitoring of each input component in the form.
We can solve this problem by using component refs property. 
An easier and less labor-intensive way to grab value from a form element is to use the ref property. Different form elements and component compositions require different strategies