<?php
include ("c:/xampp/htdocs/angela/ZenithZoneRE/model/JWT.php");

function decode_token($token)
{
    $jwt = parse_ini_file('credentials.ini');
    $secret = $jwt['JWT_SECRET'];

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);

    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token["username"];
}

function create_token($username)
{
    $jwt = parse_ini_file('credentials.ini');
    $header = $jwt['JWT_HEADER'];
    $secret = $jwt['JWT_SECRET'];
    $payload = '{"iat":"' . time() . '","exp":"' . time() + (600) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}

function create_refresh_token($username)
{
    $jwt = parse_ini_file('credentials.ini');
    $header = $jwt['JWT_HEADER'];
    $secret = $jwt['JWT_SECRET'];
    $payload = '{"iat":"' . time() . '","exp":"' . time() + (800) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}