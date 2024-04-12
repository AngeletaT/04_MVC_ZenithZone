<?php
include ("c:/xampp/htdocs/angela/ZenithZoneRE/model/connect.php");

class DAOlogin
{

    function checkEmail($email)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE email = '$email'";

        error_log($sql, 3, "debuglogin.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);

        return $res;
    }

    function checkUser($username)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username'";

        error_log($sql, 3, "debuglogin.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);

        return $res;
    }

    function insert_user($username, $email, $password)
    {
        // Password hash encripta la contraseña para introducirla en la base de datos
        $hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
        // md5 encripta el email para obtener un avatar
        $hashavatar = md5(strtolower(trim($email)));
        $avatar = "https://i.pravatar.cc/500?u=$hashavatar";
        $sql = "INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`) 
                VALUES ('$username','$hashed_pass','$email','client','$avatar')";

        error_log($sql, 3, "debuglogin.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function selectUser($username)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username'";

        error_log($sql, 3, "debuglogin.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);

        if ($res) {
            $value = get_object_vars($res);
            return $value;
        } else {
            return "error_username";
        }

    }
}
?>