<?php
include ("c:/xampp/htdocs/angela/ZenithZoneRE/module/shop/model/DAOshop.php");
include ("c:/xampp/htdocs/angela/ZenithZoneRE/model/middleware_auth.php");

@session_start();
if (isset($_SESSION["tiempo"])) {
    $_SESSION["tiempo"] = time(); //Devuelve la fecha actual
}

switch ($_GET['op']) {
    case 'list':

        include ('module/shop/view/shop.html');
        break;

    case 'all_prop':
        try {
            $daoshop = new DAOshop();
            $datos_prop = $daoshop->select_all_prop($_POST['offset'], $_POST['items_page']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;


    case 'details_prop':
        try {
            $daoshop = new DAOshop();
            $dato_prop = $daoshop->select_one_prop($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_img = new DAOShop();
            $dato_images = $daoshop_img->select_img_prop($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop = new DAOshop();
            $dato_datetime = $daoshop->datetimevisit($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop = new DAOshop();
            $dato_visit = $daoshop->visited($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }


        if (!empty($dato_prop || $dato_images || $dato_datetime || $dato_visit)) {
            $rdo = array();
            $rdo[0] = $dato_prop;
            $rdo[1][] = $dato_images;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;

    case 'filters_home':
        // echo json_encode("redirect_home");
        // break;

        $daoshop = new DAOshop();
        $datos_prop = $daoshop->filters_home($_POST['filters_home'], $_POST['offset'], $_POST['items_page']);
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'filters_shop':
        // echo json_encode("redirect_shop");
        // break;

        $daoshop = new DAOshop();
        $datos_prop = $daoshop->filters_shop($_POST['filters_shop'], $_POST['offset'], $_POST['items_page']);
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'filters_search':
        // echo json_encode("redirect_search");
        // break;

        $daoshop = new DAOshop();
        $datos_prop = $daoshop->filters_shop($_POST['filters_shop'], $_POST['offset'], $_POST['items_page']);
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'dynamic_filters_type':
        // echo json_encode("dynamic_filters");
        // break;
        $daoshop = new DAOshop();
        $datos_prop = $daoshop->dynamic_filters_type();
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'dynamic_filters_city':
        // echo json_encode("dynamic_filters");
        // break;
        $daoshop = new DAOshop();
        $datos_prop = $daoshop->dynamic_filters_city();
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'dynamic_filters_category':
        // echo json_encode("dynamic_filters");
        // break;
        $daoshop = new DAOshop();
        $datos_prop = $daoshop->dynamic_filters_category();
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'dynamic_filters_extra':
        // echo json_encode("dynamic_filters");
        // break;
        $daoshop = new DAOshop();
        $datos_prop = $daoshop->dynamic_filters_extra();
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'dynamic_filters_activity':
        // echo json_encode("dynamic_filters");
        // break;
        $daoshop = new DAOshop();
        $datos_prop = $daoshop->dynamic_filters_activity();
        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'orderby':
        // echo json_encode("filter_orderby");
        // break;
        try {
            $daoshop = new DAOshop();
            $datos_prop = $daoshop->orderby($_POST['orderby']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'count';

        try {
            $daoshop = new DAOshop();
            $datos_prop = $daoshop->select_count();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;


    case 'count_shop';

        try {
            $daoshop = new DAOshop();
            $datos_prop = $daoshop->select_count_filter($_POST['filters_shop']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'count_home';

        try {
            $daoshop = new DAOshop();
            $datos_prop = $daoshop->count_home($_POST['filters_home']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'scroll_details';
        // echo json_encode("scroll_details");
        try {
            $daoshop = new DAOshop();
            $datos_prop = $daoshop->scroll_details($_POST['limit'], $_POST['code_prop']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    case 'like':

        $username = decode_token($_POST['acces_token']);
        // echo json_encode("username reconocido: " . $username);
        try {
            $daoshop = new DAOshop();
            $datos_prop = $daoshop->like($username, $_POST['code_prop']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($datos_prop)) {
            echo json_encode("ok");
        } else {
            echo json_encode("error");
        }
        break;

    case 'checklike':

        $username = decode_token($_POST['acces_token']);
        // echo json_encode("username reconocido: " . $username);
        try {
            $daoshop = new DAOshop();
            $datos_prop = $daoshop->checklike($username, $_POST['code_prop']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($datos_prop)) {
            echo json_encode($datos_prop);
        } else {
            echo json_encode("error");
        }
        break;

    default;
        include ("view/inc/error404.php");
        break;
}
?>