<?php
include ("c:/xampp/htdocs/angela/ZenithZoneRE/model/connect.php");

class DAOsearch
{
    function search_type()
    {
        $sql = "SELECT *
                FROM type";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function search_activity_null()
    {
        $sql = "SELECT DISTINCT * 
                FROM activity";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function search_activity($type)
    {
        $sql = "SELECT DISTINCT a.*
                FROM Property p
                INNER JOIN Property_Type pt ON p.code_prop = pt.code_prop
                INNER JOIN Type t ON pt.code_type = t.code_type
                INNER JOIN Property_Activity pa ON p.code_prop = pa.code_prop
                INNER JOIN Activity a ON pa.code_act = a.code_act
                WHERE t.code_type = $type";

        error_log($sql, 3, "debug.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if ($res->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function autocomplete($search)
    {
        error_log("Autocomplete con valor", 3, "debug.txt");
        error_log($search, 3, "debug.txt");

        $complete = $_POST['complete'];
        $type = $_POST['type'];
        $activity = $_POST['activity'];

        error_log($complete, 3, "debug.txt");
        error_log($type, 3, "debug.txt");
        error_log($activity, 3, "debug.txt");

        // El valor de $type existe y el valor de $activity no existe
        // if (!empty($type) && empty($activity)) {
        //     $sql = "SELECT DISTINCT c.*
        //             FROM city c
        //             INNER JOIN property p ON p.code_city = c.code_city
        //             INNER JOIN property_type pt ON p.code_prop = pt.code_prop
        //             INNER JOIN type t ON pt.code_type = t.code_type
        //             WHERE c.name_city LIKE '%$complete%' 
        //             AND t.code_type = '$type'";

        //     // El valor de $type existe y el valor de $activity existe 
        // } else if (!empty($type) && !empty($activity)) {
        //     $sql = "SELECT DISTINCT c.*
        //             FROM city c
        //             INNER JOIN property p ON p.code_city = c.code_city
        //             INNER JOIN property_type pt ON p.code_prop = pt.code_prop
        //             INNER JOIN type t ON pt.code_type = t.code_type
        //             INNER JOIN property_activity pa ON p.code_prop = pa.code_prop
        //             INNER JOIN activity a ON pa.code_act = a.code_act
        //             WHERE c.name_city LIKE '%$complete%' 
        //             AND t.code_type = '$type'
        //             AND a.code_act = '$activity'";

        //     // El valor de $type no existe y el valor de $activity existe
        // } else if (empty($type) && !empty($activity)) {
        //     $sql = "SELECT DISTINCT c.*
        //             FROM city c
        //             INNER JOIN property p ON p.code_city = c.code_city
        //             INNER JOIN property_activity pa ON p.code_prop = pa.code_prop
        //             INNER JOIN activity a ON pa.code_act = a.code_act
        //             WHERE c.name_city LIKE '%$complete%' 
        //             AND a.code_act = '$activity'";

        //     // El valor de $type no existe y el valor de $activity no existe
        // } else {
        $sql = "SELECT DISTINCT c.* 
                    FROM city c 
                    WHERE c.name_city LIKE '%$complete%'";
        // }

        error_log("la consulta es", 3, "debug.txt");
        error_log($sql, 3, "debug.txt");


        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        error_log("la consulta devuelve", 3, "debug.txt");
        error_log($res, 3, "debug.txt");


        $retrArray = array();
        if ($res->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }
}


