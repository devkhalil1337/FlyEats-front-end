<?php 
    // required headers
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
        return 0;    
    }   
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;

    require './vendor/autoload.php';
    $headers = '';
    $data = json_decode(file_get_contents("php://input"));
    // if ($_POST) {
    $headers .= "X-Priority: 3\n";

    $headers .= "X-MSMail-Priority: High\n";

    $headers .= "X-Mailer: php\n";

    $headers =  'MIME-Version: 1.0' . "\r\n"; 

    $headers .= 'From: '.$data->name.' <'.$data->email.'>' . "\r\n";

    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

//send email
    $mail = new PHPMailer(); // create a new object
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "saad.qureshi@jempos.co.uk";
    $mail->Password = "Lucky$21";
    $mail->SetFrom("saad.qureshi@jempos.co.uk", "JEMPOS Ordering");
    $mail->Subject = "JEMPOS Order";
    $mail->Body = $data->message;
    $mail->AddAddress($data->email);

    if(!$mail->Send()) {
        http_response_code(200);
  
        // tell the user no products found
        echo json_encode(
            array("message" => "Failed to send email")
        );
    } else {
        
        http_response_code(200);
  
        // tell the user no products found
        echo json_encode(
            array("message" => "Successfull to send email to ". $data->email)
        );
    }
    
?>