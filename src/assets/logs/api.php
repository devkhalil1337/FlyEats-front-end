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

    
    $data = json_decode(file_get_contents("php://input"));

    if (!$data) {
        http_response_code(200);

        // tell the user no products found
        echo json_encode(
            array("message" => 'Cannot log', "data" => $data)
        );
        return;
    }
    
    $logPath = __DIR__. '/logs/' . $data->type . '.txt';
    if (!file_exists($logPath)) {
        touch($logPath);
    }

    $logfile = fopen($logPath, 'a');
    fwrite($logfile, "\r\n User Details: ". $data->userInfo);
    fwrite($logfile, "\r\n Function Name : ". $data->function);
    fwrite($logfile, "\r\n Params: ". $data->params);
    fwrite($logfile, "\r\n Device: ". $data->device);
    fwrite($logfile, "\r\n Message: ". $data->message);
    fwrite($logfile, "\r\n TimeStamp: ".date("d-M-Y h:i:sa") . ' ==> ' . date_default_timezone_get());
    fwrite($logfile, "\r\n =============================");
    fclose($logfile);


    http_response_code(200);

    // tell the user no products found
    echo json_encode(
        array("message" => "Logged Successfully")
    );
    
?>