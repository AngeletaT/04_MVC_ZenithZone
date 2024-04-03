<?php
// include("view/inc/top_page.html");

if ((isset($_GET['page'])) && ($_GET['page'] === "controller_home")) {
   include("view/inc/top_page_home.html");
} else if ((isset($_GET['page'])) && ($_GET['page'] === "controller_shop")) {
   include("view/inc/top_page_shop.html");
} else {
   include("view/inc/top_page.html");
}
session_start();

include("view/inc/header.html");

include("view/inc/pages.php");

include("view/inc/footer.html");

include("view/inc/bottom_page.html");
?>