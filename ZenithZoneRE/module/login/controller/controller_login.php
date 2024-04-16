<?php
include ("c:/xampp/htdocs/angela/ZenithZoneRE/module/login/model/DAOlogin.php");
include ("c:/xampp/htdocs/angela/ZenithZoneRE/model/middleware_auth.php");

switch ($_GET['op']) {
    case 'list':
        include ('module/login/view/login-register.html');
        break;

    case 'register':
        try {
            $daoLog = new DAOLogin();
            $check_email = $daoLog->checkEmail($_POST['email']);
            $check_user = $daoLog->checkUser($_POST['username']);
        } catch (Exception $e) {
            echo json_encode("error");
            // error_log("Error register", 3, "debuglogin.txt");
            exit;
        }

        // Si no existe el email ni usuario creará el usuario
        if (!$check_email && !$check_user) {
            echo json_encode("ok");
            // error_log("ok", 3, "debuglogin.txt");
            // exit;
            try {
                $daoLog = new DAOLogin();
                $rdo = $daoLog->insert_user($_POST['username'], $_POST['email'], $_POST['password']);
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }
        } elseif ($check_email && !$check_user) {
            echo json_encode("error_email");
            // error_log("error_email", 3, "debuglogin.txt");
            exit;
        } elseif (!$check_email && $check_user) {
            echo json_encode("error_username");
            // error_log("error_username", 3, "debuglogin.txt");
            exit;
        } elseif ($check_email && $check_user) {
            echo json_encode("error_both");
            // error_log("error_both", 3, "debuglogin.txt");
            exit;
        }
        break;

    case 'login':
        // echo json_encode("hola");
        // exit;
        try {
            $daoLog = new DAOLogin();
            $user = $daoLog->selectUser($_POST['username']);

            if ($user == "error_username") {
                echo json_encode("error_username");
                // error_log("error_username", 3, "debuglogin.txt");
                exit;
            }

            if (password_verify($_POST['password'], $user['password'])) {
                // echo json_encode("hola");
                $token = create_token($user["username"]);
                // $_SESSION['username'] = $user['username']; //Guardamos el usario 
                // $_SESSION['tiempo'] = time(); //Guardamos el tiempo que se logea
                error_log($token, 3, "debuglogin.txt");
                echo json_encode($token);
                // PARA EL PROFILE
                // echo json_encode(array('username' => $user['username'], 'avatar' => $user['avatar']));
                // error_log("ok", 3, "debuglogin.txt");
                exit;
            } else {
                echo json_encode("error_passwd");
                // error_log($user['password'], 3, "debuglogin.txt");
                // error_log($_POST['password'], 3, "debuglogin.txt");
                error_log("error_passwd", 3, "debuglogin.txt");
                exit;
            }
        } catch (Exception $e) {
            echo json_encode("error");
            error_log("Error login", 3, "debuglogin.txt");
        }
        break;

    case 'data_user':
        $token = decode_token($_POST['token']);
        // echo json_encode($token);
        // exit;
        try {
            $daoLog = new DAOLogin();
            $rdo = $daoLog->selectUserByName($token);
            echo json_encode($rdo);
            error_log("ok", 3, "debuglogin.txt");
            exit;
        } catch (Exception $e) {
            echo json_encode("error");
            // error_log("Error register", 3, "debuglogin.txt");

        }

        break;

    case 'logout':
        // unset($_SESSION['username']);
        // unset($_SESSION['tiempo']);
        // session_destroy();

        echo json_encode('Done');
        break;


    default;
        include ("view/inc/error404.php");
        break;
}
?>