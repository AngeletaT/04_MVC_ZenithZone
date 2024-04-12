<?php
include ("c:/xampp/htdocs/angela/ZenithZoneRE/model/connect.php");

class DAOshop
{
    function select_all_prop($offset, $items_page)
    {
        $sql = "SELECT DISTINCT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        ORDER BY p.code_prop ASC
        LIMIT $offset, $items_page";

        error_log($sql, 3, "debug.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $images_sql = "SELECT img_prop FROM images WHERE code_prop = '" . $row['code_prop'] . "'";
                $images_res = mysqli_query($conexion, $images_sql);
                $images = array();
                while ($image_row = mysqli_fetch_assoc($images_res)) {
                    $images[] = $image_row['img_prop'];
                }
                $row['images'] = $images;
                $retrArray[] = $row;
            }
        }
        connect::close($conexion);
        return $retrArray;
    }

    function select_one_prop($id)
    {
        $sql = "SELECT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop = '$id'
        AND p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act";

        error_log($sql, 3, "debug.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);

        return $res;
    }

    function select_img_prop($id)
    {
        $sql = "SELECT i.img_prop
        FROM images i
        WHERE i.code_prop = '$id'";

        error_log($sql, 3, "debug.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $imgArray = array();
        if (mysqli_num_rows($res) > 0) {
            foreach ($res as $row) {
                array_push($imgArray, $row);
            }
        }
        return $imgArray;
    }

    function filters_home($filters_home, $offset, $items_page)
    {

        $sql = "SELECT DISTINCT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act";

        if (isset($filters_home[0]['type'])) {
            $filtro = $filters_home[0]['type'][0];
            $sql .= " AND t.code_type = '$filtro'";
        } else if (isset($filters_home[0]['category'])) {
            $filtro = $filters_home[0]['categoty'][0];
            $sql .= " AND c.code_cat = '$filtro'";
        } else if (isset($filters_home[0]['city'])) {
            $filtro = $filters_home[0]['city'][0];
            $sql .= " AND ct.code_city = '$filtro'";
        } else if (isset($filters_home[0]['extra'])) {
            $filtro = $filters_home[0]['extra'][0];
            $sql .= " AND e.code_extra = '$filtro'";
        } else if (isset($filters_home[0]['activity'])) {
            $filtro = $filters_home[0]['activity'][0];
            $sql .= " AND a.code_act = '$filtro'";
        }
        $sql .= " ORDER BY p.code_prop ASC
        LIMIT $offset, $items_page";

        error_log($sql, 3, "debug.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $images_sql = "SELECT img_prop FROM images WHERE code_prop = '" . $row['code_prop'] . "'";
                $images_res = mysqli_query($conexion, $images_sql);
                $images = array();
                while ($image_row = mysqli_fetch_assoc($images_res)) {
                    $images[] = $image_row['img_prop'];
                }
                $row['images'] = $images;
                $retrArray[] = $row;
            }
        }
        connect::close($conexion);

        return $retrArray;
    }

    function filters_shop($filters_shop, $offset, $items_page)
    {
        $sql = "SELECT DISTINCT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act";

        foreach ($filters_shop as $filter) {

            $filterColumn = $filter[0];
            $filterValue = $filter[1];

            if ($filterColumn == 'code_type') {
                $sql .= " AND t.$filterColumn = $filterValue";
            } else if ($filterColumn == 'code_city') {
                $sql .= " AND ct.$filterColumn = $filterValue";
            } else if ($filterColumn == 'code_cat') {
                $sql .= " AND c.$filterColumn = $filterValue";
            } else if ($filterColumn == 'rooms') {
                $sql .= " AND p.$filterColumn >= $filterValue";
            } else if ($filterColumn == 'baths') {
                $sql .= " AND p.$filterColumn >= $filterValue";
            } else if ($filterColumn == 'm2') {
                $sql .= " AND p.$filterColumn <= $filterValue";
            } else if ($filterColumn == 'price') {
                $sql .= " AND p.$filterColumn <= $filterValue";
            } else if ($filterColumn == 'code_extra') {
                if (is_array($filterValue)) {
                    $extra = implode(",", $filterValue);
                    $sql .= " AND e.$filterColumn IN ($extra)";
                } else {
                    $sql .= " AND e.$filterColumn = $filterValue";
                }
            } else if ($filterColumn == 'code_act') {
                $sql .= " AND a.$filterColumn = $filterValue";
            }
        }
        $sql .= "LIMIT $offset, $items_page";

        error_log($sql, 3, "debug.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);



        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $images_sql = "SELECT img_prop FROM images WHERE code_prop = '" . $row['code_prop'] . "'";
                $images_res = mysqli_query($conexion, $images_sql);
                $images = array();
                while ($image_row = mysqli_fetch_assoc($images_res)) {
                    $images[] = $image_row['img_prop'];
                }
                $row['images'] = $images;
                $retrArray[] = $row;
            }
        }
        connect::close($conexion);

        error_log("El resultado de la consulta es:", 3, "debug.txt");
        error_log($res, 3, "debug.txt");

        return $retrArray;
    }

    function dynamic_filters_type()
    {
        // return "hola";

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

    function dynamic_filters_city()
    {
        $sql = "SELECT *
                FROM city";

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

    function dynamic_filters_category()
    {
        $sql = "SELECT *
                FROM category";

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

    function dynamic_filters_extra()
    {
        $sql = "SELECT *
                FROM extra";

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

    function dynamic_filters_activity()
    {
        $sql = "SELECT *
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

    function orderby($orderby)
    {
        // return "DAO orderby";
        switch ($orderby) {
            case 1:
                $orderby = "ORDER BY p.publication ASC";
                break;
            case 2:
                $orderby = "ORDER BY v.visits DESC";
                break;
            case 3:
                $orderby = "ORDER BY p.price ASC";
                break;
            case 4:
                $orderby = "ORDER BY p.price DESC";
                break;
            case 5:
                $orderby = "ORDER BY p.m2 DESC";
                break;
            case 6:
                $orderby = "ORDER BY p.m2 ASC";
                break;
            default:
                $orderby = "ORDER BY p.code_prop ASC";
        }

        $sql = "SELECT DISTINCT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa, visited v
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act 
        AND p.code_prop=v.code_prop
        $orderby";

        error_log($sql, 3, "debug.txt");

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $images_sql = "SELECT img_prop FROM images WHERE code_prop = '" . $row['code_prop'] . "'";
                $images_res = mysqli_query($conexion, $images_sql);
                $images = array();
                while ($image_row = mysqli_fetch_assoc($images_res)) {
                    $images[] = $image_row['img_prop'];
                }
                $row['images'] = $images;
                $retrArray[] = $row;
            }
        }
        connect::close($conexion);
        return $retrArray;
    }

    function visited($id)
    {
        $sql = "UPDATE visited 
        SET visited.visits = (visited.visits + 1) 
        WHERE visited.code_prop = '$id'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        $affectedRows = mysqli_affected_rows($conexion);
        connect::close($conexion);

        return $affectedRows;
    }

    function datetimevisit($id)
    {
        $sql = "UPDATE property p
        SET p.last_visit = NOW()
        WHERE p.code_prop = '$id'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        $affectedRows = mysqli_affected_rows($conexion);
        connect::close($conexion);

        return $affectedRows;
    }

    function select_count()
    {
        $sql = "SELECT COUNT(*) contador
        FROM property";

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

    function select_count_filter($filters_shop)
    {
        $sql = "SELECT COUNT(*) contador
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act";

        foreach ($filters_shop as $filter) {

            $filterColumn = $filter[0];
            $filterValue = $filter[1];

            if ($filterColumn == 'code_type') {
                $sql .= " AND t.$filterColumn = $filterValue";
            } else if ($filterColumn == 'code_city') {
                $sql .= " AND ct.$filterColumn = $filterValue";
            } else if ($filterColumn == 'code_cat') {
                $sql .= " AND c.$filterColumn = $filterValue";
            } else if ($filterColumn == 'rooms') {
                $sql .= " AND p.$filterColumn >= $filterValue";
            } else if ($filterColumn == 'baths') {
                $sql .= " AND p.$filterColumn >= $filterValue";
            } else if ($filterColumn == 'm2') {
                $sql .= " AND p.$filterColumn <= $filterValue";
            } else if ($filterColumn == 'price') {
                $sql .= " AND p.$filterColumn <= $filterValue";
            } else if ($filterColumn == 'code_extra') {
                if (is_array($filterValue)) {
                    $extra = implode(",", $filterValue);
                    $sql .= " AND e.$filterColumn IN ($extra)";
                } else {
                    $sql .= " AND e.$filterColumn = $filterValue";
                }
            } else if ($filterColumn == 'code_act') {
                $sql .= " AND a.$filterColumn = $filterValue";
            }
        }

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

    function count_home($filters_home)
    {
        $sql = "SELECT COUNT(*) contador
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act";

        if (isset($filters_home[0]['type'])) {
            $filtro = $filters_home[0]['type'][0];
            $sql .= " AND t.code_type = '$filtro'";
        } else if (isset($filters_home[0]['category'])) {
            $filtro = $filters_home[0]['categoty'][0];
            $sql .= " AND c.code_cat = '$filtro'";
        } else if (isset($filters_home[0]['city'])) {
            $filtro = $filters_home[0]['city'][0];
            $sql .= " AND ct.code_city = '$filtro'";
        } else if (isset($filters_home[0]['extra'])) {
            $filtro = $filters_home[0]['extra'][0];
            $sql .= " AND e.code_extra = '$filtro'";
        } else if (isset($filters_home[0]['activity'])) {
            $filtro = $filters_home[0]['activity'][0];
            $sql .= " AND a.code_act = '$filtro'";
        }
        $sql .= " ORDER BY p.code_prop ASC";

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

    function count_search($filters_search)
    {
        // FALTA LA CONSULTA

        // $conexion = connect::con();
        // $res = mysqli_query($conexion, $consulta);
        // connect::close($conexion);

        // $retrArray = array();
        // if ($res->num_rows > 0) {
        //     while ($row = mysqli_fetch_assoc($res)) {
        //         $retrArray[] = $row;
        //     }
        // }
        // return $retrArray;
    }

}
?>