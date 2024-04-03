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
        $sql = "SELECT DISTINCT * FROM activity";

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

    function autocomplete($complete)
    {
        $sql = "SELECT DISTINCT *
        FROM city c
        WHERE c.name_city LIKE '%$complete%'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        error_log($sql, 3, "debug.txt");

        $retrArray = array();
        if ($res->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }
}

