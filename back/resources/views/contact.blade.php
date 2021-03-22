<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hobby Connect Form</title>
</head>
<body>
  <h1>Hobby Connect Form<h1>
    
<h3>Subject:</h3> <span>{{$data['subject']}}</span>
<br>
<h3>From : </h3><span>{{$data['name']}}</span>

<h3>Message : </h3>
<p><span>{{$data['message']}}</span></p>
<br>
<h3>From Email : </h3><span>{{$data['email']}}</span>
<br>
<br>
<h3>Phone : </h3><span>{{$data['phone']}}</span>
<br>
</body>
</html>
