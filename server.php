
<!-- команда, которая берет даныне с клиента превращает в стркоу и показывает на клиента  -->
<?php 
// конструкция где на php коде поулчаем json формат 
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);