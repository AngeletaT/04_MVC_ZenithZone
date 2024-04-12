<?php
include ("c:/xampp/htdocs/angela/ZenithZoneRE/module/search/model/DAOsearch.php");

switch ($_GET['op']) {
    case 'search_type';
        $daosearch = new DAOsearch();
        $datos_prop = $daosearch->search_type();
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'search_activity_null';
        $daosearch = new DAOsearch();
        $datos_prop = $daosearch->search_activity_null();
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'search_activity';
        $daosearch = new DAOsearch();
        $datos_prop = $daosearch->search_activity($_POST['type']);
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;


    case 'autocomplete';
        $daosearch = new DAOsearch();
        $datos_prop = $daosearch->autocomplete($_POST['search']);
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;




}