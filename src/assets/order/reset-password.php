<?php
    if($_POST){
    $name = $_POST['name'];

    $email = $_POST['email'];

    $phone = $_POST['phone'];

    $message = $_POST['message'];

    $restEmail = $_POST['restEmail'];

    $headers  = "MIME-Version: 1.0\n";

    $headers .= "Content-type: text/html; charset=iso-8859-1\n";

    $headers .= "X-Priority: 3\n";

    $headers .= "X-MSMail-Priority: High\n";

    $headers .= "X-Mailer: php\n";

    $headers =  'MIME-Version: 1.0' . "\r\n"; 

    $headers .= 'From: '.$name.' <'.$email.'>' . "\r\n";

//    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

//send email

if(mail($restEmail, "Reset Password",$message,$headers)) {
    echo json_encode(['success'=>true]);
}
else 
    echo json_encode(['success'=>false]);
exit;
    }

?>